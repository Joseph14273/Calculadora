import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ReglillaProps = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

const Reglilla = ({ children, style }: ReglillaProps) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "98%",
    },
});

export default Reglilla;
