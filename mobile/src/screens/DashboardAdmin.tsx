import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";

type Module = "Inventario" | "Base de Datos" | "Ventas" | "Usuarios";
type Filter = Module | "Todos";

interface Log {
  user: string;
  action: string;
  module: Module;
  time: string;
  status: "ok" | "warn";
}

const logs: Log[] = [
  { user: "admin", action: "Actualizó precios", module: "Inventario", time: "10:30", status: "ok" },
  { user: "root", action: "Eliminó cuenta", module: "Usuarios", time: "10:12", status: "ok" },
  { user: "sistemas", action: "Backup completado", module: "Base de Datos", time: "09:58", status: "ok" },
  { user: "admin", action: "Reembolso realizado", module: "Ventas", time: "09:40", status: "warn" },
  { user: "root", action: "Configuración de seguridad", module: "Usuarios", time: "09:15", status: "ok" },
];

const kpis = [
  { value: "$45.2M", label: "Ingresos Totales" },
  { value: "$12.8M", label: "Gastos Operativos" },
  { value: "71.6%", label: "Margen de Ganancia" },
  { value: "1.2K", label: "Nuevos Clientes" },
];

const MODULES: Filter[] = ["Todos", "Inventario", "Base de Datos", "Ventas", "Usuarios"];

export default function DashboardAdminScreen() {
  const { C } = useTheme();
  const [filtro, setFiltro] = useState<Filter>("Todos");

  const filtered = filtro === "Todos" ? logs : logs.filter((l) => l.module === filtro);

  return (
    <Screen>
      <AppHeader role="admin" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: C.text, fontSize: 22, fontWeight: "800", marginBottom: 16 }}>
          Panel de Administración General
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 }}>
          {kpis.map((k) => (
            <View
              key={k.label}
              style={{ width: "48%", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, marginBottom: 10 }}
            >
              <Text style={{ color: C.accent, fontSize: 18, fontWeight: "800" }}>{k.value}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 11 }}>{k.label}</Text>
            </View>
          ))}
        </View>

        <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
          Tendencia de Ingresos Mensuales
        </Text>
        <View style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16, marginBottom: 20 }}>
          {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((m, i) => (
            <View key={m} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
              <Text style={{ color: C.textSecondary, fontSize: 11, width: 40 }}>{m}</Text>
              <View style={{ flex: 1, height: 12, backgroundColor: C.bgSecondary, borderRadius: 6, overflow: "hidden" }}>
                <View style={{ width: `${(i + 3) * 8}%`, height: 12, backgroundColor: C.accent }} />
              </View>
            </View>
          ))}
        </View>

        <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
          Auditoría del Sistema
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {MODULES.map((m) => (
            <TouchableOpacity
              key={m}
              style={{ backgroundColor: filtro === m ? C.btnPrimary : C.btnSecondary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8 }}
              onPress={() => setFiltro(m)}
            >
              <Text style={{ color: filtro === m ? "#fff" : C.text, fontWeight: "600", fontSize: 12 }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtered.map((l, i) => (
          <View
            key={i}
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 12, marginBottom: 8 }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.text, fontWeight: "600", fontSize: 13 }}>{l.user}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 12 }}>{l.action}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: l.status === "ok" ? C.accent : "#f59e0b", fontSize: 11, fontWeight: "700" }}>{l.module}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 11 }}>{l.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}