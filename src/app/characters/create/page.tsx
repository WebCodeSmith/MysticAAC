import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import Header from '@/components/layout/Header'
import CreateCharacterForm from '@/components/ui/CreateCharacterForm'

export default async function CreateCharacterPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-tibia-darker">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-2xl mx-auto">
          <CreateCharacterForm />
        </div>
      </div>
    </main>
  )
}