import { YAxisIndicator } from '@/components/Accelerometer';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import Section from '@/components/ui/Section';
import { useData } from '@/contexts/DataContext';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CadastroScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
    const { data, addData, removeAllData } = useData();

    useEffect(() => {
        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
    
        getCurrentLocation();
      }, []);
      
    let locationText = 'Waiting...';
    if (errorMsg) {
        locationText = errorMsg;
    } else if (location) {
        locationText = JSON.stringify(location);
    }

    const adicionarDados = (tipo: string) => {
        addData({
            tipo: tipo,
            label: 'Pedro'
        })
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }

    return (
            <SafeAreaView style={styles.mainContainer}>
                <Section title='Cadastrar dados'>
                    <ThemedTextInput placeholder='Pressão em Pa' keyboardType='numeric' title='Pressão do solo'/>
                    <ThemedTextInput multiline numberOfLines={4} placeholder='Informações sobre a medição' title='Anotações da medição'/>
                    <Text style={styles.title}>Inclinação</Text>
                    <YAxisIndicator />
                    <Text style={styles.title}>Localização</Text>
                    <Text>{location?.coords.latitude?.toFixed(5)}</Text>
                    <Text>{location?.coords.longitude?.toFixed(5)}</Text>
                    <ThemedButton>Cadastrar dado</ThemedButton>
                </Section>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    title: {
        fontWeight: 400,
        fontSize: 18
    }
})