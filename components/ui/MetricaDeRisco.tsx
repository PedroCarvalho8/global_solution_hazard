import { Data } from "@/models/DataModel";
import { ShieldCheck, Siren, TriangleAlert } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type MetricaDeRiscoProps = {
    riscos: { grupo: Data[]; risco: "alerta" | "seguro" | "cuidado"; }[],
    filtro: "alerta" | "seguro" | "cuidado" 
}

export function MetricaDeRisco({ riscos, filtro }: MetricaDeRiscoProps) {
    const iconOptions = {
        size:16, color:styles[filtro].color, strokeWidth:2.4
    }

    return (
        <View style={[
            styles.mainContainer,
            filtro=='alerta' && styles.alertaContainer,
            filtro=='cuidado' && styles.cuidadoContainer,
            filtro=='seguro' && styles.seguroContainer
            ]}>
            <View style={styles.textContainer}>
                {filtro=='cuidado' && 
                <TriangleAlert {...iconOptions}/>}
                {filtro=='seguro' && 
                <ShieldCheck {...iconOptions}/>}
                {filtro=='alerta' && 
                <Siren {...iconOptions}/>}
                <Text style={[
                    styles.numberText,
                    filtro=='alerta' && styles.alerta,
                    filtro=='cuidado' && styles.cuidado,
                    filtro=='seguro' && styles.seguro
                    ]}>
                    {riscos.filter((item) => { return(item.risco == filtro) }).length}
                    </Text>
            </View>
                <Text style={[
                    styles.secondaryText,
                    filtro=='alerta' && styles.alertaSecondaryText,
                    filtro=='cuidado' && styles.cuidadoSecondaryText,
                    filtro=='seguro' && styles.seguroSecondaryText
                    ]}>
                    Notificações de {filtro}
                    </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center'
    },
    mainContainer: {
        borderRadius: 12,
        padding: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 1
    },
    numberText: {
        fontSize: 20,
        fontWeight: 500
    },
    secondaryText: {
        textAlign: 'center',
    },

    alerta: {
        color: 'rgb(211, 7, 34)'
    },
    alertaSecondaryText: {
        color: 'rgb(238, 83, 104)'
    },
    alertaContainer: {
        backgroundColor: 'rgb(253, 238, 240)',
        borderColor: 'rgb(238, 83, 104)'
    },

    cuidado: {
        color: 'rgb(224, 187, 22)'
    },
    cuidadoSecondaryText: {
        color: 'rgb(238, 210, 83)'
    },
    cuidadoContainer: {
        backgroundColor: 'rgb(252, 250, 232)',
        borderColor: 'rgb(238, 210, 83)'
    },

    seguro: {
      color: "#6FACDD"
    },
    seguroSecondaryText: {
        color: "#6FACDD"
    },
    seguroContainer: {
        backgroundColor: 'rgb(234, 247, 255)',
        borderColor: "#6FACDD"
    }
})