import { useFonts } from "expo-font";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Boton from "../components/boton";
import CustomText from "../components/customText";
import Display from "../components/display";
import Historial from "../components/historial";
import Reglilla from "../components/reglilla";
import { useCalculator } from "../hooks/useCalculator";

type CalculatorButton = {
  label: string;
  type: "numero" | "operador" | "accion" | "igual";
  action: "write" | "delete" | "clear" | "calculate" | "root" | "square" | "percentage" | "sign" | "inverse" | "cube";
};

const calculatorButtons: CalculatorButton[] = [
  { label: "AC", type: "accion", action: "clear" },
  { label: "DEL", type: "accion", action: "delete" },
  { label: "√", type: "accion", action: "root" },
  { label: "x²", type: "accion", action: "square" },
  { label: "%", type: "accion", action: "percentage" },
  { label: "+/-", type: "accion", action: "sign" },
  { label: "1/x", type: "accion", action: "inverse" },
  { label: "x³", type: "accion", action: "cube" },
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
  const [isDark, setIsDark] = useState(true);
  const { display, escribir, borrar, limpiar, calcular, raiz, cuadrado, porcentaje, cambiarSigno, inverso, cubo, history } = useCalculator();
  const [showHistory, setShowHistory] = useState(false);
  const [fontsLoaded] = useFonts({
    TheInquisition: require("../../assets/fonts/The Inquisition.ttf"),
  });
  const actions = {
    write: escribir,
    delete: borrar,
    clear: limpiar,
    calculate: calcular,
    root: raiz,
    square: cuadrado,
    percentage: porcentaje,
    sign: cambiarSigno,
    inverse: inverso,
    cube: cubo,
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <CustomText style={[styles.title, isDark ? styles.darkText : styles.lightText]}>
        {showHistory ? "Historial" : "Calculadora"}
      </CustomText>
      {showHistory ? (
        <>
          <Historial entries={history} isDark={isDark} />
          <Pressable
            accessibilityLabel="Volver a la calculadora"
            onPress={() => setShowHistory(false)}
            style={[styles.backButton, isDark ? styles.darkThemeButton : styles.lightThemeButton]}
          >
            <CustomText useCustomFont={false} style={isDark ? styles.darkThemeText : styles.lightThemeText}>
              ← Volver
            </CustomText>
          </Pressable>
        </>
      ) : (
        <>
          <View style={[styles.calculatorCard, isDark ? styles.darkCard : styles.lightCard]}>
            <Display value={display} isDark={isDark} />
            <Reglilla style={styles.buttonGrid}>
            {calculatorButtons.map(({ label, type, action }) => (
              <Boton
                key={label}
                texto={label}
                tipo={type}
                onPress={() => action === "write" ? actions[action](label) : actions[action]()}
                isDark={isDark}
              />
            ))}
            </Reglilla>
            <Pressable
              accessibilityLabel="Ver historial"
              onPress={() => setShowHistory(true)}
              style={[styles.historyButton, isDark ? styles.darkThemeButton : styles.lightThemeButton]}
            >
              <CustomText useCustomFont={false} style={isDark ? styles.darkThemeText : styles.lightThemeText}>
                ◷  Historial
              </CustomText>
            </Pressable>
            <Pressable
              accessibilityLabel="Cambiar tema"
              onPress={() => setIsDark((current) => !current)}
              style={[styles.themeButton, isDark ? styles.darkThemeButton : styles.lightThemeButton]}
            >
              <CustomText useCustomFont={false} style={isDark ? styles.darkThemeText : styles.lightThemeText}>
                {isDark ? "☼" : "☾"}
              </CustomText>
            </Pressable>
          </View>
        </>
      )}
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
    paddingVertical: 18,
    width: "100%",
  },
  darkContainer: {
    backgroundColor: "#030712",
  },
  lightContainer: {
    backgroundColor: "#f3f4f6",
  },
  calculatorCard: {
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 1,
    paddingBottom: 12,
    paddingHorizontal: 6,
    paddingTop: 16,
    width: "100%",
  },
  darkCard: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  lightCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    shadowColor: "#64748b",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  buttonGrid: {
    transform: [{ translateY: 28 }],
  },
  title: {
    fontFamily: "TheInquisition",
    fontSize: 30,
    color: "#f9fafb",
    marginBottom: 14,
  },
  darkText: {
    color: "#f9fafb",
  },
  lightText: {
    color: "#111827",
  },
  topButton: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  backButton: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    marginTop: 12,
    width: "60%",
  },
  historyButton: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    marginTop: 4,
    width: "72%",
  },
  themeButton: {
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    marginTop: 4,
    width: 44,
  },
  darkThemeButton: {
    backgroundColor: "#1f2937",
    borderColor: "#374151",
  },
  lightThemeButton: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d5db",
  },
  darkThemeText: {
    color: "#f9fafb",
    fontSize: 18,
  },
  lightThemeText: {
    color: "#111827",
    fontSize: 18,
  },
});
