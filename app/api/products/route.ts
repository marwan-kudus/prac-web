// src/app/api/product/route.ts

// 1. Import Dependensi
// =================================================================
import { NextResponse } from 'next/server';
// 👈 Import class NextResponse dari Next.js. Ini digunakan untuk membuat respons HTTP yang valid
//    yang akan dikirim kembali ke klien (browser).

import { PrismaClient } from '@prisma/client';
// 👈 Import PrismaClient. Ini adalah library yang dihasilkan oleh Prisma yang
//    memungkinkan kode Anda berinteraksi (query) dengan database.

// 2. Inisiasi Klien Database
const prisma = new PrismaClient();
// 👈 Membuat instance (objek) dari PrismaClient. Objek ini digunakan untuk
//    mengeksekusi semua perintah database (seperti SELECT, INSERT, UPDATE).

// 3. Function Declaration Definisi Route Handler (GET Method)
export async function GET() {
  // 4. Objek inilah yang digunakan untuk berinteraksi dengan database
  const products = await prisma.product.findMany();
  // prisma.user.findMany() → untuk SELECT (ambil data)
  //Kode ini mengambil semua data produk dari tabel product di database menggunakan Prisma ORM, lalu menyimpannya ke dalam variabel products

  // 5. Mengembalikan Respon
  return NextResponse.json(products);
  // 👈 Mengembalikan respons HTTP ke klien. Fungsi 'NextResponse.json()'
  //    mengambil objek/array JavaScript (data produk)
  //    1. Mengubahnya menjadi string JSON.
}
