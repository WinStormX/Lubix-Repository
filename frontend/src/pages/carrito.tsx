import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarUsuario from "../components/navbaruser";
import Footer from "../components/footer";
import { TrashIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch { setCart([]); }
    }
  }, []);

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page-container min-h-screen">
      <NavbarUsuario />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
          Carrito de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBagIcon className="w-20 h-20 mx-auto mb-4 opacity-30" style={{ color: "var(--color-muted)" }} />
            <p className="text-lg font-medium mb-2" style={{ color: "var(--color-text)" }}>Tu carrito está vacío</p>
            <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Explora productos y agrégalos a tu carrito</p>
            <Link
              to="/home-usuario"
              className="inline-block bg-green-500 hover:bg-green-400 text-white px-6 py-2.5 rounded-xl font-semibold transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>{item.name}</h3>
                  <p className="text-lg font-bold text-green-500">${item.price.toLocaleString("es-CO")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-lg font-bold"
                    style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold" style={{ color: "var(--color-text)" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-lg font-bold"
                    style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="text-right pt-4">
              <p className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
                Total: <span className="text-green-500">${total.toLocaleString("es-CO")}</span>
              </p>
              <button
                onClick={() => navigate("/pago")}
                className="mt-3 bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
