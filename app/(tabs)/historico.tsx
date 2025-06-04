import { ThemedButton } from '@/components/ThemedButton';
import Section from '@/components/ui/Section';
import { useData } from '@/contexts/DataContext';
import { filtrarPorAno, getCalendario } from '@/utils/utils';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HistoricoScreen() {
    const { data } = useData();
    const router = useRouter();

    const calendarioFinal = getCalendario(data)
    const anos = Object.keys(calendarioFinal)

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Section title='Histórico'>
                {
                    anos.length ? (
                        anos.map((item, index) => {
                        return(
                            <TouchableOpacity style={styles.button} key={index} onPress={() => {
                                router.push({
                                pathname: '/anos/[ano]',
                                params: { ano: item },
                                });
                            }}>
                                <Text style={styles.buttonText}>{item}</Text>
                                <Text style={styles.secondaryText}>{filtrarPorAno(data, parseInt(item)).length} {filtrarPorAno(data, parseInt(item)).length == 1 ? 'registro': 'registros'}</Text>
                            </TouchableOpacity>
                            )
                        })
                    ) : (
                        <View style={styles.semConteudoContainer}>
                            <Text style={styles.noDataText}>Não há dados cadastrados...</Text>
                            <ThemedButton onPress={() => {router.push('/(tabs)/cadastro')}}>Cadastrar dados</ThemedButton>
                        </View>
                    )
                    
                }
            </Section>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    semConteudoContainer: {
        gap: 12
    },
    noDataText: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(228, 230, 240)',

        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 5.62,
        elevation: 7,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500'
    },
    secondaryText: {
        color: 'rgb(133, 139, 141)',
        fontSize: 12,
    }
})