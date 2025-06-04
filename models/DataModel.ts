export type Data = {
    pressao: number;
    anotacao: string;
    timestamp: number
    inclinacao: number;
    localizacao: { coords: { latitude: number, longitude: number } }
}