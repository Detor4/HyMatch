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

interface YenDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function YenDetailModal({ visible, onClose }: YenDetailModalProps) {
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
              <Text style={styles.taskType}>給与情報</Text>
              <Text style={styles.title}>時給・給与体系</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>基本給与</Text>
            <Text style={styles.description}>
              時給：¥1,000〜¥1,500{'\n'}
              経験・スキルに応じて決定{'\n'}
              昇給制度あり
            </Text>
            
            <Text style={styles.sectionTitle}>手当・福利厚生</Text>
            <Text style={styles.description}>
              • 交通費支給（月額最大¥15,000）{'\n'}
              • 残業手当（時給の1.25倍）{'\n'}
              • 夜勤手当（時給の1.3倍）{'\n'}
              • 食事手当（勤務時間8時間以上）
            </Text>
            
            <Text style={styles.sectionTitle}>支給日</Text>
            <Text style={styles.description}>
              毎月25日（前月分）{'\n'}
              銀行振込
            </Text>
            
            <Text style={styles.sectionTitle}>昇給・ボーナス</Text>
            <Text style={styles.description}>
              • 半年ごとの昇給査定{'\n'}
              • 年2回のボーナス（6月・12月）{'\n'}
              • 勤続年数に応じた加算
            </Text>
            
            <Text style={styles.sectionTitle}>社会保険</Text>
            <Text style={styles.description}>
              健康保険・厚生年金加入{'\n'}
              労災保険適用{'\n'}
              雇用保険加入
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
