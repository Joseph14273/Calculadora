import { StyleSheet, Text, View } from "react-native";

type DisplayProps = {
    value: string;
};

const Display = ({ value }: DisplayProps) => {
    return (
        <View style={styles.container}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#111827",
        borderColor: "#374151",
        borderRadius: 18,
        borderWidth: 1,
        height: 112,
        justifyContent: "flex-end",
        marginBottom: 18,
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: "94%",
    },
    text: {
        color: "#f9fafb",
        fontSize: 38,
        fontWeight: "600",
        textAlign: "right",
    },
});

export default Display;
