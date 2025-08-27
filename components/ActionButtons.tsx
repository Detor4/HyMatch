import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { X, Check, RotateCcw } from 'lucide-react-native';

interface ActionButtonsProps {
  onReject: () => void;
  onAccept: () => void;
  onUndo?: () => void;
  disabled?: boolean;
}

export default function ActionButtons({ onReject, onAccept, onUndo, disabled }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.rejectButton, disabled && styles.disabled]}
        onPress={onReject}
        disabled={disabled}
      >
        <X size={28} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>

      {onUndo && (
        <TouchableOpacity style={[styles.button, styles.undoButton]} onPress={onUndo}>
          <RotateCcw size={24} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.acceptButton, disabled && styles.disabled]}
        onPress={onAccept}
        disabled={disabled}
      >
        <Check size={28} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  acceptButton: {
    backgroundColor: '#22C55E',
  },
  undoButton: {
    backgroundColor: '#FFFFFF',
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  disabled: {
    opacity: 0.5,
  },
});