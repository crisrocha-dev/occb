import { AuthProvider } from '../components/auth'

export default function Application({ Component, pageProps }) {
  return (
   <AuthProvider>
      <Component {...pageProps} />
   </AuthProvider>
  )
}

