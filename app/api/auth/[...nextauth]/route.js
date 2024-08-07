import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user does not exist, create a new user with a unique username
        if (!userExists) {
          let baseUsername = profile.name.replace(" ", "").toLowerCase();
          let username = baseUsername;
          let userExistsWithUsername = await User.findOne({ username });

          // Append a unique identifier if the username already exists
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
