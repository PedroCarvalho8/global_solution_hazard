import Section from '@/components/ui/Section';
import { useData } from '@/contexts/DataContext';
import { detectarRiscos } from '@/utils/utils';
import { AlertTriangle, CalendarClock, ChevronDown, ChevronUp, MapPin, ShieldCheck, Siren } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VisualizacaoScreen() {
    const { data } = useData();
    const riscos = detectarRiscos(data);

    const totalGrupos = riscos.length;
    const totalPontos = data.length;

    const countsByRisco: Record<string, number> = riscos.reduce((acc, item) => {
        acc[item.risco] = (acc[item.risco] || 0) + item.grupo.length;
        return acc;
    }, {} as Record<string, number>);

    const getIcon = (risco: string) => {
        switch (risco) {
            case 'alerta':
                return <Siren size={16} color="#FF2E5B" style={styles.icon} />;
            case 'cuidado':
                return <AlertTriangle size={16} color="#FACC15" style={styles.icon} />;
            case 'seguro':
                return <ShieldCheck size={16} color="#6FACDD" style={styles.icon} />;
            default:
                return null;
        }
    };

    const calcularLocalizacaoMedia = (grupo: any[]) => {
        const total = grupo.length;
        const somaLat = grupo.reduce((acc, item) => acc + (item.localizacao?.coords.latitude || 0), 0);
        const somaLong = grupo.reduce((acc, item) => acc + (item.localizacao?.coords.longitude || 0), 0);
        const mediaLat = somaLat / total;
        const mediaLong = somaLong / total;
        return {
            latitude: mediaLat.toFixed(5),
            longitude: mediaLong.toFixed(5)
        };
    };

    // Estado para controlar itens expandidos - armazena índices dos riscos expandidos
    const [expandidoIds, setExpandidoIds] = useState<Record<number, boolean>>({});

    const toggleExpandido = (index: number) => {
        setExpandidoIds((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Section title="Métricas Gerais">
                    <View style={styles.metricsContainer}>
                        <View style={styles.metricsRow}>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Total de grupos</Text>
                                <Text style={styles.metricNumber}>{totalGrupos}</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricLabel}>Total de pontos</Text>
                                <Text style={styles.metricNumber}>{totalPontos}</Text>
                            </View>
                        </View>

                        <View style={styles.metricsRow}>
                            <View style={styles.metricItem}>
                                <View style={styles.iconLabelRow}>
                                    <Siren size={16} color="#FF2E5B" />
                                    <Text style={styles.metricLabel}>Alerta</Text>
                                </View>
                                <Text style={styles.metricNumber}>{countsByRisco['alerta'] || 0}</Text>
                            </View>

                            <View style={styles.metricItem}>
                                <View style={styles.iconLabelRow}>
                                    <AlertTriangle size={16} color="#FACC15" />
                                    <Text style={styles.metricLabel}>Cuidado</Text>
                                </View>
                                <Text style={styles.metricNumber}>{countsByRisco['cuidado'] || 0}</Text>
                            </View>

                            <View style={styles.metricItem}>
                                <View style={styles.iconLabelRow}>
                                    <ShieldCheck size={16} color="#6FACDD" />
                                    <Text style={styles.metricLabel}>Seguro</Text>
                                </View>
                                <Text style={styles.metricNumber}>{countsByRisco['seguro'] || 0}</Text>
                            </View>
                        </View>
                    </View>
                </Section>

                <Section title="Análise de Riscos">
                    {riscos.length === 0 ? (
                        <Text style={styles.noDataText}>
                            Nenhum dado disponível para análise.
                        </Text>
                    ) : (
                        riscos.map((item, index) => {
                            const exemplo = item.grupo[0];
                            const dataFormatada = new Date(exemplo.timestamp).toLocaleString('pt-BR');
                            const localizacaoMedia = calcularLocalizacaoMedia(item.grupo);
                            const expandido = !!expandidoIds[index];

                            return (
                                <View key={index} style={styles.riscoContainer}>
                                    <TouchableOpacity onPress={() => toggleExpandido(index)}>
                                        <View style={styles.riscoHeader}>
                                            <View style={styles.titleContainer}>
                                                {getIcon(item.risco)}
                                                <Text style={styles.riscoTipo}>
                                                    <Text style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                                                        {item.risco}
                                                    </Text>
                                                </Text>
                                            </View>

                                            {expandido ? (
                                                <ChevronUp size={16} color="#000" style={styles.expandIcon} />
                                            ) : (
                                                <ChevronDown size={16} color="#000" style={styles.expandIcon} />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    {expandido && (
                                        <>
                                            <Text style={styles.justificativa}>{item.justificativa}</Text>
                                            <View style={styles.timestamp}>
                                                <CalendarClock size={16} color="#78787E" />
                                                <Text style={styles.timestampText}>{dataFormatada}</Text>
                                            </View>
                                            <View style={styles.locationInfo}>
                                                <MapPin size={16} color="#78787E" />
                                                <Text style={styles.timestampText}>
                                                    {localizacaoMedia.latitude}, {localizacaoMedia.longitude}
                                                </Text>
                                            </View>
                                        </>
                                    )}
                                </View>
                            );
                        })
                    )}
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'
    },
    mainContainer: {
        flex: 1
    },
    metricsContainer: {
        gap: 12,
        flex: 1
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        gap: 12
    },
    metricItem: {
        flex: 1,
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(226, 226, 233)',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 90,
    },
    metricLabel: {
        color: 'rgb(133, 139, 141)',
        fontSize: 14,
        textAlign: 'center'
    },
    metricNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center'
    },
    iconLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
    },
    riscoContainer: {
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(226, 226, 233)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        gap: 6
    },
    riscoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between'
    },
    riscoTipo: {
        fontSize: 16,
        color: '#000'
    },
    justificativa: {
        fontSize: 14,
        color: '#333',
        marginTop: 8
    },
    timestamp: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4
    },
    timestampText: {
        fontSize: 12,
        color: '#78787E'
    },
    icon: {

    },
    expandIcon: {

    },
    noDataText: {
        color: '#78787E',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 14
    }
});
