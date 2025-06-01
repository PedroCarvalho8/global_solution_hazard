import { StyleSheet, Text, View } from 'react-native';

export type SectionProps = {
    children: React.ReactNode;
    title: string
}

export default function Section ({ children, title }: SectionProps) {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.card}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        fontSize: 24,
        marginBottom: 12,
    },
    card: {
        backgroundColor: 'white',
        gap: 20,
        padding: 20,
        borderRadius: 24,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 5.62,
        elevation: 7,
    },
    mainContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
    }
})