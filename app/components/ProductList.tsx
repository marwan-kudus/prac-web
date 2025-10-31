import React from 'react';
import ProductCard from './ProductCard';

// --- DEFINISI TIPE KONSISTEN ---
type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

// KRITIS: Definisikan interface props yang diterima
interface ProductListProps {
  products: Product[]; // Menerima daftar produk dari parent/Menampung daftar produk
  onAddToCart: (product: Product) => void; // Menerima handler dari parent
}

// KRITIS: Terapkan interface props yang sudah didefinisikan
const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  // Hapus semua logika useState dan useEffect untuk fetching data!
  // Data sudah diterima melalui props.

  // Jika daftar produk kosong
  if (products.length === 0) {
    return (
      <p className='text-center text-gray-500 p-8'>
        Tidak ada produk ditemukan.
      </p>
    );
  }

  // Render daftar produk menggunakan ProductCard
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.map((product) => (
        // Meneruskan objek product dan handler ke ProductCard
        <ProductCard
          key={product.id}
          product={product}
          onAdd={() => onAddToCart(product)} // KRITIS: Panggil onAddToCart dan kirim objek product
        />
      ))}
    </div>
  );
};

export default ProductList;
