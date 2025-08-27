import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';

interface TaskDetailModalProps {
  visible: boolean;
  onClose: () => void;
  taskName: string;
}

export default function TaskDetailModal({ visible, onClose, taskName }: TaskDetailModalProps) {
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
              <Text style={styles.taskType}>仕分け</Text>
              <Text style={styles.title}>{taskName}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>作業内容</Text>
            <Text style={styles.description}>
              商品の仕分け作業を行います。入荷した商品を種類別に分類し、適切な場所に配置する作業です。
            </Text>
            
            <Text style={styles.sectionTitle}>必要なスキル</Text>
            <Text style={styles.description}>
              • 基本的な日本語理解力{'\n'}
              • 商品知識{'\n'}
              • 整理整頓能力{'\n'}
              • 体力（立ち仕事）
            </Text>
            
            <Text style={styles.sectionTitle}>作業時間</Text>
            <Text style={styles.description}>
              09:00〜18:00（休憩時間含む）{'\n'}
              週5日勤務
            </Text>
            
            <Text style={styles.sectionTitle}>給与</Text>
            <Text style={styles.description}>
              時給：¥1,200〜¥1,500{'\n'}
              交通費支給あり
            </Text>
            
            <Text style={styles.sectionTitle}>勤務地</Text>
            <Text style={styles.description}>
              戸田公園駅から徒歩10分{'\n'}
              清潔で安全な作業環境
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
