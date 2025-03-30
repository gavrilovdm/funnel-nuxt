import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { config_baseline, config_experimental } from '../config/funnel';
import type { FunnelConfig, Screen, FunnelConfigType } from '../types';

interface UserAnswers {
  [key: string]: any;
}

export const useFunnelStore = defineStore('funnel', () => {
  const configType = ref<FunnelConfigType | null>(null);
  const config = ref<FunnelConfig | null>(null);
  const userAnswers = ref<UserAnswers>({});
  const currentScreenId = ref<string | null>(null);

  // Computed property for the current screen
  const currentScreen = computed(() => {
    if (!currentScreenId.value || !config.value) return null;
    return config.value.screens.find(screen => screen.id === currentScreenId.value);
  });

  // Computed property for progress
  const progress = computed(() => {
    if (!config.value || !currentScreenId.value) return 0;
    const currentIndex = config.value.screens.findIndex(screen => screen.id === currentScreenId.value);
    if (currentIndex === -1) return 0;
    return Math.round(((currentIndex + 1) / config.value.screens.length) * 100);
  });

  // Assign a configuration to the user
  const assignConfig = () => {
    // Randomly choose between baseline and experimental
    const isExperimental = Math.random() > 0.5;
    
    configType.value = isExperimental ? 'experimental' : 'baseline';
    config.value = isExperimental ? config_experimental : config_baseline;
    
    // Save to session storage
    if (process.client) {
      sessionStorage.setItem('fjor_config_type', configType.value);
    }
    
    return configType.value;
  };

  // Load the configuration from session storage
  const loadConfig = () => {
    if (process.client) {
      const storedConfigType = sessionStorage.getItem('fjor_config_type') as FunnelConfigType | null;
      
      if (storedConfigType) {
        configType.value = storedConfigType;
        config.value = storedConfigType === 'experimental' ? config_experimental : config_baseline;
        return true;
      }
    }
    
    return false;
  };

  // Get a screen by ID
  const getScreen = (id: string): Screen | undefined => {
    if (!config.value) return undefined;
    currentScreenId.value = id; // Update current screen ID when getting a screen
    return config.value.screens.find(screen => screen.id === id);
  };

  // Get the next screen after the current one
  const getNextScreen = (currentScreenId: string): Screen | undefined => {
    if (!config.value) return undefined;
    
    const currentIndex = config.value.screens.findIndex(screen => screen.id === currentScreenId);
    if (currentIndex === -1 || currentIndex >= config.value.screens.length - 1) {
      return undefined;
    }
    
    return config.value.screens[currentIndex + 1];
  };

  // Store a user's answer
  const storeAnswer = (screenId: string, answer: any) => {
    userAnswers.value[screenId] = answer;
    
    // Save to session storage
    if (process.client) {
      sessionStorage.setItem('fjor_user_answers', JSON.stringify(userAnswers.value));
    }
  };

  // Load user answers from session storage
  const loadAnswers = () => {
    if (process.client) {
      const storedAnswers = sessionStorage.getItem('fjor_user_answers');
      if (storedAnswers) {
        userAnswers.value = JSON.parse(storedAnswers);
      }
    }
  };

  // Get the answers for a specific screen
  const getAnswerForScreen = (screenId: string) => {
    return userAnswers.value[screenId];
  };

  // Manually switch between configurations
  const switchConfig = () => {
    const newConfigType = configType.value === 'experimental' ? 'baseline' : 'experimental';
    configType.value = newConfigType;
    config.value = newConfigType === 'experimental' ? config_experimental : config_baseline;
    
    // Save to session storage
    if (process.client) {
      sessionStorage.setItem('fjor_config_type', configType.value);
    }
    
    return configType.value;
  };

  return {
    configType,
    config,
    userAnswers,
    currentScreen,
    progress,
    assignConfig,
    loadConfig,
    getScreen,
    getNextScreen,
    storeAnswer,
    loadAnswers,
    getAnswerForScreen,
    switchConfig
  };
}); 