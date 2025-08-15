import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {text: string; onpress: () => void};

export default function GradientButton({text, onpress}: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onpress}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 280,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#764ba2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
