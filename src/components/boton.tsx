import { ImageBackground, ImageSourcePropType, StyleSheet, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import CustomText from "./customText";

type BotonProps = {
    texto: string;
    imagen?: ImageSourcePropType | null;
    onPress?: () => void;
    tipo?: "numero" | "operador" | "accion" | "igual";
    isDark?: boolean;
};

const Boton = ({ texto, imagen, onPress, tipo = "numero", isDark = true }: BotonProps) => {
    const useCustomFont = /^[a-zA-Z0-9]+$/.test(texto);
    const buttonStyle = {
        numero: styles.container,
        operador: styles.operador,
        accion: styles.accion,
        igual: styles.igual,
    }[tipo];

    const textStyle = {
        numero: styles.numeroText,
        operador: styles.operadorText,
        accion: styles.accionText,
        igual: styles.igualText,
    }[tipo];

    const handlePress = () => {
        if (tipo === "igual") {
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (tipo === "accion") {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            void Haptics.selectionAsync();
        }

        onPress?.();
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                buttonStyle,
                !isDark && (tipo === "numero" || tipo === "accion") && styles.lightButton,
                !isDark && tipo === "accion" && styles.lightActionButton,
                pressed && styles.pressed,
            ]}
            onPress={handlePress}
        >
            {imagen ? (
                <ImageBackground
                    source={imagen}
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                >
                    <CustomText useCustomFont={useCustomFont} style={[styles.imageText, textStyle, !isDark && styles.lightButtonText]}>{texto}</CustomText>
                </ImageBackground>
            ) : (
                <CustomText useCustomFont={useCustomFont} style={[styles.text, textStyle, !isDark && (tipo === "numero" || tipo === "accion") && styles.lightButtonText]}>{texto}</CustomText>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#1f2937",
        borderColor: "#374151",
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: "center",
        margin: "1.5%",
        aspectRatio: 1,
        width: "22%",
        shadowColor: "#000000",
        shadowOpacity: 0.16,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    pressed: {
        opacity: 0.65,
        transform: [{ scale: 0.96 }],
    },
    operador: {
        backgroundColor: "#7c3aed",
    },
    lightButton: {
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
    },
    lightActionButton: {
        backgroundColor: "#e5e7eb",
    },
    operadorText: {
        color: "#ffffff",
    },
    accion: {
        backgroundColor: "#374151",
    },
    accionText: {
        color: "#d1d5db",
    },
    igual: {
        backgroundColor: "#059669",
    },
    igualText: {
        color: "#ffffff",
    },
    text: {
        color: "#ffffff",
        fontSize: 18,
    },
    numeroText: {
        color: "#ffffff",
    },
    lightButtonText: {
        color: "#111827",
    },
    image: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    imageStyle: {
        borderRadius: 8,
        resizeMode: "cover",
    },
    imageText: {
        color: "#ffffff",
        fontSize: 18,
        textShadowColor: "#000000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default Boton;