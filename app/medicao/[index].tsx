import Section from "@/components/ui/Section";
import { useData } from "@/contexts/DataContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as LucideIcons from 'lucide-react-native';
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";



export default function MedicaoPage() {

    type DataComponentProps = {
        title: string,
        value: any,
        icon: string
    }

    function DataComponent({ title, value, icon }: DataComponentProps) {
        const IconComponent = LucideIcons[icon as string]

        return(
            <View style={styles.group}>
                <View style={styles.titleContainer}>
                    {icon && <IconComponent size={20}/>}
                <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.field}>
                    <Text>{value}</Text>
                </View>
            </View>
        )
}
    const { data } = useData()
    const { index } = useLocalSearchParams()
    const navigation = useNavigation();

    const info = data[parseInt(index.toString())]

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Medição',
        });
    }, [navigation]);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Section title="Detalhes da medição">
                    <DataComponent title={"Data"} icon="Calendar" value={new Date(info.timestamp).toLocaleDateString('pt-BR')}/>
                    <DataComponent title={"Horário"} icon="Clock" value={new Date(info.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}/>
                    <DataComponent title={"Anotações"} icon="NotebookPen" value={info.anotacao}/>
                    <DataComponent title={"Pressão"} icon="Weight" value={info.pressao + ' Pa'}/>
                    <DataComponent title={"Inclinação"} icon="TriangleRight" value={info.inclinacao + '°'}/>
                    <DataComponent title={"Localização"} icon="MapPinned" value={'Latitude: ' + info.localizacao.coords.latitude + '\nLongitude: ' + info.localizacao.coords.latitude}/>
                </Section>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'
    },
    group: {
        gap: 6
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    field: {
        backgroundColor: 'rgb(240, 242, 245)',
        borderRadius: 12,
        padding: 12
    }
})