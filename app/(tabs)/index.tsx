import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { MetricaDeRisco } from "@/components/ui/MetricaDeRisco";
import Section from "@/components/ui/Section";
import { useData } from "@/contexts/DataContext";
import { detectarRiscos } from "@/utils/utils";
import { useRouter } from "expo-router";
import { Calendar, Clock, RectangleEllipsis, TriangleRight, Weight } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data, removeAllData } = useData();
  const riscos = detectarRiscos(data);
  const router = useRouter();

  const dataWithIndex = data.map((item, index) => ({ item, originalIndex: index }));
  const recent = dataWithIndex.reverse().slice(0, 4);
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá!</Text>
          <Text style={styles.subGreeting}>Hoje é {hoje}</Text>
        </View>

        <View style={styles.separator} />

        <Section
          title="Medições recentes"
          hasContainer={data.length > 0}
          action={() => router.push('/(tabs)/historico')}
          actionTitle="Veja mais"
        >
          {data.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {recent.map(({ item, originalIndex }) => (
                <TouchableOpacity
                  style={styles.card}
                  key={originalIndex}
                  delayPressIn={150}
                  onPress={() => {
                    router.push({
                      pathname: '/medicao/[index]',
                      params: { index: originalIndex },
                    });
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.innerCard}>
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
                  </View>
                </TouchableOpacity>
              ))}
              {data.length > 4 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    router.push('/(tabs)/historico');
                  }}
                >
                  <RectangleEllipsis size={20} color="#4A90E2" />
                  <Text style={styles.buttonText}>Ver mais</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Nenhuma medição registrada ainda.</Text>
              <ThemedButton onPress={() => router.push('/(tabs)/cadastro')}>
                Cadastrar dados
              </ThemedButton>
            </View>
          )}
        </Section>

        <Section
          title="Visualização de riscos"
          action={() => router.push('/(tabs)/visualizacao')}
          actionTitle="Veja mais"
        >
          <View style={styles.metricsContainer}>
            <MetricaDeRisco riscos={riscos} filtro="seguro" />
            <MetricaDeRisco riscos={riscos} filtro="cuidado" />
          </View>
          <View style={[styles.metricsContainer, { marginBottom: 8 }]}>
            <MetricaDeRisco riscos={riscos} filtro="alerta" />
          </View>
        </Section>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  introText: {
    fontSize: 14,
    color: '#444',
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
    gap: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: 220,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  innerCard: {},
  cardTitle: {
    fontWeight: '600',
    marginRight: 4,
    color: '#222',
  },
  info: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgb(244, 246, 252)',
    borderColor: 'rgb(228, 230, 240)',
    flexDirection: 'row',
    gap: 8,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  noDataContainer: {
    gap: 16,
    paddingVertical: 24,
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
    marginHorizontal: 20,
  },
});
