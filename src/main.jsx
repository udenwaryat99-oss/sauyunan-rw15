import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import './style.css';

const supabase = createClient(
  'https://ywelnddqnxsrqpvbdgme.supabase.co',
  'sb_publishable_udINOibx_YfFTsQP-2JbcA_0PS6rNP_'
);

function App() {
  const [emailAdmin, setEmailAdmin] = useState('');
const [passwordAdmin, setPasswordAdmin] = useState('');
  const [daftarPengaduan, setDaftarPengaduan] = useState([]);
const [memuatPengaduan, setMemuatPengaduan] = useState(false);
  const ambilPengaduan = async () => {
  setMemuatPengaduan(true);
    const ubahStatus = async (id, statusBaru) => {
  const { error } = await supabase
    .from('pengaduan')
    .update({ status: statusBaru })
    .eq('id', id);

  if (error) {
    alert('Status gagal diperbarui.');
    console.error(error);
    return;
  }

  alert('Status pengaduan berhasil diperbarui!');
  await ambilPengaduan();
};

  const { data, error } = await supabase
    .from('pengaduan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    alert('Gagal mengambil data pengaduan.');
    console.error(error);
  } else {
    setDaftarPengaduan(data || []);
  }

  setMemuatPengaduan(false);
};
  const loginAdmin = async (e) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email: emailAdmin,
    password: passwordAdmin,
  });

  if (error) {
    alert('Login gagal. Periksa email dan kata sandi.');
    return;
  }

  alert('Alhamdulillah, login admin berhasil!');
