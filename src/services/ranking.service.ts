import { prisma } from '@/lib/prisma'

export interface RankingPlayer {
  id: number
  name: string
  level: number
  vocation: number
  experience: bigint
}

export async function getTopPlayers(limit = 100) {
  return await prisma.players.findMany({
    where: {
      deletion: 0,
      group_id: 1
    },
    take: limit,
    orderBy: { level: 'desc' },
    select: {
      id: true,
      name: true,
      level: true,
      vocation: true,
      experience: true
    }
  }) as RankingPlayer[]
}