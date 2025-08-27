import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useJobs } from '@/context/JobContext';
import { useLanguage } from '@/context/LanguageContext';
import JobListItem from '@/components/JobListItem';
import { useRouter } from 'expo-router';

export default function AcceptedJobsScreen() {
  const { selectedJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#8B4513" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('acceptedJobs')}</Text>
        <View style={styles.placeholder} />
      </View>

      {selectedJobs.length > 0 ? (
        <FlatList
          data={selectedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobItemContainer}>
              <JobListItem job={item} showCheckbox={false} />
              <View style={styles.acceptedContainer}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.acceptedText}>{t('accepted')}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MessageCircle size={64} color="#4A90E2" />
          <Text style={styles.emptyText}>{t('noAcceptedJobs')}</Text>
          <Text style={styles.emptySubText}>{t('swipeRightToSelect')}</Text>
        </View>
      )}
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
  listContainer: {
    padding: 16,
  },
  jobItemContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  acceptedContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  acceptedText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
