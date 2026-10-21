import { useFonts } from "expo-font";
import { StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
import Boton from "./components/boton";
import Display from "./components/display";

// Cambia cualquier texto de esta lista para personalizar cada botón.
const initialButtonLabels = [
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
];

// Todos los botones usan este PNG. Cambia una línea individual si quieres otra imagen.
// El orden coincide con initialButtonLabels: posición 0 = fila 1, columna 1.
const buttonImages: (ImageSourcePropType | null)[] = [
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
  require("../../assets/Iconos/image.png"), require("../../assets/Iconos/image.png"),
];

export default function Index() {
  const [fontsLoaded] = useFonts({
    TheInquisition: require("../../assets/fonts/The Inquisition.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>
      <Display />
      <View style={styles.buttonsColumn}>
        {initialButtonLabels.map((label, index) => (
          <Boton
            key={`${label}-${index}`}
            texto={label}
            imagen={buttonImages[index]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    width: "100%",
  },
  title: {
    fontFamily: "TheInquisition",
    fontSize: 28,
    marginBottom: 12,
  },
  buttonsColumn: {
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "94%",
  },
});
