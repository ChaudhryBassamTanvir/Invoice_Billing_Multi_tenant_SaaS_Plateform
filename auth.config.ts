import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', //without this next-auth uses it ugly logu=in page, this is for custom Login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl }}) { // redenred on every request
      const isLoggedIn = !!auth?.user; // convert obj to true/false
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/api/test-if-user-already-exists', nextUrl));
      }
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;