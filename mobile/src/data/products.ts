export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  store: string;
  stock: number;
}

export const CATEGORIES = [
  "Computadoras",
  "Celulares",
  "Audio",
  "Cámaras",
  "Wearables",
  "Gaming",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Laptop Asus TUF Gaming F15',
    description: "Laptop gamer RTX 4060, 16GB RAM, 512GB SSD",
    price: 3150000,
    originalPrice: 4200000,
    discount: 25,
    image: "https://placehold.co/400x300?text=Laptop",
    category: "Computadoras",
    store: "Lubix Tech",
    stock: 12,
  },
  {
    id: 2,
    name: "iPhone 16 Pro 256GB",
    description: "Smartphone Apple con chip A18 Pro",
    price: 5890000,
    originalPrice: 6400000,
    discount: 8,
    image: "https://placehold.co/400x300?text=iPhone",
    category: "Celulares",
    store: "Lubix Tech",
    stock: 8,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone premium con cámara 200MP",
    price: 5200000,
    category: "Celulares",
    store: "SmartMovil",
    image: "https://placehold.co/400x300?text=Galaxy",
    stock: 5,
  },
  {
    id: 4,
    name: "Audífonos Sony WH-1000XM5",
    description: "Audífonos con cancelación de ruido",
    price: 1450000,
    originalPrice: 1700000,
    discount: 15,
    image: "https://placehold.co/400x300?text=Sony",
    category: "Audio",
    store: "AudioPro",
    stock: 20,
  },
  {
    id: 5,
    name: "Cámara Canon EOS R50",
    description: "Cámara mirrorless con lente 18-45mm",
    price: 2650000,
    category: "Cámaras",
    store: "Lubix Tech",
    image: "https://placehold.co/400x300?text=Canon",
    stock: 6,
  },
  {
    id: 6,
    name: "Reloj Smart Watch Serie 9",
    description: "Smartwatch con pantalla siempre activa",
    price: 950000,
    originalPrice: 1150000,
    discount: 17,
    image: "https://placehold.co/400x300?text=Watch",
    category: "Wearables",
    store: "TechWear",
    stock: 15,
  },
];

export const ofertas = [
  {
    titulo: "Asus Tuf Gaming F15",
    descripcion: "Hasta 40% en laptops",
    color: "#134e4a",
  },
  {
    titulo: "iPhone 16 Pro",
    descripcion: "Smartphones con 30% de descuento",
    color: "#111827",
  },
  {
    titulo: "Samsung Galaxy Tv",
    descripcion: "Accesorios 2x1",
    color: "#134e4a",
  },
];

export const formatCOP = (value: number) =>
  "$" + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });