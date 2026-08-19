import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { cartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";
import { formatCOP } from "../data/products";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CarritoScreen() {
  const navigation = useNavigation<Nav>();
  const { C } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);

  const refresh = async () => setCart(await cartStore.get());

  useEffect(() => {
    refresh();
  }, []);

  const updateQty = async (id: number, delta: number) => {
    await cartStore.updateQuantity(id, delta);
    refresh();
  };

  const removeItem = async (id: number) => {
    await cartStore.remove(id);
    refresh();
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Screen>
      <AppHeader role="user" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: C.text, fontSize: 24, fontWeight: "800", marginBottom: 16 }}>Carrito de Compras</Text>

        {cart.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🛒</Text>
            <Text style={{ color: C.text, fontWeight: "700", fontSize: 16, marginBottom: 4 }}>Tu carrito está vacío</Text>
            <Text style={{ color: C.textSecondary, fontSize: 13, marginBottom: 16 }}>Explora productos y agrégalos a tu carrito.</Text>
            <TouchableOpacity style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => navigation.navigate("HomeUsuario")}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Ver productos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cart.map((item) => (
              <View key={item.id} style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: C.bgSecondary, alignItems: "center", justifyContent: "center" }}>
                    <Text>📦</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text numberOfLines={1} style={{ color: C.text, fontWeight: "600", fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ color: C.accent, fontWeight: "800", marginTop: 2 }}>{formatCOP(item.price)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Text style={{ fontSize: 16 }}>🗑️</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: C.btnSecondary, alignItems: "center", justifyContent: "center" }} onPress={() => updateQty(item.id, -1)}>
                      <Text style={{ color: C.text, fontWeight: "800" }}>−</Text>
                    </TouchableOpacity>
                    <Text style={{ color: C.text, fontWeight: "700" }}>{item.quantity}</Text>
                    <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: C.btnSecondary, alignItems: "center", justifyContent: "center" }} onPress={() => updateQty(item.id, 1)}>
                      <Text style={{ color: C.text, fontWeight: "800" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: C.text, fontWeight: "800", fontSize: 15 }}>{formatCOP(item.price * item.quantity)}</Text>
                </View>
              </View>
            ))}

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16, marginTop: 8 }}>
              <Text style={{ color: C.textSecondary, fontSize: 15 }}>Total</Text>
              <Text style={{ color: C.accent, fontSize: 20, fontWeight: "800" }}>{formatCOP(total)}</Text>
            </View>

            <TouchableOpacity style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingVertical: 14, alignItems: "center", marginTop: 14 }}>
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Proceder al pago</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}