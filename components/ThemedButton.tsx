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
        borderRadius: 12,
        backgroundColor: '#6FACDD',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12

    },
    texto: {
        fontFamily: 'System',
        fontWeight: '600',
        color: 'white'
    }
})