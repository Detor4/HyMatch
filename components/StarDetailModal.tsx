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

interface StarDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function StarDetailModal({ visible, onClose }: StarDetailModalProps) {
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
              <Text style={styles.taskType}>職場の福利厚生</Text>
              <Text style={styles.title}>働きやすい環境</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>職場環境</Text>
            <Text style={styles.description}>
              清潔で安全な作業環境{'\n'}
              空調完備・照明良好{'\n'}
              休憩スペース完備{'\n'}
              更衣室・シャワー室あり
            </Text>
            
            <Text style={styles.sectionTitle}>福利厚生</Text>
            <Text style={styles.description}>
              • 社会保険完備（健康保険・厚生年金）{'\n'}
              • 雇用保険加入{'\n'}
              • 労災保険適用{'\n'}
              • 交通費支給（月額最大¥15,000）
            </Text>
            
            <Text style={styles.sectionTitle}>手当・給与</Text>
            <Text style={styles.description}>
              • 残業手当（時給の1.25倍）{'\n'}
              • 夜勤手当（時給の1.3倍）{'\n'}
              • 休日出勤手当（時給の1.35倍）{'\n'}
              • 食事手当（勤務時間8時間以上）
            </Text>
            
            <Text style={styles.sectionTitle}>休暇制度</Text>
            <Text style={styles.description}>
              • 有給休暇：年10日付与{'\n'}
              • 夏季休暇：3日間{'\n'}
              • 年末年始休暇：5日間{'\n'}
              • 特別休暇（結婚・出産・葬儀）
            </Text>
            
            <Text style={styles.sectionTitle}>教育・研修</Text>
            <Text style={styles.description}>
              • 新入社員研修{'\n'}
              • 安全衛生教育{'\n'}
              • 日本語学習支援{'\n'}
              • スキルアップ研修
            </Text>
            
            <Text style={styles.sectionTitle}>その他のサービス</Text>
            <Text style={styles.description}>
              • 制服貸与{'\n'}
              • 作業靴支給{'\n'}
              • 安全具支給{'\n'}
              • 社員寮制度（希望者のみ）
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
