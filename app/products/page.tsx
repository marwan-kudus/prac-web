// Mengimpor Prisma Client: Digunakan untuk berinteraksi dengan database.
import { prisma } from '@/lib/prisma';
// Next.js Link: Digunakan untuk navigasi antar halaman (client-side) tanpa perlu reload penuh,
import Link from 'next/link';
// Next.js Image: Digunakan untuk optimasi gambar (pengubahan ukuran, format modern, lazy loading)
import Image from 'next/image';
// Komponen Kustom: Tombol interaktif untuk menambahkan item ke keranjang belanja.
import AddToCartButton from '@/app/components/AddToCartButton';

// 2. KOMPONEN HALAMAN UTAMA (SERVER COMPONENT)
// Kata kunci 'async' menunjukkan ini adalah Server Component,
// yang dapat melakukan operasi I/O (seperti fetch data) secara langsung dan aman.
export default async function ProductListPage() {
  // Perintah Pengambilan Data. Ini adalah perintah Prisma yang paling umum. Artinya: "Ambil SEMUA baris data yang ada di tabel/model Product."
  const products = await prisma.product.findMany();

  // B. RENDER TAMPILAN
  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Daftar Produk</h1>
      {/*grid-cols-1' untuk ponsel, 'md:grid-cols-3' untuk desktop (3 kolom). */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Mapping (Iterasi) Produk */}
        {/* Melakukan loop pada array 'products' dan membuat satu Kartu Produk <div> untuk setiap item. */}
        {products.map((product) => (
          // KARTU PRODUK
          <div
            key={product.id} // 'key' (membantu identifikasi elemen).
            className='border rounded-lg p-4 shadow hover:shadow-lg transition'
          >
            <div className='relative w-full h-48 mb-4'>
              {/* Conditional Rendering Gambar */}
              {product.imageUrl ? (
                // Jika imageUrl ADA, tampilkan gambar
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill // Membuat gambar mengisi penuh kontainer parent (h-48)
                  className='object-cover rounded'
                  sizes='100vw' // Memberi tahu browser ukuran gambar pada viewport lebar
                  priority // Memberi tahu Next.js untuk memuat gambar ini lebih awal
                />
              ) : (
                // Jika imageUrl TIDAK ADA, tampilkan placeholder
                <div className='flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full rounded'>
                  Gambar tidak tersedia
                </div>
              )}
            </div>

            {/*{product.name}: Ini mengambil nilai dari properti name dari objek product yang sedang di-loop (diproses). Ini memastikan setiap kartu menampilkan nama produk yang berbeda dari database. */}
            <h2 className='text-lg font-semibold'>{product.name}</h2>

            {/* Harga Produk */}
            <p className='text-red-600 font-bold'>
              {/* Menggunakan toLocaleString untuk memformat angka menjadi format mata uang Rupiah yang mudah dibaca. */}
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            {/* Tombol Detail Produk */}
            <Link
              href={`/products/${product.id}`} // Link dinamis menuju halaman detail berdasarkan ID produk
              className='mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Detail
            </Link>

            {/* Tombol Add To Cart */}
            {/* productId: Ini adalah nama prop yang didefinisikan,
            {product.id}: Ini adalah nilai, menampilkan produk berisi ID unik */}
            <AddToCartButton productId={product.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
