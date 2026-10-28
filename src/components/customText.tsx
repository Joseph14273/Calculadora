import { Text, TextProps, StyleSheet } from "react-native";

type CustomTextProps = TextProps & {
    useCustomFont?: boolean;
};

const CustomText = ({ style, useCustomFont = true, ...props }: CustomTextProps) => {
    return <Text {...props} style={[useCustomFont && styles.text, style]} />;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "TheInquisition",
    },
});

export default CustomText;
