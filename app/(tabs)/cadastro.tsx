import { ThemedButton } from '@/components/ThemedButton';
import { useData } from '@/contexts/DataContext';
import * as Haptics from 'expo-haptics';
import { Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CadastroScreen() {
    const { data, addData, removeAllData } = useData();


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
            <SafeAreaView>
                <ScrollView>
                    <Text>Cadastro</Text>
                    <ThemedButton onPress={() => {adicionarDados('alert')}}>Adicionar alert</ThemedButton>
                    <ThemedButton onPress={() => {adicionarDados('warning')}}>Adicionar warning</ThemedButton>
                    <ThemedButton onPress={() => {adicionarDados('success')}}>Adicionar success</ThemedButton>
                    <Button title='Remover todos os items' onPress={removeAllData}/>
                </ScrollView>
            </SafeAreaView>
    );
}