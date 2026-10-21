import { ImageBackground, ImageSourcePropType, StyleSheet, Text, Pressable } from "react-native";

type BotonProps = {
    texto: string;
    imagen?: ImageSourcePropType | null;
    onPress?: () => void;
};

const Boton = ({ texto, imagen, onPress }: BotonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
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
                    <Text style={styles.imageText}>{texto}</Text>
                </ImageBackground>
            ) : (
                <Text style={styles.text}>{texto}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#2563eb",
        borderRadius: 8,
        justifyContent: "center",
        marginHorizontal: "1%",
        marginVertical: 4,
        aspectRatio: 1,
        width: "23%",
    },
    pressed: {
        opacity: 0.75,
    },
    text: {
        color: "#ffffff",
        fontFamily: "TheInquisition",
        fontSize: 18,
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