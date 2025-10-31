import Link from 'next/link';

export default function Home() {
  return (
    // <main> digunakan untuk menandai area konten utama halaman.
    // Ini penting untuk aksesibilitas (screen reader) dan SEO agar mesin pencari tahu bagian utama dari halaman.
    <main className='bg-amber-100 p-6'>
      {/* 🏷️ Judul halaman */}
      <h1 className='text-3xl font-bold'>Selamat Datang di Toko Kami</h1>

      {/* 📝 Deskripsi singkat */}
      <p className='mt-2 text-gray-600'>Temukan produk terbaik untuk Anda.</p>

      {/* 🔗 Navigasi ke halaman produk */}
      <div className='mt-4 flex gap-5 rounded bg-green-400 p-4'>
        {/* 🧭 <Link> dari Next.js digunakan untuk navigasi antar halaman tanpa reload penuh.
            Ini membuat transisi halaman lebih cepat dan efisien dibanding <a> biasa. */}
        <Link href='/products'>
          {/* 🛒 Tombol menuju halaman produk */}
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-amber-300'>
            Lihat Produk
          </button>
        </Link>
      </div>
    </main>
  );
}
