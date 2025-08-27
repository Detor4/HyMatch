import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Trash2, ArrowLeft } from 'lucide-react-native';
import { useJobs } from '@/context/JobContext';
import { useLanguage } from '@/context/LanguageContext';
import JobListItem from '@/components/JobListItem';
import { useRouter } from 'expo-router';

export default function RejectScreen() {
  const { rejectedJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#8B4513" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('refusalList')}</Text>
        <View style={styles.placeholder} />
      </View>

      {rejectedJobs.length > 0 ? (
        <FlatList
          data={rejectedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobItemContainer}>
              <JobListItem job={item} showCheckbox={false} />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Trash2 size={64} color="#8B8B8B" />
          <Text style={styles.emptyText}>{t('noRejectedJobs')}</Text>
          <Text style={styles.emptySubText}>{t('swipeLeftToReject')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9efe7' },
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
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#8B4513' },
  placeholder: { width: 40 },
  listContainer: { padding: 16 },
  jobItemContainer: { position: 'relative', marginBottom: 12 },
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
  emptySubText: { fontSize: 16, color: '#A0937D', textAlign: 'center' },
});
