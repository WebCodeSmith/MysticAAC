import Header from '@/components/layout/Header'
import LoginForm from '@/components/ui/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession()

  return (
    <main className="min-h-screen bg-tibia-darker bg-[url('/images/bg-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8 border border-tibia-accent">
          <Image
            src="/images/hero-banner.jpg"
            alt="Tibia World"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Welcome to Tibia</h1>
              <p className="text-lg text-gray-200">Experience the adventure in our world</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Latest News */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 pb-2 border-b border-tibia-accent">
                Latest News
              </h2>
              <div className="space-y-6">
                {/* News Item */}
                <div className="bg-tibia-darker p-4 rounded-lg hover:border-yellow-400 border border-tibia-accent transition">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">📢</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white">Server Update</h3>
                        <span className="text-sm text-gray-400">2 hours ago</span>
                      </div>
                      <p className="text-gray-300">Important updates and improvements coming to our server...</p>
                    </div>
                  </div>
                </div>

                {/* More News Items */}
                <div className="bg-tibia-darker p-4 rounded-lg hover:border-yellow-400 border border-tibia-accent transition">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-green-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white">Weekend Event</h3>
                        <span className="text-sm text-gray-400">1 day ago</span>
                      </div>
                      <p className="text-gray-300">Double experience and special rewards this weekend!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <LoginForm />

            {/* Server Statistics */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 mb-4 pb-2 border-b border-tibia-accent">
                Server Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-red-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    Offline
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Players Online:</span>
                  <span className="text-yellow-400">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Uptime:</span>
                  <span className="text-blue-400">0 days</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 mb-4 pb-2 border-b border-tibia-accent">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {!session && (
                  <Link 
                    href="/register" 
                    className="bg-green-600 text-white p-3 rounded text-center hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <span>📝</span>
                    <span>Create Account</span>
                  </Link>
                )}
                <Link 
                  href="/download" 
                  className="bg-blue-600 text-white p-3 rounded text-center hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <span>💾</span>
                  <span>Download Client</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}