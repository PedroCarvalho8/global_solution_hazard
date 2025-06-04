import Section from "@/components/ui/Section";
import { useData } from "@/contexts/DataContext";
import { filtrarPorAnoMes, getCalendario, getNomeMes } from '@/utils/utils';
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AnoScreen() {
    const { data } = useData();
    const { ano } = useLocalSearchParams()
    const router = useRouter()

    const calendario = getCalendario(data)
    const mesesDoAno = Object.keys(calendario[ano as string]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${ano}`,
        });
    }, [navigation, ano]);

    return (
        <View>
            <Section hideTitle title={ano.toString()}>
                {
                    mesesDoAno.map((item: string, index) => {
                        return(
                            <TouchableOpacity style={styles.button} key={index} onPress={() => {
                                router.push({
                                pathname: '/meses/[ano]/[mes]',
                                params: { ano: ano.toString(), mes: item },
                                });
                            }}>
                                <Text style={styles.buttonText}>{getNomeMes(item)} de {ano}</Text>
                                <Text style={styles.secondaryText}>
                                    {filtrarPorAnoMes(data, parseInt(item), parseInt(ano.toString())).length}  
                                    {' '}{filtrarPorAnoMes(data, parseInt(item), parseInt(ano.toString())).length == 1 ? 'registro': 'registros'}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(226, 226, 233)',

        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 5.62,
        elevation: 7,
    },
    buttonText: {
        fontSize: 16
    },
    secondaryText: {
        color: 'rgb(133, 139, 141)',
        fontSize: 12,
    }
})