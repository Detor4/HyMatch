import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { X, Phone, Mail } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ContactModal({ visible, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  const handlePhonePress = () => {
    Linking.openURL('tel:+81-3-1234-5678');
    onClose();
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@jobapp.com');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('contact')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#8B4513" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TouchableOpacity style={styles.contactOption} onPress={handlePhonePress}>
              <View style={styles.iconContainer}>
                <Phone size={24} color="#FFF" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{t('phone')}</Text>
                <Text style={styles.contactValue}>+81-3-1234-5678</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption} onPress={handleEmailPress}>
              <View style={styles.iconContainer}>
                <Mail size={24} color="#FFF" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{t('email')}</Text>
                <Text style={styles.contactValue}>support@jobapp.com</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F1F0E4',
    borderRadius: 16,
    width: '85%',
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D5C4',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F2EDD1',
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#A0937D',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
});