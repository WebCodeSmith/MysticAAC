'use server'

import { prisma } from '@/lib/prisma'
import * as argon2 from 'argon2'

interface CreateAccountData {
  name: string
  password: string
  email: string
}

interface LoginData {
  name: string
  password: string
}

export async function createAccount(data: CreateAccountData) {
  try {
    const hashedPassword = await argon2.hash(data.password)
    
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
    console.error('Erro ao criar conta:', error)
    return { success: false, error: 'Falha ao criar conta' }
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
      return { success: false, error: 'Conta não encontrada' }
    }

    const isValid = await argon2.verify(account.password, data.password)
    
    if (!isValid) {
      return { success: false, error: 'Senha incorreta' }
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
    console.error('Erro ao fazer login:', error)
    return { success: false, error: 'Erro interno ao tentar fazer login' }
  }
}