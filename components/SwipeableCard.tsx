import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  interpolate,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import JobCard from './JobCard';
import { Job } from '@/types/Job';

interface SwipeableCardProps {
  job: Job;
  onAccept: (job: Job) => void;
  onReject: (job: Job) => void;
  index: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

export default function SwipeableCard({ job, onAccept, onReject, index }: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      'worklet';
    },
    onActive: (event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = interpolate(event.translationX, [-screenWidth, screenWidth], [-30, 30]);
    },
    onEnd: (event) => {
      'worklet';
      const shouldAccept = event.translationX > SWIPE_THRESHOLD;
      const shouldReject = event.translationX < -SWIPE_THRESHOLD;

      if (shouldAccept) {
        translateX.value = withTiming(screenWidth * 1.5);
        translateY.value = withTiming(event.translationY);
        rotate.value = withTiming(30);
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(onAccept)(job);
      } else if (shouldReject) {
        translateX.value = withTiming(-screenWidth * 1.5);
        translateY.value = withTiming(event.translationY);
        rotate.value = withTiming(-30);
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(onReject)(job);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: 1 - index * 0.05 },
      ],
      opacity: opacity.value,
      zIndex: 10 - index,
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    const acceptOpacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      'clamp'
    );
    const rejectOpacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      'clamp'
    );

    return {
      opacity: Math.max(acceptOpacity, rejectOpacity),
    };
  });

  const acceptOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, SWIPE_THRESHOLD],
        [0, 1],
        'clamp'
      ),
    };
  });

  const rejectOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, 0],
        [1, 0],
        'clamp'
      ),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <JobCard job={job} />
        
        {/* Accept Overlay */}
        <Animated.View style={[styles.overlay, styles.acceptOverlay, acceptOverlayStyle]}>
          <View style={styles.overlayContent}>
            <Image 
              source={require('@/assets/icons/Choose.png')} 
              style={[styles.overlayImage, { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
            <Text style={styles.overlayText}>CHOOSE</Text>
          </View>
        </Animated.View>

        {/* Reject Overlay */}
        <Animated.View style={[styles.overlay, styles.rejectOverlay, rejectOverlayStyle]}>
          <View style={styles.overlayContent}>
            <Image 
              source={require('@/assets/icons/Refusal.png')} 
              style={[styles.overlayImage, { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
            <Text style={styles.overlayText}>REFUSE</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptOverlay: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
  },
  rejectOverlay: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  overlayContent: {
    alignItems: 'center',
  },
  overlayImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
    tintColor: '#FFFFFF',
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 2,
  },
});