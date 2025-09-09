import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

const { height: screenHeight } = Dimensions.get('window');

interface WeekendDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function WeekendDetailModal({ visible, onClose }: WeekendDetailModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.taskType}>勤務日</Text>
              <Text style={styles.title}>仕事のスケジュール</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>勤務スケジュール</Text>
            <Text style={styles.description}>
              月曜日〜金曜日：9:00〜18:00{'\n'}
              土曜日：9:00〜17:00（隔週）{'\n'}
              日曜日：休み{'\n'}
              祝日：休み
            </Text>
            
            <Text style={styles.sectionTitle}>勤務時間</Text>
            <Text style={styles.description}>
              • 基本勤務時間：8時間/日{'\n'}
              • 休憩時間：1時間（12:00〜13:00）{'\n'}
              • 残業：必要に応じて{'\n'}
              • フレックスタイム制度あり
            </Text>
            
            <Text style={styles.sectionTitle}>休日・休暇</Text>
            <Text style={styles.description}>
              • 週休2日制（土日）{'\n'}
              • 祝日休み{'\n'}
              • 有給休暇：年10日付与{'\n'}
              • 夏季休暇：3日間{'\n'}
              • 年末年始休暇：5日間
            </Text>
            
            <Text style={styles.sectionTitle}>シフト制</Text>
            <Text style={styles.description}>
              • 早番：7:00〜16:00{'\n'}
              • 遅番：10:00〜19:00{'\n'}
              • 夜勤：22:00〜7:00（夜勤手当あり）{'\n'}
              • シフトは月1回希望調査
            </Text>
            
            <Text style={styles.sectionTitle}>勤務の特徴</Text>
            <Text style={styles.description}>
              • フレックスタイム制度{'\n'}
              • 残業手当支給{'\n'}
              • 休日出勤手当{'\n'}
              • 勤務時間の調整可能
            </Text>
            
            <Text style={styles.sectionTitle}>勤務時の注意点</Text>
            <Text style={styles.description}>
              • 定時出勤の徹底{'\n'}
              • 休憩時間の遵守{'\n'}
              • 残業申請の事前提出{'\n'}
              • 体調管理の重要性
            </Text>
          </ScrollView>
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
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: screenHeight * 0.8,
    backgroundColor: '#eceae6',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D8A362',
  },
  titleContainer: {
    flex: 1,
  },
  taskType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D8A362',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eddfd0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D8A362',
    marginTop: 15,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 15,
  },
});
