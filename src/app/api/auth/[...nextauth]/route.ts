import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "@/app/actions/auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: "Account", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) return null
        
        const result = await loginUser({
          name: credentials.name,
          password: credentials.password
        })

        if (!result.success || !result.account) return null
        
        return {
          id: result.account.id.toString(),
          name: result.account.name,
          email: result.account.email
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }