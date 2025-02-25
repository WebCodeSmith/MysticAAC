'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

interface CreateGuildResult {
  success: boolean
  error?: string
  guildId?: number
}

export async function createGuild(name: string): Promise<CreateGuildResult> {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return { success: false, error: 'Not authenticated' }
    }

    // Get player info
    const player = await prisma.players.findFirst({
      where: {
        accounts: {
          email: session.user.email
        }
      },
      orderBy: {
        level: 'desc'
      }
    })

    if (!player) {
      return { success: false, error: 'No character found' }
    }

    // Check if player already has a guild
    const existingMembership = await prisma.guild_membership.findFirst({
      where: { player_id: player.id }
    })

    if (existingMembership) {
      return { success: false, error: 'You are already in a guild' }
    }

    // Check if guild name exists
    const existingGuild = await prisma.guilds.findFirst({
      where: { name }
    })

    if (existingGuild) {
      return { success: false, error: 'Guild name already exists' }
    }

    // Create guild
    const guild = await prisma.guilds.create({
      data: {
        name,
        ownerid: player.id,
        creationdata: Math.floor(Date.now() / 1000),
        level: 1,
        motd: 'Welcome to our guild!',  // Message of the day
        balance: 0,                    // Initial balance
        points: 0                       // Initial points
      }
    })

    // Create leader rank
    const leaderRank = await prisma.guild_ranks.create({
      data: {
        guild_id: guild.id,
        name: 'Leader',
        level: 3,
      }
    })

    // Add creator as leader
    await prisma.guild_membership.create({
      data: {
        player_id: player.id,
        guild_id: guild.id,
        rank_id: leaderRank.id,
      }
    })

    return { 
      success: true, 
      guildId: guild.id 
    }

  } catch (error) {
    console.error('Failed to create guild:', error)
    return { 
      success: false, 
      error: 'Failed to create guild' 
    }
  }
}

export async function updateGuildMotd(guildId: number, motd: string) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return { success: false, error: 'Not authenticated' }
    }

    // Check if user is guild leader
    const guild = await prisma.guilds.findUnique({
      where: { id: guildId },
      include: {
        players: {
          include: {
            accounts: true
          }
        }
      }
    })

    if (!guild || guild.players.accounts.email !== session.user.email) {
      return { success: false, error: 'Not authorized' }
    }

    // Update MOTD
    await prisma.guilds.update({
      where: { id: guildId },
      data: { motd }
    })

    // Revalidate the guild page
    revalidatePath(`/guilds/${guildId}`)

    return { success: true }
  } catch (error) {
    console.error('Failed to update MOTD:', error)
    return { success: false, error: 'Failed to update message' }
  }
}