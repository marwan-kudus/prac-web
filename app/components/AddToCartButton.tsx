'use client'; // 👈 Deklarasi ini menandakan bahwa komponen ini adalah Client Component.

// Deklarasi Komponen Fungsi: AddToCartButton
// Komponen ini menerima satu properti (props): productId, yang bertipe string.
export default function AddToCartButton({ productId }: { productId: string }) {
  // Fungsi Asinkron (Async Function) untuk menangani Klik Tombol
  // Logika utama untuk mengirim data ke API berada di sini.
  const handleClick = async () => {
    try {
      //Error Handling , Try-Catch Statement
      // 1. Mengirim Permintaan (Request) ke API Endpoint
      const res = await fetch('/api/cart', {
        method: 'POST', // 👈 Metode HTTP: POST digunakan untuk membuat/menambahkan data baru.

        headers: {
          // 👈 Menentukan tipe konten yang dikirim adalah JSON.
          'Content-Type': 'application/json',
        },

        // 👈 Body (Isi) permintaan, diubah dari objek JavaScript menjadi string JSON.
        body: JSON.stringify({
          productId, // ID produk yang akan ditambahkan.
          quantity: 1, // Jumlah produk yang ditambahkan (default 1).
          userId: 'guest', // ID pengguna (dalam contoh ini menggunakan 'guest').
        }),
      });

      // 2. Pemeriksaan Respon
      // Memeriksa apakah respon dari server sukses (status 200-299).
      if (!res.ok) {
        // Jika tidak sukses (misalnya, status 400, 500), lemparkan error.
        throw new Error('Gagal menambahkan ke keranjang');
      }

      // 3. Memproses Respon Sukses
      // Mengubah respon body yang diterima (berupa JSON) menjadi objek JavaScript.
      const data = await res.json();

      // Menampilkan data yang dikembalikan oleh API (misalnya, objek keranjang terbaru).
      console.log('Item ditambahkan:', data);

      // Memberi notifikasi sukses kepada pengguna.
      alert('✅ Produk berhasil ditambahkan ke keranjang!');
    } catch (error) {
      // 4. Penanganan Error (jika ada kesalahan di langkah 1, 2, atau 3)
      console.error('❌ Error saat menambahkan:', error);

      // Memberi notifikasi gagal kepada pengguna.
      alert('❌ Gagal menambahkan produk ke keranjang.');
    }
  }; // Akhir dari fungsi handleClick

  // Struktur HTML yang akan dirender (JSX)
  return (
    <button
      // 👈 Ketika tombol diklik, fungsi handleClick akan dipanggil.
      onClick={handleClick}
      // Kelas Tailwind CSS untuk styling tombol
      className='mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
    >
      Tambah ke Keranjang {/* Teks yang ditampilkan pada tombol */}
    </button>
  );
}
