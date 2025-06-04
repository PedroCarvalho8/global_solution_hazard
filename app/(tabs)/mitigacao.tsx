import Section from '@/components/ui/Section';
import { Activity, AlertCircle, ChevronDown, ChevronUp, ShieldCheck, Thermometer, Users } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MitigacaoScreen() {
    const acoesMitigacao = [
        {
            titulo: 'Monitoramento Contínuo da Umidade do Solo',
            descricao: 'Utilizar sensores inteligentes para medir a umidade do solo em tempo real, possibilitando a identificação precoce de condições críticas.',
            Icon: Thermometer,
        },
        {
            titulo: 'Análise da Inclinação do Terreno',
            descricao: 'Implementar sensores de inclinação para detectar alterações que possam indicar movimentos de massa iminentes.',
            Icon: Activity,
        },
        {
            titulo: 'Sistema de Alertas Automatizados',
            descricao: 'Desenvolver um sistema que envie notificações para a população e equipes de emergência quando os níveis de risco ultrapassarem limites seguros.',
            Icon: AlertCircle,
        },
        {
            titulo: 'Manutenção Preventiva da Infraestrutura',
            descricao: 'Realizar inspeções regulares em áreas vulneráveis para garantir a estabilidade do terreno e corrigir possíveis fragilidades.',
            Icon: ShieldCheck,
        },
        {
            titulo: 'Capacitação da Comunidade Local',
            descricao: 'Promover treinamentos e campanhas educativas para informar os moradores sobre os riscos e procedimentos a serem adotados em caso de alerta.',
            Icon: Users,
        }
    ];

    // Estado para controlar quais índices estão abertos
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndices(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <Section title="Ações de mitigação">
                
                {acoesMitigacao.map(({ titulo, descricao, Icon }, index) => {
                    const isExpanded = expandedIndices.includes(index);
                    return (
                    <View key={index} style={styles.acaoContainer}>
                        <TouchableOpacity onPress={() => toggleExpand(index)} activeOpacity={0.7} style={styles.titleContainer}>
                        <View style={styles.titleLeft}>
                            <Icon size={24} color="#4A90E2" style={styles.icon} />
                            <Text style={styles.acaoTitulo}>{titulo}</Text>
                        </View>
                        {isExpanded ? (
                            <ChevronUp size={24} color="#4A90E2" />
                        ) : (
                            <ChevronDown size={24} color="#4A90E2" />
                        )}
                        </TouchableOpacity>
                        {isExpanded && (
                        <View style={styles.bulletPointContainer}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.acaoDescricao}>{descricao}</Text>
                        </View>
                        )}
                    </View>
                    );
                })}
                
            </Section>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContent: {
        gap: 20,
        paddingBottom: 100
    },
    acaoContainer: {
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(226, 226, 233)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexShrink: 1,
    },
    icon: {
        flexShrink: 0,
    },
    acaoTitulo: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        flexShrink: 1,
    },
    bulletPointContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4A90E2',
        marginTop: 6,
    },
    acaoDescricao: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    }
});
