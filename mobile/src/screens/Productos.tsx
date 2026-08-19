import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { PRODUCTS, formatCOP } from "../data/products";

export default function ProductosScreen() {
  const { C } = useTheme();
  const productos = PRODUCTS.map((p, idx) => ({
    ...p,
    sku: `SKU-${(idx + 1) * 100}`,
    sold: (idx + 2) * 7,
    revenue: (idx + 2) * 7 * p.price,
    views: (idx + 3) * 60,
  }));

  return (
    <Screen>
      <AppHeader role="empresa" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: C.text, fontSize: 22, fontWeight: "800", marginBottom: 16 }}>
          Catálogo de Productos
        </Text>

        {productos.map((p) => (
          <View key={p.id} style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <Text style={{ color: C.textSecondary, fontSize: 11 }}>{p.sku}</Text>
            <Text style={{ color: C.text, fontWeight: "700", fontSize: 16, marginTop: 2 }}>{p.name}</Text>
            <Text style={{ color: C.accent, fontWeight: "800", fontSize: 16, marginVertical: 6 }}>{formatCOP(p.price)}</Text>

            <Text style={{ color: C.text, fontSize: 15, fontWeight: "700", marginTop: 10, marginBottom: 6 }}>
              Estadísticas de Rendimiento
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ color: C.textSecondary, fontSize: 13 }}>Unidades vendidas</Text>
              <Text style={{ color: C.text, fontWeight: "600" }}>{p.sold}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ color: C.textSecondary, fontSize: 13 }}>Ingresos totales</Text>
              <Text style={{ color: C.text, fontWeight: "600" }}>{formatCOP(p.revenue)}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ color: C.textSecondary, fontSize: 13 }}>Vistas</Text>
              <Text style={{ color: C.text, fontWeight: "600" }}>{p.views}</Text>
            </View>

            <Text style={{ color: C.text, fontSize: 15, fontWeight: "700", marginTop: 10, marginBottom: 8 }}>
              Comentarios y Calificaciones
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ color: C.accent, fontWeight: "800", fontSize: 20 }}>4.8</Text>
              <Text style={{ color: C.textSecondary, fontSize: 12 }}>⭐ based on {p.views} reviews</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: C.btnSecondary, borderRadius: 999, paddingVertical: 10, alignItems: "center", marginTop: 12 }}>
              <Text style={{ color: C.text, fontWeight: "600", fontSize: 13 }}>Ver comentarios</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}