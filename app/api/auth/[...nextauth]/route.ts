import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // On initial sign in
      if (account && profile) {
        // Exchange GitHub token with backend
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        
        try {
          const response = await fetch(`${backendUrl}/api/auth/github`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: account.access_token,
              redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            token.accessToken = data.access_token
            token.githubId = profile.id
            token.githubUsername = (profile as any).login
          }
        } catch (error) {
          console.error('Error exchanging token with backend:', error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        (session.user as any).accessToken = token.accessToken
        (session.user as any).githubId = token.githubId
        (session.user as any).githubUsername = token.githubUsername
      }
      
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
