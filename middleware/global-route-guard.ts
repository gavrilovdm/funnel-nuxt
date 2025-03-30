import { useFunnelStore } from '../stores/funnel';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on server-side
  if (process.server) return;

  const funnelStore = useFunnelStore();
  
  // Allow direct access to the index page
  if (to.path === '/') return;

  // For any other route, check if we have a valid config and answers
  const hasConfig = funnelStore.loadConfig();
  const hasAnswers = Object.keys(funnelStore.userAnswers).length > 0;

  // If no config or no answers, redirect to home and reset store
  if (!hasConfig || !hasAnswers) {
    // Clear session storage
    if (process.client) {
      sessionStorage.removeItem('fjor_user_answers');
      sessionStorage.removeItem('fjor_config_type');
    }
    
    // Reset store state
    funnelStore.$reset();
    
    // Redirect to home
    return navigateTo('/');
  }
}); 