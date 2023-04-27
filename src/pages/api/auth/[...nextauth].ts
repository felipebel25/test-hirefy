import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUserEmailPassword, oAuthToDbUser } from "database/dbUsers";

const clientId = process.env.GITHUB_ID || ''
const clientSecret = process.env.GITHUB_SECRET || ''

// Configure one or more authentication providers
export const authOptions = {
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Custom Login",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },

      },
      async authorize(credentials: any) {
        const { email, password } = credentials

        const result = await checkUserEmailPassword(email, password)
        return result as any
      }
    })
  ],
  //custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  } as any,
  //Warning
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.acessToken = account.acessToken;
        switch (account.type) {
          //oauth is for social networks login
          case 'oauth':
            token.user = await oAuthToDbUser(user.email, user.name)
            break;
          //credentials is our login 
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }

      }
      return token
    },
    async session({ session, token, user }: any) {
      session.acessToken = token.acessToken
      session.user = token.user as any;
      return session

    }
  }
}
export default NextAuth(authOptions)