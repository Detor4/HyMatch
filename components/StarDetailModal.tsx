import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

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
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>福利厚生について</Text>
            <Text style={styles.description}>
              この職場では従業員の働きやすさを重視し、様々な福利厚生制度を提供しています。
            </Text>
            
            <Text style={styles.sectionTitle}>給与・手当</Text>
            <Text style={styles.description}>
              • 基本給：経験・能力に応じて決定{'\n'}
              • 残業手当：時給の1.25倍{'\n'}
              • 深夜手当：22:00以降は1.5倍{'\n'}
              • 休日出勤手当：時給の1.35倍{'\n'}
              • 通勤手当：月額最大¥30,000まで
            </Text>
            
            <Text style={styles.sectionTitle}>社会保険・年金</Text>
            <Text style={styles.description}>
              • 健康保険：会社負担50%{'\n'}
              • 厚生年金：会社負担50%{'\n'}
              • 雇用保険：完全加入{'\n'}
              • 労災保険：業務中の事故をカバー{'\n'}
              • 介護保険：40歳以上対象
            </Text>
            
            <Text style={styles.sectionTitle}>休暇制度</Text>
            <Text style={styles.description}>
              • 有給休暇：入社後6ヶ月で10日付与{'\n'}
              • 夏季休暇：3日間{'\n'}
              • 年末年始休暇：5日間{'\n'}
              • 特別休暇：結婚・出産・葬儀など{'\n'}
              • リフレッシュ休暇：3年勤続で5日間
            </Text>
            
            <Text style={styles.sectionTitle}>職場環境</Text>
              <Text style={styles.description}>
              • 冷暖房完備の快適なオフィス{'\n'}
              • 清潔な休憩室と食堂{'\n'}
              • 無料のコーヒー・お茶サービス{'\n'}
              • 駐車場・駐輪場完備{'\n'}
              • シャワー室・更衣室あり
            </Text>
            
            <Text style={styles.sectionTitle}>教育・研修</Text>
            <Text style={styles.description}>
              • 新入社員研修：1ヶ月間{'\n'}
              • スキルアップ研修：年2回{'\n'}
              • 語学研修：英語・中国語コース{'\n'}
              • 資格取得支援：費用の50%負担{'\n'}
              • オンライン学習プラットフォーム利用可能
            </Text>
            
            <Text style={styles.sectionTitle}>健康管理</Text>
            <Text style={styles.description}>
              • 健康診断：年1回無料{'\n'}
              • ストレスチェック：年1回実施{'\n'}
              • 産業保健スタッフ常駐{'\n'}
              • メンタルヘルス相談窓口{'\n'}
              • スポーツジム利用料金割引
            </Text>
            
            <Text style={styles.sectionTitle}>その他の特典</Text>
            <Text style={styles.description}>
              • 社員食堂：割引価格で利用{'\n'}
              • 社員寮：家賃補助あり{'\n'}
              • 社員旅行：年1回実施{'\n'}
              • 忘年会・新年会：会社負担{'\n'}
              • 各種割引サービス利用可能
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
