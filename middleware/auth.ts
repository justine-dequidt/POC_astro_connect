export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data, error } = await supabase.auth.getSession()
    const user = data.session
    if (!user && to.path !== '/') {
        return navigateTo('/')
      } else if (user && to.path === '/') {
        return navigateTo('/profil')
      }
  })
  