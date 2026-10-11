import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { useSettings } from "../../SettingsContext";

// Custom Tooltip component for dynamic timezone & formatted temperature
function CustomTooltip({ active, payload, unit }) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#023047",
          color: "#ffffff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          fontSize: "0.85rem",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <p style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#8ecae6" }}>
          🕒 {dataPoint.fullTime || dataPoint.time} (Local Time)
        </p>
        <p style={{ margin: 0, fontWeight: 700, color: "#ffb703" }}>
          🌡️ {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
}

export default function HourlyTemperatureChart(data) {
  const { convertValue, tempUnit, theme } = useSettings();

  if (!data?.hourly?.time || !data?.hourly?.temperature_2m) {
    return null;
  }

  const timezone = data.timezone || "UTC";

  // 1. Get today's local date string (YYYY-MM-DD) for the searched location's timezone
  let today;
  try {
    today = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    today = new Date().toISOString().split("T")[0];
  }

  // 2. Get current time in the searched location's timezone for the header badge
  let currentLocalTime;
  try {
    currentLocalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    currentLocalTime = "";
  }

  // 3. Parse hourly time directly from Open-Meteo's ISO strings (already local to timezone)
  const hourlyChartData = data.hourly.time
    .map((rawTime, index) => {
      const [datePart, timePart] = rawTime.split("T");
      if (!timePart) return null;

      const [hourStr, minStr] = timePart.split(":");
      const hour = parseInt(hourStr, 10);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const formattedTime = `${hour12} ${period}`;
      const fullTime = `${hour12}:${minStr} ${period}`;

      return {
        rawTime,
        datePart,
        time: formattedTime,
        fullTime,
        temperature: convertValue(data.hourly.temperature_2m[index]),
      };
    })
    .filter((item) => item && item.datePart === today);

  // Fallback to first 24 items if filter is empty
  const chartData =
    hourlyChartData.length > 0
      ? hourlyChartData
      : data.hourly.time.slice(0, 24).map((rawTime, index) => {
          const [, timePart] = rawTime.split("T");
          const hour = parseInt(timePart?.split(":")[0] || "0", 10);
          const period = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 === 0 ? 12 : hour % 12;
          return {
            time: `${hour12} ${period}`,
            fullTime: `${hour12}:00 ${period}`,
            temperature: convertValue(data.hourly.temperature_2m[index]),
          };
        });

  const formattedTz = timezone.replace(/_/g, " ");

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const axisTextColor = isDark ? "#94a3b8" : "#023047";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header with Title & Dynamic Location Timezone Info */}
      <div className="chart-header">
        <h3 className="chart-title">
          Today's Hourly Temperature
        </h3>

        <div
          className="chart-timezone-badge"
          title={`Location Timezone: ${timezone}`}
        >
          <span>🕒 {formattedTz}</span>
          {currentLocalTime && (
            <span style={{ opacity: 0.85 }}>• Now: {currentLocalTime}</span>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: "100%", height: 230 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="time"
              interval={2}
              tick={{ fontSize: 11, fill: axisTextColor }}
              tickLine={{ stroke: axisTextColor }}
            />
            <YAxis
              unit={tempUnit}
              tick={{ fontSize: 11, fill: axisTextColor }}
              tickLine={{ stroke: axisTextColor }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              content={
                <CustomTooltip unit={tempUnit} />
              }
            />
            <Line
              dataKey="temperature"
              type="monotone"
              stroke="#fb8500"
              strokeWidth={2.5}
              dot={{ r: 2, fill: "#fb8500" }}
              activeDot={{
                r: 5,
                fill: isDark ? "#1e293b" : "#023047",
                stroke: "#fb8500",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}