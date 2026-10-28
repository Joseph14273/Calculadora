import { ScrollView, StyleSheet, View } from "react-native";
import CustomText from "./customText";
import type { HistoryEntry } from "../hooks/useCalculator";

type HistorialProps = {
    entries: HistoryEntry[];
    isDark: boolean;
};

const Historial = ({ entries, isDark }: HistorialProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            style={styles.scroll}
        >
            {entries.length === 0 ? (
                <CustomText useCustomFont={false} style={[styles.empty, isDark ? styles.darkText : styles.lightText]}>
                    No hay operaciones todavía
                </CustomText>
            ) : (
                entries.map((entry, index) => (
                    <View key={`${entry.expression}-${index}`} style={[styles.entry, isDark ? styles.darkEntry : styles.lightEntry]}>
                        <CustomText useCustomFont={false} style={[styles.expression, isDark ? styles.darkText : styles.lightText]}>
                            {entry.expression}
                        </CustomText>
                        <CustomText useCustomFont={false} style={[styles.result, isDark ? styles.darkText : styles.lightText]}>
                            = {entry.result}
                        </CustomText>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: "100%",
        marginBottom: 4,
    },
    content: {
        gap: 10,
        paddingBottom: 20,
        paddingHorizontal: 2,
        width: "100%",
    },
    empty: {
        fontSize: 16,
        textAlign: "center",
    },
    entry: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: "100%",
        shadowColor: "#000000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    darkEntry: {
        backgroundColor: "#111827",
        borderColor: "#374151",
    },
    lightEntry: {
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
    },
    expression: {
        fontSize: 16,
    },
    result: {
        fontSize: 22,
        fontWeight: "600",
    },
    darkText: {
        color: "#f9fafb",
    },
    lightText: {
        color: "#111827",
    },
});

export default Historial;
