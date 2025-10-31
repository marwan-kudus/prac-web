// notFound: Fungsi khusus dari Next.js untuk menampilkan halaman 404 Not Found.
import { notFound } from 'next/navigation';
// Image: Komponen Next.js untuk mengoptimalkan dan menampilkan gambar.
import Image from 'next/image';
// PrismaClient: Class utama dari Prisma yang digunakan untuk terhubung dan berinteraksi dengan database.
import { PrismaClient } from '@prisma/client';

// INISIALISASI PRISMA CLIENT
// Objek ini akan digunakan untuk mengirim query ke database.
const prisma = new PrismaClient();

// 1. Async Function
export default async function ProductDetail({
  params,
}: {
  // TypeScript: Mendefinisikan tipe data untuk 'params'. Kita tahu harus ada 'id' berupa string.
  params: { id: string };
}) {
  // Mengambil nilai 'id' dari object 'params'. ID ini datang dari URL (misalnya /products/p001).
  const productId = params?.id;

  // 3. Validasi Kondisional (if)
  // Mengecek apakah ID produk tidak ada atau tipenya tidak string yang valid.
  if (!productId || typeof productId !== 'string') {
    // Jika tidak valid, hentikan eksekusi dan tampilkan halaman 404 (Not Found).
    return notFound();
  }

  // Menggunakan Prisma untuk mencari HANYA SATU produk yang unik.
  const product = await prisma.product.findUnique({
    // Kondisi pencarian, artinya: “cari produk di mana kolom id sama dengan nilai productId dari URL”
    where: { id: productId },
  });

  // D. VALIDASI PRODUK DITEMUKAN
  // Mengecek apakah query database menghasilkan data.
  if (!product) {
    // Jika produk tidak ditemukan di database, tampilkan halaman 404.
    return notFound();
  }

  // E. RENDER TAMPILAN DETAIL
  // -----------------------------
  return (
    // <main>: Kontainer utama halaman detail dengan styling background.
    <main className='p-6 bg-amber-800 relative min-h-screen'>
      {/* Judul Halaman Detail (Menampilkan Nama Produk) */}
      <h1 className='bg-amber-300 text-3xl font-extrabold mb-4 p-2 rounded text-center text-amber-950'>
        Detail {product.name} {/* Menampilkan nama produk secara dinamis */}
      </h1>

      {/* Kontainer Gambar Produk */}
      <div className='relative w-full h-96 mb-4 overflow-hidden rounded-lg shadow-xl'>
        {/* Komponen Image Next.js untuk Gambar Produk */}
        <Image
          // Fallback: Jika imageUrl kosong (null), gunakan '/fallback.jpg' agar tidak error.
          src={product.imageUrl || '/fallback.jpg'}
          alt={product.name}
          fill // Membuat gambar mengisi penuh kontainer (h-96)
          className='object-cover transition-transform duration-500 hover:scale-105' // Efek zoom saat hover
          sizes='100vw'
          priority // Memprioritaskan pemuatan gambar ini
        />
      </div>

      {/* Bagian Informasi Tambahan (Harga & ID) */}
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <p className='text-xl font-semibold text-gray-800 mb-2'>
          Harga:
          <span className='text-red-600 ml-2'>
            {/* Format Harga: Mengubah angka (misalnya 50000) menjadi format Rupiah yang mudah dibaca. */}
            Rp {product.price.toLocaleString('id-ID')}
          </span>
        </p>
        <p className='text-sm text-gray-500 mt-4'>ID Produk: {product.id}</p>
      </div>
    </main>
  );
}
