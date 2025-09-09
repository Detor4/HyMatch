import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Heart, ArrowLeft, Filter } from 'lucide-react-native';
import { useJobs } from '@/context/JobContext';
import { useLanguage } from '@/context/LanguageContext';
import JobListItem from '@/components/JobListItem';
import FilterModal from '@/components/FilterModal';
import { useRouter } from 'expo-router';

export default function ChooseScreen() {
  const { selectedJobs, filteredSelectedJobs, filterSelectedJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  // Update when selectedJobs or filteredSelectedJobs change
  useEffect(() => {
    console.log('Selected jobs changed:', selectedJobs.length);
    console.log('Filtered selected jobs:', filteredSelectedJobs.length);
  }, [selectedJobs, filteredSelectedJobs]);

  const handleFilterApply = (filters: any) => {
    console.log('Applied filters:', filters);
    filterSelectedJobs(filters);
    setShowFilter(false);
  };

  return (
    <SafeAreaView style={styles.container}>
             <View style={styles.header}>
         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
           <ArrowLeft size={24} color="#8B4513" />
         </TouchableOpacity>
                 <Text style={styles.headerTitle}>{t('chooseList')}</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(true)}>
          <Filter size={36} color="#000000" />
        </TouchableOpacity>
               </View>

        {(filteredSelectedJobs.length > 0 ? filteredSelectedJobs : selectedJobs).length > 0 ? (
                   <FlatList
            data={filteredSelectedJobs.length > 0 ? filteredSelectedJobs : selectedJobs}
            keyExtractor={(item, index) => `selected-job-${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.jobItemContainer}>
                <JobListItem job={item} showCheckbox={false} />
              </View>
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
         <View style={styles.emptyContainer}>
           <Heart size={64} color="#FF69B4" />
           <Text style={styles.emptyText}>{t('noSelectedJobs')}</Text>
           <Text style={styles.emptySubText}>{t('swipeRightToSelect')}</Text>
         </View>
       )}

        <FilterModal
          visible={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleFilterApply}
        />

      
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
  filterButton: { padding: 8 },
  headerIcon: { width: 28, height: 28 },
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
