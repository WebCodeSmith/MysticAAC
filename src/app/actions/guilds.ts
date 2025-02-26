'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

interface CreateGuildData {
  name: string
  leaderId: number
}

export async function createGuild(data: CreateGuildData) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in to create a guild' }
    }

    // Check if character exists and has sufficient level
    const leader = await prisma.players.findUnique({
      where: { 
        id: data.leaderId,
        deletion: 0
      },
      include: {
        guilds: true, // Include guilds relation to check if already owner
        guild_membership: {
          include: {
            guilds: true
          }
        }
      }
    })

    if (!leader) {
      return { success: false, error: 'Character not found' }
    }

    if (leader.level < 8) {
      return { success: false, error: 'Your character must be level 8 or higher' }
    }

    // Check if already owns a guild
    if (leader.guilds) {
      return { success: false, error: 'This character already owns a guild' }
    }

    // Check if already member of another guild
    if (leader.guild_membership) {
      return { success: false, error: 'This character is already a member of a guild' }
    }

    // Check if guild name is available
    const existingGuild = await prisma.guilds.findUnique({
      where: { name: data.name }
    })

    if (existingGuild) {
      return { success: false, error: 'This guild name is already in use' }
    }

    // Create guild
    const guild = await prisma.guilds.create({
      data: {
        name: data.name,
        ownerid: data.leaderId,
        creationdata: Math.floor(Date.now() / 1000)
      }
    })

    // Create leader rank
    const leaderRank = await prisma.guild_ranks.create({
      data: {
        guild_id: guild.id,
        name: 'Leader',
        level: 3
      }
    })

    // Add leader to guild
    await prisma.guild_membership.create({
      data: {
        player_id: data.leaderId,
        guild_id: guild.id,
        rank_id: leaderRank.id
      }
    })

    revalidatePath('/guilds')
    return { success: true, guildId: guild.id }
  } catch (error) {
    console.error('Error creating guild:', error)
    return { success: false, error: 'Failed to create guild' }
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

export async function getEligibleGuildLeaders(accountId: number) {
  return await prisma.players.findMany({
    where: { 
      account_id: accountId,
      deletion: 0,
      level: {
        gte: 8
      }
    },
    select: {
      id: true,
      name: true,
      level: true
    },
    orderBy: {
      level: 'desc'
    }
  })
}