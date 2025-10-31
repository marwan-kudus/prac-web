import { prisma } from '@/lib/prisma';
//    penghubung Anda ke database, memungkinkan Anda menjalankan perintah

import { NextResponse } from 'next/server';
//    untuk membuat dan mengirim respons HTTP yang valid (dengan status kode dan format JSON)
//    kembali ke klien (browser).

// 2. Definisi Route Handler (POST Method)
//Fungsi asynchronous yang diekspor
export async function POST(request: Request) {
  // 👈 Fungsi ini secara otomatis dipanggil oleh Next.js saat klien (misalnya,
  //    tombol 'Tambah ke Keranjang') mengirim permintaan HTTP POST ke endpoint ini

  // 3. Mengambil dan Mengurai Data Input
  const { productId, quantity, userId } = await request.json();
  // 👈 Mengambil body (isi) dari permintaan yang masuk (request).
  //    'request.json()' mengurai string JSON menjadi objek JavaScript.
  //  Ambil nilai productId, quentity,userId dari objek hasil request.json()

  // 4. Validasi Data
  if (!productId || !quantity || !userId) {
    // 👈 Pengecekan Validasi: Memastikan semua data penting (productId, quantity, userId)
    //    ada dan memiliki nilai (tidak 'null', 'undefined', atau string kosong '""').

    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    // 👈 Respon Error: Jika validasi gagal, fungsi segera berhenti dan mengirim
    //    respons JSON error, dengan menetapkan Status Kode 400 (Bad Request).
  }

  // 5. Interaksi Database (CREATE)
  const item = await prisma.cart.create({
    // 👈 Operasi Database: Menjalankan perintah INSERT (CREATE) ke database.
    //    '.create()' adalah fungsi yang menyimpan baris data baru.

    data: { productId, quantity, userId },
    // 👈 Objek yang berisi data kolom dan nilai yang akan dimasukkan ke tabel 'cart'.
  });

  // 6. Mengembalikan Respon Sukses
  return NextResponse.json(item);
  // 👈 Mengembalikan respons HTTP yang sukses (Status 200 OK) ke klien.
  //    Respons berisi objek 'item' yang baru saja dibuat di database,
  //    memberi konfirmasi ke klien bahwa operasi berhasil.
}
