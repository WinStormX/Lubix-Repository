import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

interface Props {
  role?: "user" | "empresa" | "admin" | "guest";
  showSearch?: boolean;
}

export default function NavBar({ role = "guest", showSearch = false }: Props) {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  const { C } = useTheme();
  const [search, setSearch] = React.useState("");

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const base = "#162238";
  const barBg = role === "admin" ? "#111827" : base;

  const links: Record<string, { label: string; screen: string }[] | undefined> = {
    user: [
      { label: "Inicio", screen: "HomeUsuario" },
      { label: "Carrito", screen: "Carrito" },
      { label: "Configuración", screen: "DashboardUsuario" },
    ],
    empresa: [
      { label: "Inicio", screen: "HomeEmpresa" },
      { label: "Dashboard", screen: "DashboardEmpresa" },
      { label: "Productos", screen: "Productos" },
    ],
    admin: [{ label: "Dashboard", screen: "DashboardAdmin" }],
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: barBg }]}>
      <View style={[styles.nav, { backgroundColor: barBg }]}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate(role === "user" ? "HomeUsuario" : role === "empresa" ? "HomeEmpresa" : role === "admin" ? "DashboardAdmin" : "Login")}>
            <Text style={styles.logo}>Lubix</Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            {user && (
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase() || "U"}</Text>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.logout}>Salir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: "#162238" },
  nav: { paddingVertical: 14, paddingHorizontal: 16 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { color: "#22c55e", fontWeight: "800", fontSize: 20 },
  actions: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4ade80",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#000", fontWeight: "700" },
  logout: { color: "#fca5a5", fontSize: 13, fontWeight: "600" },
});