import { YAxisIndicator } from '@/components/Accelerometer';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import Section from '@/components/ui/Section';
import { useData } from '@/contexts/DataContext';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type messageType = {
    message: string,
    type: 'success' | 'error'
}


export default function CadastroScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [msg, setMsg] = useState<messageType>({ message: '', type: 'success' });
    const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
    const { data, addData } = useData();

    const [anotacoes, setAnotacoes] = useState<string>('');
    const [pressao, setPressao] = useState('');
    const [inclinacao, setInclinacao] = useState<number>();

    useEffect(() => {
        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setMsg({
                message: 'Permission to access location was denied',
                type: 'error'
            });
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
        if (location) {
            setLoadingLocation(false)
        }
        getCurrentLocation();
      }, [location]);
      

    const handlePressaoChange = (valor: string) => {
        let cleaned = valor.replace(',', '.')
        cleaned = cleaned.replace(/(\..*?)\./g, '$1')
        if (/^[-+]?\d*\.?\d*$/.test(cleaned)) {
            setPressao(cleaned)
        }
        setMsg({
            message: '',
            type: 'success'
        })
    }

    const cadastrarDados = () => {
        if (!pressao) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            )
            setMsg({
                message: 'É necessário informar o valor da pressão do solo medida.',
                type: 'error'
            })
            return
        }

        if (!location) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            )
            return
        }

        addData({
            pressao: parseFloat(pressao),
            anotacao: anotacoes,
            inclinacao: inclinacao,
            localizacao: location,
            timestamp: Date.now()
        })
        setMsg({
            message: 'Dado cadastrado com sucesso!',
            type: 'success'
        })
        setPressao('')
        setAnotacoes('')

        setTimeout(() => {
            setMsg({
                message: '',
                type: 'success'
            })
        }, 4000)

        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }

    const delay = (ms: number) => {
        new Promise(resolve => setTimeout(resolve, ms))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.mainContainer}>
                <Section title='Cadastrar dados ambientais'>
                    <ThemedTextInput value={pressao?.toString()} onChangeText={(text) => {handlePressaoChange(text)}} placeholder='Pressão em Pa' keyboardType='numeric' title='Pressão do solo'/>
                    <ThemedTextInput value={anotacoes} onChangeText={(text) => {setAnotacoes(text); setMsg({ message: '', type: 'success' })}} multiline numberOfLines={4} placeholder='Informações sobre a medição' title='Anotações da medição'/>
                    <Text style={styles.title}>Inclinação do solo</Text>
                    <YAxisIndicator atualizarInclinacao={setInclinacao}/>
                    <View style={styles.locationContainer}>
                        <Text style={styles.title}>Localização</Text>
                        <View style={loadingLocation ? styles.hide : {}}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>Latitude</Text>
                                <View></View>
                                <Text style={styles.headerText}>Longitude</Text>
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.coordsText}>{location?.coords.latitude?.toFixed(5)}</Text>
                                <View style={styles.stroke}></View>
                                <Text style={styles.coordsText}>{location?.coords.longitude?.toFixed(5)}</Text>
                            </View>
                        </View>
                        <ActivityIndicator size={64} color={'#6FACDD'} style={loadingLocation ? {} : styles.hide}/>
                    </View>
                    <Text style={msg.type == 'success' ? styles.successText : styles.errorText}>{msg.message}</Text>
                    <ThemedButton disabled={loadingLocation} onPress={cadastrarDados}>Cadastrar dado</ThemedButton>
                </Section>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    successText: {
        color: '#6FACDD'
    },
    errorText: {
        color: 'rgb(255, 46, 91)'
    },
    headerText: {
        color: 'rgb(120, 120, 126)',
        fontWeight: '400'
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        color: 'rgb(226, 226, 233)'
    },
    stroke: {
        borderWidth: 0.5,
        paddingVertical: 16,
        borderColor: 'rgb(226, 226, 233)'
    },
    coordsText: {
        
    },
    locationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor: 'rgb(226, 226, 233)',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
    },
    locationContainer: {
        gap: 6
    },
    mainContainer: {
        flex: 1
    },
    title: {
        fontWeight: 400,
        fontSize: 18
    },
    hide: {
        opacity: 0,
        position: 'absolute'
    }
})