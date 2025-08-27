import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Menu, Trash2, Heart, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useJobs } from '@/context/JobContext';
import { useLanguage } from '@/context/LanguageContext';
import JobCard from '@/components/JobCard';
import FilterModal from '@/components/FilterModal';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [showFilter, setShowFilter] = useState(false);

  const { availableJobs, selectJob, rejectJob, filterJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();

  const handleFilterApply = (filters: any) => {
    console.log('Applied filters:', filters);
    filterJobs(filters);
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rejectButtonScale = useSharedValue(1);
  const chooseButtonScale = useSharedValue(1);
  const rejectButtonColor = useSharedValue('#8B8B8B');
  const chooseButtonColor = useSharedValue('#FF69B4');

  const handleSwipeRight = () => {
    if (availableJobs.length > 0) {
      selectJob(availableJobs[0]);
    }
    resetCard();
  };

  const handleSwipeLeft = () => {
    if (availableJobs.length > 0) {
      rejectJob(availableJobs[0]);
    }
    resetCard();
  };

  const resetCard = () => {
    setTimeout(() => {
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      opacity.value = 1;
    }, 300);
  };

  // Animatsion style-lar
  const chooseStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, screenWidth * 0.2], // O'ngga swipe uchun
      [0, 1],
      'clamp'
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [0, screenWidth * 0.2], // O'ngga swipe uchun
          [0.5, 1],
          'clamp'
        ),
      },
    ],
  }));

  const refusalStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-screenWidth * 0.2, 0], // Chapga swipe uchun
      [1, 0],
      'clamp'
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-screenWidth * 0.2, 0], // Chapga swipe uchun
          [1, 0.5],
          'clamp'
        ),
      },
    ],
  }));

  // Gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_: any, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event: any, context: any) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      
      // Rotatsiya x va y harakatiga asoslangan
      const rotationX = translateX.value * 0.1;
      const rotationY = translateY.value * 0.05;
      rotate.value = rotationX + rotationY;
      
      // Opacity masofaga asoslangan
      const distance = Math.sqrt(translateX.value * translateX.value + translateY.value * translateY.value);
      opacity.value = interpolate(
        distance,
        [0, screenWidth * 0.5],
        [1, 0.7],
        'clamp'
      );
      
      // Reject button animation (left swipe)
      if (event.translationX < -50) {
        rejectButtonScale.value = withSpring(1.2);
        rejectButtonColor.value = '#FF6B6B';
      } else {
        rejectButtonScale.value = withSpring(1);
        rejectButtonColor.value = '#8B8B8B';
      }
      
      // Choose button animation (right swipe)
      if (event.translationX > 50) {
        chooseButtonScale.value = withSpring(1.2);
        chooseButtonColor.value = '#FF1493';
      } else {
        chooseButtonScale.value = withSpring(1);
        chooseButtonColor.value = '#FF69B4';
      }
    },
    onEnd: (event: any) => {
      const swipeThreshold = screenWidth * 0.25;
      const distance = Math.sqrt(event.translationX * event.translationX + event.translationY * event.translationY);
      
      if (distance > swipeThreshold) {
        // Yo'nalishni aniqlash
        const angle = Math.atan2(event.translationY, event.translationX) * 180 / Math.PI;
        
        if (angle > -45 && angle < 45) {
          // O'ngga swipe — CHOOSE
          translateX.value = withSpring(screenWidth);
          translateY.value = withSpring(0);
          runOnJS(handleSwipeRight)();
        } else if (angle > 135 || angle < -135) {
          // Chapga swipe — REJECT
          translateX.value = withSpring(-screenWidth);
          translateY.value = withSpring(0);
          runOnJS(handleSwipeLeft)();
        } else if (angle > 45 && angle < 135) {
          // Pastga swipe — CHOOSE
          translateX.value = withSpring(0);
          translateY.value = withSpring(screenWidth);
          runOnJS(handleSwipeRight)();
        } else {
          // Yuqoriga swipe — REJECT
          translateX.value = withSpring(0);
          translateY.value = withSpring(-screenWidth);
          runOnJS(handleSwipeLeft)();
        }
      } else {
        // Qaytish
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
        opacity.value = withSpring(1);
      }
      
      // Reset button scales and colors
      rejectButtonScale.value = withSpring(1);
      chooseButtonScale.value = withSpring(1);
      rejectButtonColor.value = '#8B8B8B';
      chooseButtonColor.value = '#FF69B4';
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 10 }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push('/settings')}
        >
          <Image 
            source={require('@/assets/icons/menu-bar.png')} 
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{t('jobList')}</Text>
        
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowFilter(true)}
        >
          <Image 
            source={require('@/components/filter.png')} 
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>



      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {availableJobs.length > 0 ? (
          <>
            {/* Background cards */}
            {availableJobs.slice(1, 4).map((job, index) => (
              <View
                key={job.id}
                style={[
                  styles.card,
                  {
                    transform: [
                      { scale: 1 - index * 0.05 },
                      { translateY: index * 10 },
                    ],
                    zIndex: 1 - index,
                  },
                ]}
              >
                <JobCard job={job} />
              </View>
            ))}
            
            {/* Top card with gesture */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.card, animatedStyle, { zIndex: 2 }]}>
                <JobCard job={availableJobs[0]} />
                
                {/* Choose Stamp - Right side */}
                <Animated.View style={[styles.chooseStamp, chooseStampStyle]}>
                  <Image 
                    source={require('@/assets/icons/Choose.png')} 
                    style={styles.stampImage}
                    resizeMode="contain"
                  />
                </Animated.View>
                
                {/* Refusal Stamp - Left side */}
                <Animated.View style={[styles.refusalStamp, refusalStampStyle]}>
                  <Image 
                    source={require('@/assets/icons/Refusal.png')} 
                    style={styles.stampImage}
                    resizeMode="contain"
                  />
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
            

          </>
        ) : (
          <View style={styles.noJobsContainer}>
            <Text style={styles.noJobsText}>{t('noMoreJobs')}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons - Footer */}
      <View style={styles.footerButtons}>
        <Animated.View style={[styles.rejectButton, { transform: [{ scale: rejectButtonScale }] }]}>
          <TouchableOpacity onPress={() => router.push('/reject')}>
            <Animated.Image 
              source={require('@/assets/icons/trash.png')} 
              style={[styles.footerIcon, { tintColor: rejectButtonColor }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.chooseButton, { transform: [{ scale: chooseButtonScale }] }]}>
          <TouchableOpacity onPress={() => router.push('/choose')}>
            <Animated.Image 
              source={require('@/assets/icons/heart_1.png')} 
              style={[styles.footerIcon, { tintColor: chooseButtonColor }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Modals */}
      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleFilterApply}
      />

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
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerButton: {
    padding: 8,
    marginTop: 4,
  },
  headerIcon: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    position: 'absolute',
    width: screenWidth - 40,
    height: 500,
    borderRadius: 16,
    backgroundColor: '#F1F0E4',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 1,
  },
  chooseStamp: {
    position: 'absolute',
    top: 50,
    left: 30, // O'ngda
    justifyContent: 'center',
    alignItems: 'center',
  },
  refusalStamp: {
    position: 'absolute',
    top: 50,
    right: 30, // Chapda
    justifyContent: 'center',
    alignItems: 'center',
  },
  stampText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  stampImage: {
    width: 180,
    height: 180,
  },
  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noJobsText: {
    fontSize: 18,
    color: '#D8A362',
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#f9efe7',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    overflow: 'hidden',
  },
  rejectButton: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: -200,
    marginBottom: -200,
    paddingRight: 50,
    paddingTop: 50,
  },
  chooseButton: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: -200,
    marginBottom: -200,
    paddingLeft: 50,
    paddingTop: 50,
  },
  footerIcon: {
    width: 28,
    height: 28,
    tintColor: '#8B8B8B',
  },



});