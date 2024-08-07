import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter"; // Import Twitter provider
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.username = sessionUser.username?.toString() || "";
      session.user.name = sessionUser.name?.toString() || "";
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          let baseUsername = profile.name.replace(" ", "").toLowerCase();
          let username = baseUsername;
          let userExistsWithUsername = await User.findOne({ username });

          while (userExistsWithUsername) {
            username = `${baseUsername}${uuidv4().slice(0, 8)}`;
            userExistsWithUsername = await User.findOne({ username });
          }

          await User.create({
            email: profile.email,
            username,
            name: profile.name,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
