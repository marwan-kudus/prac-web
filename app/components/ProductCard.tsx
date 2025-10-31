'use client';

import Image from 'next/image';
import React from 'react';
// ✅ Mengimpor React agar kita bisa menggunakan sintaks JSX (<div>...</div>) dan fitur React lainnya.

// ✅ Type alias `Product` digunakan untuk mendefinisikan struktur/tipe dari sebuah data produk.
type Product = {
  id: string; // properti id bertipe string
  title: string; // properti title bertipe string
  price: number; // properti price bertipe number
  image: string; // properti image bertipe string (URL gambar)
};

// Menentukan tipe semua properti (props) yang boleh dikirim ke komponen ProductCard.
// Komponen ini harus menerima dua hal dari parent:
interface ProductCardProps {
  product: Product; //1. Data produk itu sendiri (seperti nama, harga, gambar)
  onAdd: (product: Product) => void; //2. Sebuah fungsi untuk menangani tombol “Tambah ke Keranjang”.
}

// ✅ Membuat komponen `ProductCard` bertipe React Functional Component (`React.FC`) dengan tipe props `ProductCardProps`
const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  // Di sini, parameter `({ product, onAdd })` menggunakan *destructuring object*
  // Artinya: kita mengambil langsung nilai `product` dan `onAdd` dari objek props tanpa menulis `props.product`, dsb.

  // 🖼️ Bagian RETURN -> JSX yang akan dirender di layar
  return (
    <div className='bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.03]'>
      <div className='relative w-full h-48'>
        <Image
          src={product.image} // sumber gambar (nilai dari data produk).
          alt={product.title} // Teks alternatif untuk aksesibilitas
          fill // Properti khusus Next.js → gambar memenuhi container
          className='object-cover' // Gaya agar gambar menutupi area secara proporsional
          sizes='(max-width: 640px) 100vw, 33vw' // Optimisasi responsif
        />
      </div>

      {/* 💬 INFORMASI PRODUK */}
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800 mb-1'>
          {product.title}
          {/* Menampilkan judul produk */}
        </h3>

        <p className='text-2xl font-bold text-red-600 mb-3'>
          Rp {product.price.toLocaleString('id-ID')}
          {/* Fungsi JS fundamental:
              - `toLocaleString('id-ID')` → format angka ke format rupiah Indonesia.
          */}
        </p>

        {/* 🔘 TOMBOL "Tambah ke Keranjang" */}
        <button
          onClick={() => onAdd(product)}
          // ⚡ Fungsi event handler
          // Arrow function (() => onAdd(product))
          //  - Tidak langsung memanggil `onAdd`
          //  - Tapi menunggu hingga tombol diklik
          //  - Saat diklik → `onAdd(product)` dijalankan dan mengirim objek `product`
          className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg transition duration-300'
        >
          ➕ Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

// ✅ Mengekspor komponen agar bisa digunakan di file lain (misalnya di `ProductList.tsx`)
export default ProductCard;
