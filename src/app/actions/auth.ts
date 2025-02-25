'use server'

import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

interface CreateAccountData {
  name: string
  password: string
  email: string
}

interface LoginData {
  name: string
  password: string
}

// Function to create SHA1 hash
function sha1(password: string): string {
  return crypto.createHash('sha1').update(password).digest('hex')
}

export async function createAccount(data: CreateAccountData) {
  try {
    const hashedPassword = sha1(data.password)
    
    const account = await prisma.accounts.create({
      data: {
        name: data.name,
        password: hashedPassword,
        email: data.email,
        type: true,
        premdays: 0,
        creation: Math.floor(Date.now() / 1000)
      }
    })

    return { success: true, account }
  } catch (error) {
    console.error('Error creating account:', error)
    return { success: false, error: 'Failed to create account' }
  }
}

export async function loginUser(data: LoginData) {
  try {
    const account = await prisma.accounts.findFirst({
      where: {
        name: data.name
      },
      include: {
        players: true
      }
    })

    if (!account) {
      return { success: false, error: 'Account not found' }
    }

    const hashedPassword = sha1(data.password)
    const isValid = hashedPassword === account.password
    
    if (!isValid) {
      return { success: false, error: 'Incorrect password' }
    }

    return { 
      success: true, 
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        premdays: account.premdays,
        coins: account.coins,
        players: account.players
      }
    }
  } catch (error) {
    console.error('Error when logging in:', error)
    return { success: false, error: 'Internal error when trying to log in' }
  }
}