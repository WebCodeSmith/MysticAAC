import Header from '@/components/layout/Header'

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-tibia-darker">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Download Section */}
          <div className="bg-tibia-dark p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Download Client</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Download the Tibia Client to start your adventure in the magical world of Tibia.
              </p>
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-400">System Requirements:</span>
                <ul className="list-disc list-inside text-gray-300 ml-4">
                  <li>Windows 7 or higher</li>
                  <li>2GB RAM</li>
                  <li>200MB free disk space</li>
                  <li>Internet connection</li>
                </ul>
              </div>
              <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
                Download Tibia Client (Windows)
              </button>
            </div>
          </div>

          {/* Installation Guide */}
          <div className="bg-tibia-dark p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Installation Guide</h2>
            <div className="space-y-4">
              <div className="bg-tibia-accent p-4 rounded-lg">
                <h3 className="font-bold mb-2">Step 1: Download</h3>
                <p className="text-gray-300">Click the download button to get the latest version of Tibia Client.</p>
              </div>
              <div className="bg-tibia-accent p-4 rounded-lg">
                <h3 className="font-bold mb-2">Step 2: Install</h3>
                <p className="text-gray-300">Run the installer and follow the installation wizard instructions.</p>
              </div>
              <div className="bg-tibia-accent p-4 rounded-lg">
                <h3 className="font-bold mb-2">Step 3: Launch</h3>
                <p className="text-gray-300">Start the game and log in with your account credentials.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-tibia-dark p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-tibia-accent p-4 rounded-lg hover:bg-opacity-80 transition">
              Game Manual
            </button>
            <button className="bg-tibia-accent p-4 rounded-lg hover:bg-opacity-80 transition">
              FAQ
            </button>
            <button className="bg-tibia-accent p-4 rounded-lg hover:bg-opacity-80 transition">
              Support
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}