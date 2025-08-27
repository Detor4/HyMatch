import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Phone, ArrowLeft } from 'lucide-react-native';
import { useJobs } from '@/context/JobContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'expo-router';

export default function ContactScreen() {
  const { availableJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();

  const handleCall = () => {
    if (availableJobs.length > 0) {
      const currentJob = availableJobs[0];
      const phoneNumber = currentJob.phone || '+998901234567'; // Default number if not provided
      
      Alert.alert(
        t('makeCall'),
        `${currentJob.company} ${t('callConfirmation')}`,
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('makeCall'),
            onPress: () => {
              Linking.openURL(`tel:${phoneNumber}`);
            },
          },
        ]
      );
    } else {
      Alert.alert(t('error'), t('noJobsAvailable'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#8B4513" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('contact')}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {availableJobs.length > 0 ? (
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{availableJobs[0].title}</Text>
            <Text style={styles.companyName}>{availableJobs[0].company}</Text>
            <Text style={styles.phoneText}>
              {t('tel')}: {availableJobs[0].phone || '+998901234567'}
            </Text>
            
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Phone size={24} color="#FFFFFF" />
              <Text style={styles.callButtonText}>{t('makeCall')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyContent}>
            <Phone size={64} color="#8B4513" />
            <Text style={styles.emptyText}>{t('noJobsAvailable')}</Text>
            <Text style={styles.emptySubText}>{t('backToJobList')}</Text>
          </View>
        )}
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
    color: '#8B4513',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  jobInfo: {
    backgroundColor: '#F1F0E4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 280,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 16,
    color: '#A0937D',
    textAlign: 'center',
    marginBottom: 12,
  },
  phoneText: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 24,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#A0937D',
    textAlign: 'center',
  },
});
