import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@hazard:data'

export const saveData = async (item: any) => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : [];
    data.push(item);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getData = async (): Promise<any[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const clearData = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
};

 