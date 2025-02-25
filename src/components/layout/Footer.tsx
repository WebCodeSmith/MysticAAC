export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-tibia-dark border-t border-tibia-accent mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">About TibiaServer</h3>
            <p className="text-gray-400 text-sm">
              Experience the classic MMORPG with modern features and enhanced security.
              Join our community and start your adventure today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/download" className="text-gray-400 hover:text-yellow-400 text-sm transition">
                  Download Client
                </a>
              </li>
              <li>
                <a href="/ranking" className="text-gray-400 hover:text-yellow-400 text-sm transition">
                  Player Rankings
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-yellow-400 text-sm transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <span className="text-xl">💬</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <span className="text-xl">📧</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-tibia-accent pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} TibiaServer. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}