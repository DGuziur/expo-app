import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";

export type RadarDataPoint = {
  total: number;
  count: number;
  value: number;
  title: string;
  icon: FunctionComponent;
  description: string;
};

interface NeonRadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  maxValue?: number;
  lineColor?: string;
  glowColor?: string;
  gridColor?: string;
  iconOffset?: number;
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const NeonRadarChart = ({
  data,
  size = 320,
  maxValue = 10,
  lineColor = "#FFE044",
  glowColor = "#DF4F58",
  gridColor = "#FFF4C7",
  iconOffset = 15,
}: NeonRadarChartProps) => {
  const center = size / 2;
  const chartRadius = size / 2 - iconOffset - 10;
  const angleSlice = 360 / data.length;

  const points = data
    .map((item, index) => {
      const value = item.value > maxValue ? maxValue : item.value;
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
        strokeOpacity={0.3}
      />
    );
  });

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
        strokeOpacity={0.3}
      />
    );
  });

  const iconElements = data.map((item, index) => {
    const Icon = item.icon;
    const iconPosition = polarToCartesian(
      center,
      center,
      chartRadius + iconOffset,
      index * angleSlice
    );
    const iconSize = 24;

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
        <Icon></Icon>
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

        <Path
          d={createRoundedPolygonPath(points, 15)} // 15 = promień zaokrąglenia
          fill="rgba(255,255,255,0.15)"
          stroke={glowColor}
          strokeWidth="10"
          strokeOpacity="0.4"
        />

        <Path
          d={createRoundedPolygonPath(points, 15)} // 15 = promień zaokrąglenia
          fill="transparent"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <Circle cx={center} cy={center} r="4" fill={gridColor} opacity={0.8} />
      </Svg>

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

const createRoundedPolygonPath = (points: string, radius: number = 10) => {
  const coords = points.split(" ").map((p) => {
    const [x, y] = p.split(",").map(Number);
    return { x, y };
  });

  if (coords.length < 3) return "";

  let path = "";

  for (let i = 0; i < coords.length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % coords.length];
    const prev = coords[(i - 1 + coords.length) % coords.length];

    const v1x = current.x - prev.x;
    const v1y = current.y - prev.y;
    const len1 = Math.sqrt(v1x * v1x + v1y * v1y);

    const v2x = next.x - current.x;
    const v2y = next.y - current.y;
    const len2 = Math.sqrt(v2x * v2x + v2y * v2y);

    const u1x = v1x / len1;
    const u1y = v1y / len1;
    const u2x = v2x / len2;
    const u2y = v2y / len2;

    const r = Math.min(radius, len1 / 2, len2 / 2);
    const p1x = current.x - u1x * r;
    const p1y = current.y - u1y * r;
    const p2x = current.x + u2x * r;
    const p2y = current.y + u2y * r;

    if (i === 0) {
      path += `M ${p1x} ${p1y} `;
    }

    path += `Q ${current.x} ${current.y} ${p2x} ${p2y} `;

    if (i < coords.length - 1) {
      const nextP1x = next.x - u2x * r;
      const nextP1y = next.y - u2y * r;
      path += `L ${nextP1x} ${nextP1y} `;
    }
  }

  path += "Z";
  return path;
};
