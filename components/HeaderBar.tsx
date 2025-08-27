import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Globe } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useApp } from '@/contexts/AppContext';
import Modal from 'react-native-modal';
import { Language } from '@/types';

interface HeaderBarProps {
  title: string;
  onMenuPress?: () => void;
}

export default function HeaderBar({ title, onMenuPress }: HeaderBarProps) {
  const { t } = useTranslation();
  const { setLanguage, state } = useApp();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const languages = [
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'uz' as Language, name: 'O\'zbek', flag: '🇺🇿' },
  ];

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    setLanguageModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Globe size={24} color="#374151" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.iconButton} />
      </View>

      <Modal
        isVisible={languageModalVisible}
        onBackdropPress={() => setLanguageModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                state.currentLanguage === lang.code && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={styles.languageName}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 40,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111827',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: '#EBF8FF',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});