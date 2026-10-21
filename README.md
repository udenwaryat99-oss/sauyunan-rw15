# SAUYUN RW 15 — tahap pertama

**Slogan:** “Sauyunan Ngawangun Lembur”  
**Identitas:** futuristik, navy, biru elektrik, emas, dengan sentuhan Sunda.

## Fitur aplikasi
- Dashboard responsif untuk desktop dan ponsel.
- Pilihan bahasa Indonesia / Sunda.
- Login admin dan warga melalui Supabase Auth serta pendaftaran akun warga.
- Form permohonan surat, lampiran foto/PDF, balasan admin, dan daftar status.
- Pengaduan dengan komentar untuk pelapor/admin dan lampiran foto/PDF.
- Data warga dengan rincian terbatas untuk admin; admin dapat mencetak atau menyimpan PDF.
- Laporan iuran dan keuangan yang dapat ditambah admin serta dicetak/disimpan ke PDF.
- Kegiatan warga dan pengumuman.
- Halaman Kontak Darurat Kabupaten Bandung dengan tautan telepon langsung dan WhatsApp Damkar.
- Profil RW 15 berisi galeri sarana dan potensi warga; admin dapat menambahkan informasi dan foto untuk kategori jalan, olahraga, UMKM, kesenian, kesehatan, posyandu, kebersihan, dan kebersamaan.
- Data demo tersimpan di `localStorage` browser.
- Manifest PWA dan service worker sederhana.

## Jalankan di komputer
Prasyarat: Node.js 20 atau versi LTS yang masih didukung dan npm.

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

Untuk menguji hasil produksi lokal:
```bash
npm run build
npm run preview
```

## Membuka dari HP Android untuk pengujian
1. Jalankan `npm run dev -- --host 0.0.0.0` pada komputer dan pastikan HP serta komputer berada di jaringan Wi-Fi yang sama.
2. Buka alamat IP lokal komputer yang ditampilkan/dikonfigurasi beserta port `5173` dari browser HP.
3. Untuk instalasi PWA yang benar, deploy ke hosting HTTPS. Buka website di Chrome Android, lalu pilih menu **Install app / Tambahkan ke layar utama** bila tersedia.

## Membungkus sebagai aplikasi Android
Starter ini merupakan web app responsif/PWA, belum APK native. Untuk paket Android, salah satu jalur adalah Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "SAUYUN RW 15" "id.sauyun.rw15" --web-dir=dist
npm run build
npm install @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```

Perlu Android Studio dan Android SDK untuk membangun APK/AAB. Perintah ini perlu disesuaikan bila versi Capacitor berubah.

## Penting sebelum digunakan warga sungguhan
Ini **prototype tahap pertama**, bukan layanan produksi. Mode warga/pengurus di sini hanya sakelar demo, bukan autentikasi aman. Data disimpan pada browser/perangkat yang sama, tidak tersinkron ke pengurus dan bisa hilang bila data browser dihapus. Jangan masukkan NIK, dokumen asli, nomor telepon, atau data sensitif.

Sebelum peluncuran:
1. Siapkan proyek backend (misalnya Supabase) dan environment variables; jangan simpan kunci rahasia di kode frontend.
2. Buat autentikasi nyata, verifikasi warga, dan role-based access control di server/database. Tampilan Data Warga membaca role `admin`, `manager`, `pengurus`, atau `administrator` dari `app_metadata.role`; setelah role diubah di Supabase, pengguna perlu logout lalu login kembali agar sesi memuat role terbaru. Tampilan saja tidak melindungi data yang disimpan di localStorage dari akses langsung di browser; gunakan tabel Supabase dengan RLS sebelum menyimpan data pribadi.
3. Foto pengumuman, lampiran foto/PDF permohonan surat dan pengaduan, termasuk balasan surat dan inbox/komentar pengaduan, di prototype disimpan di localStorage. Daftar surat dan pengaduan difilter menurut akun di tampilan aplikasi, bukan pembatasan akses yang aman; gunakan tabel Supabase dengan RLS dan Supabase Storage dengan kebijakan akses sebelum menangani data warga sungguhan.
4. Atur kebijakan akses tiap tabel (RLS), validasi input, batas ukuran/jenis dokumen, audit log, backup, dan HTTPS.
5. Tentukan SOP persetujuan surat dan penanggung jawab data.
6. Uji alur, aksesibilitas, keamanan, dan pemulihan data; siapkan kebijakan privasi sesuai aturan yang berlaku.
7. Ganti konten contoh dan konfigurasi identitas wilayah sebelum dipublikasikan.

## Struktur
```
sauyun_rw15/
  index.html
  package.json
  vite.config.js
  public/
    manifest.webmanifest
    sw.js
  src/
    main.jsx
    style.css
    village-theme.css
  README.md
```
