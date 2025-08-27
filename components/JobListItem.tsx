import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Star, Check } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { Job } from '@/types/Job';

interface JobListItemProps {
  job: Job;
  showCheckbox: boolean;
}

export default function JobListItem({ job, showCheckbox }: JobListItemProps) {
  const { t } = useLanguage();
  const [isSelected, setIsSelected] = useState(false);



  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/icons/shop.png')}
          style={styles.jobIcon}
          resizeMode="contain"
        />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.jobCategory}>{t(job.category)}</Text>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.wageText}>
                ¥{job.hourlyWage.min}〜{job.hourlyWage.max}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Clock size={14} color="#A0937D" />
              <Text style={styles.detailText}>{job.commuteTime}分</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.japaneseLevel}>{job.japaneseLevel}</Text>
            </View>
          </View>
          
          <View style={styles.location}>
            <MapPin size={14} color="#A0937D" />
            <Text style={styles.locationText} numberOfLines={1}>
              {job.location}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{job.rating}</Text>
        </View>
        
        {showCheckbox && (
          <TouchableOpacity
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => setIsSelected(!isSelected)}
          >
            {isSelected && <Check size={16} color="#FFF" />}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F0E4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
  },
  jobIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 4,
  },
  jobCategory: {
    fontSize: 12,
    color: '#A0937D',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  wageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  detailText: {
    fontSize: 12,
    color: '#A0937D',
    marginLeft: 2,
  },
  japaneseLevel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B4513',
    backgroundColor: '#BCA88D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#A0937D',
    marginLeft: 2,
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B4513',
    marginLeft: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BCA88D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
});