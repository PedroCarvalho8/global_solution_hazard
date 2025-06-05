export type Data = {
    umidade: number;
    anotacao: string;
    timestamp: number
    inclinacao: number;
    localizacao: { coords: { latitude: number, longitude: number } }
}