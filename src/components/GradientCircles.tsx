import {StyleSheet, View} from 'react-native';
import React from 'react';

export default function GradientCircles() {
  return (
    <View style={styles.background}>
      <View style={styles.gradientCircle} />
      <View style={[styles.gradientCircle, styles.bottomCircle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gradientCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(28, 56, 179, 0.05)',
    top: -100,
    left: -100,
  },
  bottomCircle: {
    top: 'auto',
    left: 'auto',
    bottom: -150,
    right: -150,
    backgroundColor: 'rgba(102, 126, 234, 0.03)',
  },
});
