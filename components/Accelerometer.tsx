import { Accelerometer } from 'expo-sensors';
import { CircleSlash2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export function YAxisIndicator() {
  const animatedAngle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(({ y }) => {
      const targetDeg = y * 45;
      Animated.timing(animatedAngle, {
        toValue: targetDeg,
        duration: 90,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
    return () => sub.remove();
  }, []);

  const rotation = animatedAngle.interpolate({
    inputRange: [-45, 45],
    outputRange: ['-90deg', '90deg'],
  });

  return (
    <View style={styles.mainContainer}>
        <Animated.View style={[styles.iconWrapper, { transform: [{rotate: '45deg'},{ rotate: rotation }] }]}>
          <CircleSlash2 size={80} color="#333" />
        </Animated.View>
        <AccelerometerExample />
    </View>
    
  );
}

export function AccelerometerExample() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [interval, setInterval] = useState(1000); // em ms

  useEffect(() => {
    Accelerometer.setUpdateInterval(interval);

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => subscription.remove();
  }, [interval]);

  const { x, y, z } = data;

  return (
    <Text>
        {(y*90).toFixed(2)}°
    </Text>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
