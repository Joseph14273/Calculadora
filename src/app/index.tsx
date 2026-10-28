import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import Boton from "./components/boton";
import Display from "./components/display";
import { useCalculator } from "../hooks/useCalculator";

type CalculatorButton = {
  label: string;
  type: "numero" | "operador" | "accion" | "igual";
  action: "write" | "delete" | "clear" | "calculate" | "root";
};

const buttons: CalculatorButton[] = [
  { label: "AC", type: "accion", action: "clear" },
  { label: "DEL", type: "accion", action: "delete" },
  { label: "√", type: "accion", action: "root" },
  { label: "÷", type: "operador", action: "write" },
  { label: "7", type: "numero", action: "write" },
  { label: "8", type: "numero", action: "write" },
  { label: "9", type: "numero", action: "write" },
  { label: "×", type: "operador", action: "write" },
  { label: "4", type: "numero", action: "write" },
  { label: "5", type: "numero", action: "write" },
  { label: "6", type: "numero", action: "write" },
  { label: "-", type: "operador", action: "write" },
  { label: "1", type: "numero", action: "write" },
  { label: "2", type: "numero", action: "write" },
  { label: "3", type: "numero", action: "write" },
  { label: "+", type: "operador", action: "write" },
  { label: "0", type: "numero", action: "write" },
  { label: ".", type: "numero", action: "write" },
  { label: "=", type: "igual", action: "calculate" },
];

export default function Index() {
  const { display, escribir, borrar, limpiar, calcular, raiz } = useCalculator();
  const [fontsLoaded] = useFonts({
    TheInquisition: require("../../assets/fonts/The Inquisition.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>
      <Display value={display} />
      <View style={styles.buttonsColumn}>
        {buttons.map(({ label, type, action }) => (
          <Boton
            key={label}
            texto={label}
            tipo={type}
            onPress={() => {
              if (action === "write") escribir(label);
              if (action === "delete") borrar();
              if (action === "clear") limpiar();
              if (action === "calculate") calcular();
              if (action === "root") raiz();
            }}
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
    backgroundColor: "#030712",
    paddingHorizontal: 14,
    width: "100%",
  },
  title: {
    fontFamily: "TheInquisition",
    fontSize: 28,
    color: "#f9fafb",
    marginBottom: 16,
  },
  buttonsColumn: {
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "94%",
  },
});
