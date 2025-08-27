import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  Building, 
  Clipboard, 
  Package, 
  DollarSign, 
  MessageSquare, 
  Home, 
  Clock
} from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { Job } from '@/types/Job';
import TaskDetailModal from './TaskDetailModal';
import SuitcaseDetailModal from './SuitcaseDetailModal';
import ChatDetailModal from './ChatDetailModal';
import YenDetailModal from './YenDetailModal';
import HouseDetailModal from './HouseDetailModal';
import TrainDetailModal from './TrainDetailModal';
import WeekendDetailModal from './WeekendDetailModal';
import StarDetailModal from './StarDetailModal';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { t } = useLanguage();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSuitcaseModal, setShowSuitcaseModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showYenModal, setShowYenModal] = useState(false);
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [showWeekendModal, setShowWeekendModal] = useState(false);
  const [showStarModal, setShowStarModal] = useState(false);

  const renderWorkingDays = () => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    return days.map((day, index) => (
      <View
        key={day}
        style={[
          styles.dayBadge,
          job.workingDays.includes(index) && styles.dayBadgeActive,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            job.workingDays.includes(index) && styles.dayTextActive,
          ]}
        >
          {day}
        </Text>
      </View>
    ));
  };

  const renderSkillLevel = (level: string) => {
    const dots = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const currentIndex = dots.indexOf(level);
    
    return (
      <View style={styles.skillLevelContainerRight}>
        <Text style={styles.skillLevelText}>{level}</Text>
        <View style={styles.dotsContainer}>
          {dots.map((dot, index) => (
            <View
              key={dot}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Image 
            source={require('@/assets/icons/shop.png')} 
            style={{ width: 24, height: 24 }}
          />
        </View>
        <Text style={styles.jobTitle}>{job.title}</Text>
      </View>

      {/* Information Grid */}
      <View style={styles.infoGrid}>
        {/* Row 1 - Task Type */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.taskBlock}
            onPress={() => setShowTaskModal(true)}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/task.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <Text style={styles.taskText}>仕分け</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.taskBlockRight}
            onPress={() => setShowSuitcaseModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/suitcase.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Row 2 - Salary & Level */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.taskBlock}
            onPress={() => setShowYenModal(true)}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/yen-coin.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <Text style={styles.taskTextSmall}>¥{job.hourlyWage.min}~¥{job.hourlyWage.max}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.taskBlockChat}
            onPress={() => setShowChatModal(true)}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/chat.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            {renderSkillLevel(job.japaneseLevel)}
          </TouchableOpacity>
        </View>

        {/* Row 3 - Location/Commute */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.taskBlock}
            onPress={() => setShowHouseModal(true)}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/house.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <Text style={styles.taskTextSmall}>?分</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.taskBlockTrain}
            onPress={() => setShowTrainModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/train.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.stationBadge}>
                <Text style={styles.stationText}>JA 18</Text>
              </View>
              <Text style={styles.locationText}>戸田公園</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Row 4 - Schedule */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.taskBlock}
            onPress={() => setShowWeekendModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/weekend.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <View style={styles.scheduleContainer}>
              <View style={styles.daysContainer}>
                {renderWorkingDays()}
              </View>
              <View style={styles.timeContainer}>
                <Clock size={14} color="#8B4513" />
                <Text style={styles.timeText}>09:00~18:00</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Row 5 - Additional Info */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.taskBlockStar}
            onPress={() => setShowStarModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/star.png')} 
                style={{ width: 24, height: 24 }}
              />
              <Image 
                source={require('@/assets/icons/about.png')} 
                style={styles.aboutIcon}
              />
            </View>
            <Text style={styles.taskTextSmall}>評価: {job.rating}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.taskBlockLeaf}>
            <View style={styles.taskIconContainer}>
              <Image 
                source={require('@/assets/icons/leaf.png')} 
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Task Detail Modal */}
      <TaskDetailModal
        visible={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        taskName={job.title}
      />
      
      {/* Suitcase Detail Modal */}
      <SuitcaseDetailModal
        visible={showSuitcaseModal}
        onClose={() => setShowSuitcaseModal(false)}
      />
      
      {/* Chat Detail Modal */}
      <ChatDetailModal
        visible={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
      
      {/* Yen Detail Modal */}
      <YenDetailModal
        visible={showYenModal}
        onClose={() => setShowYenModal(false)}
      />
      
      {/* House Detail Modal */}
      <HouseDetailModal
        visible={showHouseModal}
        onClose={() => setShowHouseModal(false)}
      />
      
      {/* Train Detail Modal */}
      <TrainDetailModal
        visible={showTrainModal}
        onClose={() => setShowTrainModal(false)}
      />
      
      {/* Weekend Detail Modal */}
      <WeekendDetailModal
        visible={showWeekendModal}
        onClose={() => setShowWeekendModal(false)}
      />
      
      {/* Star Detail Modal */}
      <StarDetailModal
        visible={showStarModal}
        onClose={() => setShowStarModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#eceae6',
    borderRadius: 12,
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eddfd0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  infoGrid: {
    flex: 1,
    marginBottom: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    width: '100%',
    justifyContent: 'space-between',
  },
  infoBlock: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 4,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  aboutIcon: {
    position: 'absolute',
    top: -3,
    right: 0,
    width: 12,
    height: 12,
    zIndex: 1,
  },
  taskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eddfd0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  taskBlock: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: -10,
  },
  taskBlockRight: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: 120,
  },
  taskBlockChat: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: 30,
  },
  taskBlockTrain: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: 30,
  },
  taskBlockStar: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: -10,
    marginBottom: 0,
    width: '100%',
  },
  taskBlockLeaf: {
    flex: 1,
    backgroundColor: '#eceae6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginLeft: 0,
    marginBottom: 0,
    width: '100%',
  },
  taskText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  taskTextSmall: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },

  infoText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  skillLevelContainer: {
    alignItems: 'center',
  },
  skillLevelContainerRight: {
    alignItems: 'center',
    marginLeft: 20,
  },
  skillLevelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 1,
  },
  dotActive: {
    backgroundColor: '#4CAF50',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  locationContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  stationBadge: {
    backgroundColor: '#eceae6',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 2,
  },
  stationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  locationText: {
    fontSize: 12,
    color: '#333333',
  },
  scheduleContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  dayBadgeActive: {
    backgroundColor: '#FF9800',
  },
  dayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333333',
  },
  dayTextActive: {
    color: '#FFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 9,
    color: '#333333',
    fontWeight: '500',
    marginLeft: 3,
  },
});