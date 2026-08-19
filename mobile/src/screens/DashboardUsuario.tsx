import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { PRODUCTS, formatCOP } from "../data/products";
import { favoritesStore, cartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";

type Tab = "overview" | "orders" | "saved" | "profile";

export default function DashboardUsuarioScreen() {
  const { C } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [favs, setFavs] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    favoritesStore.get().then(setFavs);
    cartStore.get().then(setCart);
  }, []);

  const savedProducts = PRODUCTS.filter((p) => favs.includes(p.id));

  const addAllSavedToCart = async () => {
    for (const p of savedProducts) {
      await cartStore.add({ id: p.id, name: p.name, price: p.price, image: p.image });
    }
  };

  const addSavedToCart = async (p: (typeof PRODUCTS)[number]) => {
    await cartStore.add({ id: p.id, name: p.name, price: p.price, image: p.image });
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Resumen" },
    { key: "orders", label: "Mis Pedidos" },
    { key: "saved", label: "Guardados" },
    { key: "profile", label: "Mi Perfil" },
  ];

  const kpi = [
    { value: cart.reduce((s, i) => s + i.quantity, 0).toString(), label: "Artículos en carrito" },
    { value: savedProducts.length.toString(), label: "Productos guardados" },
    { value: "0", label: "Compras realizadas" },
  ];

  return (
    <Screen>
      <AppHeader role="user" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#4ade80", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: "#000" }}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ color: C.text, fontSize: 18, fontWeight: "800" }}>{user?.name}</Text>
            <Text style={{ color: C.textSecondary, fontSize: 13 }}>{user?.email}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20, gap: 6 }}>
          {tabs.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: activeTab === t.key ? C.btnPrimary : C.btnSecondary,
              }}
              onPress={() => setActiveTab(t.key)}
            >
              <Text
                numberOfLines={1}
                style={{ textAlign: "center", fontSize: 11, fontWeight: "600", color: activeTab === t.key ? "#fff" : C.text }}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "overview" && (
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
              {kpi.map((k) => (
                <View key={k.label} style={{ flex: 1, backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, marginHorizontal: 3, alignItems: "center" }}>
                  <Text style={{ color: C.accent, fontSize: 22, fontWeight: "800" }}>{k.value}</Text>
                  <Text style={{ color: C.textSecondary, fontSize: 11, textAlign: "center" }}>{k.label}</Text>
                </View>
              ))}
            </View>
            <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>Productos guardados</Text>
            {savedProducts.length ? (
              savedProducts.map((p) => (
                <View key={p.id} style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: C.bgSecondary, alignItems: "center", justifyContent: "center" }}>
                    <Text>💾</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text numberOfLines={1} style={{ color: C.text, fontWeight: "600", fontSize: 14 }}>{p.name}</Text>
                    <Text style={{ color: C.textSecondary, fontSize: 12 }}>{formatCOP(p.price)}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ color: C.textSecondary }}>No tienes productos guardados.</Text>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <View style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 24, alignItems: "center" }}>
            <Text style={{ fontSize: 34, marginBottom: 8 }}>📦</Text>
            <Text style={{ color: C.text, fontWeight: "700", fontSize: 16 }}>No tienes pedidos</Text>
            <Text style={{ color: C.textSecondary, fontSize: 13, textAlign: "center", marginTop: 4 }}>Tus pedidos aparecerán aquí.</Text>
          </View>
        )}

        {activeTab === "saved" &&
          (savedProducts.length ? (
            savedProducts.map((p) => (
              <View key={p.id} style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <Text style={{ color: C.text, fontWeight: "600" }}>{p.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <Text style={{ color: C.accent, fontWeight: "800", fontSize: 15 }}>{formatCOP(p.price)}</Text>
                  <TouchableOpacity style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 }} onPress={() => addSavedToCart(p)}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Agregar al carrito</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ color: C.textSecondary }}>No tienes productos guardados.</Text>
          ))}

        {activeTab === "profile" && (
          <>
            <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>Información personal</Text>
            {[
              { label: "Nombre", value: user?.name || "-" },
              { label: "Email", value: user?.email || "-" },
              { label: "Miembro desde", value: "-" },
            ].map((field) => (
              <View key={field.label} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 14, marginBottom: 8 }}>
                <Text style={{ color: C.textSecondary, fontSize: 13 }}>{field.label}</Text>
                <Text style={{ color: C.text, fontWeight: "600", fontSize: 13, maxWidth: "60%" }}>{field.value}</Text>
              </View>
            ))}
            <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginTop: 16, marginBottom: 10 }}>Seguridad</Text>
            {["Cambiar contraseña", "Verificación 2 pasos"].map((item) => (
              <View key={item} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 14, marginBottom: 8 }}>
                <Text style={{ color: C.text, fontWeight: "600", fontSize: 13 }}>{item}</Text>
                <Text style={{ color: C.textSecondary, fontSize: 13 }}>{item === "Cambiar contraseña" ? "→" : "Desactivado"}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}