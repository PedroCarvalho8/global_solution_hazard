import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ThemedButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
};

export const ThemedButton = ({ children, ...rest }: ThemedButtonProps) => {
    return (
        <TouchableOpacity 
        style={styles.botao}
        {...rest}
        >
            <Text style={styles.texto}>
                {children}
            </Text> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botao: {
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 8,

    },
    texto: {
        fontFamily: 'System',
        fontWeight: '600',
        color: 'white'
    }
})