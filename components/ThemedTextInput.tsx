import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
    title: string;
}

export function ThemedTextInput({ title , ...rest}: ThemedTextInputProps) {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputField}>
                <TextInput {...rest} style={styles.textInput}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        gap: 6
    },
    inputField: {
        backgroundColor: 'rgb(248, 248, 250)',
        borderColor: 'rgb(226, 226, 233)',
        borderWidth: 1,
        borderRadius: 12,
    },
    textInput: {
        paddingLeft: 12,
    },
    title: {
        fontWeight: 400,
        fontSize: 18
    }
})