import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export interface Character {
  id: number
  name: string
  level: number
  vocation: number
  sex: number
  health: number
  healthmax: number
  mana: number
  manamax: number
  deletion: number
}

export interface Account {
  id: number
  name: string
  email: string
  premdays: number
  coins: number
  players: Character[]
}

export async function getAccountWithCharacters(email: string) {
  return await prisma.accounts.findFirst({
    where: { 
      email: email 
    },
    include: {
      players: {
        orderBy: {
          level: 'desc'
        },
        select: {
          id: true,
          name: true,
          level: true,
          vocation: true,
          sex: true,
          health: true,
          healthmax: true,
          mana: true,
          manamax: true,
          deletion: true
        }
      }
    }
  }) as Account | null
}

export async function getAuthenticatedAccount() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect('/')
  }

  const account = await getAccountWithCharacters(session.user.email)

  if (!account) {
    redirect('/')
  }

  return account
}