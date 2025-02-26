'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

interface CreateCharacterData {
  name: string
  vocation: number // 1 = Sorcerer, 2 = Druid, 3 = Paladin, 4 = Knight
  sex: number // 0 = Female, 1 = Male
}

export async function createCharacter(data: CreateCharacterData) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in to create a character' }
    }

    // Get account id from session user email
    const account = await prisma.accounts.findFirst({
      where: { email: session.user.email }
    })

    if (!account) {
      return { success: false, error: 'Account not found' }
    }

    // Check if name is available
    const existingChar = await prisma.players.findUnique({
      where: { name: data.name }
    })

    if (existingChar) {
      return { success: false, error: 'This name is already in use' }
    }

    // Set default values based on vocation
    let healthMax = 150
    let manaMax = 0
    let cap = 400
    let lookType = data.sex === 1 ? 128 : 136 // Male or Female looktype

    switch (data.vocation) {
      case 1: // Sorcerer
        manaMax = 50
        cap = 400
        break
      case 2: // Druid
        manaMax = 50
        cap = 400
        break
      case 3: // Paladin
        manaMax = 35
        cap = 430
        break
      case 4: // Knight
        manaMax = 15
        cap = 470
        break
    }

    // Create character
    const character = await prisma.players.create({
      data: {
        name: data.name,
        account_id: account.id,
        vocation: data.vocation,
        sex: data.sex,
        health: healthMax,
        healthmax: healthMax,
        mana: manaMax,
        manamax: manaMax,
        cap: cap,
        level: 1,
        looktype: lookType,
        town_id: 1, // Starting town
        posx: 0,
        posy: 0,
        posz: 0,
        conditions: Buffer.from([]),
        stamina: 2520,
        skill_fist: 10,
        skill_club: 10,
        skill_sword: 10,
        skill_axe: 10,
        skill_dist: 10,
        skill_shielding: 10,
        skill_fishing: 10
      }
    })

    // Revalidate affected pages
    revalidatePath('/ranking')

    return { success: true, character }
  } catch (error) {
    console.error('Error creating character:', error)
    return { success: false, error: 'Failed to create character' }
  }
}

function sha1(password: string): string {
  return crypto.createHash('sha1').update(password).digest('hex')
}

export async function deleteCharacter(characterId: number, password: string) {
  try {
    const character = await prisma.players.findUnique({
      where: { id: characterId },
      select: {
        name: true,
        account_id: true,
        accounts: {
          select: {
            password: true
          }
        }
      }
    })

    if (!character) {
      return { success: false, error: 'Character not found' }
    }

    const hashedPassword = sha1(password)
    const isValidPassword = hashedPassword === character.accounts.password
    
    if (!isValidPassword) {
      return { success: false, error: 'Incorrect password' }
    }

    await prisma.players.update({
      where: { id: characterId },
      data: { deletion: 1 }
    })

    // Revalidate affected pages
    revalidatePath('/ranking')

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Error deleting character' }
  }
}