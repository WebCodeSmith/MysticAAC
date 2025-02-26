import { prisma } from '@/lib/prisma'

export async function getCharacterWithDetails(characterName: string) {
  return await prisma.players.findUnique({
    where: { 
      name: characterName,
      deletion: 0 // Add this condition
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
      experience: true,
      skill_fist: true,
      skill_club: true,
      skill_sword: true,
      skill_axe: true,
      skill_dist: true,
      skill_shielding: true,
      skill_fishing: true,
      maglevel: true,
      lastlogin: true,
      account_id: true,
      accounts: {
        select: {
          creation: true
        }
      },
      guild_membership: {
        select: {
          nick: true,
          guilds: {
            select: {
              id: true,
              name: true,
              level: true,
              creationdata: true,
              motd: true
            }
          },
          guild_ranks: {
            select: {
              name: true,
              level: true
            }
          }
        }
      }
    }
  })
}

export async function getAccountCharacters(accountId: number, excludeCharacterName?: string) {
  return await prisma.players.findMany({
    where: { 
      account_id: accountId,
      deletion: 0,
      ...(excludeCharacterName ? {
        NOT: {
          name: excludeCharacterName
        }
      } : {})
    },
    select: {
      name: true,
      level: true,
      vocation: true
    },
    orderBy: {
      level: 'desc'
    }
  })
}