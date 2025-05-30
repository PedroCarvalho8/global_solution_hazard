import { clearData, getData, saveData } from '@/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext<any>(null)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getData();
        setData(data);
    }

    const addData = async (item: any) => {
        await saveData(item);
        loadData();
    }

    const removeAllData = async () => {
        await clearData();
        loadData()
    }

    return (
        <DataContext.Provider value={{ data, addData, removeAllData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
