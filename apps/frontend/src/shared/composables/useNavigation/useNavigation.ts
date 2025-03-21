import { useRouter, useRoute } from 'vue-router'

export function useNavigation() {
  const router = useRouter()
  const route = useRoute()

  const goHome = () => router.push({ name: 'home' })
  const goAuth = () => router.push({ name: 'auth' })

  const isAuthRoute = route.name === 'auth'

  return { router, route, goHome, goAuth, isAuthRoute }
}
