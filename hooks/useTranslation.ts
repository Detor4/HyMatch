import { useApp } from '@/contexts/AppContext';
import { getTranslation } from '@/constants/translations';

export function useTranslation() {
  const { state } = useApp();
  
  const t = (key: string): string => {
    return getTranslation(state.currentLanguage, key);
  };
  
  return { t, currentLanguage: state.currentLanguage };
}