await ambilPengaduan();
setHalaman('admin');
};
    const [halaman, setHalaman] = useState('beranda');
  const [nama, setNama] = useState('');
  const [rt, setRt] = useState('');
  const [kategori, setKategori] = useState('Infrastruktur');
  const [judul, setJudul] = useState('');
  const [isiLaporan, setIsiLaporan] = useState('');
  const menu = [
    { icon: '👨‍👩‍👧‍👦', title: 'Data Warga', desc: 'Informasi warga RW 15' },
    { icon: '📢', title: 'Pengaduan', desc: 'Sampaikan keluhan warga' },
    { icon: '📰', title: 'Berita RW', desc: 'Informasi terbaru lingkungan' },
    { icon: '📅', title: 'Kegiatan', desc: 'Agenda kegiatan warga' },
    { icon: '💰', title: 'Keuangan', desc: 'Informasi kas dan laporan' },
    { icon: '👤', title: 'Profil', desc: 'Informasi akun pengguna' },
  ];
  if (halaman === 'admin') {
  return (
    <main className="app">
      <header className="hero">
        <div className="mark">📋</div>
        <p className="eyebrow">PANEL PENGURUS</p>
        <h1>Dashboard Admin</h1>
        <p className="subtitle">Sauyunan RW 15</p>
      </header>

      <section className="content">
        <h2>Daftar Pengaduan Warga</h2>

        <button
          className="menu-card"
          onClick={ambilPengaduan}
          disabled={memuatPengaduan}
        >
          {memuatPengaduan ? 'Memuat...' : 'Muat Pengaduan'}
        </button>

        {daftarPengaduan.map((laporan) => (
          <article className="menu-card" key={laporan.id}>
            <h3>{laporan.judul}</h3>
            <p><strong>Pelapor:</strong> {laporan.nama_pelapor}</p>
            <p><strong>RT:</strong> {laporan.rt}</p>
            <p><strong>Kategori:</strong> {laporan.kategori}</p>
            <p>{laporan.isi_laporan}</p>
            <label>Status:</label>
<select
  value={laporan.status}
  onChange={(e) => ubahStatus(laporan.id, e.target.value)}
>
  <option value="Menunggu">Menunggu</option>
  <option value="Diproses">Diproses</option>
  <option value="Selesai">Selesai</option>
</select>
          </article>
        ))}

        <button
          className="menu-card"
          onClick={() => setHalaman('beranda')}
        >
          Kembali ke Beranda
        </button>
      </section>
    </main>
  );
}
if (halaman === 'login') {
  return (
    <main className="app">
      <header className="hero">
        <div className="mark">🔐</div>
        <p className="eyebrow">AREA PENGURUS</p>
        <h1>Login Admin</h1>
        <p className="subtitle">Sauyunan RW 15</p>
      </header>

      <section className="content">
        <form onSubmit={loginAdmin}>
          <label>Email Admin</label>
          <input
            type="email"
            value={emailAdmin}
            onChange={(e) => setEmailAdmin(e.target.value)}
            required
            placeholder="Masukkan email admin"
          />

          <label>Kata Sandi</label>
          <input
            type="password"
            value={passwordAdmin}
            onChange={(e) => setPasswordAdmin(e.target.value)}
            required
            placeholder="Masukkan kata sandi"
          />

          <button className="menu-card" type="submit">
            Masuk sebagai Admin
          </button>

          <button
            className="menu-card"
            type="button"
            onClick={() => setHalaman('beranda')}
          >
            Kembali ke Beranda
          </button>
        </form>
      </section>
    </main>
  );
}
    if (halaman === 'pengaduan') {
    return (
      <main className="app">
        <header className="hero">
          <div className="mark">📢</div>
          <p className="eyebrow">LAYANAN WARGA</p>
          <h1>Pengaduan RW 15</h1>
          <p className="subtitle">
            Sampaikan keluhan atau laporan untuk lingkungan kita.
          </p>
        </header>

        <section className="content">
          <form onSubmit={async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from('pengaduan')
    .insert([
      {
        nama_pelapor: nama,
        rt: rt,
        kategori: kategori,
        judul: judul,
        isi_laporan: isiLaporan
      }
    ]);

  if (error) {
    alert('Pengaduan gagal disimpan. Silakan coba lagi.');
    console.error(error);
    return;
  }

  alert('Alhamdulillah, pengaduan berhasil dikirim!');
  setNama('');
  setRt('');
  setKategori('Infrastruktur');
  setJudul('');
  setIsiLaporan('');
}}>
            <label>Nama Pelapor</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Masukkan nama"
            />

            <label>RT</label>
            <select value={rt} onChange={(e) => setRt(e.target.value)} required>
              <option value="">Pilih RT</option>
              <option value="01">RT 01</option>
              <option value="02">RT 02</option>
              <option value="03">RT 03</option>
              <option value="04">RT 04</option>
              <option value="05">RT 05</option>
              <option value="06">RT 06</option>
            </select>

            <label>Kategori Pengaduan</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
            >
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Sosial">Sosial</option>
              <option value="Lainnya">Lainnya</option>
            </select>

            <label>Judul Laporan</label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              placeholder="Contoh: Lampu jalan mati"
            />

            <label>Isi Laporan</label>
            <textarea
              value={isiLaporan}
              onChange={(e) => setIsiLaporan(e.target.value)}
              required
              rows="5"
              placeholder="Jelaskan laporan dengan lengkap"
            />

            <button className="menu-card" type="submit">
              Kirim Pengaduan
            </button>

            <button
              className="menu-card"
              type="button"
              onClick={() => setHalaman('beranda')}
            >
              Kembali ke Beranda
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="mark">🤝</div>
        <p className="eyebrow">PORTAL LAYANAN WARGA</p>
        <h1>SAUYUNAN RW 15</h1>
        <p className="subtitle">
          Sauyunan, gotong royong, dan bersama membangun lingkungan.
        </p>
        <div className="welcome">Wilujeng Sumping, Warga RW 15!</div>
      </header>

      <section className="content">
        <div className="section-heading">
          <div>
            <p className="eyebrow green">LAYANAN LINGKUNGAN</p>
            <h2>Ada yang bisa kami bantu?</h2>
          </div>
        </div>

        <div className="menu-grid">
          {menu.map((item) => (
            <button
              className="menu-card"
              key={item.title}
              onClick={() => {
  if (item.title === 'Pengaduan') {
    setHalaman('pengaduan');
  } else {
    alert(`Menu ${item.title} akan diaktifkan pada tahap berikutnya.`);
  }
}}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
              <span className="menu-desc">{item.desc}</span>
              <span className="arrow">›</span>
            </button>
          ))}
        </div>
<button
  className="menu-card"
  onClick={() => setHalaman('login')}
>
  <span className="menu-icon">🔐</span>
  <span className="menu-title">Login Admin RW 15</span>
  <span className="menu-desc">
    Masuk khusus pengurus RW
  </span>
  <span className="arrow">›</span>
</button>
        <div className="notice">
          <span className="notice-icon">🌿</span>
          <div>
            <strong>RW 15 — Sauyunan untuk Semua</strong>
            <p>Mari jaga kerukunan, keamanan, dan kebersihan lingkungan kita.</p>
          </div>
        </div>
      </section>

      <footer>
        <strong>SAUYUNAN RW 15</strong>
        <p>Portal informasi dan pelayanan warga</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
