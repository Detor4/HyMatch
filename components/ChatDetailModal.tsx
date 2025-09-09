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
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>必要な日本語レベル</Text>
            <Text style={styles.description}>
              N4〜N3レベル{'\n'}
              基本的な日常会話ができる方{'\n'}
              簡単な指示を理解できる方
            </Text>
            
            <Text style={styles.sectionTitle}>業務で使用する日本語</Text>
            <Text style={styles.description}>
              • 挨拶・基本的な会話{'\n'}
              • 作業指示の理解{'\n'}
              • 簡単な報告・連絡{'\n'}
              • 安全に関する指示
            </Text>
            
            <Text style={styles.sectionTitle}>日本語学習サポート</Text>
            <Text style={styles.description}>
              • 職場での日本語練習機会{'\n'}
              • 日本語教材の提供{'\n'}
              • 定期的な日本語レッスン{'\n'}
              • 日本語能力試験受験支援
            </Text>
            
            <Text style={styles.sectionTitle}>コミュニケーション方法</Text>
            <Text style={styles.description}>
              • 日本語 + 簡単な英語{'\n'}
              • 身振り手振りでの説明{'\n'}
              • 図や写真での説明{'\n'}
              • 翻訳アプリの使用可
            </Text>
            
            <Text style={styles.sectionTitle}>日本語レベル向上のメリット</Text>
            <Text style={styles.description}>
              • 時給アップの可能性{'\n'}
              • より高度な業務への配属{'\n'}
              • 管理職への昇進機会{'\n'}
              • 日本での生活がより快適に
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
