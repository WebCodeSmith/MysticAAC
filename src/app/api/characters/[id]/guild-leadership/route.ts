import { NextResponse } from 'next/server'
import { getGuildLeadershipInfo } from '@/services/guild.service'
import { getServerSession } from 'next-auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Await params before accessing id
    const resolvedParams = await params
    const characterId = parseInt(resolvedParams.id, 10)
    
    if (isNaN(characterId)) {
      return NextResponse.json(
        { error: 'Invalid character ID' },
        { status: 400 }
      )
    }

    const guildInfo = await getGuildLeadershipInfo(characterId)

    return NextResponse.json({
      isGuildLeader: !!guildInfo,
      guildInfo
    })
  } catch (error) {
    console.error('Error checking guild leadership:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}