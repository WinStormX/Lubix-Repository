import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { ofertas } from "../data/products";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const infoCards = [
  { icon: "🌐", title: "¿Qué es Lubix?", text: "Una plataforma digital que conecta usuarios con empresas para descubrir, comparar y adquirir productos." },
  { icon: "🛍️", title: "¿Qué hacemos?", text: "Facilitamos la compra en línea con recogida en tienda para clientes y empresas." },
  { icon: "🎯", title: "Nuestra misión", text: "Impulsar el comercio digital local mediante tecnología moderna." },
  { icon: "⭐", title: "Beneficios para clientes", text: "Mejores ofertas locales, compara precios y recoge en minutos." },
  { icon: "📈", title: "Ventajas para empresas", text: "Aumenta tus ventas, llega a más clientes y gestiona pedidos." },
  { icon: "🚀", title: "Empieza hoy", text: "Regístrate gratis y únete a la revolución del comercio local digital." },
];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { C } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % ofertas.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Screen>
      <AppHeader role="guest" />
      <ScrollView>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ color: C.accent, fontSize: 13, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, marginTop: 30 }}>
            Bienvenidos a Lubix
          </Text>
          <Text style={{ color: C.text, fontSize: 32, fontWeight: "800", textAlign: "center", marginBottom: 8 }}>
            Tienda de Tecnología
          </Text>
          <Text style={{ color: C.textSecondary, fontSize: 16, marginBottom: 24 }}>
            Y <Text style={{ color: C.accent, fontWeight: "700" }}>50% de descuento</Text> en productos seleccionados
          </Text>

          <View
            style={{
              width: "100%",
              backgroundColor: "#0f172a",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 30,
            }}
          >
            <View style={{ height: 120, backgroundColor: ofertas[index].color, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>{ofertas[index].titulo}</Text>
            </View>
            <View style={{ padding: 16, alignItems: "center" }}>
              <Text style={{ color: "#4ade80", fontSize: 12, fontWeight: "700", textTransform: "uppercase", marginBottom: 4 }}>
                {ofertas[index].titulo}
              </Text>
              <Text style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 12 }}>{ofertas[index].descripcion}</Text>
              <TouchableOpacity
                style={{ backgroundColor: "#22c55e", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999 }}
                onPress={() => navigation.navigate("HomeUsuario")}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Comprar ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ padding: 20, paddingTop: 0 }}>
          {infoCards.map((card) => (
            <View
              key={card.title}
              style={{ backgroundColor: C.bgCard, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: C.border, marginBottom: 14 }}
            >
              <Text style={{ fontSize: 20, marginBottom: 4 }}>{card.icon}</Text>
              <Text style={{ color: C.accent, fontSize: 18, fontWeight: "600", marginBottom: 6 }}>{card.title}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 14, lineHeight: 20 }}>{card.text}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={{ backgroundColor: C.btnPrimary, paddingVertical: 14, borderRadius: 999, alignItems: "center", marginBottom: 20 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}