import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

interface TrainDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TrainDetailModal({ visible, onClose }: TrainDetailModalProps) {
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
              <Text style={styles.taskType}>交通手段</Text>
              <Text style={styles.title}>職場へのアクセス</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>電車でのアクセス</Text>
            <Text style={styles.description}>
              • JR埼京線：戸田公園駅から徒歩5分{'\n'}
              • 最寄り駅：戸田公園駅（JA 18）{'\n'}
              • 乗り換え：新宿駅でJR埼京線に乗り換え{'\n'}
              • 所要時間：約30分（新宿から）
            </Text>
            
            <Text style={styles.sectionTitle}>バスでのアクセス</Text>
            <Text style={styles.description}>
              • 戸田公園駅前バス停から徒歩3分{'\n'}
              • 路線バス：戸田市循環バス{'\n'}
              • 運行時間：6:00〜23:00{'\n'}
              • 所要時間：約15分（駅から）
            </Text>
            
            <Text style={styles.sectionTitle}>自転車でのアクセス</Text>
            <Text style={styles.description}>
              • 自転車置き場：会社敷地内に完備{'\n'}
              • 所要時間：約20分（駅から）{'\n'}
              • 駐輪場：無料で利用可能{'\n'}
              • 雨の日は電車利用を推奨
            </Text>
            
            <Text style={styles.sectionTitle}>車でのアクセス</Text>
            <Text style={styles.description}>
              • 駐車場：社員用駐車場あり{'\n'}
              • 駐車料金：月額¥5,000{'\n'}
              • 所要時間：約25分（渋滞時は40分）{'\n'}
              • 首都高速道路：戸田ICから5分
            </Text>
            
            <Text style={styles.sectionTitle}>徒歩でのアクセス</Text>
            <Text style={styles.description}>
              • 戸田公園駅から徒歩5分{'\n'}
              • 平坦な道で歩きやすい{'\n'}
              • 所要時間：約5分{'\n'}
              • 天候に関係なく利用可能
            </Text>
            
            <Text style={styles.sectionTitle}>交通費について</Text>
            <Text style={styles.description}>
              • 電車：月額¥15,000〜¥25,000{'\n'}
              • バス：月額¥8,000〜¥12,000{'\n'}
              • 自転車：初期費用のみ{'\n'}
              • 車：駐車料金¥5,000/月{'\n'}
              • 交通費は会社から支給されます
            </Text>
            
            <Text style={styles.sectionTitle}>アクセス時の注意点</Text>
            <Text style={styles.description}>
              • ラッシュアワーは混雑します{'\n'}
              • 定期券の購入をお勧めします{'\n'}
              • 天候による遅延にご注意ください{'\n'}
              • 緊急時は複数の交通手段を確認{'\n'}
              • 初回は事前に経路を確認してください
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
