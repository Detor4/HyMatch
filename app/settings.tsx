import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, User, Globe, Phone, Mail } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useProfile } from '@/context/ProfileContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { profileData, isProfileComplete } = useProfile();
  const router = useRouter();

  const languageOptions = [
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'uz' as const, name: 'O\'zbek', flag: '🇺🇿' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#D8A362" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/profile-form')}
        >
          <User size={24} color="#D8A362" />
          <Text style={styles.menuText}>{t('profile')}</Text>
          {isProfileComplete && (
            <View style={styles.completeIndicator}>
              <Text style={styles.completeText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.languageSection}>
          <View style={styles.menuItem}>
            <Globe size={24} color="#D8A362" />
            <Text style={styles.menuText}>{t('language')}</Text>
          </View>
          
          <View style={styles.languageOptions}>
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={[
                  styles.languageOption,
                  language === option.code && styles.languageOptionActive,
                ]}
                onPress={() => setLanguage(option.code)}
              >
                <Text style={styles.languageFlag}>{option.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    language === option.code && styles.languageNameActive,
                  ]}
                >
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Phone size={24} color="#D8A362" />
          <Text style={styles.menuText}>{t('contact')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Mail size={24} color="#D8A362" />
          <Text style={styles.menuText}>{t('email')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efe7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D8A362',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#D8A362',
    marginLeft: 12,
    fontWeight: '500',
  },
  languageSection: {
    marginBottom: 12,
  },
  languageOptions: {
    marginLeft: 16,
    marginTop: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 8,
  },
  languageOptionActive: {
    backgroundColor: '#D8A362',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    color: '#D8A362',
  },
  languageNameActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  completeIndicator: {
    marginLeft: 'auto',
    backgroundColor: '#10B981',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
