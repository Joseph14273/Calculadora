import { StyleSheet, View } from "react-native";
import CustomText from "./customText";

type DisplayProps = {
    value: string;
    isDark?: boolean;
};

const Display = ({ value, isDark = true }: DisplayProps) => {
    return (
        <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
            <CustomText
                useCustomFont={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.text, isDark ? styles.darkText : styles.lightText]}
            >
                {value}
            </CustomText>
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
        width: "98%",
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    text: {
        fontSize: 38,
        fontWeight: "600",
        textAlign: "right",
    },
    darkContainer: {
        backgroundColor: "#111827",
        borderColor: "#374151",
    },
    lightContainer: {
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
    },
    darkText: {
        color: "#f9fafb",
    },
    lightText: {
        color: "#111827",
    },
});

export default Display;
