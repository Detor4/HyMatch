import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';

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
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>通勤時間について</Text>
            <Text style={styles.description}>
              プロフィールで設定したご自身の自宅もしくは日本語学校から仕事先までの通勤時間の目安です。
            </Text>
            
            <Text style={styles.sectionTitle}>通勤時間の計算方法</Text>
            <Text style={styles.description}>
              • 自宅住所から最寄り駅までの徒歩時間{'\n'}
              • 電車での移動時間{'\n'}
              • 職場最寄り駅から職場までの徒歩時間{'\n'}
              • 乗り換え時間を含む{'\n'}
              • 待ち時間と遅延の考慮
            </Text>
            
            <Text style={styles.sectionTitle}>通勤オプション</Text>
            <Text style={styles.description}>
              また右側のアイコンは仕事先での通勤時オプションです。{'\n'}
              • 電車での通勤：最も一般的で効率的{'\n'}
              • バスでの通勤：電車のない地域で便利{'\n'}
              • 自転車での通勤：健康に良く、費用が安い{'\n'}
              • 徒歩での通勤：短距離の場合に最適{'\n'}
              • 車での通勤：駐車場がある場合
            </Text>
            
            <Text style={styles.sectionTitle}>通勤時間の目安</Text>
            <Text style={styles.description}>
              • 30分以内：理想的で疲労が少ない{'\n'}
              • 30〜60分：一般的で多くの人が利用{'\n'}
              • 60分以上：長距離通勤、早起きが必要{'\n'}
              • 90分以上：遠距離通勤、体力的に大変{'\n'}
              • 120分以上：極端に長い通勤時間
            </Text>
            
            <Text style={styles.sectionTitle}>通勤時の注意点</Text>
            <Text style={styles.description}>
              • ラッシュアワーを避ける（7:30-9:00、17:30-19:00）{'\n'}
              • 定期券の購入を検討（割引料金）{'\n'}
              • 通勤経路の確認と複数ルートの把握{'\n'}
              • 天候による遅延の考慮{'\n'}
              • 緊急時の代替交通手段の確認{'\n'}
              • 通勤時間中の学習や読書の活用
            </Text>
            
            <Text style={styles.sectionTitle}>通勤費用について</Text>
            <Text style={styles.description}>
              • 電車：月額¥10,000〜¥30,000{'\n'}
              • バス：月額¥5,000〜¥15,000{'\n'}
              • 自転車：初期費用のみ{'\n'}
              • 徒歩：費用なし{'\n'}
              • 交通費は会社から支給される場合があります
            </Text>
            
            <Text style={styles.sectionTitle}>通勤時間の活用</Text>
            <Text style={styles.description}>
              • 日本語の学習時間として活用{'\n'}
              • 仕事の準備や計画を立てる{'\n'}
              • 読書や音楽鑑賞でリラックス{'\n'}
              • 同僚とのコミュニケーション{'\n'}
              • 健康管理のための運動時間
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
