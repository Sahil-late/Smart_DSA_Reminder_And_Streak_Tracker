import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
   secret: process.env.NEXTAUTH_SECRET, 

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider) {
        token.provider = account.provider; 
      }
      return token;
    },

    async session({ session, token }) {
      session.user.provider = token.provider; 
      return session;
    },
  },
})

export { handler as GET, handler as POST }