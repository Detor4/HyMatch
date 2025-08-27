import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

interface ChatDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChatDetailModal({ visible, onClose }: ChatDetailModalProps) {
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
              <Text style={styles.taskType}>日本語レベル</Text>
              <Text style={styles.title}>必要な日本語能力</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>この職場で働くために必要な日本語レベル</Text>
            <Text style={styles.description}>
              この職場では、基本的な日本語の理解力が必要です。商品の仕分け作業や同僚とのコミュニケーションに必要な日本語レベルについて説明します。
            </Text>
            
            <Text style={styles.sectionTitle}>必要な日本語レベル</Text>
            <Text style={styles.description}>
              • N5レベル：基本的な挨拶と簡単な指示の理解{'\n'}
              • N4レベル：日常的な会話と作業指示の理解{'\n'}
              • N3レベル：業務に関する詳細な説明の理解{'\n'}
              • N2レベル：複雑な業務指示と同僚とのコミュニケーション{'\n'}
              • N1レベル：高度な業務と管理職レベルのコミュニケーション
            </Text>
            
            <Text style={styles.sectionTitle}>学習のポイント</Text>
            <Text style={styles.description}>
              • 基本的な挨拶表現{'\n'}
              • 数字と時間の表現{'\n'}
              • 商品名と作業指示の語彙{'\n'}
              • 安全に関する指示の理解{'\n'}
              • 同僚との基本的なコミュニケーション
            </Text>
            
            <Text style={styles.sectionTitle}>推奨学習方法</Text>
            <Text style={styles.description}>
              • 日本語学習アプリの活用{'\n'}
              • 職場で使う基本的な表現の練習{'\n'}
              • 同僚との会話練習{'\n'}
              • 日本語能力試験の受験準備
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
