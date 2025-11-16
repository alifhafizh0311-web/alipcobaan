import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
// This is a skeleton NextAuth config. For production, wire up an email server or a provider.

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      return session
    }
  }
})
