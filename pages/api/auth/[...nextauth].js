import NextAuth from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/backend/models/userModel'
import dbConnect from '@/backend/config/dbConnect'

export default async function auth(req, res) {
    return await NextAuth(req, res, {
        session: {
            strategy: 'jwt',
        },
        providers: [
            CredentialsProvider({
                async authorize(credentials, req) {
                    dbConnect()
                    const { email, password } = credentials
                    const user = await User.findOne({ email }).select('+password')
                    if(!user) {
                        throw new Error('Invalid Email or Password')
                    }

                    const isPasswordMatched = await bcrypt.compare(password, user?.password)

                    if(!isPasswordMatched) {
                        throw new Error('Invalid Email or Password')
                    }

                    const { password: dbPassword, ...otherUserData } = user._doc

                    return otherUserData

                }
            })
        ],
        callbacks: {
            jwt: async ({ token, user}) => {
                if(user) {
                    token.user = user;
                }
                
                if(req.url === '/api/auth/session?update') {
                    const updatedUser =  await User.findById(token?.user?._id);
                    token.user = updatedUser;
                }
                return token;
            },
            session: async ({ session, token}) => {
                session.user = token?.user;
                delete session?.user?.password;
                return session;
            }
        },
        pages: {
            signIn: '/login'
        },
        secret: process.env.NEXTAUTH_SECRET
    })
}