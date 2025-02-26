import Header from '@/components/layout/Header'
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/ui/LogoutButton'
import Link from 'next/link'
import Image from 'next/image'
import { getAccountWithCharacters } from '@/services/dashboard.service'
import type { Account, Character } from '@/services/dashboard.service'
import DeleteCharacterButton from '@/components/ui/DeleteCharacterButton'
import { getVocationName, getVocationAssets } from '@/utils/game'

function CharacterCard({ character }: { character: Character }) {
  const { gif } = getVocationAssets(character.vocation)
  
  return (
    <div className={`bg-tibia-dark p-4 rounded-lg border ${
      character.deletion ? 'border-red-800 opacity-50' : 'border-tibia-accent'
    }`}>
      <div className="flex items-center gap-4">
        <figure className="relative w-[64px] h-[64px] m-0">
          <Image
            src={gif}
            alt={character.name}
            width={64}
            height={64}
            className={`${character.deletion ? 'grayscale' : ''}`}
            priority
            layout="responsive"
          />
          {character.deletion && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
              <span className="text-red-500 font-semibold text-sm">DELETED</span>
            </div>
          )}
        </figure>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-bold text-lg ${
                character.deletion ? 'text-red-500' : 'text-yellow-400'
              }`}>
                {character.name}
              </h3>
              <p className="text-gray-400">
                Level {character.level} - {getVocationName(character.vocation)}
              </p>
            </div>

            <div className="flex gap-2">
              {!character.deletion && (
                <>
                  <Link
                    href={`/characters/${character.name}`}
                    className="text-sm px-3 py-1 rounded transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View
                  </Link>
                  <DeleteCharacterButton
                    characterId={character.id}
                    characterName={character.name}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-400">
              HP: <span className="text-red-400">{character.health}/{character.healthmax}</span>
            </div>
            <div className="text-gray-400">
              MP: <span className="text-blue-400">{character.mana}/{character.manamax}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect('/')
  }

  const account = await getAccountWithCharacters(session.user.email)

  if (!account) {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-tibia-darker">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Account Box */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
                Account Info
              </h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Premium Days:</span>
                  <span className="text-yellow-400">{account.premdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tibia Coins:</span>
                  <span className="text-yellow-400">{account.coins}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                  Buy Coins
                </button>
                <LogoutButton />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-4">
            {/* Characters Panel */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <div className="flex justify-between items-center border-b border-tibia-accent pb-2 mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Characters</h2>
                <Link 
                  href="/characters/create"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Create Character
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {account.players.length > 0 ? (
                  account.players.map((character: Character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))
                ) : (
                  <div className="col-span-2 text-center p-8 bg-tibia-darker rounded-lg border border-tibia-accent">
                    <p className="text-gray-400">No characters found. Create your first character!</p>
                  </div>
                )}
              </div>
            </div>

            {/* News & Updates */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
                Latest News
              </h2>
              <div className="space-y-4">
                <div className="bg-tibia-darker p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Server News</h3>
                  <p className="text-gray-400">No news available at the moment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}