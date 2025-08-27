import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

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
              <Text style={styles.title}>会社が提供する月給</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#333333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>この会社が提供する給与体系</Text>
            <Text style={styles.description}>
              この会社では、経験とスキルに応じて適切な給与を提供しています。時給制で働きやすく、昇給の機会もあります。
            </Text>
            
            <Text style={styles.sectionTitle}>基本給与</Text>
            <Text style={styles.description}>
              • 時給：¥1,200〜¥1,500{'\n'}
              • 月給換算：約¥200,000〜¥250,000{'\n'}
              • 勤務時間：週40時間（月160時間）{'\n'}
              • 残業手当：時給の1.25倍
            </Text>
            
            <Text style={styles.sectionTitle}>手当・福利厚生</Text>
            <Text style={styles.description}>
              • 交通費：月額最大¥15,000{'\n'}
              • 通勤手当：実費支給{'\n'}
              • 社会保険：完備{'\n'}
              • 有給休暇：年10日付与{'\n'}
              • ボーナス：年2回（夏・冬）
            </Text>
            
            <Text style={styles.sectionTitle}>昇給制度</Text>
            <Text style={styles.description}>
              • 半年ごとの評価による昇給{'\n'}
              • スキルアップによる時給アップ{'\n'}
              • 管理職への昇進機会{'\n'}
              • 日本語能力向上による加算
            </Text>
            
            <Text style={styles.sectionTitle}>給与計算例</Text>
            <Text style={styles.description}>
              時給¥1,300の場合：{'\n'}
              • 月160時間 × ¥1,300 = ¥208,000{'\n'}
              • 交通費 ¥10,000{'\n'}
              • 合計月収：約¥218,000
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
