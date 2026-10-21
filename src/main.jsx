import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const menu = [
    { icon: '👨‍👩‍👧‍👦', title: 'Data Warga', desc: 'Informasi warga RW 15' },
    { icon: '📢', title: 'Pengaduan', desc: 'Sampaikan keluhan warga' },
    { icon: '📰', title: 'Berita RW', desc: 'Informasi terbaru lingkungan' },
    { icon: '📅', title: 'Kegiatan', desc: 'Agenda kegiatan warga' },
    { icon: '💰', title: 'Keuangan', desc: 'Informasi kas dan laporan' },
    { icon: '👤', title: 'Profil', desc: 'Informasi akun pengguna' },
  ];

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
              onClick={() => alert(
  `Menu ${item.title} akan diaktifkan setelah fitur dan database disiapkan.`
)}
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
