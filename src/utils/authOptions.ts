import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import API_ROUTES from '../api/routes';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET_KEY,
    providers: [
        CredentialsProvider({
            id: 'sign-in',
            name: 'sign-in',
            credentials: {
                phone: {
                    name: 'phone',
                    label: 'Phone',
                    type: 'text',
                    placeholder: 'Enter Phone'
                },
                password: {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter Password'
                }
            },
            async authorize(credentials) {
                try {
                    const baseUrl = process.env.NEXT_APP_API_URL;

                    const response = await fetch(`${baseUrl}${API_ROUTES.auth.sign_in}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phone: credentials?.phone,
                            password: credentials?.password
                        })
                    });

                    const data = await response.json();

                    if (response.status !== 200) {
                        throw new Error(data.message);
                    }

                    const token = data.accessToken;
                    if (token) {
                        const userResponse = await fetch(`${baseUrl}${API_ROUTES.auth.profile}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        });

                        const user = await userResponse.json();

                        return {
                            ...user,
                            accessToken: token
                        };
                    } else {
                        return null;
                    }
                } catch (e: any) {
                    const errorMessage = e?.message;
                    console.log('Error in authOptions', errorMessage);
                    console.log('Error in authOptions', e);
                    throw new Error(errorMessage);
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (user) {
                // @ts-ignore
                token.accessToken = user.accessToken;
                token.user = user;
                token.id = user.id;
                token.provider = account?.provider;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
                session.provider = token.provider;
                session.token = token;
                // @ts-ignore
                session.user = token.user;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
    },
    jwt: {
        secret: process.env.NEXT_APP_JWT_SECRET
    },
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    }
};
