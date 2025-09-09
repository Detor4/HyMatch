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

interface HouseDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HouseDetailModal({ visible, onClose }: HouseDetailModalProps) {
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
              <Text style={styles.taskType}>通勤時間</Text>
              <Text style={styles.title}>自宅から職場まで</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>通勤時間</Text>
            <Text style={styles.description}>
              平均通勤時間：20〜30分{'\n'}
              最長通勤時間：60分以内{'\n'}
              最短通勤時間：10分以内
            </Text>
            
            <Text style={styles.sectionTitle}>交通手段</Text>
            <Text style={styles.description}>
              • 電車（JR・私鉄）{'\n'}
              • バス{'\n'}
              • 自転車{'\n'}
              • 徒歩{'\n'}
              • 車（駐車場あり）
            </Text>
            
            <Text style={styles.sectionTitle}>交通費</Text>
            <Text style={styles.description}>
              • 月額最大¥15,000支給{'\n'}
              • 実費精算{'\n'}
              • 定期券購入支援{'\n'}
              • 自転車通勤の場合も支給
            </Text>
            
            <Text style={styles.sectionTitle}>通勤ルート</Text>
            <Text style={styles.description}>
              • 最寄り駅：戸田公園駅{'\n'}
              • 徒歩10分{'\n'}
              • バス停：戸田公園駅前{'\n'}
              • バス5分 + 徒歩3分
            </Text>
            
            <Text style={styles.sectionTitle}>通勤時の注意点</Text>
            <Text style={styles.description}>
              • ラッシュアワーの考慮{'\n'}
              • 天候による遅延の可能性{'\n'}
              • 安全な通勤ルートの選択{'\n'}
              • 緊急時の連絡方法
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
