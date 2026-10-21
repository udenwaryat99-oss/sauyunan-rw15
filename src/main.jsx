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
