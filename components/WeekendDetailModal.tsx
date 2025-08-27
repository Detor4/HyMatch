import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

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
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>勤務日について</Text>
            <Text style={styles.description}>
              この仕事は月曜日から金曜日までが通常の勤務日です。土曜日と日曜日は休日となります。
            </Text>
            
            <Text style={styles.sectionTitle}>勤務時間</Text>
            <Text style={styles.description}>
              • 開始時間：09:00{'\n'}
              • 終了時間：18:00{'\n'}
              • 勤務時間：8時間{'\n'}
              • 休憩時間：1時間（昼食時間）
            </Text>
            
            <Text style={styles.sectionTitle}>勤務日の詳細</Text>
            <Text style={styles.description}>
              • 月曜日（MON）：通常勤務{'\n'}
              • 火曜日（TUE）：通常勤務{'\n'}
              • 水曜日（WED）：通常勤務{'\n'}
              • 木曜日（THU）：通常勤務{'\n'}
              • 金曜日（FRI）：通常勤務{'\n'}
              • 土曜日（SAT）：休日{'\n'}
              • 日曜日（SUN）：休日
            </Text>
            
            <Text style={styles.sectionTitle}>残業について</Text>
            <Text style={styles.description}>
              • 残業時間：月20時間まで{'\n'}
              • 残業手当：時給の1.25倍{'\n'}
              • 深夜残業：22:00以降は1.5倍{'\n'}
              • 休日出勤：時給の1.35倍
            </Text>
            
            <Text style={styles.sectionTitle}>休暇制度</Text>
            <Text style={styles.description}>
              • 有給休暇：入社後6ヶ月で10日付与{'\n'}
              • 夏季休暇：3日間{'\n'}
              • 年末年始休暇：5日間{'\n'}
              • 特別休暇：結婚・出産・葬儀など
            </Text>
            
            <Text style={styles.sectionTitle}>勤務形態</Text>
            <Text style={styles.description}>
              • フルタイム勤務{'\n'}
              • 正社員としての雇用{'\n'}
              • 社会保険完備{'\n'}
              • 交通費支給{'\n'}
              • 各種手当あり
            </Text>
            
            <Text style={styles.sectionTitle}>勤務時の注意点</Text>
            <Text style={styles.description}>
              • 定時に出勤する{'\n'}
              • 勤務時間を正確に記録する{'\n'}
              • 休憩時間を適切に取る{'\n'}
              • 体調管理を心がける{'\n'}
              • 上司に事前に連絡する
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#eceae6',
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 20,
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
    flex: 1,
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
