import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Line, Polygon } from "react-native-svg";

// Typ pojedynczego punktu danych
export type RadarDataPoint = {
  value: number;
  icon: React.ReactNode; // Przyjmujemy dowolny komponent Reacta (ikonę, obrazek, tekst)
};

// Props komponentu
interface NeonRadarChartProps {
  data: RadarDataPoint[];
  size?: number; // Całkowity rozmiar kwadratu kontenera
  maxValue?: number; // Maksymalna wartość skali (domyślnie 10)
  lineColor?: string; // Kolor głównej linii (np. żółty)
  glowColor?: string; // Kolor poświaty (np. czerwony)
  gridColor?: string; // Kolor siatki
  iconOffset?: number; // Jak daleko od wykresu mają być ikony
}

// Funkcja pomocnicza: Zamiana współrzędnych biegunowych na kartezjańskie (x, y)
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  // Odejmujemy 90 stopni, aby 0 zaczynało się na górze (godzina 12), a nie z prawej strony
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const NeonRadarChart: React.FC<NeonRadarChartProps> = ({
  data,
  size = 320,
  maxValue = 10,
  lineColor = "#FBFF00", // Neonowy żółty
  glowColor = "#FF3300", // Neonowy czerwony/pomarańczowy
  gridColor = "#554a66", // Szary/fioletowy pasujący do tła
  iconOffset = 35,
}) => {
  const center = size / 2;
  // Promień samego wykresu (zostawiamy miejsce na ikony)
  const chartRadius = size / 2 - iconOffset - 10;
  const angleSlice = 360 / data.length;

  // 1. Obliczanie punktów wielokąta (Polygon) na podstawie wartości
  const points = data
    .map((item, index) => {
      const value = item.value > maxValue ? maxValue : item.value; // Clamp wartości
      const normalizedRadius = (value / maxValue) * chartRadius;
      const coords = polarToCartesian(
        center,
        center,
        normalizedRadius,
        index * angleSlice
      );
      return `${coords.x},${coords.y}`;
    })
    .join(" ");

  // 2. Generowanie siatki (koncentryczne koła)
  const gridLevels = 4;
  const gridCircles = Array.from({ length: gridLevels }).map((_, i) => {
    const levelRadius = (chartRadius / gridLevels) * (i + 1);
    return (
      <Circle
        key={`grid-circle-${i}`}
        cx={center}
        cy={center}
        r={levelRadius}
        stroke={gridColor}
        strokeWidth="1"
        fill="transparent"
        strokeOpacity={0.6}
      />
    );
  });

  // 3. Generowanie osi (linii od środka)
  const axes = data.map((_, index) => {
    const coords = polarToCartesian(
      center,
      center,
      chartRadius,
      index * angleSlice
    );
    return (
      <Line
        key={`axis-${index}`}
        x1={center}
        y1={center}
        x2={coords.x}
        y2={coords.y}
        stroke={gridColor}
        strokeWidth="1"
        strokeOpacity={0.6}
      />
    );
  });

  // 4. Renderowanie ikon wokół wykresu
  const iconElements = data.map((item, index) => {
    const iconPosition = polarToCartesian(
      center,
      center,
      chartRadius + iconOffset,
      index * angleSlice
    );
    const iconSize = 24; // Zakładamy uśredniony rozmiar kontenera na ikonę

    return (
      <View
        key={`icon-${index}`}
        style={[
          styles.iconContainer,
          {
            left: iconPosition.x - iconSize / 2,
            top: iconPosition.y - iconSize / 2,
            width: iconSize,
            height: iconSize,
          },
        ]}
      >
        {item.icon}
      </View>
    );
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg height={size} width={size}>
        <G>
          {gridCircles}
          {axes}
        </G>

        {/* Warstwa GLOW (Poświata) - gruba, rozmyta linia pod spodem */}
        <Polygon
          points={points}
          fill="rgba(255,255,255,0.15)" // Lekkie wypełnienie wnętrza
          stroke={glowColor}
          strokeWidth="10"
          strokeOpacity="0.4"
          strokeLinejoin="round" // Zaokrąglone łączenia
        />

        {/* Warstwa Główna - cienka, ostra linia na wierzchu */}
        <Polygon
          points={points}
          fill="transparent"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinejoin="round" // Zaokrąglone łączenia
        />

        {/* Opcjonalnie: Kropka na środku */}
        <Circle cx={center} cy={center} r="4" fill={gridColor} opacity={0.8} />
      </Svg>

      {/* Ikony są renderowane "nad" SVG za pomocą pozycjonowania absolutnego */}
      {iconElements}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
