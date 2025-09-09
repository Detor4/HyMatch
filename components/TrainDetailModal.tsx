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
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>最寄り駅</Text>
            <Text style={styles.description}>
              戸田公園駅（JR埼京線）{'\n'}
              徒歩10分で職場に到着{'\n'}
              バス停も駅前にあり便利
            </Text>
            
            <Text style={styles.sectionTitle}>電車でのアクセス</Text>
            <Text style={styles.description}>
              • JR埼京線：戸田公園駅{'\n'}
              • 池袋駅から約20分{'\n'}
              • 新宿駅から約30分{'\n'}
              • 渋谷駅から約35分{'\n'}
              • 品川駅から約45分
            </Text>
            
            <Text style={styles.sectionTitle}>バスでのアクセス</Text>
            <Text style={styles.description}>
              • 戸田公園駅前バス停{'\n'}
              • 戸田市内循環バス{'\n'}
              • バス5分 + 徒歩3分{'\n'}
              • バス料金：¥200
            </Text>
            
            <Text style={styles.sectionTitle}>自転車でのアクセス</Text>
            <Text style={styles.description}>
              • 自転車専用駐輪場完備{'\n'}
              • 戸田公園駅から約15分{'\n'}
              • 安全な自転車道あり{'\n'}
              • 雨の日は電車・バス推奨
            </Text>
            
            <Text style={styles.sectionTitle}>車でのアクセス</Text>
            <Text style={styles.description}>
              • 駐車場完備（無料）{'\n'}
              • 首都高速道路利用可{'\n'}
              • 国道17号線沿い{'\n'}
              • ナビゲーション設定可能
            </Text>
            
            <Text style={styles.sectionTitle}>アクセス時間の目安</Text>
            <Text style={styles.description}>
              • 徒歩：10分{'\n'}
              • 自転車：15分{'\n'}
              • バス：8分{'\n'}
              • 車：5分（渋滞時除く）
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
