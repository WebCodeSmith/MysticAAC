import Header from '@/components/layout/Header'
import RegisterForm from '@/components/ui/RegisterForm'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-tibia-darker bg-[url('/images/bg-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">
              Join the Adventure
            </h1>
            <p className="text-gray-300">
              Create your account and start your journey in our world
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Register Form */}
            <div className="md:col-span-3">
              <RegisterForm />
            </div>

            {/* Benefits Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">
                  Account Benefits
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Create up to 7 characters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Join or create guilds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Participate in events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Trade with other players</span>
                  </li>
                </ul>
              </div>

              <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">
                  Need Help?
                </h2>
                <p className="text-gray-300 text-sm">
                  If you have any questions about creating an account, please check our FAQ or contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}