import { ShieldCheck, Siren, TriangleAlert } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";



type Variant = 'seguro' | 'alerta' | 'cuidado';

interface BadgeProps {
  variant?: Variant;
  label: string;
}

export const Badge = ({ variant = 'alerta', label }: BadgeProps) => {
    const iconOptions = {
        size:16, color:styles[variant].color, strokeWidth:2.4
    }
    return (
        <View style={[
            styles.container, 
            variant=='alerta' && styles.alert,
            variant=='seguro' && styles.success,
            variant=='cuidado' && styles.warning
        ]}>
            {variant=='cuidado' && 
            <TriangleAlert {...iconOptions}/>}
            {variant=='seguro' && 
            <ShieldCheck {...iconOptions}/>}
            {variant=='alerta' && 
            <Siren {...iconOptions}/>}
            <Text style={{color: styles[variant].color, fontWeight: '500'}}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', justifyContent: 'center', 
        padding: 1.6, paddingHorizontal: 6, 
        borderRadius: 16, gap: 4, alignSelf: 'flex-start',
        borderWidth: 1.6
    },
    alert: {
        backgroundColor: 'rgb(255, 208, 212)',
        color: 'rgb(139, 46, 46)',
        borderColor: 'rgb(139, 46, 46)'
    },
    success: {
        backgroundColor: 'rgb(216, 253, 220)',
        color: 'rgb(46, 139, 77)',
        borderColor: 'rgb(46, 139, 77)'
    },
    warning: {
        backgroundColor: 'rgb(253, 255, 220)',
        color: 'rgb(161, 127, 12)',
        borderColor: 'rgb(161, 127, 12)'
    }
})