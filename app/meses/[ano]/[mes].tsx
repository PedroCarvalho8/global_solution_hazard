import Section from "@/components/ui/Section";
import { useData } from "@/contexts/DataContext";
import { filtrarPorAnoMes, getNomeMes } from '@/utils/utils';
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Calendar, Clock, TriangleRight, Weight } from "lucide-react-native";
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AnoScreen() {
  const { data } = useData();
  const { ano, mes } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const dataFiltrada = filtrarPorAnoMes(data, parseInt(mes.toString()), parseInt(ano.toString()));

  const dataFiltradaComIndex = dataFiltrada.map(item => ({
    item,
    originalIndex: data.findIndex(d => d === item)
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${getNomeMes(mes.toString())} de ${ano}`,
    });
  }, [navigation, ano]);

  return (
    <View style={{ flex: 1 }}>
      <Section hasContainer hideTitle title={`${getNomeMes(mes.toString())} de ${ano}`}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {dataFiltradaComIndex.length > 0 ? (
            dataFiltradaComIndex.map(({ item, originalIndex }) => (
              <TouchableOpacity
                key={originalIndex}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/medicao/[index]',
                    params: { index: originalIndex },
                  })
                }
              >
                <View style={styles.info}>
                  <Weight size={16} color="#4A90E2" />
                  <Text style={styles.cardTitle}>Pressão:</Text>
                  <Text>{item.pressao} Pa</Text>
                </View>
                <View style={styles.info}>
                  <TriangleRight size={16} color="#4A90E2" />
                  <Text style={styles.cardTitle}>Inclinação:</Text>
                  <Text>{item.inclinacao}°</Text>
                </View>
                <View style={styles.info}>
                  <Calendar size={16} color="#4A90E2" />
                  <Text style={styles.cardTitle}>Data:</Text>
                  <Text>{new Date(item.timestamp).toLocaleDateString('pt-BR')}</Text>
                </View>
                <View style={styles.info}>
                  <Clock size={16} color="#4A90E2" />
                  <Text style={styles.cardTitle}>Horário:</Text>
                  <Text>{new Date(item.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>Nenhum dado encontrado para esse mês.</Text>
          )}
        </ScrollView>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 16,
    paddingBottom: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  info: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#222',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
