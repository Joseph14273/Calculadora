import { ImageBackground, ImageSourcePropType, StyleSheet, Text, Pressable } from "react-native";

type BotonProps = {
    texto: string;
    imagen?: ImageSourcePropType | null;
    onPress?: () => void;
    tipo?: "numero" | "operador" | "accion" | "igual";
};

const Boton = ({ texto, imagen, onPress, tipo = "numero" }: BotonProps) => {
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

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                buttonStyle,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            {imagen ? (
                <ImageBackground
                    source={imagen}
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                >
                    <Text style={[styles.imageText, textStyle]}>{texto}</Text>
                </ImageBackground>
            ) : (
                <Text style={[styles.text, textStyle]}>{texto}</Text>
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
    },
    pressed: {
        opacity: 0.65,
        transform: [{ scale: 0.96 }],
    },
    operador: {
        backgroundColor: "#7c3aed",
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
        fontFamily: "TheInquisition",
        fontSize: 18,
    },
    numeroText: {
        color: "#ffffff",
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
        fontFamily: "TheInquisition",
        fontSize: 18,
        textShadowColor: "#000000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default Boton;