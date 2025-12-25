import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      accessToken?: string
      githubId?: string
      githubUsername?: string
      isCreator?: boolean
      isAdmin?: boolean
    }
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string
    githubId?: string
    githubUsername?: string
    isCreator?: boolean
    isAdmin?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    githubId?: string
    githubUsername?: string
    isCreator?: boolean
    isAdmin?: boolean
  }
}
