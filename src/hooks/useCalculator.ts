import { useCallback, useState } from "react";

type Operator = "+" | "-" | "×" | "÷";

const operators: Operator[] = ["+", "-", "×", "÷"];

const isOperator = (value: string): value is Operator =>
  operators.includes(value as Operator);

const formatResult = (value: number) => {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  return Number.isInteger(value)
    ? String(value)
    : String(Number(value.toFixed(10)));
};

const evaluateExpression = (expression: string): number => {
  const tokens = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .match(/(?:\d+\.?\d*|\.\d+|[+\-*/])/g);

  if (!tokens || tokens.join("") !== expression.replace(/×/g, "*").replace(/÷/g, "/")) {
    throw new Error("Invalid expression");
  }

  let position = 0;

  const parsePrimary = (): number => {
    const token = tokens[position];

    if (token === "-") {
      position += 1;
      return -parsePrimary();
    }

    if (!token || Number.isNaN(Number(token))) {
      throw new Error("Invalid number");
    }

    position += 1;
    return Number(token);
  };

  const parseMultiplication = (): number => {
    let value = parsePrimary();

    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position];
      position += 1;
      const nextValue = parsePrimary();

      if (operator === "/" && nextValue === 0) {
        throw new Error("Division by zero");
      }

      value = operator === "*" ? value * nextValue : value / nextValue;
    }

    return value;
  };

  let result = parseMultiplication();

  while (tokens[position] === "+" || tokens[position] === "-") {
    const operator = tokens[position];
    position += 1;
    const nextValue = parseMultiplication();
    result = operator === "+" ? result + nextValue : result - nextValue;
  }

  if (position !== tokens.length) {
    throw new Error("Invalid expression");
  }

  return result;
};

export const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");
  const [hasCalculated, setHasCalculated] = useState(false);

  const limpiar = useCallback(() => {
    setExpression("");
    setDisplay("0");
    setHasCalculated(false);
  }, []);

  const escribir = useCallback((value: string) => {
    const currentNumber = expression.split(/[+×÷-]/).at(-1) ?? "";

    if (value === "." && currentNumber.includes(".")) {
      return;
    }

    if (hasCalculated && !isOperator(value)) {
      setExpression(value === "." ? "0." : value);
      setDisplay(value === "." ? "0." : value);
      setHasCalculated(false);
      return;
    }

    if (isOperator(value)) {
      if (!expression || isOperator(expression.at(-1) ?? "")) {
        if (value === "-" && !expression) {
          setExpression("-");
          setDisplay("-");
        }
        return;
      }
    }

    const nextExpression = `${expression}${value}`;
    setExpression(nextExpression);
    setDisplay(nextExpression);
  }, [display, expression, hasCalculated]);

  const borrar = useCallback(() => {
    if (hasCalculated) {
      limpiar();
      return;
    }

    const nextExpression = expression.slice(0, -1);
    setExpression(nextExpression);
    setDisplay(nextExpression || "0");
  }, [expression, hasCalculated, limpiar]);

  const calcular = useCallback(() => {
    if (!expression || isOperator(expression.at(-1) ?? "")) {
      return;
    }

    try {
      const result = formatResult(evaluateExpression(expression));
      setDisplay(result);
      setExpression(result === "Error" ? "" : result);
      setHasCalculated(true);
    } catch {
      setDisplay("Error");
      setExpression("");
      setHasCalculated(true);
    }
  }, [expression]);

  const raiz = useCallback(() => {
    const value = Number(display);

    if (!Number.isFinite(value) || value < 0) {
      setDisplay("Error");
      setExpression("");
      setHasCalculated(true);
      return;
    }

    const result = formatResult(Math.sqrt(value));
    setDisplay(result);
    setExpression(result);
    setHasCalculated(true);
  }, [display]);

  return {
    display,
    escribir,
    borrar,
    limpiar,
    calcular,
    raiz,
  };
};
