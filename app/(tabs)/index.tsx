import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge';
import { useData } from '@/contexts/DataContext';
import { Accelerometer } from 'expo-sensors';
import { CircleSlash2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function YAxisIndicator() {
  // Value original: de -45 a +45
  const animatedAngle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(({ y }) => {
      // mapeia y de [-1, +1] para [-45, +45]
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

  // Agora interpolamos [-45, +45] → ['0deg', '90deg']
  // Isso faz y = -1 → 0°, y = 0 → 45°, y = +1 → 90°
  const rotation = animatedAngle.interpolate({
    inputRange: [-45, 45],
    outputRange: ['-90deg', '90deg'],
  });

  return (
    <Animated.View style={[styles.iconWrapper, { transform: [{rotate: '45deg'},{ rotate: rotation }] }]}>
      <CircleSlash2 size={32} color="#333" />
    </Animated.View>
  );
}

function AccelerometerExample() {
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
    <View style={{}}>
      <Text style={styles.title}>Leitura do Acelerômetro</Text>
      <Text>Inclinação: {(y*90).toFixed(2)}°</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { data } = useData();

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.title}>Métricas Recentes</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {
            data.map((item, index) => {
              return(
                <View style={styles.card} key={index}>
                  <Badge label='Problema' variant={item.tipo}/>
                  <Text style={styles.cardTitle}>Início</Text>
                  <Text>{item.label}</Text>
                </View>
              )
            })
          }
          
        </ScrollView>
        <AccelerometerExample />
        <YAxisIndicator />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 12,
  },
  scrollView: {
    marginHorizontal: -20,
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    width: 200,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 5.62,
    elevation: 7,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});
