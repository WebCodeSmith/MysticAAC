import Header from '@/components/layout/Header'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/ui/LogoutButton'
import Link from 'next/link'
import { getAuthenticatedAccount, Character } from '@/services/dashboard.service'
import { CharacterCard } from '@/components/dashboard/CharacterCard'

export default async function DashboardPage() {
  const account = await getAuthenticatedAccount()

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