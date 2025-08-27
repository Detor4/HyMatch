import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SortModal({ visible, onClose }: SortModalProps) {
  const { t } = useLanguage();
  const [selectedSort, setSelectedSort] = useState('wage');

  const handleSortSelect = (sortKey: string) => {
    setSelectedSort(sortKey);
    // Apply sort logic here
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const sortOptions = [
    { key: 'wage', label: t('sortByWage') },
    { key: 'commuteHome', label: t('sortByCommuteHome') },
    { key: 'commuteSchool', label: t('sortByCommuteSchool') },
    { key: 'postDate', label: t('sortByPostDate') },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('sortBy')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#8B4513" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.sortOption}
                onPress={() => handleSortSelect(option.key)}
              >
                <Text style={styles.sortText}>{option.label}</Text>
                {selectedSort === option.key && (
                  <Check size={20} color="#8B4513" />
                )}
              </TouchableOpacity>
            ))}
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#F1F0E4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D5C4',
  },
  sortText: {
    fontSize: 16,
    color: '#8B4513',
  },
});