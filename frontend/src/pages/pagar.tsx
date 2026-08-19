import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUsuario from "../components/navbaruser";
import Footer from "../components/footer";
import { CheckCircleIcon, CreditCardIcon } from "@heroicons/react/24/outline";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const PagarPage = () => {
  const navigate = useNavigate();
  const [cart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    numeroTarjeta: "",
    nombreTitular: "",
    expira: "",
    cvv: "",
  });

  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      localStorage.removeItem("cart");
    }, 1500);
  };

  if (paid) {
    return (
      <div className="page-container min-h-screen">
        <NavbarUsuario />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <CheckCircleIcon className="w-24 h-24 mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            ¡Pago exitoso!
          </h1>
          <p className="mb-8" style={{ color: "var(--color-muted)" }}>
            Tu pedido ha sido registrado correctamente. Recibirás una confirmación próximamente.
          </p>
          <button
            onClick={() => navigate("/home-usuario")}
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Volver al inicio
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-container min-h-screen">
        <NavbarUsuario />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            No hay productos para pagar
          </h1>
          <p className="mb-6" style={{ color: "var(--color-muted)" }}>
            Tu carrito está vacío.
          </p>
          <button
            onClick={() => navigate("/home-usuario")}
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Ver productos
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen">
      <NavbarUsuario />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
          Finalizar compra
        </h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Formulario de pago */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="card">
              <h2 className="font-semibold mb-4" style={{ color: "var(--color-text)" }}>
                Información de contacto
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-base">Nombre completo *</label>
                  <input name="nombre" value={form.nombre} onChange={handleChange} className="input-base" placeholder="Juan Pérez" required />
                </div>
                <div>
                  <label className="label-base">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input-base" placeholder="tu@email.com" required />
                </div>
                <div>
                  <label className="label-base">Teléfono *</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange} className="input-base" placeholder="300 123 4567" required />
                </div>
                <div>
                  <label className="label-base">Ciudad *</label>
                  <input name="ciudad" value={form.ciudad} onChange={handleChange} className="input-base" placeholder="Bogotá" required />
                </div>
              </div>
              <div className="mt-4">
                <label className="label-base">Dirección *</label>
                <input name="direccion" value={form.direccion} onChange={handleChange} className="input-base" placeholder="Calle 123 #45-67" required />
              </div>
            </div>

            <div className="card">
              <h2 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--color-text)" }}>
                <CreditCardIcon className="w-5 h-5" />
                Datos de pago
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label-base">Número de tarjeta *</label>
                  <input name="numeroTarjeta" value={form.numeroTarjeta} onChange={handleChange} className="input-base" placeholder="4111 1111 1111 1111" required />
                </div>
                <div>
                  <label className="label-base">Nombre del titular *</label>
                  <input name="nombreTitular" value={form.nombreTitular} onChange={handleChange} className="input-base" placeholder="Juan Pérez" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-base">Expira *</label>
                    <input name="expira" value={form.expira} onChange={handleChange} className="input-base" placeholder="MM/AA" required />
                  </div>
                  <div>
                    <label className="label-base">CVV *</label>
                    <input name="cvv" value={form.cvv} onChange={handleChange} className="input-base" placeholder="123" required />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {processing ? "Procesando..." : `Pagar $${total.toLocaleString("es-CO")}`}
            </button>
          </form>

          {/* Resumen del pedido */}
          <div className="md:col-span-2">
            <div className="card">
              <h2 className="font-semibold mb-4" style={{ color: "var(--color-text)" }}>
                Resumen del pedido
              </h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>{item.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-green-500">
                      ${(item.price * item.quantity).toLocaleString("es-CO")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: "var(--color-text)" }}>Total</span>
                  <span className="text-xl font-bold text-green-500">${total.toLocaleString("es-CO")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PagarPage;
