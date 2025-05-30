import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VisualizacaoScreen() {

    async function enviarInformacoes() {
        await AsyncStorage.setItem('@informacoes', 'ola')
    }

    return (
        <SafeAreaView>
            <Text>Visualizacao</Text>
            <Button title={'Enviar'} onPress={enviarInformacoes}/>
        </SafeAreaView>
    );
}