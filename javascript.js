'use strict';
// Tolak tampil di dalam bingkai situs lain (trik klik jebakan)
if (window.top !== window.self) { document.documentElement.innerHTML = ''; try { window.top.location = location.href; } catch { } throw new Error('dibingkai'); }
// ===== ISI DUA BARIS INI SETELAH PROYEK SUPABASE DIBUAT (kunci "Publishable" (sb_publishable_...), BUKAN kunci secret) =====
const CFG = { URL: 'https://bwrcloolvwxflgzvedee.supabase.co', KEY: 'sb_publishable_az8AFN-rIIMqH34Fj8yFFw_ZAQnCw7Y' };
const IS_PREVIEW = false; // true = data contoh di memori (hanya untuk melihat tampilan). Untuk dipakai sungguhan harus false.

// ===== ALAT BANTU =====
const $ = s => document.querySelector(s);
const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rp = n => 'Rp ' + Math.round(Number(n) || 0).toLocaleString('id-ID');
const num = s => Number(String(s ?? '').replace(/\D/g, '')) || 0;
const fmt = n => (n ? Number(n).toLocaleString('id-ID') : '');
const hari = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });
const tglP = i => new Date(i + 'T12:00:00Z').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const tglS = i => new Date(i + 'T12:00:00Z').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const bln = i => new Date(i + 'T12:00:00Z').toLocaleDateString('id-ID', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const blnAwal = i => i.slice(0, 8) + '01';
const tBln = (i, n) => { const [y, m] = i.split('-').map(Number); return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 10); };
const tHari = (i, n) => new Date(Date.parse(i + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
const SUMBER = { foto: 'Foto struk', manual: 'Ketik manual', bagi: 'Bagi tagihan' };
const LEMAH = /^(password|passw0rd|katasandi|qwerty|qwertyuiop|asdfghjkl|1234567890|12345678910|0123456789|abcdefghij|1q2w3e4r5t|admin12345|rahasia123)/i;
const I = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>', people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.5 2.5 3.5 5.5"/>',
  gear: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>', moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', back: '<path d="M15 5l-7 7 7 7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', lockc: '<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3M9.5 16l1.8 1.8 3.2-3.6"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', cam: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', check: '<path d="M5 12l5 5 9-10"/>', chev: '<path d="M9 6l6 6-6 6"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', up: '<path d="M6 15l6-6 6 6"/>', dn: '<path d="M6 9l6 6 6-6"/>', edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>', wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/>', bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>', cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>', phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>', swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>', arIn: '<path d="M12 5v14M6 13l6 6 6-6"/>', arOut: '<path d="M12 19V5M6 11l6-6 6 6"/>', wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/>', bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>', cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>', ewallet: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>', swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>', tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>', img: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>',
};
const ic = (n, s = 22, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const WA = '<svg width="22" height="22" viewBox="0 0 720 720" aria-hidden="true"><path fill="#25D366" d="M360,0C161.18,0,0,161.18,0,360c0,65.41,17.45,126.75,47.94,179.61L0,720l187.02-44.21c51.34,28.18,110.28,44.21,172.98,44.21,198.82,0,360-161.18,360-360S558.82,0,360,0ZM360,655.52c-60.17,0-116.13-17.98-162.82-48.87l-110.49,28.14,30.99-105.61c-33.53-47.93-53.2-106.26-53.2-169.19,0-163.21,132.31-295.52,295.52-295.52s295.52,132.31,295.52,295.52-132.31,295.52-295.52,295.52Z"/><path fill="#25D366" d="M444.35,407.52l87.1,41.06c4,1.88,6.56,5.94,6.2,10.34-.94,11.46-5.54,34.43-26.13,55.02-58.12,58.12-162.49-7.64-166.74-10.18-25.67-13.79-50.06-32.24-73.19-55.36s-41.58-47.52-55.37-73.19c-2.55-4.24-68.31-108.61-10.18-166.74,20.59-20.59,43.56-25.19,55.02-26.13,4.41-.36,8.46,2.2,10.34,6.2l41.07,87.1c1.94,4.12,1.09,9.02-2.13,12.24l-30.61,30.61c-6.62,6.62-8.56,16.93-4,25.11,11.17,20.03,26.19,39.32,43.59,57.07,17.75,17.4,37.04,32.43,57.07,43.59,8.18,4.56,18.48,2.62,25.11-4l30.61-30.61c3.22-3.22,8.12-4.08,12.24-2.13Z"/></svg>';
const rpS = n => n >= 1e6 ? 'Rp ' + (n / 1e6).toFixed(2).replace('.', ',').replace(/,?0+$/, '') + ' jt' : n >= 1e3 ? 'Rp ' + Math.round(n / 1e3) + ' rb' : 'Rp ' + n;

// ===== LAPISAN DATA (satu-satunya tempat bicara dengan database) =====
function RL() {
  if (!window.supabase) return null;
  const sb = supabase.createClient(CFG.URL, CFG.KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
  const ok = r => { if (r.error) throw r.error; return r.data; };
  const jejak = async p => { ok(await sb.from('jejak').insert({ peristiwa: p })); };
  sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT' && S.u) { S.u = null; go('masuk', 0, true); } });
  return {
    sesi: async () => (await sb.auth.getSession()).data.session?.user || null,
    masuk: async (e, p) => ok(await sb.auth.signInWithPassword({ email: e, password: p })).user,
    keluar: () => sb.auth.signOut(),
    sandi: async p => { ok(await sb.auth.updateUser({ password: p })); ok(await sb.from('pengaturan').update({ sandi_diganti: true }).eq('user_id', S.u.id)); await jejak('ganti_sandi'); },
    peng: async () => ok(await sb.from('pengaturan').select('tema,sandi_diganti,nama').maybeSingle()) || { tema: 'auto', sandi_diganti: false, nama: null },
    setPeng: async o => ok(await sb.from('pengaturan').update(o).eq('user_id', S.u.id)),
    kategori: async () => ok(await sb.from('kategori').select('id,nama,warna,jenis').order('urutan').order('nama')),
    katSimpan: async o => o.id ? ok(await sb.from('kategori').update({ nama: o.nama, warna: o.warna }).eq('id', o.id)) : ok(await sb.from('kategori').insert({ nama: o.nama, warna: o.warna, urutan: o.urutan, jenis: o.jenis || 'keluar' }).select('id').single()).id,
    katHapus: async (id, p) => ok(await sb.rpc('hapus_kategori', { p_id: id, p_pindah: p || null })),
    katUrut: async ids => ok(await sb.rpc('urut_kategori', { p_ids: ids })),
    rek: async () => ok(await sb.rpc('saldo_rekening', { p_bulan: blnAwal(hari()) })),
    rekSimpan: async o => o.id ? ok(await sb.from('rekening').update({ nama: o.nama, jenis: o.jenis, warna: o.warna }).eq('id', o.id)).length ?? o.id : ok(await sb.from('rekening').insert({ nama: o.nama, jenis: o.jenis, warna: o.warna, urutan: o.urutan, saldo_awal: o.saldo_awal || 0 }).select('id').single()).id,
    rekSaldo: async (id, selisih) => { const r = ok(await sb.from('rekening').select('saldo_awal').eq('id', id).single()); ok(await sb.from('rekening').update({ saldo_awal: Number(r.saldo_awal) + selisih }).eq('id', id)); },
    rekHapus: async id => { const { error } = await sb.from('rekening').delete().eq('id', id); if (error) throw error.code === '23503' ? ramah('Masih ada catatan atau pindah uang yang memakai rekening ini. Pindahkan dulu catatannya.') : error; },
    pindah: async o => ok(await sb.rpc('pindah_uang', { p: o })),
    hapusPindah: async id => ok(await sb.rpc('hapus_pindah', { p_id: id })),
    mutasi: async (rek, d, s) => ok(await sb.rpc('mutasi', { p_rek: rek, p_dari: d, p_sampai: s })),
    pindahList: async (d, s) => { let r = sb.from('pindah').select('tanggal,jumlah,biaya,a:rekening!pindah_dari_user_id_fkey(nama),b:rekening!pindah_ke_user_id_fkey(nama)').order('tanggal'); if (d) r = r.gte('tanggal', d); if (s) r = r.lt('tanggal', s); return ok(await r); },
    catatan: async ({ dari, sampai, q, kat, jenis, hal = 0, per = 30 }) => {
      let r = sb.from('catatan').select('id,tanggal,toko,kategori_id,total,ppn,sumber,jenis,rekening_id', { count: 'exact' }).order('tanggal', { ascending: false }).order('dibuat', { ascending: false }).range(hal * per, hal * per + per - 1);
      if (dari) r = r.gte('tanggal', dari); if (sampai) r = r.lt('tanggal', sampai); if (kat) r = r.eq('kategori_id', kat); if (jenis) r = r.eq('jenis', jenis);
      if (q) r = r.ilike('toko', '%' + q.replace(/[\\%_]/g, '\\$&') + '%');
      const x = await r; if (x.error) throw x.error; return { rows: x.data, total: x.count };
    },
    satu: async id => ok(await sb.from('catatan').select('*,barang(id,nama,jumlah,harga)').eq('id', id).single()),
    simpan: async o => ok(await sb.rpc('simpan_catatan', { p: o })),
    hapus: async id => { ok(await sb.from('catatan').delete().eq('id', id)); await jejak('hapus_catatan'); },
    ringkas: async (d, s) => ok(await sb.rpc('ringkasan', { p_dari: d, p_sampai: s })),
    deret: async (d, s, u) => ok(await sb.rpc('deret', { p_dari: d, p_sampai: s, p_satuan: u })),
    anggaran: async () => ok(await sb.from('anggaran').select('kunci,kategori_id,batas,berlaku_mulai')),
    atur: async a => ok(await sb.rpc('atur_anggaran', { p: a })),
    tagihan: async () => ok(await sb.from('tagihan').select('id,tanggal,judul,total,tagihan_peserta(nama,saya,bagian)').order('tanggal', { ascending: false }).order('dibuat', { ascending: false }).limit(100)),
    tagihanDetail: async id => ok(await sb.from('tagihan').select('*,tagihan_peserta(nama,saya,urutan,bagian),tagihan_barang(nama,harga,peserta)').eq('id', id).single()),
    simpanT: async o => ok(await sb.rpc('simpan_tagihan', { p: o })),
    hapusT: async id => ok(await sb.rpc('hapus_tagihan', { p_id: id })),
    terakhir: async () => (ok(await sb.from('jejak').select('waktu').eq('peristiwa', 'unduh_excel').order('waktu', { ascending: false }).limit(1))[0] || {}).waktu || null,
    jejak,
    excel: async (d, s) => {
      let out = [];
      for (let h = 0; h < 200; h++) {
        let r = sb.from('catatan').select('tanggal,toko,kategori_id,total,ppn,sumber,jenis,rekening_id,barang(nama,jumlah,harga)').order('tanggal').order('dibuat').range(h * 1000, h * 1000 + 999);
        if (d) r = r.gte('tanggal', d); if (s) r = r.lt('tanggal', s);
        const x = ok(await r); out = out.concat(x); if (x.length < 1000) break;
      }
      return out;
    },
    baca: async (g, t) => {
      const { data, error } = await sb.functions.invoke('baca-struk', { body: { gambar: g, tipe: t, kategori: KK().map(k => k.nama) } });
      if (error) { let m; try { m = (await error.context.json()).pesan; } catch { } throw ramah(m || 'Struknya belum bisa dibaca, coba lagi atau ketik manual'); }
      if (!data?.ok) throw ramah(data?.pesan || 'Struknya belum bisa dibaca');
      return data.data;
    },
  };
}

function PV() { // data contoh di memori, hanya saat IS_PREVIEW = true
  const kat = [['k1', 'Makan & Minum', '#1E3A8A'], ['k2', 'Belanja Harian', '#3B82C4'], ['k3', 'Transportasi', '#E0A030'], ['k5', 'Tagihan', '#0E9F8E'], ['k6', 'Kesehatan', '#D9645A'], ['k7', 'Rumah Tangga', '#4CAF7A'], ['k8', 'Hiburan', '#E57AA8'], ['k9', 'Pendidikan', '#6C7FD8'], ['k4', 'Lainnya', '#8A94A6'], ['m1', 'Gaji', '#1E3A8A', 'masuk'], ['m2', 'Bonus/THR', '#3B82C4', 'masuk'], ['m3', 'Usaha/Jualan', '#0E9F8E', 'masuk'], ['m4', 'Kiriman/Hadiah', '#E57AA8', 'masuk'], ['m5', 'Lainnya', '#8A94A6', 'masuk']].map(([id, nama, warna, jenis]) => ({ id, nama, warna, jenis: jenis || 'keluar' }));
  const H = hari(), M = blnAwal(H); let n = 50;
  const cat = [['Indomaret', 'k2', 87500, 7919, 'foto', 0, [['Susu UHT 1L', 2, 38000], ['Roti tawar', 1, 17500], ['Telur 1/2 kg', 1, 24000]]], ['Warung Bu Tini', 'k1', 42000, 0, 'foto', 0], ['Pertamina', 'k3', 100000, 0, 'foto', 1], ['Sate Pak Slamet', 'k1', 65000, 0, 'manual', 1], ['Bakso Joss', 'k1', 99900, 0, 'bagi', 1], ['Alfamart', 'k2', 210000, 18900, 'foto', 2], ['Gojek', 'k3', 38000, 0, 'manual', 3], ['Apotek K24', 'k4', 156000, 0, 'foto', 4], ['Kopi Kenangan', 'k1', 52000, 4700, 'foto', 5], ['Toko Buku', 'k4', 120000, 0, 'manual', 33], ['Gaji November', 'm1', 8500000, 0, 'manual', 0, null, 'masuk'], ['Kiriman dari Mama', 'm4', 250000, 0, 'manual', 1, null, 'masuk']].map((r, i) => ({ id: 'c' + i, toko: r[0], kategori_id: r[1], total: r[2], ppn: r[3], sumber: r[4], jenis: r[7] || 'keluar', tanggal: tHari(H, -r[5]), barang: (r[6] || []).map(b => ({ nama: b[0], jumlah: b[1], harga: b[2] })) }));
  let ang = [{ kunci: 'total', kategori_id: null, batas: 5000000, berlaku_mulai: M }, { kunci: 'k1', kategori_id: 'k1', batas: 500000, berlaku_mulai: M }, { kunci: 'k2', kategori_id: 'k2', batas: 400000, berlaku_mulai: M }, { kunci: 'k3', kategori_id: 'k3', batas: 140000, berlaku_mulai: M }];
  let tg = [{ id: 't1', tanggal: tHari(H, -1), judul: 'Bakso Joss', subtotal: 280000, ppn_persen: 11, ppn: 30800, total: 310800, mode: 'barang', tagihan_peserta: [{ nama: 'Saya', saya: true, urutan: 0, bagian: 99900 }, { nama: 'Rani', saya: false, urutan: 1, bagian: 116550 }, { nama: 'Dimas', saya: false, urutan: 2, bagian: 94350 }], tagihan_barang: [{ nama: 'Paket A', harga: 90000, peserta: [0] }, { nama: 'Paket B', harga: 105000, peserta: [1] }, { nama: 'Paket C', harga: 85000, peserta: [2] }] }];
  let rek = [{ id: 'r1', nama: 'Tunai', jenis: 'tunai', warna: '#8A94A6', saldo_awal: 350000 }, { id: 'r2', nama: 'BCA', jenis: 'bank', warna: '#1E3A8A', saldo_awal: 2000000 }, { id: 'r3', nama: 'GoPay', jenis: 'ewallet', warna: '#0E9F8E', saldo_awal: 150000 }];
  cat.forEach(c => c.rekening_id = c.jenis === 'masuk' ? 'r2' : 'r1'); let pin = [{ id: 'p1', tanggal: tHari(H, -1), dari: 'r2', ke: 'r3', jumlah: 500000, biaya: 0 }];
  const rg = (d, s) => cat.filter(c => c.tanggal >= d && c.tanggal < s);
  const w = x => new Promise(r => setTimeout(() => r(x), 150));
  return {
    sesi: async () => null, masuk: async () => ({ id: 'u1', email: 'vira@email.com' }), keluar: async () => { }, sandi: async () => { }, peng: async () => ({ tema: 'auto', sandi_diganti: true, nama: 'Vira' }), setPeng: async () => { },
    kategori: async () => kat.slice(),
    katSimpan: async o => { if (o.id) { Object.assign(kat.find(k => k.id === o.id), { nama: o.nama, warna: o.warna }); await w(); return o.id; } const id = 'k' + ++n; kat.push({ id, nama: o.nama, warna: o.warna, jenis: o.jenis || 'keluar' }); await w(); return id; },
    katHapus: async (id, p) => { if (p) cat.forEach(c => { if (c.kategori_id === id) c.kategori_id = p; }); else if (cat.some(c => c.kategori_id === id)) throw ramah('Masih dipakai'); kat.splice(kat.findIndex(k => k.id === id), 1); await w(); },
    katUrut: async ids => { kat.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); await w(); },
    rek: async () => w(rek.map(r => { const c = cat.filter(x => x.rekening_id === r.id), bln0 = blnAwal(H); return { ...r, saldo: r.saldo_awal + c.reduce((a, x) => a + (x.jenis === 'masuk' ? x.total : -x.total), 0) + pin.filter(p => p.ke === r.id).reduce((a, p) => a + p.jumlah, 0) - pin.filter(p => p.dari === r.id).reduce((a, p) => a + p.jumlah, 0), masuk: c.filter(x => x.jenis === 'masuk' && x.tanggal >= bln0).reduce((a, x) => a + x.total, 0) + pin.filter(p => p.ke === r.id && p.tanggal >= bln0).reduce((a, p) => a + p.jumlah, 0), keluar: c.filter(x => x.jenis === 'keluar' && x.tanggal >= bln0).reduce((a, x) => a + x.total, 0) + pin.filter(p => p.dari === r.id && p.tanggal >= bln0).reduce((a, p) => a + p.jumlah, 0) }; })),
    rekSimpan: async o => { if (o.id) { Object.assign(rek.find(r => r.id === o.id), { nama: o.nama, jenis: o.jenis, warna: o.warna }); await w(); return o.id; } const id = 'r' + ++n; rek.push({ id, nama: o.nama, jenis: o.jenis, warna: o.warna, saldo_awal: o.saldo_awal || 0 }); await w(); return id; },
    rekSaldo: async (id, sel) => { rek.find(r => r.id === id).saldo_awal += sel; await w(); },
    rekHapus: async id => { if (cat.some(c => c.rekening_id === id) || pin.some(p => p.dari === id || p.ke === id)) throw ramah('Masih ada catatan atau pindah uang yang memakai rekening ini. Pindahkan dulu catatannya.'); rek.splice(rek.findIndex(r => r.id === id), 1); await w(); },
    pindah: async o => { const id = 'p' + ++n; pin.push({ id, ...o }); if (o.biaya > 0) cat.push({ id: 'c' + ++n, toko: 'Biaya admin pindah uang', kategori_id: 'k5', total: o.biaya, ppn: 0, sumber: 'manual', jenis: 'keluar', tanggal: o.tanggal, rekening_id: o.dari, barang: [] }); return w(id); },
    hapusPindah: async id => { pin.splice(pin.findIndex(p => p.id === id), 1); await w(); },
    mutasi: async (rk, d, s) => { const u = cat.filter(c => c.rekening_id === rk).map(c => ({ id: c.id, tanggal: c.tanggal, judul: c.toko, info: (kat.find(k => k.id === c.kategori_id) || {}).nama, delta: c.jenis === 'masuk' ? c.total : -c.total, tipe: 'catatan' })).concat(pin.filter(p => p.dari === rk).map(p => ({ id: p.id, tanggal: p.tanggal, judul: 'Pindah ke ' + rek.find(r => r.id === p.ke).nama, info: 'Pindah uang', delta: -p.jumlah, tipe: 'pindah' })), pin.filter(p => p.ke === rk).map(p => ({ id: p.id, tanggal: p.tanggal, judul: 'Pindah dari ' + rek.find(r => r.id === p.dari).nama, info: 'Pindah uang', delta: p.jumlah, tipe: 'pindah' }))).sort((a, b) => a.tanggal.localeCompare(b.tanggal)); const sa = rek.find(r => r.id === rk).saldo_awal; if (sa) u.unshift({ id: rk, tanggal: u.length ? u[0].tanggal : H, judul: 'Saldo awal', info: 'Saldo yang diisi saat rekening ditambahkan atau dicocokkan', delta: sa, tipe: 'awal' }); let run = 0; u.forEach(x => { run += x.delta; x.saldo = run; }); return w(u.filter(x => x.tanggal >= d && x.tanggal < s).reverse()); },
    pindahList: async (d, s) => w(pin.filter(p => (!d || p.tanggal >= d) && (!s || p.tanggal < s)).map(p => ({ tanggal: p.tanggal, jumlah: p.jumlah, biaya: p.biaya || 0, a: { nama: rek.find(r => r.id === p.dari).nama }, b: { nama: rek.find(r => r.id === p.ke).nama } }))),
    catatan: async ({ dari, sampai, q, kat: k, jenis, hal = 0, per = 30 }) => { let r = cat.filter(c => (!dari || c.tanggal >= dari) && (!sampai || c.tanggal < sampai) && (!k || c.kategori_id === k) && (!jenis || c.jenis === jenis) && (!q || c.toko.toLowerCase().includes(q.toLowerCase()))).sort((a, b) => b.tanggal.localeCompare(a.tanggal)); return w({ rows: r.slice(hal * per, hal * per + per), total: r.length }); },
    satu: async id => w(JSON.parse(JSON.stringify(cat.find(c => c.id === id)))),
    simpan: async o => { const r = { jenis: 'keluar', rekening_id: 'r1', ...o, id: o.id || 'c' + ++n }; if (o.id) r.jenis = cat.find(c => c.id === o.id).jenis; const i = cat.findIndex(c => c.id === r.id); i < 0 ? cat.push(r) : cat[i] = r; return w(r.id); },
    hapus: async id => { cat.splice(cat.findIndex(c => c.id === id), 1); await w(); },
    ringkas: async (d, s) => { const m = {}; rg(d, s).forEach(c => { m[c.kategori_id] = m[c.kategori_id] || { kategori_id: c.kategori_id, jenis: c.jenis, jumlah: 0, banyak: 0 }; m[c.kategori_id].jumlah += c.total; m[c.kategori_id].banyak++; }); return w(Object.values(m)); },
    deret: async (d, s, u) => { const m = {}; rg(d, s).forEach(c => { const k = (u === 'month' ? blnAwal(c.tanggal) : c.tanggal) + '|' + c.jenis; m[k] = (m[k] || 0) + c.total; }); return w(Object.entries(m).map(([k, jumlah]) => ({ periode: k.split('|')[0], jenis: k.split('|')[1], jumlah }))); },
    anggaran: async () => w(ang), atur: async a => { a.forEach(x => { const k = x.kategori_id || 'total', i = ang.findIndex(r => r.kunci === k && r.berlaku_mulai === M); const r = { kunci: k, kategori_id: x.kategori_id || null, batas: x.batas, berlaku_mulai: M }; i < 0 ? ang.push(r) : ang[i] = r; }); await w(); },
    tagihan: async () => w(tg), tagihanDetail: async id => w(tg.find(t => t.id === id)),
    simpanT: async o => { const id = 't' + ++n; tg.unshift({ ...o, id, total: o.subtotal + o.ppn, tagihan_peserta: o.peserta.map((p, i) => ({ ...p, urutan: i })), tagihan_barang: o.barang }); return w(id); },
    hapusT: async id => { tg = tg.filter(t => t.id !== id); await w(); }, terakhir: async () => null, jejak: async () => { },
    excel: async () => cat, baca: async () => w({ toko: 'Indomaret Point', tanggal: H, total: 87500, ppn: 7919, kategori: 'Belanja Harian', perlu_cek: false, barang: [{ nama: 'Susu UHT 1L', jumlah: 2, harga: 38000 }, { nama: 'Roti tawar', jumlah: 1, harga: 17500 }, { nama: 'Telur 1/2 kg', jumlah: 1, harga: 24000 }] }),
  };
}

// ===== STATUS, PESAN, TAMPILAN DASAR =====
const S = { u: null, set: { tema: 'auto' }, kat: [], rek: [], cur: null, tok: 0, ip: null };
const ramah = m => { const e = new Error(m); e.ramah = 1; return e; };
const A = IS_PREVIEW ? PV() : RL();
const kn = id => S.kat.find(k => k.id === id) || { nama: 'Lainnya', warna: '#8A94A6' };
const rn = id => S.rek.find(r => r.id === id) || { nama: '', warna: '#8A94A6', jenis: 'bank' };
const rIc = j => j === 'tunai' ? 'cash' : j === 'ewallet' ? 'phone' : 'bank';
const RI = { tunai: 'cash', bank: 'bank', ewallet: 'ewallet' };
const rekPil = (on, label, id = 'o-rek') => `<div class="f"><label>${label}</label><input type="hidden" id="${id}" value="${E(on || '')}"><div class="row" style="flex-wrap:wrap;gap:8px">${S.rek.map(r => `<button class="pill row" style="gap:6px${r.id === on ? ';background:var(--pb);border-color:var(--pb);color:#fff' : ''}" data-a="rpilih" data-t="${id}" data-id="${E(r.id)}">${ic(RI[r.jenis] || 'wallet', 16)}${E(r.nama)}</button>`).join('')}<button class="pill" style="border-style:dashed;border-color:var(--pr);color:var(--pr)" data-a="rbaru">+ Tambah</button></div></div>`;
const KK = () => S.kat.filter(k => k.jenis !== 'masuk'), KM = () => S.kat.filter(k => k.jenis === 'masuk');
const jml = (rs, j) => rs.filter(r => (r.jenis || 'keluar') === j).reduce((a, r) => a + Number(r.jumlah), 0);
function pesan(e) {
  if (e?.ramah) return e.message;
  if (e?.status === 401 || e?.code === 'PGRST301' || /jwt/i.test(e?.message || '')) { S.u = null; go('masuk', 0, true); return 'Sesi habis, masuk lagi ya'; }
  if (!navigator.onLine || e instanceof TypeError || /fetch|network/i.test(e?.message || '')) return 'Tidak bisa tersambung. Cek internetmu.';
  if (/^(22|23)/.test(e?.code || '')) return 'Isiannya belum sesuai, cek lagi ya.';
  return 'Gagal, coba lagi sebentar.';
}
let tt;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 3200); }
function modal(h) { $('#mb').innerHTML = h; $('#mod').classList.add('on'); }
function tutup() { $('#mod').classList.remove('on'); $('#mb').innerHTML = ''; tutupK(); }
function tutupK() { const k = $('#kf'); if (k) { k.classList.remove('on'); k.innerHTML = ''; } }
// kartu konfirmasi: o = { j: judul, s: penjelasan, ya: tombol, r: merah, info: hanya tombol Mengerti }
function tanya(o, aksi, src) {
  let k = $('#kf'); if (!k) { k = document.createElement('div'); k.id = 'kf'; k.setAttribute('role', 'alertdialog'); document.body.appendChild(k); }
  k.innerHTML = `<div class="kc"><div class="b" style="font-size:17px">${o.j}</div>${o.s ? `<div class="mu s13 mt" style="line-height:1.55">${o.s}</div>` : ''}<div class="row g8 mt2">${o.info ? `<button class="btn" data-k="no">Mengerti</button>` : `<button class="btn o" data-k="no" style="height:48px">Batal</button><button class="btn ${o.r ? 'rr' : ''}" data-k="ya" style="height:48px" data-ld="${E(src?.dataset.ld || 'Sebentar…')}">${o.ya || 'Ya, lanjut'}</button>`}</div></div>`;
  k.classList.add('on'); S.kAksi = aksi; S.kSrc = src;
}
document.addEventListener('click', async e => {
  const b = e.target.closest('#kf [data-k]'); if (!b) { if (e.target.id === 'kf' && !$('#kf [disabled]')) tutupK(); return; }
  e.stopPropagation(); if (b.dataset.k === 'no') return tutupK(); if (b.disabled) return;
  const src = S.kSrc; if (src) for (const x in src.dataset) if (x !== 'a' && x !== 'ld') b.dataset[x] = src.dataset[x];
  const f = typeof S.kAksi === 'function' ? S.kAksi : H[S.kAksi]; await f(b); if (b.isConnected) tutupK();
}, true);
// aksi yang perlu dikonfirmasi dulu
const KON = {
  fsimpan: () => S.fo?.id ? { j: 'Simpan perubahan?', s: 'Catatan lama diganti dengan isi yang baru.', ya: 'Ya, simpan' } : { j: S.fo?.jenis === 'masuk' ? 'Simpan pemasukan ini?' : 'Simpan catatan ini?', s: `Total ${rp(num($('#o-tot')?.value || '0'))} akan dicatat.`, ya: 'Ya, simpan' },
  bsimpan: () => ({ j: 'Simpan tagihan ini?', s: 'Pembagian tagihan disimpan di Riwayat tagihan.', ya: 'Ya, simpan' }),
  asimpan: () => ({ j: 'Simpan anggaran?', s: 'Batas baru berlaku mulai bulan ini.', ya: 'Ya, simpan' }),
  uunduh: () => ({ j: 'Unduh Excel sekarang?', s: 'File Excel berisi catatanmu akan diunduh ke perangkat ini.', ya: 'Ya, unduh' }),
  ksimpan: () => ({ j: S.ke?.id ? 'Simpan perubahan kategori?' : 'Tambah kategori ini?', ya: 'Ya, simpan' }),
  rsimpan: () => ({ j: S.re?.id ? 'Simpan perubahan rekening?' : 'Tambah rekening ini?', s: S.re?.id ? 'Kalau saldonya diganti, selisihnya disesuaikan otomatis.' : '', ya: 'Ya, simpan' }),
  psimpan: () => ({ j: 'Pindahkan uang sekarang?', s: `${rp(num($('#pj')?.value || '0'))} dipindah dari ${E(rn($('#pd')?.value).nama || '-')} ke ${E(rn($('#pk')?.value).nama || '-')}.`, ya: 'Ya, pindahkan' }),
  rhapus: () => S.rek.length <= 1 ? { j: 'Rekening ini belum bisa dihapus', s: 'Minimal harus ada satu rekening. Tambah rekening lain dulu, baru hapus yang ini.', info: 1 } : { j: `Hapus rekening ${E(S.rek.find(r => r.id === S.re?.id)?.nama || '')}?`, s: 'Rekening hanya bisa dihapus kalau sudah tidak dipakai catatan atau pindah uang. Yang sudah dihapus tidak bisa dikembalikan.', ya: 'Ya, hapus', r: 1 },
};
function render(h) { $('#v').innerHTML = h; scrollTo(0, 0); }
async function busy(b, fn) {
  if (b.disabled) return; const old = b.innerHTML; b.disabled = true; b.innerHTML = '<span class="sp-in"></span>' + E(b.dataset.ld || 'Sebentar…');
  try { return await fn(); } catch (e) { toast(pesan(e)); } finally { if (b.isConnected) { b.disabled = false; b.innerHTML = old; } }
}
function tema() {
  const t = S.set.tema, g = t === 'gelap' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dk', g); document.querySelector('meta[name=theme-color]').content = g ? '#0B1220' : '#1E3A8A'; return g;
}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', tema);
const head = (t, kanan = '', back = true) => `<div class="top">${back ? `<button class="ib" data-a="back" aria-label="Kembali">${ic('back')}</button>` : ''}<div class="h1 fl" style="font-size:${back ? 20 : 22}px">${E(t)}</div>${kanan}</div>`;
const ibtn = (a, i, l, x = '') => `<button class="ib" data-a="${a}" ${x} aria-label="${l}">${ic(i, 20)}</button>`;
const btn = (a, t, c = '', x = '', ld = '') => `<button class="btn ${c}" data-a="${a}" ${x} data-ld="${E(ld)}">${t}</button>`;
const empty = (i, t, s) => `<div class="card c" style="padding:30px 20px"><div style="color:var(--pr)">${ic(i, 34)}</div><div class="b mt">${t}</div><div class="mu s13 mt">${s}</div></div>`;
const loading = () => render('<div class="c mu" style="padding-top:38vh"><span class="sp-in" style="width:34px;height:34px;color:var(--pr);display:inline-block"></span><div class="s13 mt">Memuat…</div></div>');
const opsiKat = (v, semua, j = 'keluar') => (semua ? '<option value="">Semua kategori</option>' : '') + S.kat.filter(k => (k.jenis || 'keluar') === j).map(k => `<option value="${E(k.id)}" ${k.id === v ? 'selected' : ''}>${E(k.nama)}</option>`).join('');
const baris = c => `<button class="item" data-a="buka" data-id="${E(c.id)}"><span class="av" style="background:${E(kn(c.kategori_id).warna)}22;color:${E(kn(c.kategori_id).warna)}">${E((c.toko || '?')[0].toUpperCase())}</span><span class="fl"><div class="b s13" style="font-size:14px">${E(c.toko)}</div><div class="mu s12" style="margin-top:2px">${E(kn(c.kategori_id).nama)} · ${c.rekening_id && rn(c.rekening_id).nama ? E(rn(c.rekening_id).nama) : c.jenis === 'masuk' ? 'Pemasukan' : SUMBER[c.sumber] || ''}</div></span>${c.jenis === 'masuk' ? `<b style="font-size:14px;color:var(--pr)">+${fmt(c.total)}</b>` : `<b style="font-size:14px">-${fmt(c.total)}</b>`}</button>`;
function pickB(rows, kunci, tgl) { const r = (rows || []).filter(x => x.kunci === kunci && x.berlaku_mulai <= tgl).sort((a, b) => b.berlaku_mulai.localeCompare(a.berlaku_mulai))[0]; return r ? Number(r.batas) : 0; }

// ===== NAVIGASI =====
const TAB = { beranda: 'beranda', namaku: 'beranda', kategori: 'beranda', dompet: 'beranda', rekDetail: 'beranda', pindah: 'beranda', daftar: 'beranda', pengaturan: 'beranda', unduh: 'beranda', laporan: 'laporan', anggaran: 'anggaran', aturAnggaran: 'anggaran', bagi: 'bagi', riwayat: 'bagi', tagihanDetail: 'bagi' };
function go(v, p, ganti) { S.cur = [v, p]; history[ganti ? 'replaceState' : 'pushState']({ v, p: p || null }, ''); draw(); }
addEventListener('popstate', e => { S.cur = e.state ? [e.state.v, e.state.p] : [S.u ? 'beranda' : 'masuk']; if (!S.u && S.cur[0] !== 'masuk') S.cur = ['masuk']; draw(); });
function nav(v) {
  const it = [['beranda', 'Beranda', 'home'], ['laporan', 'Laporan', 'chart'], ['scan', '', 'plus'], ['anggaran', 'Anggaran', 'target'], ['bagi', 'Bagi', 'people']];
  $('#nv').innerHTML = TAB[v] ? `<nav class="nav">${it.map(([k, l, i]) => k === 'scan' ? `<button class="plus" data-a="plus" aria-label="Catat baru">${ic('plus', 26, 2.2)}</button>` : `<button class="${TAB[v] === k ? 'on' : ''}" data-a="nav" data-v="${k}">${ic(i)}${l}</button>`).join('')}</nav>` : '';
}
async function draw() {
  const [v, p] = S.cur, t = ++S.tok; S.t = t; tutup(); nav(v); tema();
  try { if (!R[v]) throw 0; await R[v](p || {}, () => t === S.tok); } catch (e) { if (t === S.tok) { render(`<div class="card c mt2"><div class="b">Belum bisa dibuka</div><div class="mu s13 mt">${E(pesan(e))}</div><div class="mt">${btn('nav', 'Coba lagi', '', 'data-v="beranda"')}</div></div>`); } }
}

// ===== LAYAR =====
const R = {};
R.masuk = () => {
  render(`<div class="c" style="padding-top:64px"><img src="./icon-192.png" width="84" height="84" alt="" style="border-radius:22px;box-shadow:0 10px 24px rgba(15,35,71,.25)"><div class="h1 mt" style="font-size:26px">Tracker Money</div><div class="mu s13" style="margin-top:4px">Catat pengeluaran tinggal foto struk</div></div>
  <form id="fm" style="margin-top:30px"><div class="if">${ic('user')}<input id="em" type="email" autocomplete="username" aria-label="Email" placeholder="nama@email.com" maxlength="120"></div>
  <div class="if">${ic('lock')}<input id="pw" type="password" autocomplete="current-password" aria-label="Kata sandi" maxlength="100"><button type="button" data-a="mata" aria-label="Lihat sandi">${ic('eye', 20)}</button></div>
  <div class="mt2"><button class="btn" id="bm" data-ld="Masuk…">Masuk</button></div></form>
  <div class="c mu s13" style="margin-top:18px;line-height:1.5">Lupa kata sandi? Minta Vira untuk meresetnya.</div><div class="c mu s12" style="margin-top:40px">Akun dibuat oleh Vira. Belum bisa daftar sendiri.</div>`);
  $('#fm').onsubmit = ev => { ev.preventDefault(); busy($('#bm'), async () => {
    const e = $('#em').value.trim(), p = $('#pw').value; if (!e || !p) throw ramah('Isi email dan kata sandinya dulu');
    try { S.u = await A.masuk(e, p); } catch (x) { throw ramah(x?.status === 400 || /invalid/i.test(x?.message || '') ? 'Email atau kata sandi salah' : pesan(x)); }
    await mulai();
  }); };
};
R.gantiSandi = (p) => {
  render(`${p.sukarela ? head('Ganti kata sandi') : ''}<div style="padding-top:${p.sukarela ? 20 : 60}px"><div class="h1" style="font-size:24px">${p.sukarela ? 'Kata sandi baru' : 'Buat kata sandi baru'}</div>${p.sukarela ? '' : '<div class="mu s13 mt" style="line-height:1.5">Kata sandi dari Vira cuma sementara. Ganti dulu supaya hanya kamu yang tahu.</div>'}
  <form id="fm"><div class="if">${ic('lock')}<input id="p1" type="password" autocomplete="new-password" aria-label="Kata sandi baru" maxlength="100" data-i="sandi"><button type="button" data-a="mata" aria-label="Lihat sandi">${ic('eye', 20)}</button></div>
  <div class="if">${ic('lockc')}<input id="p2" type="password" autocomplete="new-password" aria-label="Ulangi kata sandi" maxlength="100" data-i="sandi"></div></form>
  <div class="card" id="ck"></div><div class="mt2"><button class="btn" id="bs" data-ld="Menyimpan…">Simpan${p.sukarela ? '' : ' dan masuk'}</button></div></div>`);
  const cek = () => { const a = $('#p1').value, b = $('#p2').value, lo = (S.u?.email || '').split('@')[0].toLowerCase(); const r = [[a.length >= 10, 'Minimal 10 karakter'], [a.length > 0 && !LEMAH.test(a) && !/^(.)\1+$/.test(a) && !(lo.length >= 4 && a.toLowerCase().includes(lo)), 'Bukan yang gampang ditebak'], [a.length > 0 && a === b, 'Kedua isian sama']];
    $('#ck').innerHTML = r.map(([o, t]) => `<div class="row s13" style="margin:6px 0;color:${o ? 'var(--gfg)' : 'var(--mu)'}"><span class="tag ${o ? 'g' : 'n'}" style="padding:2px 4px">${o ? ic('check', 12, 3) : '&nbsp;&nbsp;'}</span>${t}</div>`).join(''); return r.every(x => x[0]); };
  cek(); S.cek = cek;
  $('#fm').onsubmit = ev => ev.preventDefault();
  $('#bs').onclick = () => busy($('#bs'), async () => { if (!cek()) throw ramah('Kata sandinya belum memenuhi syarat'); await A.sandi($('#p1').value); S.set.sandi_diganti = true; toast('Kata sandi sudah diganti'); p.sukarela ? history.back() : go(S.set.nama ? 'beranda' : 'namaku', {}, true); });
};
R.namaku = p => {
  render(`${p.sukarela ? head('Nama panggilan') : ''}<div style="padding-top:${p.sukarela ? 20 : 60}px"><div class="h1" style="font-size:24px">Mau dipanggil siapa?</div><div class="mu s13 mt" style="line-height:1.5">Nama ini muncul di Beranda dan sebagai namamu di Bagi tagihan.</div>
  <div class="if">${ic('user')}<input id="nk" maxlength="30" aria-label="Nama panggilan" placeholder="Misal: Vira" value="${E(S.set.nama || '')}"></div><div class="mt2"><button class="btn" id="bn" data-ld="Menyimpan…">Simpan</button></div></div>`);
  $('#bn').onclick = () => busy($('#bn'), async () => { const v = $('#nk').value.trim().replace(/\s+/g, ' '); if (!v) throw ramah('Isi nama panggilanmu dulu'); await A.setPeng({ nama: v }); S.set.nama = v; toast('Tersimpan'); p.sukarela ? history.back() : go('beranda', 0, true); });
};
R.beranda = async (p, ok) => {
  loading(); const H = hari(), M = blnAwal(H), N = tBln(M, 1);
  const [rs, ag, rec, last, rk] = await Promise.all([A.ringkas(M, N), A.anggaran(), A.catatan({ dari: M, sampai: N, per: 3 }), A.terakhir(), A.rek()]); if (!ok()) return; S.rek = rk;
  const rsK = rs.filter(r => (r.jenis || 'keluar') === 'keluar'), tot = jml(rs, 'keluar'), msk = jml(rs, 'masuk'), bt = pickB(ag, 'total', H), jam = +new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Jakarta' }) % 24;
  const sal = jam < 11 ? 'Selamat pagi' : jam < 15 ? 'Selamat siang' : jam < 18 ? 'Selamat sore' : 'Selamat malam'; const Nm = S.set.nama || '';
  const gelap = tema(), C = 213.63; let acc = 0;
  const seg = rsK.filter(r => r.jumlah > 0).sort((a, b) => b.jumlah - a.jumlah).map(r => { const l = r.jumlah / tot * C, o = `<circle cx="44" cy="44" r="34" stroke="${E(kn(r.kategori_id).warna)}" stroke-dasharray="${l.toFixed(2)} ${(C - l).toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}"/>`; acc += l; return [o, r]; });
  const backup = +H.slice(8) <= 7 && rec.rows.length && (!last || last.slice(0, 10) < M);
  render(`<div class="top"><div class="fl"><div class="mu s13">${sal}</div><div class="h1">${E(Nm || 'Halo')}</div></div>${ibtn('tema', gelap ? 'sun' : 'moon', gelap ? 'Mode terang' : 'Mode gelap')}${ibtn('nav', 'gear', 'Pengaturan', 'data-v="pengaturan"')}</div>
  <div class="hero"><div class="s12">${msk ? 'Sisa uang ' : 'Pengeluaran '}${E(bln(M))}</div><div class="big">${msk ? (msk < tot ? '-' : '') + rp(Math.abs(msk - tot)) : rp(tot)}</div>
  <div class="row g8" style="margin-top:14px">${[['arIn', 'Pemasukan', msk], ['arOut', 'Pengeluaran', tot]].map(([i, l, v]) => `<div class="fl" style="padding:10px 12px;border-radius:16px;background:rgba(255,255,255,.12)"><div class="row s12" style="gap:6px;color:rgba(255,255,255,.8)">${ic(i, 14, 2.4)}${l}</div><div class="b" style="font-size:15px;margin-top:3px">${rp(v)}</div></div>`).join('')}</div>
  ${bt ? `<div class="s12" style="margin-top:10px">Anggaran pengeluaran: ${tot > bt ? 'lewat ' + rp(tot - bt) : 'sisa ' + rp(bt - tot)} dari ${rp(bt)}</div>` : `<div class="s12" style="margin-top:10px">Belum ada anggaran. Atur di menu Anggaran.</div>`}</div>
  <button class="card" style="display:block;width:100%;text-align:left" data-a="nav" data-v="dompet"><div class="row sp"><span class="row g8 b" style="font-size:15px">${ic('wallet', 20)}Dompet & rekening</span><span class="row b s13" style="gap:4px;color:var(--pr)">${rp(rk.reduce((a, r) => a + Number(r.saldo), 0))}${ic('chev', 16)}</span></div><div class="row g8" style="margin-top:12px;overflow-x:auto;scrollbar-width:none">${rk.map(r => `<span style="flex:none;padding:8px 12px;border-radius:14px;background:var(--bgs);font-size:12px"><span class="row mu" style="gap:6px"><i style="width:8px;height:8px;border-radius:4px;background:${E(r.warna)}"></i>${E(r.nama)}</span><b style="display:block;margin-top:2px">${fmt(r.saldo) || 0}</b></span>`).join('')}</div></button>
  ${backup ? `<div class="note w">Sudah awal bulan. Unduh cadangan datamu dulu ya.<div class="mt">${btn('nav', 'Unduh cadangan', 'o', 'data-v="unduh" style="height:44px"')}</div></div>` : ''}
  <div class="card"><div class="b" style="font-size:15px">Pengeluaran per kategori</div>${seg.length ? `<div class="row mt" style="gap:16px"><svg width="110" height="110" viewBox="0 0 88 88" role="img" aria-label="Pengeluaran per kategori"><g fill="none" stroke-width="10" transform="rotate(-90 44 44)"><circle cx="44" cy="44" r="34" style="stroke:var(--trk)"/>${seg.map(s => s[0]).join('')}</g></svg><div class="fl">${seg.map(([, r]) => `<div class="row sp s13" style="margin:5px 0"><span class="row g8"><i style="width:10px;height:10px;border-radius:5px;background:${E(kn(r.kategori_id).warna)}"></i>${E(kn(r.kategori_id).nama)}</span><b>${rp(r.jumlah)}</b></div>`).join('')}</div></div>` : `<div class="mu s13 mt">Belum ada pengeluaran bulan ini. Foto struk pertamamu pakai tombol +</div>`}</div>
  <div class="row sp" style="margin-top:18px"><div class="b" style="font-size:16px">Terbaru</div><button class="b s13" style="color:var(--pr)" data-a="nav" data-v="daftar">Lihat semua</button></div>
  <div class="card" style="padding:2px 16px;margin-top:8px">${rec.rows.length ? rec.rows.map(baris).join('') : '<div class="mu s13" style="padding:14px 0">Belum ada catatan.</div>'}</div>`);
};
R.daftar = async (p, ok) => {
  const F = S.fd = { bln: blnAwal(hari()), q: '', kat: '', jenis: '', hal: 0, rows: [] };
  render(`${head('Semua catatan')}
  <div class="row g8" style="margin-top:10px"><div class="if fl" style="height:48px;margin-top:0">${ic('search', 20)}<input id="fq" placeholder="Cari nama atau keterangan" aria-label="Cari" maxlength="60" data-i="fd" style="font-size:14px"></div><label class="chip" style="padding:0 8px;height:48px;display:flex;align-items:center;border-radius:24px"><input id="fb" type="month" value="${F.bln.slice(0, 7)}" aria-label="Bulan" style="border:0;background:none;height:40px;font-weight:700;font-size:12px;width:128px" data-i="fd"></label></div>
  <div class="chips" id="fj"></div><div class="chips" id="fk"></div><div class="card row sp s13" id="ds" style="display:none"></div><div class="card" id="dl" style="padding:2px 16px"></div><div class="c mu s12 mt" id="dm"></div>`);
  const chips = () => { $('#fj').innerHTML = [['', 'Semua'], ['keluar', 'Keluar'], ['masuk', 'Masuk']].map(([j, n]) => `<button class="chip ${F.jenis === j ? 'on' : ''}" data-a="fj" data-j="${j}">${n}</button>`).join('');
    $('#fk').innerHTML = F.jenis ? [['', 'Semua kategori'], ...S.kat.filter(k => (k.jenis || 'keluar') === F.jenis).map(k => [k.id, k.nama])].map(([id, n]) => `<button class="chip ${F.kat === id ? 'on' : ''}" data-a="fk" data-id="${E(id)}">${E(n)}</button>`).join('') : ''; $('#fk').style.display = F.jenis ? '' : 'none'; };
  chips(); S.fchips = chips; await muatD(true, ok);
};
async function muatD(reset, ok) {
  const F = S.fd; if (reset) { F.hal = 0; F.rows = []; } const tok = S.tok;
  const [r, rs] = await Promise.all([A.catatan({ dari: F.bln || null, sampai: F.bln ? tBln(F.bln, 1) : null, q: F.q, kat: F.kat, jenis: F.jenis, hal: F.hal }), reset && F.bln ? A.ringkas(F.bln, tBln(F.bln, 1)) : null]); if (tok !== S.tok || !$('#dl')) return; F.rows = F.rows.concat(r.rows);
  if (reset) { const d = $('#ds'); d.style.display = rs ? '' : 'none'; if (rs) d.innerHTML = `<span>Masuk <b style="color:var(--pr)">+${fmt(jml(rs, 'masuk')) || 0}</b></span><span>Keluar <b>-${fmt(jml(rs, 'keluar')) || 0}</b></span>`; }
  let tg = '', h = ''; F.rows.forEach(c => { if (c.tanggal !== tg) { tg = c.tanggal; h += `<div class="s12 mu b" style="padding:12px 0 2px">${tglP(tg)}</div>`; } h += baris(c); });
  $('#dl').innerHTML = F.rows.length ? h : '<div class="mu s13 c" style="padding:20px 0">Tidak ada catatan.</div>';
  $('#dm').innerHTML = F.rows.length ? `Menampilkan ${F.rows.length} dari ${r.total} catatan${F.rows.length < r.total ? `<div class="mt">${btn('fmore', 'Muat lagi', 'o', 'style="height:44px"', 'Memuat…')}</div>` : ''}` : '';
}
R.scan = () => {
  render(`${head('Foto struk')}<div class="cam" id="cam">${ic('cam', 44)}<div class="b" style="color:#fff;font-size:16px">Foto struknya yang jelas ya</div><div class="s13" style="line-height:1.5">Taruh di tempat terang dan rata, seluruh struk masuk gambar.</div></div>
  <input id="f1" type="file" accept="image/*" capture="environment" hidden><input id="f2" type="file" accept="image/*" hidden>
  <div class="mt2">${btn('amb', ic('cam', 20) + 'Ambil foto struk')}</div><div class="mt">${btn('gal', ic('img', 20) + 'Pilih dari galeri', 'o')}</div><div class="mt">${btn('nav', 'Ketik manual', 'o', 'data-v="form" style="border-color:transparent"')}</div>
  <div class="note w">Jangan foto struk yang memuat nomor kartu, nama lengkap, atau nomor HP. Struk dibaca AI lalu fotonya langsung dibuang, tidak disimpan.</div>`);
  const pasang = el => el.onchange = () => { const f = el.files[0]; el.value = ''; if (f) bacaFile(f); }; pasang($('#f1')); pasang($('#f2'));
};
async function kecil(f) {
  if (!/^image\//.test(f.type) || f.size > 25e6) throw ramah('Fotonya tidak bisa dipakai, coba foto lagi');
  let bm, u; try { bm = await createImageBitmap(f, { imageOrientation: 'from-image' }); } catch { bm = await new Promise((a, b) => { const i = new Image(); i.onload = () => a(i); i.onerror = () => b(ramah('Fotonya tidak bisa dibuka')); i.src = u = URL.createObjectURL(f); }); }
  const w = bm.width || bm.naturalWidth, h = bm.height || bm.naturalHeight, k = Math.min(1, 1280 / Math.max(w, h)), c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext('2d').drawImage(bm, 0, 0, c.width, c.height); if (u) URL.revokeObjectURL(u);
  for (const q of [.8, .65, .5, .4]) { const d = c.toDataURL('image/jpeg', q); if (d.length < 1.8e6) return d.split(',')[1]; } throw ramah('Fotonya terlalu besar, coba foto lagi');
}
async function bacaFile(f) {
  const cam = $('#cam'), lama = cam.innerHTML, tok = S.tok; document.querySelectorAll('#v .btn').forEach(b => b.disabled = true); cam.innerHTML = '<span class="sp-in" style="width:38px;height:38px;color:#9DB8F0"></span><div class="b" style="color:#fff">Membaca struk…</div><div class="s13">Sebentar ya, biasanya kurang dari 10 detik.</div>';
  try { const h = await A.baca(await kecil(f), 'image/jpeg'); if (tok === S.tok) go('form', { hasil: h }); } catch (e) { if (tok === S.tok) { toast(pesan(e)); cam.innerHTML = lama; document.querySelectorAll('#v .btn').forEach(b => b.disabled = false); } }
}
R.form = async (p, ok) => {
  let F;
  if (p.draft) F = p.draft;
  else if (p.id) { loading(); const d = await A.satu(p.id); if (!ok()) return; F = { id: d.id, rekening_id: d.rekening_id, jenis: d.jenis || 'keluar', toko: d.toko, tanggal: d.tanggal, kategori_id: d.kategori_id, total: d.total, ppn: d.ppn, sumber: d.sumber, barang: d.barang }; }
  else if (p.hasil) { const h = p.hasil, K = KK(); F = { jenis: 'keluar', toko: h.toko, tanggal: h.tanggal || hari(), kategori_id: (K.find(k => k.nama === h.kategori) || K.find(k => k.nama === 'Lainnya') || K[K.length - 1] || {}).id, total: h.total, ppn: h.ppn, sumber: 'foto', barang: h.barang, cek: h.perlu_cek }; }
  else { const j = p.jenis === 'masuk' ? 'masuk' : 'keluar'; F = { jenis: j, toko: '', tanggal: hari(), kategori_id: (j === 'masuk' ? KM() : KK())[0]?.id, total: 0, ppn: 0, sumber: 'manual', barang: [] }; }
  if (!S.rek.length) { S.rek = await A.rek(); if (!ok()) return; }
  if (!F.rekening_id) F.rekening_id = (F.jenis === 'masuk' ? S.rek.find(r => r.jenis !== 'tunai') || S.rek[0] : S.rek[0] || {}).id;
  if (F.ppnx == null) { const s = (F.barang || []).reduce((a, b) => a + Number(b.harga), 0); F.ppnx = F.ppn > 0 && s > 0 && Math.abs(s + Number(F.ppn) - F.total) < Math.abs(s - F.total); }
  S.fo = F; const baru = !F.id, mk = F.jenis === 'masuk', judul = p.hasil ? 'Cek hasil bacaan' : mk ? (baru ? 'Catat pemasukan' : 'Ubah pemasukan') : baru ? 'Catat pengeluaran' : 'Ubah catatan';
  if (mk) {
    render(`${head(judul)}<div class="card c" style="padding:18px 16px"><div class="mu s12 b">Jumlah yang masuk</div><input class="in mn" id="o-tot" inputmode="numeric" placeholder="0" aria-label="Jumlah" value="${fmt(F.total)}" style="font-size:28px;font-weight:800;text-align:center;height:60px;border:0;box-shadow:none;color:var(--pr);margin-top:4px"></div>
    <div class="f"><label>Keterangan</label><input class="in" id="o-toko" maxlength="80" placeholder="Misal: Gaji November" value="${E(F.toko)}"></div><div class="f"><label>Tanggal</label><input class="in" id="o-tgl" type="date" value="${E(F.tanggal)}"></div>
    <div class="f"><label>Kategori pemasukan</label><input type="hidden" id="o-kat" value="${E(F.kategori_id || '')}"><div class="row" style="flex-wrap:wrap;gap:8px">${KM().map(k => `<button class="pill ${k.id === F.kategori_id ? 'on' : ''}" data-a="kpilih" data-id="${E(k.id)}">${E(k.nama)}</button>`).join('')}<button class="pill" style="border-style:dashed;border-color:var(--pr);color:var(--pr)" data-a="kbaru" data-j="masuk">+ Kategori baru</button></div></div>
    ${rekPil(F.rekening_id, 'Masuk ke')}<div class="mt2">${btn('fsimpan', 'Simpan pemasukan', '', '', 'Menyimpan…')}</div>${baru ? '' : `<div class="mt">${btn('fhapus', 'Hapus pemasukan ini', 'r')}</div>`}`);
    return;
  }
  const br = b => `<div class="br row g8" style="margin-top:8px"><input class="in mini fl" data-k="n" placeholder="Nama barang" maxlength="80" value="${E(b.nama)}"><input class="in mini" data-k="j" inputmode="decimal" style="width:52px" aria-label="Jumlah" value="${E(b.jumlah)}"><input class="in mini mn" data-k="h" inputmode="numeric" style="width:92px" aria-label="Harga" value="${fmt(b.harga)}"><button data-a="bx" class="mu" aria-label="Hapus barang">${ic('x', 18)}</button></div>`;
  render(`${head(judul)}${p.hasil ? `<div class="note ${F.cek ? 'w' : 'g'}">${F.cek ? 'Ada yang kurang jelas dibaca. Cek dulu sebelum disimpan.' : 'Struk sudah terbaca. Cek sekali lagi, lalu simpan.'}</div>` : ''}
  <div class="f"><label>Nama toko</label><input class="in" id="o-toko" maxlength="80" value="${E(F.toko)}"></div><div class="f"><label>Tanggal</label><input class="in" id="o-tgl" type="date" value="${E(F.tanggal)}"></div><div class="f"><label>Kategori</label><select class="in" id="o-kat">${opsiKat(F.kategori_id)}</select></div>
  <div class="row g8" style="align-items:flex-start"><div class="f fl"><label>Total bayar</label><input class="in mn" id="o-tot" inputmode="numeric" value="${fmt(F.total)}"></div><div class="f fl"><label>PPN (pajak, kalau ada)</label><input class="in mn" id="o-ppn" inputmode="numeric" value="${fmt(F.ppn)}"></div></div><div class="mu s12" id="o-th" style="margin-top:6px;line-height:1.5"></div>
  <label id="o-pxw" class="row s13" style="gap:8px;margin-top:8px;display:none"><input type="checkbox" id="o-px" ${F.ppnx ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--pb)">Harga barang belum termasuk PPN (tambahkan ke total)</label>
  ${rekPil(F.rekening_id, 'Bayar pakai')}
  <div class="card"><div class="row sp"><div class="mu s12 b" id="bc">Barang</div><button class="b s13" style="color:var(--pr)" data-a="bt">+ Tambah</button></div><div id="bl">${F.barang.map(br).join('')}</div><div id="bs" class="s12 mt"></div></div>
  <div class="mt2">${btn('fsimpan', 'Simpan', '', '', 'Menyimpan…')}</div>${baru ? '' : `<div class="mt">${btn('fhapus', 'Hapus catatan ini', 'r')}</div>`}`);
  S.brHtml = br; selisih();
};
const bacaP = () => ({ jumlah: num($('#pj').value), dari: $('#pd').value, ke: $('#pk').value, tanggal: $('#pt').value, biaya: num($('#pb').value) });
function bacaF() {
  const F = S.fo; F.toko = $('#o-toko').value.trim(); F.tanggal = $('#o-tgl').value; F.kategori_id = $('#o-kat').value; F.ppn = $('#o-ppn') ? num($('#o-ppn').value) : 0; if ($('#o-rek')) F.rekening_id = $('#o-rek').value; F.ppnx = !!$('#o-px')?.checked;
  F.barang = [...document.querySelectorAll('.br')].map(r => ({ nama: r.querySelector('[data-k=n]').value.trim(), jumlah: Number(String(r.querySelector('[data-k=j]').value).replace(',', '.')) || 1, harga: num(r.querySelector('[data-k=h]').value) })).filter(b => b.nama || b.harga);
  F.otomatis = F.jenis !== 'masuk' && F.barang.length > 0; F.total = F.otomatis ? F.barang.reduce((a, b) => a + b.harga, 0) + (F.ppnx ? F.ppn : 0) : num($('#o-tot').value); return F;
}
// Total dihitung otomatis dari barang. Kalau belum ada barang, Total diisi sendiri.
function selisih() {
  const c = $('#bc'), t = $('#bs'), o = $('#o-tot'); if (!c) return; const F = bacaF(); c.textContent = `Barang (${F.barang.length})`;
  o.readOnly = F.otomatis; o.classList.toggle('ro', F.otomatis); if (F.otomatis) o.value = fmt(F.total);
  $('#o-pxw').style.display = F.otomatis && F.ppn > 0 ? '' : 'none';
  $('#o-th').textContent = F.otomatis ? (F.ppnx && F.ppn ? 'Dihitung otomatis: harga barang + PPN.' : 'Dihitung otomatis dari harga barang.') : 'Belum ada barang, jadi isi totalnya sendiri.';
  t.innerHTML = F.barang.some(b => !b.nama) ? '<div class="note w" style="margin-top:8px">Ada barang yang belum diberi nama.</div>' : '';
}

// ----- Bagi tagihan -----
function bagiHitung(B) {
  const n = B.p.length; let sub, ex;
  const PP = x => B.ppnRp != null ? B.ppnRp : Math.round(x * B.pct / 100);
  if (B.mode === 'rata') { sub = B.sub; const pp = PP(sub); ex = B.p.map(() => (sub + pp) / n); }
  else {
    sub = B.items.reduce((a, b) => a + b.h, 0); const pp = PP(sub), se = B.p.map(() => 0);
    B.items.forEach(b => { const k = b.s.length ? b.s : B.p.map((_, i) => i); k.forEach(i => se[i] += b.h / k.length); }); ex = se.map(x => x + (sub ? pp * x / sub : 0));
  }
  const ppn = PP(sub), total = sub + ppn, bag = ex.map(Math.floor), sisa = total - bag.reduce((a, b) => a + b, 0); if (bag.length) bag[0] += sisa;
  return { sub, ppn, total, bag };
}
function waText(d) {
  let t = `*${d.judul}* · ${tglS(d.tanggal)}\nTotal ${rp(d.total)}${d.ppn ? ` (termasuk PPN ${d.pct}% = ${rp(d.ppn)})` : ''}\n\nBagian masing-masing:\n` + d.p.map(x => `• ${x.nama}: ${rp(x.bagian)}`).join('\n');
  if (d.items?.length) t += '\n\nRincian:\n' + d.items.map(b => `• ${b.nama} ${rp(b.harga)} (${b.untuk})`).join('\n'); return t;
}
const kirimWA = t => { const w = open('https://wa.me/?text=' + encodeURIComponent(t), '_blank', 'noopener'); if (!w) location.href = 'https://wa.me/?text=' + encodeURIComponent(t); };
R.bagi = async () => {
  S.bg = S.bg || { judul: '', tgl: hari(), mode: 'barang', sub: 0, pct: 11, p: [S.set.nama || 'Saya', ''], items: [], jatah: true, kat: (KK().find(k => /^makan/i.test(k.nama)) || KK()[0] || {}).id }; formB();
};
const nmB = i => S.bg.p[i] || (i ? 'Teman ' + i : S.set.nama || 'Saya');
const pkB = (b, bi) => S.bg.p.map((_, i) => `<button class="pill ${b.s.includes(i) ? 'on' : ''}" data-a="bchk" data-b="${bi}" data-i="${i}">${E(nmB(i))}</button>`).join('') + `<span class="mu s12">${b.s.length ? '' : 'dibagi semua'}</span>`;
function formB() {
  const B = S.bg, ttl = t => `<div class="b" style="font-size:15px">${t}</div>`;
  render(`${head('Bagi tagihan', ibtn('nav', 'clock', 'Riwayat tagihan', 'data-v="riwayat"'))}
  <div class="card"><div class="row sp">${ttl('1. Siapa saja yang ikut')}<button class="b s13" style="color:var(--pr)" data-a="bpt">+ Tambah</button></div>
  ${B.p.map((n, i) => `<div class="row g8" style="margin-top:8px"><input class="in mini fl" data-i="bg" data-k="p" value="${E(n)}" maxlength="40" placeholder="${i ? 'Nama teman' : 'Namamu'}" aria-label="${i ? 'Nama teman ' + i : 'Namamu'}">${i === 0 ? '<span class="tag n">kamu</span>' : i > 1 ? `<button data-a="bpx" data-i="${i}" class="mu" aria-label="Hapus orang">${ic('x', 18)}</button>` : ''}</div>`).join('')}</div>
  <div class="card">${ttl('2. Isi tagihannya')}<div class="seg" style="box-shadow:none;background:var(--chip);margin-top:10px"><button class="${B.mode === 'barang' ? 'on' : ''}" data-a="bmode" data-m="barang">Per barang</button><button class="${B.mode === 'rata' ? 'on' : ''}" data-a="bmode" data-m="rata">Bagi rata</button></div>
  ${B.mode === 'rata' ? `<div class="f"><label>Jumlah tagihan sebelum PPN</label><input class="in mn" id="g-s" inputmode="numeric" data-i="bg" value="${fmt(B.sub)}"></div>`
    : `<div class="mt">${btn('bfoto', ic('cam', 20) + 'Foto struk tagihan', '', '', 'Membaca struk…')}</div><input id="bf" type="file" accept="image/*" capture="environment" hidden><input id="bf2" type="file" accept="image/*" hidden><div class="c mt"><button class="b s13" style="color:var(--pr)" data-a="bgal">atau pilih foto dari galeri</button></div>
    ${B.items.length ? `<div class="mu s12 mt" style="line-height:1.5">3. Ketuk nama orang yang ikut makan atau pakai tiap barang. Kalau tidak ada yang dipilih, barang dibagi ke semua.</div>` : '<div class="mu s13 c mt" style="line-height:1.5">Belum ada barang. Foto struknya, atau tambah barang satu per satu.</div>'}
    ${B.items.map((b, bi) => `<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--ln)"><div class="row g8"><input class="in mini fl" data-i="bg" data-k="n" data-b="${bi}" placeholder="Nama barang" maxlength="80" value="${E(b.n)}"><input class="in mini mn" data-i="bg" data-k="h" data-b="${bi}" inputmode="numeric" style="width:100px" aria-label="Harga" placeholder="Harga" value="${fmt(b.h)}"><button data-a="bix" data-b="${bi}" class="mu" aria-label="Hapus barang">${ic('x', 18)}</button></div><div class="row pk" data-b="${bi}" style="flex-wrap:wrap;gap:6px;margin-top:8px">${pkB(b, bi)}</div></div>`).join('')}
    <div class="mt"><button class="b s13" style="color:var(--pr)" data-a="bit">+ Tambah barang manual</button></div>`}</div>
  <div class="card">${ttl('Detail')}<div class="f"><label>Untuk apa</label><input class="in" id="g-j" maxlength="80" placeholder="Misal: makan malam" value="${E(B.judul)}" data-i="bg"></div><div class="row g8"><div class="f fl"><label>Tanggal</label><input class="in" id="g-t" type="date" value="${E(B.tgl)}" data-i="bg"></div><div class="f" style="width:100px"><label>PPN (%)</label><input class="in" id="g-p" inputmode="decimal" data-i="bg" value="${E(String(B.pct).replace('.', ','))}"></div></div></div>
  <div class="card" id="gh"></div>
  <label class="row mt s13" style="gap:10px"><input type="checkbox" id="g-sv" ${B.jatah ? 'checked' : ''} data-i="bg" style="width:20px;height:20px">Simpan bagianku sebagai pengeluaran</label>
  <div class="f" id="gk" style="${B.jatah ? '' : 'display:none'}"><label>Kategori bagianku</label><select class="in" id="g-k" data-i="bg">${opsiKat(B.kat)}</select>${rekPil(B.rek || (S.rek[0] || {}).id, 'Dibayar pakai', 'g-r')}</div>
  <div class="mt2">${btn('bsimpan', 'Simpan tagihan', '', '', 'Menyimpan…')}</div><div class="mt">${btn('bwa', WA + 'Kirim rincian ke WhatsApp', 'wa')}</div>`);
  ['#bf', '#bf2'].forEach(k => { const el = $(k); if (el) el.onchange = () => { const f = el.files[0]; el.value = ''; if (f) fotoB(f); }; });
  hitB();
}
function fotoB(f) {
  busy($('[data-a=bfoto]'), async () => {
    const h = await A.baca(await kecil(f), 'image/jpeg'), B = bacaB(), it = (h.barang || []).filter(x => x.harga > 0), sub = it.reduce((a, x) => a + x.harga, 0);
    if (!B.judul) B.judul = h.toko || ''; if (h.tanggal) B.tgl = h.tanggal;
    if (!it.length) { B.mode = 'rata'; B.sub = h.total - h.ppn; B.ppnRp = h.ppn || null; B.pct = h.total - h.ppn > 0 && h.ppn ? Math.round(h.ppn / (h.total - h.ppn) * 10000) / 100 : 0; formB(); toast('Barangnya tidak terbaca, jadi dibagi rata. Cek jumlahnya ya.'); return; }
    B.mode = 'barang'; B.items = it.map(x => ({ n: x.nama + (x.jumlah > 1 ? ' ×' + String(x.jumlah).replace('.', ',') : ''), h: x.harga, s: [] }));
    B.pct = h.ppn > 0 && sub > 0 ? Math.round(h.ppn / sub * 10000) / 100 : 0; B.ppnRp = h.ppn > 0 ? h.ppn : null; formB(); toast('Struk terbaca. Sekarang ketuk nama di tiap barang.');
  });
}
function bacaB() {
  const B = S.bg; B.judul = $('#g-j').value.trim(); B.tgl = $('#g-t').value; B.pct = Math.min(100, Math.max(0, Number(String($('#g-p').value).replace(',', '.')) || 0)); B.jatah = $('#g-sv').checked; if ($('#g-r')) B.rek = $('#g-r').value; B.kat = $('#g-k').value;
  document.querySelectorAll('[data-k=p]').forEach((e, i) => B.p[i] = e.value.trim()); if ($('#g-s')) B.sub = num($('#g-s').value);
  document.querySelectorAll('[data-k=n][data-b]').forEach(e => B.items[+e.dataset.b].n = e.value.trim()); document.querySelectorAll('[data-k=h][data-b]').forEach(e => B.items[+e.dataset.b].h = num(e.value)); $('#gk').style.display = B.jatah ? '' : 'none'; return B;
}
function hitB() {
  const B = bacaB(), r = bagiHitung(B); document.querySelectorAll('.pk').forEach(e => e.innerHTML = pkB(B.items[+e.dataset.b], +e.dataset.b));
  $('#gh').innerHTML = `<div class="b" style="font-size:15px">Bagian masing-masing</div>${B.p.map((_, i) => `<div class="row sp" style="margin-top:10px"><span class="row g8"><span class="av" style="width:34px;height:34px;border-radius:12px">${E(nmB(i)[0].toUpperCase())}</span><span class="b s13">${E(nmB(i))}</span></span><b>${rp(r.bag[i])}</b></div>`).join('')}
  <div class="s12 mu" style="margin-top:12px;border-top:1px solid var(--ln);padding-top:10px;line-height:1.6">Sebelum PPN ${rp(r.sub)}<br>PPN ${String(B.pct).replace('.', ',')}% ${rp(r.ppn)}<br><b style="color:var(--tx)">Total ${rp(r.total)}</b></div>`; return r;
}
function dataB() {
  const B = bacaB(), r = bagiHitung(B), nm = nmB;
  if (!B.judul) throw ramah('Isi dulu untuk apa tagihannya'); if (B.p.length < 2) throw ramah('Minimal 2 orang'); if (B.p.some((n, i) => i > 0 && !n)) throw ramah('Isi nama semua temannya dulu');
  if (r.sub <= 0) throw ramah(B.mode === 'rata' ? 'Isi jumlah tagihannya dulu' : 'Isi harga barangnya dulu');
  if (B.mode === 'barang' && B.items.some(b => b.h > 0 && !b.n)) throw ramah('Ada barang yang belum diberi nama');
  const items = B.mode === 'barang' ? B.items.filter(b => b.h > 0).map(b => ({ nama: b.n, harga: b.h, s: b.s.length ? b.s : B.p.map((_, i) => i) })) : [];
  return { B, r, nm, items };
}
R.riwayat = async (p, ok) => {
  loading(); const t = await A.tagihan(); if (!ok()) return;
  render(`${head('Riwayat tagihan')}${t.length ? `<div class="mt">${t.map(x => { const me = (x.tagihan_peserta || []).find(q => q.saya); return `<button class="card" style="display:block;width:100%;text-align:left" data-a="tbuka" data-id="${E(x.id)}"><div class="row sp"><div class="b" style="font-size:15px">${E(x.judul)}</div><b>${rp(x.total)}</b></div><div class="mu s12" style="margin-top:4px">${tglS(x.tanggal)} · ${(x.tagihan_peserta || []).length} orang${me ? ' · bagian kamu ' + rp(me.bagian) : ''}</div></button>`; }).join('')}</div><div class="c mu s12 mt">Ketuk salah satu untuk melihat rincian dan kirim ulang ke WhatsApp</div>` : empty('people', 'Belum ada tagihan', 'Tagihan yang kamu simpan di menu Bagi akan muncul di sini.')}`);
};
R.tagihanDetail = async (p, ok) => {
  loading(); const d = await A.tagihanDetail(p.id); if (!ok()) return;
  const ps = [...d.tagihan_peserta].sort((a, b) => a.urutan - b.urutan), items = (d.tagihan_barang || []).map(b => ({ nama: b.nama, harga: b.harga, untuk: (b.peserta.length ? b.peserta : ps.map((_, i) => i)).map(i => ps[i]?.nama).join(', ') }));
  S.td = { judul: d.judul, tanggal: d.tanggal, total: d.total, ppn: d.ppn, pct: d.ppn_persen, p: ps, items, id: d.id };
  render(`${head(d.judul)}<div class="hero"><div class="s12">${tglP(d.tanggal)}</div><div class="big">${rp(d.total)}</div><div class="s12" style="margin-top:6px">Sebelum PPN ${rp(d.subtotal)} · PPN ${d.ppn_persen}% ${rp(d.ppn)}</div></div>
  <div class="card"><div class="b" style="font-size:15px">Bagian masing-masing</div>${ps.map(x => `<div class="row sp" style="margin-top:10px"><span class="b s13">${E(x.nama)}${x.saya ? ' (kamu)' : ''}</span><b>${rp(x.bagian)}</b></div>`).join('')}</div>
  ${items.length ? `<div class="card"><div class="b" style="font-size:15px">Barang</div>${items.map(b => `<div class="row sp s13" style="margin-top:8px"><span>${E(b.nama)}<div class="mu s12">${E(b.untuk)}</div></span><b>${rp(b.harga)}</b></div>`).join('')}</div>` : ''}
  <div class="mt2">${btn('twa', WA + 'Kirim ulang ke WhatsApp', 'wa')}</div><div class="mt">${btn('thapus', 'Hapus tagihan ini', 'r')}</div>`);
};
R.laporan = async (p, ok) => {
  loading(); const m = S.lap = p.m || S.lap || 'bulan', H = hari(); let d, s, pd, ps, u = 'day', lab = [], grp;
  if (m === 'minggu') { d = tHari(H, -6); s = tHari(H, 1); pd = tHari(d, -7); ps = d; lab = Array.from({ length: 7 }, (_, i) => new Date(tHari(d, i) + 'T12:00:00Z').toLocaleDateString('id-ID', { weekday: 'short', timeZone: 'UTC' })); grp = x => Math.round((Date.parse(x + 'T12:00:00Z') - Date.parse(d + 'T12:00:00Z')) / 864e5); }
  else if (m === 'bulan') { d = blnAwal(H); s = tBln(d, 1); pd = tBln(d, -1); ps = d; lab = ['Mgg 1', 'Mgg 2', 'Mgg 3', 'Mgg 4']; grp = x => Math.min(3, Math.floor((+x.slice(8) - 1) / 7)); }
  else { d = H.slice(0, 4) + '-01-01'; s = (+H.slice(0, 4) + 1) + '-01-01'; pd = (+H.slice(0, 4) - 1) + '-01-01'; ps = d; u = 'month'; lab = 'JFMAMJJASOND'.split(''); grp = x => +x.slice(5, 7) - 1; }
  const [rs, pr, dr] = await Promise.all([A.ringkas(d, s), A.ringkas(pd, ps), A.deret(d, s, u)]); if (!ok()) return;
  const tot = jml(rs, 'keluar'), msk = jml(rs, 'masuk'), pt = jml(pr, 'keluar'), vK = lab.map(() => 0), vM = lab.map(() => 0);
  dr.forEach(x => { const g = grp(x.periode); if (vK[g] !== undefined) ((x.jenis || 'keluar') === 'masuk' ? vM : vK)[g] += Number(x.jumlah); });
  const per = { minggu: '7 hari terakhir', bulan: bln(d), tahun: d.slice(0, 4) }[m], bd = { minggu: '7 hari sebelumnya', bulan: bln(pd).split(' ')[0], tahun: String(+d.slice(0, 4) - 1) }[m];
  const pc = pt ? Math.round((tot - pt) / pt * 100) : null, sisa = msk - tot;
  const daftar = (j, t) => { const L = rs.filter(r => (r.jenis || 'keluar') === j && r.jumlah > 0).sort((a, b) => b.jumlah - a.jumlah); return L.length ? `<div class="mu s12 b" style="padding-top:10px">${j === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}</div>` + L.map(r => `<div style="padding:10px 0;border-bottom:1px solid var(--ln)"><div class="row sp s13"><span class="b">${E(kn(r.kategori_id).nama)}</span><b${j === 'masuk' ? ' style="color:var(--pr)"' : ''}>${rp(r.jumlah)} · ${Math.round(r.jumlah / t * 100)}%</b></div><div class="bar" style="height:7px;margin-top:7px"><i style="height:7px;width:${Math.max(2, Math.round(r.jumlah / t * 100))}%;background:${E(kn(r.kategori_id).warna)}"></i></div></div>`).join('') : ''; };
  render(`${head('Laporan', ibtn('nav', 'down', 'Unduh ke Excel', 'data-v="unduh"'), false)}<div class="seg">${[['minggu', 'Minggu'], ['bulan', 'Bulan'], ['tahun', 'Tahun']].map(([k, n]) => `<button class="${m === k ? 'on' : ''}" data-a="lm" data-m="${k}">${n}</button>`).join('')}</div>
  <div class="card"><div class="mu s13">${msk ? 'Sisa uang' : 'Pengeluaran'} ${E(per)}</div><div class="b" style="font-size:28px;margin-top:2px">${msk ? (sisa < 0 ? '-' : '') + rp(Math.abs(sisa)) : rp(tot)}</div>
  <div class="row s12" style="gap:14px;margin-top:6px;flex-wrap:wrap"><span class="row" style="gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--pb)"></i>Masuk ${rp(msk)}</span><span class="row" style="gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--k2)"></i>Keluar ${rp(tot)}</span></div>
  ${pc === null ? '' : `<div class="mt"><span class="tag n">Pengeluaran ${pc >= 0 ? 'naik' : 'turun'} ${Math.abs(pc)}% dari ${E(bd)}</span></div>`}
  ${tot || msk ? grafik(lab, vM, vK) : '<div class="mu s13 c" style="padding:30px 0">Belum ada catatan di periode ini.</div>'}</div>
  ${tot || msk ? `<div class="card" style="padding:0 16px 6px">${daftar('masuk', msk)}${daftar('keluar', tot)}</div>` : ''}`);
};
function grafik(lab, vM, vK) {
  const W = 310, n = lab.length, mx = Math.max(...vM, ...vK, 1), sl = (W - 20) / n, bw = Math.min(16, sl / 2 - 3), h = a => a / mx * 92;
  const bars = lab.map((l, i) => { const cx = 10 + sl * i + sl / 2; return `<rect x="${(cx - bw - 1).toFixed(1)}" y="${(110 - Math.max(2, h(vM[i]))).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2, h(vM[i])).toFixed(1)}" rx="4" style="fill:var(--pb)"/><rect x="${(cx + 1).toFixed(1)}" y="${(110 - Math.max(2, h(vK[i]))).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2, h(vK[i])).toFixed(1)}" rx="4" style="fill:var(--k2)"/><text x="${cx.toFixed(1)}" y="128" text-anchor="middle" font-size="10" style="fill:var(--mu)">${E(l)}</text>`; }).join('');
  return `<svg width="100%" height="136" viewBox="0 0 ${W} 136" style="margin-top:10px" role="img" aria-label="Grafik pemasukan dan pengeluaran per ${n === 12 ? 'bulan' : n === 7 ? 'hari' : 'minggu'}"><line x1="0" y1="110" x2="${W}" y2="110" style="stroke:var(--ln)"/>${bars}</svg>`;
}
R.anggaran = async (p, ok) => {
  loading(); const H = hari(), M = blnAwal(H), [ag, rs] = await Promise.all([A.anggaran(), A.ringkas(M, tBln(M, 1))]); if (!ok()) return;
  const tot = jml(rs, 'keluar'), bt = pickB(ag, 'total', H), pc = bt ? Math.min(100, Math.round(tot / bt * 100)) : 0, C = 213.63, st = (x, b) => { const q = b ? x / b * 100 : 0; return { q: Math.round(q), t: q >= 100 ? '<span class="tag r">Lewat batas</span>' : q >= 80 ? '<span class="tag w">Hampir habis</span>' : `<span class="mu s12">${Math.round(q)}%</span>`, c: q >= 100 ? '#C23B3B' : q >= 80 ? '#C2570C' : 'var(--bar)' }; };
  render(`${head('Anggaran', `<button class="ib" style="width:auto;padding:0 16px;gap:6px;font-size:13px;font-weight:800;color:var(--pr)" data-a="nav" data-v="aturAnggaran">${ic('edit', 18)}Atur</button>`, false)}
  ${bt ? `<div class="hero row sp"><div><div class="s12">${tot > bt ? 'Lewat anggaran ' : 'Sisa anggaran '}${E(bln(M).split(' ')[0])}</div><div class="big">${rp(Math.abs(bt - tot))}</div><div class="s12" style="margin-top:6px">Terpakai ${rp(tot)} dari ${rp(bt)}</div></div><div style="position:relative;width:84px;height:84px;flex:none"><svg width="84" height="84" viewBox="0 0 88 88" role="img" aria-label="${pc} persen anggaran terpakai"><g fill="none" stroke-width="10" transform="rotate(-90 44 44)"><circle cx="44" cy="44" r="34" stroke="rgba(255,255,255,.25)"/><circle cx="44" cy="44" r="34" stroke="#fff" stroke-linecap="round" stroke-dasharray="${(pc / 100 * C).toFixed(1)} ${C}"/></g></svg><div class="c" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><b style="font-size:17px">${pc}%</b><span style="font-size:10px;color:rgba(255,255,255,.75)">terpakai</span></div></div></div>`
    : `<div class="hero"><div class="s12">Anggaran ${E(bln(M).split(' ')[0])}</div><div class="big">${rp(tot)}</div><div class="s12" style="margin-top:6px">Terpakai bulan ini. Belum ada batas total.</div></div>`}
  ${(() => { const L = KK().map(k => ({ k, b: pickB(ag, k.id, H), x: Number((rs.find(r => r.kategori_id === k.id) || {}).jumlah || 0) })), tampil = L.filter(z => z.b || z.x), sisa = L.length - tampil.length;
    return `<div class="mt">${tampil.map(({ k, b, x }) => { const s = st(x, b); return `<div class="card"><div class="row sp"><div class="row g8 b" style="font-size:15px"><i style="width:10px;height:10px;border-radius:5px;background:${E(k.warna)}"></i>${E(k.nama)}</div>${b ? s.t : '<span class="mu s12">Tanpa batas</span>'}</div>${b ? `<div class="bar"><i style="width:${Math.min(100, s.q)}%;background:${s.c}"></i></div>` : ''}<div class="row sp s12 mu" style="margin-top:6px"><span>${b ? rp(x) + ' dari ' + rp(b) : 'Terpakai ' + rp(x)}</span>${b ? `<b style="color:var(--tx)">${x > b ? 'Lewat ' + rp(x - b) : 'Sisa ' + rp(b - x)}</b>` : ''}</div></div>`; }).join('')}</div>
    ${sisa ? `<button class="note" style="display:block;width:100%;text-align:left" data-a="nav" data-v="aturAnggaran">${sisa} kategori lain belum dipakai dan belum diberi batas. <b>Atur</b></button>` : ''}`; })()}`);
};
R.aturAnggaran = async (p, ok) => {
  loading(); const ag = await A.anggaran(), H = hari(); if (!ok()) return; S.ag = ag;
  const f = (id, n, k) => `<div class="row sp" style="padding:10px 0;border-bottom:1px solid var(--ln)"><span class="b s13" style="font-size:14px">${E(n)}</span><input class="in mini mn" data-k="${E(id)}" inputmode="numeric" placeholder="Tanpa batas" style="width:140px;text-align:right" value="${fmt(pickB(ag, id, H))}"></div>`;
  render(`${head('Atur anggaran')}<div class="card" style="padding:6px 16px"><div class="mu s12 b" style="padding-top:10px">Anggaran total per bulan</div>${f('total', 'Semua pengeluaran')}<div class="mu s12 b" style="padding-top:12px">Per kategori</div>${KK().map(k => f(k.id, k.nama)).join('')}</div>
  <div class="row sp mt"><button class="b s13" style="color:var(--pr)" data-a="kbaru" data-j="keluar">+ Tambah kategori</button><button class="b s13" style="color:var(--pr)" data-a="nav" data-v="kategori">Ubah atau hapus kategori</button></div>
  <div class="note">Berlaku terus tiap bulan sampai kamu ubah. Tanda "Hampir habis" muncul saat terpakai 80%. Kosongkan kalau tidak mau ada batas.</div><div class="mt2">${btn('asimpan', 'Simpan anggaran', '', '', 'Menyimpan…')}</div>`);
  if (S.agDraft) { document.querySelectorAll('[data-k]').forEach(e => { if (S.agDraft[e.dataset.k] !== undefined) e.value = S.agDraft[e.dataset.k]; }); S.agDraft = null; }
};
let xl;
const muatXlsx = () => xl || (xl = new Promise((a, b) => { if (window.XLSX) return a(); const s = document.createElement('script'); s.src = './xlsx.mini.min.js'; s.onload = a; s.onerror = () => { xl = null; b(ramah('Pembuat Excel belum bisa dimuat. Cek internetmu.')); }; document.head.appendChild(s); }));
R.unduh = async (p, ok) => {
  loading(); const H = hari(), M = blnAwal(H), [a, b, last] = await Promise.all([A.catatan({ dari: M, sampai: tBln(M, 1), per: 1 }), A.catatan({ per: 1 }), A.terakhir()]); if (!ok()) return; S.ux = { m: 'ini' };
  const o = (k, t, s) => `<button class="card row" style="width:100%;text-align:left;border:1.5px solid ${k === 'ini' ? 'var(--pb)' : 'transparent'}" data-a="um" data-m="${k}"><span style="width:22px;height:22px;border-radius:11px;border:2px solid ${k === 'ini' ? 'var(--pb)' : 'var(--ln2)'};display:flex;align-items:center;justify-content:center"><i style="width:10px;height:10px;border-radius:5px;background:${k === 'ini' ? 'var(--pb)' : 'transparent'}"></i></span><span><div class="b s13" style="font-size:14px">${t}</div><div class="mu s12" style="margin-top:2px">${s}</div></span></button>`;
  render(`${head('Unduh Excel')}<div class="mu s13 mt" style="line-height:1.5">Pilih data yang mau diunduh. File ini juga bisa jadi cadangan datamu.</div><div id="uo">${o('ini', 'Bulan ini', `${E(bln(M))} · ${a.total} catatan`)}${o('tertentu', 'Bulan tertentu', 'Pilih bulan dan tahun')}${o('semua', 'Semua data', `Dari awal sampai hari ini · ${b.total} catatan`)}</div>
  <div class="f" id="ub" style="display:none"><input class="in" id="ub1" type="month" value="${M.slice(0, 7)}" aria-label="Bulan"></div><div class="note">Isi file: lembar Catatan (pemasukan dan pengeluaran, dengan rekeningnya), Barang, Pindah uang, dan Ringkasan per kategori beserta sisa uang.</div>${last ? `<div class="note g">Terakhir diunduh: ${E(new Date(last).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }))}</div>` : ''}<div class="mt2">${btn('uunduh', 'Unduh sekarang', '', '', 'Menyiapkan…')}</div>`);
};
async function bikinXlsx() {
  const m = S.ux.m, M = blnAwal(hari()); let d = null, s = null, nm = 'semua';
  if (m === 'ini') { d = M; s = tBln(M, 1); nm = M.slice(0, 7); } else if (m === 'tertentu') { const v = $('#ub1').value; if (!/^\d{4}-\d{2}$/.test(v)) throw ramah('Pilih bulannya dulu'); d = v + '-01'; s = tBln(d, 1); nm = v; }
  const [rows, pl] = await Promise.all([A.excel(d, s), A.pindahList(d, s), muatXlsx()]); if (!rows.length) throw ramah('Tidak ada catatan di periode ini');
  const T = x => new Date(x + 'T12:00:00Z'), cat = [['Tanggal', 'Jenis', 'Toko / Keterangan', 'Kategori', 'Jumlah', 'PPN', 'Rekening', 'Sumber']], bar = [['Tanggal', 'Toko', 'Barang', 'Jumlah', 'Harga']], rk = {};
  rows.forEach(r => { const mj = r.jenis === 'masuk', k = (mj ? 'Pemasukan: ' : 'Pengeluaran: ') + kn(r.kategori_id).nama; cat.push([T(r.tanggal), mj ? 'Pemasukan' : 'Pengeluaran', String(r.toko), kn(r.kategori_id).nama, r.total, r.ppn, rn(r.rekening_id).nama, mj ? '' : SUMBER[r.sumber] || '']); (r.barang || []).forEach(b => bar.push([T(r.tanggal), String(r.toko), String(b.nama), Number(b.jumlah), b.harga])); rk[k] = rk[k] || { n: 0, t: 0, j: mj }; rk[k].n++; rk[k].t += r.total; });
  const tM = Object.values(rk).filter(x => x.j).reduce((a, x) => a + x.t, 0), tK = Object.values(rk).filter(x => !x.j).reduce((a, x) => a + x.t, 0);
  const rs = [['Kategori', 'Jumlah catatan', 'Total', 'Persen']].concat(Object.entries(rk).sort((a, b) => (b[1].j - a[1].j) || b[1].t - a[1].t).map(([k, x]) => [k, x.n, x.t, (x.j ? tM : tK) ? x.t / (x.j ? tM : tK) : 0]), [[], ['Total pemasukan', '', tM, ''], ['Total pengeluaran', '', tK, ''], ['Sisa', '', tM - tK, '']]);
  const wb = XLSX.utils.book_new(), mk = (a, w, fm) => { const ws = XLSX.utils.aoa_to_sheet(a, { cellDates: true }); ws['!cols'] = w.map(x => ({ wch: x })); Object.keys(ws).forEach(c => { if (c[0] === '!' || c.length < 2) return; const col = c.replace(/\d+/, ''), r = +c.replace(/\D+/, ''); if (r > 1 && fm[col]) ws[c].z = fm[col]; }); return ws; };
  XLSX.utils.book_append_sheet(wb, mk(cat, [12, 13, 28, 16, 14, 12, 14, 14], { A: 'dd-mm-yyyy', E: '#,##0', F: '#,##0' }), 'Catatan'); if (pl.length) XLSX.utils.book_append_sheet(wb, mk([['Tanggal', 'Dari', 'Ke', 'Jumlah', 'Biaya admin']].concat(pl.map(p => [T(p.tanggal), String(p.a?.nama || ''), String(p.b?.nama || ''), p.jumlah, p.biaya])), [12, 16, 16, 14, 12], { A: 'dd-mm-yyyy', D: '#,##0', E: '#,##0' }), 'Pindah uang'); XLSX.utils.book_append_sheet(wb, mk(bar, [12, 28, 30, 8, 14], { A: 'dd-mm-yyyy', D: '0.##', E: '#,##0' }), 'Barang'); XLSX.utils.book_append_sheet(wb, mk(rs, [32, 16, 16, 10], { C: '#,##0', D: '0%' }), 'Ringkasan');
  const bl = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = `Tracker-Money-${nm}.xlsx`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  await A.jejak('unduh_excel'); toast('File Excel sudah diunduh');
}
const WARNA = ['#1E3A8A', '#3B82C4', '#E0A030', '#0E9F8E', '#D9645A', '#4CAF7A', '#E57AA8', '#6C7FD8', '#8A94A6', '#C2570C', '#2F5BD3', '#7A5C3E'];
R.kategori = () => {
  const bag = j => { const L = S.kat.filter(k => (k.jenis || 'keluar') === j), n = L.length, ar = (i, d, nm) => { const off = d < 0 ? i === 0 : i === n - 1; return `<button class="ib" style="width:36px;height:36px;box-shadow:none;background:var(--chip);${off ? 'opacity:.3' : ''}" data-a="kgeser" data-j="${j}" data-i="${i}" data-d="${d}" ${off ? 'disabled' : ''} aria-label="${nm}">${ic(d < 0 ? 'up' : 'dn', 18)}</button>`; };
    return `<div class="row sp" style="margin-top:18px"><div class="b" style="font-size:16px">${j === 'masuk' ? 'Pemasukan' : 'Pengeluaran'}</div><button class="b s13" style="color:var(--pr)" data-a="kbaru" data-j="${j}">+ Tambah</button></div><div class="card" style="padding:2px 16px;margin-top:8px">${L.map((k, i) => `<div class="row" style="padding:10px 0;${i < n - 1 ? 'border-bottom:1px solid var(--ln)' : ''}"><i style="width:14px;height:14px;border-radius:7px;background:${E(k.warna)};flex:none"></i><button class="fl b" style="text-align:left;font-size:14px;padding:8px 0" data-a="kedit" data-id="${E(k.id)}">${E(k.nama)}</button>${ar(i, -1, 'Naikkan')}${ar(i, 1, 'Turunkan')}</div>`).join('')}</div>`; };
  render(`${head('Atur kategori')}${bag('keluar')}${bag('masuk')}<div class="note">Ketuk nama untuk mengganti nama, warna, atau menghapus. Pakai panah untuk mengubah urutan. Kategori ini hanya untuk akunmu.</div>`);
};
function modalKat(k, jenis) {
  S.ke = { id: k?.id || null, jenis: k?.jenis || jenis || 'keluar', warna: k?.warna || WARNA[S.kat.length % WARNA.length], nama: k?.nama || '' };
  modal(`<div class="b" style="font-size:18px">${k ? 'Ubah kategori' : 'Kategori ' + (S.ke.jenis === 'masuk' ? 'pemasukan' : 'pengeluaran') + ' baru'}</div><div class="f"><label>Nama</label><input class="in" id="kn" maxlength="30" placeholder="${S.ke.jenis === 'masuk' ? 'Misal: Freelance' : 'Misal: Kucing'}" value="${E(S.ke.nama)}"></div>
  <div class="f"><label>Warna</label><div class="row" style="flex-wrap:wrap;gap:10px">${WARNA.map(w => `<button data-a="kwarna" data-w="${w}" aria-label="Pilih warna" style="width:34px;height:34px;border-radius:17px;background:${w};outline:${w === S.ke.warna ? '3px solid var(--tx)' : 'none'};outline-offset:2px"></button>`).join('')}</div></div>
  <div class="mt2">${btn('ksimpan', 'Simpan', '', '', 'Menyimpan…')}</div>${k ? `<div class="mt">${btn('khapus', 'Hapus kategori ini', 'r', '', 'Memeriksa…')}</div>` : ''}<div class="mt">${btn('tutup', 'Batal', 'o')}</div>`);
}
// ----- Dompet & rekening -----
const rekBaris = r => `<button class="card row" style="width:100%;text-align:left" data-a="nav" data-v="rekDetail" data-id="${E(r.id)}"><span class="sw" style="width:44px;height:44px;background:${E(r.warna)}">${ic(RI[r.jenis] || 'wallet', 22)}</span><span class="fl"><div class="b" style="font-size:15px">${E(r.nama)}</div><div class="mu s12" style="margin-top:2px">Bulan ini <b style="color:var(--pr)">+${fmt(r.masuk) || 0}</b> · <b style="color:var(--tx)">-${fmt(r.keluar) || 0}</b></div></span><b style="font-size:15px">${Number(r.saldo) < 0 ? '-' : ''}${rp(Math.abs(r.saldo))}</b></button>`;
R.dompet = async (p, ok) => {
  loading(); const rk = await A.rek(); if (!ok()) return; S.rek = rk; const tot = rk.reduce((a, r) => a + Number(r.saldo), 0);
  render(`${head('Dompet & rekening', ibtn('rbaru', 'plus', 'Tambah rekening'))}<div class="hero"><div class="s12">Total saldo semua</div><div class="big">${tot < 0 ? '-' : ''}${rp(Math.abs(tot))}</div><div class="s12" style="margin-top:6px">${rk.length} dompet dan rekening</div></div>
  <div class="mt">${rk.map(rekBaris).join('')}</div><div class="mt">${btn('nav', ic('swap', 20) + 'Pindah uang', 'o', 'data-v="pindah"')}</div>
  <div class="note">Ketuk salah satu untuk melihat riwayatnya, mengubah nama, atau mencocokkan saldo dengan saldo di aplikasi bank.</div>`);
};
R.rekDetail = async (p, ok) => {
  loading(); const H = hari(), bl = p.bln || blnAwal(H), [rk, mt] = await Promise.all([A.rek(), A.mutasi(p.id, bl, tBln(bl, 1))]); if (!ok()) return; S.rek = rk;
  const r = rk.find(x => x.id === p.id); if (!r) throw ramah('Rekening tidak ditemukan'); S.rd = r;
  const bulan = [0, -1, -2].map(i => tBln(blnAwal(H), i)), mIn = mt.filter(x => x.delta > 0).reduce((a, x) => a + Number(x.delta), 0), mOut = mt.filter(x => x.delta < 0).reduce((a, x) => a - Number(x.delta), 0);
  let tg = '', h = ''; mt.forEach(x => { if (x.tanggal !== tg) { tg = x.tanggal; h += `<div class="s12 mu b" style="padding:12px 0 2px">${tglP(tg)}</div>`; } h += `<button class="item" data-a="${x.tipe === 'pindah' ? 'phapus' : x.tipe === 'awal' ? 'redit' : 'buka'}" data-id="${E(x.id)}"><span class="fl"><div class="b" style="font-size:14px">${E(x.judul)}</div><div class="mu s12" style="margin-top:2px">${E(x.info || '')}</div></span><span style="text-align:right"><b style="font-size:14px${x.delta > 0 ? ';color:var(--pr)' : ''}">${x.delta > 0 ? '+' : '-'}${fmt(Math.abs(x.delta))}</b><div class="mu" style="font-size:11px;margin-top:2px">saldo ${Number(x.saldo) < 0 ? '-' : ''}${fmt(Math.abs(x.saldo)) || 0}</div></span></button>`; });
  render(`${head(r.nama, ibtn('redit', 'edit', 'Ubah rekening'))}<div class="hero"><div class="s12">Saldo ${E(r.nama)} sekarang</div><div class="big">${Number(r.saldo) < 0 ? '-' : ''}${rp(Math.abs(r.saldo))}</div>
  <div class="row g8" style="margin-top:12px">${[['arIn', 'Masuk', mIn], ['arOut', 'Keluar', mOut]].map(([i, l, v]) => `<div class="fl" style="padding:10px 12px;border-radius:16px;background:rgba(255,255,255,.12)"><div class="row s12" style="gap:6px;color:rgba(255,255,255,.8)">${ic(i, 14, 2.4)}${l} ${E(bln(bl).split(' ')[0])}</div><div class="b" style="font-size:15px;margin-top:3px">${rp(v)}</div></div>`).join('')}</div></div>
  <div class="chips">${bulan.map(b => `<button class="chip ${b === bl ? 'on' : ''}" data-a="rbln" data-b="${b}">${E(bln(b))}</button>`).join('')}</div>
  <div class="card" style="padding:2px 16px">${h || '<div class="mu s13 c" style="padding:20px 0">Belum ada catatan di bulan ini.</div>'}</div>`);
};
function modalRek(r) {
  S.re = { id: r?.id || null, jenis: r?.jenis || 'bank', warna: r?.warna || WARNA[S.rek.length % WARNA.length] };
  const seg = () => [['tunai', 'Tunai'], ['bank', 'Bank'], ['ewallet', 'E-wallet']].map(([j, n]) => `<button class="${S.re.jenis === j ? 'on' : ''}" data-a="rjenis" data-j="${j}">${n}</button>`).join('');
  modal(`<div class="b" style="font-size:18px">${r ? 'Ubah rekening' : 'Tambah rekening'}</div><div class="f"><label>Nama</label><input class="in" id="rn" maxlength="30" placeholder="Misal: BCA, GoPay" value="${E(r?.nama || '')}"></div>
  <div class="f"><label>Jenis</label><div class="seg" id="rj" style="margin-top:0;box-shadow:none;background:var(--chip)">${seg()}</div></div>
  <div class="f"><label>${r ? 'Saldo sekarang (cocokkan dengan aplikasi bank)' : 'Saldo sekarang'}</label><input class="in mn" id="rs" inputmode="numeric" placeholder="0" value="${r ? fmt(Math.abs(r.saldo)) : ''}"></div><div class="mu s12" style="margin-top:6px;line-height:1.5">${r ? 'Kalau saldonya beda, ganti angka di atas. Selisihnya disesuaikan tanpa mengubah catatan.' : 'Lihat saldo di aplikasi bank-mu, lalu isi di sini. Setelah itu saldo dihitung otomatis.'}</div>
  <div class="f"><label>Warna</label><div class="row" style="flex-wrap:wrap;gap:10px">${WARNA.map(w => `<button data-a="rwarna" data-w="${w}" aria-label="Pilih warna" style="width:32px;height:32px;border-radius:16px;background:${w};outline:${w === S.re.warna ? '3px solid var(--tx)' : 'none'};outline-offset:2px"></button>`).join('')}</div></div>
  <div class="mt2">${btn('rsimpan', 'Simpan', '', '', 'Menyimpan…')}</div>${r ? `<div class="mt">${btn('rhapus', 'Hapus rekening ini', 'r', '', 'Menghapus…')}</div>` : ''}<div class="mt">${btn('tutup', 'Batal', 'o')}</div>`);
  S.rseg = () => { $('#rj').innerHTML = seg(); };
}
R.pindah = async (p, ok) => {
  if (!S.rek.length) { loading(); S.rek = await A.rek(); if (!ok()) return; }
  const d = p.draft || { dari: (S.rek.find(r => r.jenis === 'bank') || S.rek[0] || {}).id, ke: (S.rek.find(r => r.jenis === 'tunai') || S.rek[1] || {}).id, jumlah: 0, biaya: 0, tanggal: hari() };
  render(`${head('Pindah uang')}<div class="card c" style="padding:18px 16px"><div class="mu s12 b">Jumlah yang dipindah</div><input class="in mn" id="pj" inputmode="numeric" placeholder="0" aria-label="Jumlah" value="${fmt(d.jumlah)}" style="font-size:28px;font-weight:800;text-align:center;height:60px;border:0;box-shadow:none;color:var(--pr);margin-top:4px"></div>
  ${rekPil(d.dari, 'Dari', 'pd')}<div class="row" style="justify-content:center;margin-top:12px"><span class="sw" style="background:var(--chip);color:var(--pr)">${ic('arIn', 20, 2.4)}</span></div>${rekPil(d.ke, 'Ke', 'pk')}
  <div class="f"><label>Tanggal</label><input class="in" id="pt" type="date" value="${E(d.tanggal)}"></div><div class="f"><label>Biaya admin (kalau ada)</label><input class="in mn" id="pb" inputmode="numeric" placeholder="0" value="${fmt(d.biaya)}"></div>
  <div class="mu s12" style="margin-top:6px;line-height:1.5">Pindah uang tidak dihitung sebagai pengeluaran. Biaya admin dicatat sebagai pengeluaran kategori Tagihan.</div><div class="mt2">${btn('psimpan', 'Pindahkan', '', '', 'Memindahkan…')}</div>`);
};
R.pengaturan = () => {
  const t = S.set.tema, mini = (k, n) => `<button class="${t === k ? 'on' : ''}" data-a="tema2" data-v="${k}" style="padding:6px 10px;border-radius:15px;font-size:12px;font-weight:700;${t === k ? 'background:var(--pb);color:#fff' : 'color:var(--mu)'}">${n}</button>`;
  const it = (a, n, s, x = '') => `<button class="row sp" style="width:100%;text-align:left;padding:14px 0;border-bottom:1px solid var(--ln)" data-a="${a}" ${x}><span><div class="b s13" style="font-size:14px">${n}</div>${s ? `<div class="mu s12" style="margin-top:2px">${s}</div>` : ''}</span><span class="mu">${ic('chev', 18)}</span></button>`;
  render(`${head('Pengaturan')}<div class="card row"><div class="sw" style="width:48px;height:48px;border-radius:24px;background:var(--hg);font-size:18px">${E((S.set.nama || S.u?.email || 'U')[0].toUpperCase())}</div><div class="fl"><div class="b" style="font-size:15px">${E(S.set.nama || (S.u?.email || '').split('@')[0])}</div><div class="mu s12" style="overflow:hidden;text-overflow:ellipsis">${E(S.u?.email || '')}</div></div></div>
  <div class="card" style="padding:2px 16px"><div class="row sp" style="padding:14px 0;border-bottom:1px solid var(--ln)"><div class="b s13" style="font-size:14px">Tampilan</div><div class="row" style="padding:3px;border-radius:18px;background:var(--chip)">${mini('auto', 'Otomatis')}${mini('terang', 'Terang')}${mini('gelap', 'Gelap')}</div></div>
  ${it('nav', 'Nama panggilan', E(S.set.nama || 'Belum diisi'), 'data-v="namaku" data-sk="1"')}${it('nav', 'Dompet & rekening', S.rek.length ? S.rek.length + ' rekening' : '', 'data-v="dompet"')}${it('nav', 'Atur kategori', S.kat.length + ' kategori', 'data-v="kategori"')}${it('nav', 'Ganti kata sandi', '', 'data-v="gantiSandi" data-sk="1"')}${it('nav', 'Unduh Excel', 'Cadangan datamu', 'data-v="unduh"')}${it('nav', 'Riwayat tagihan', '', 'data-v="riwayat"')}${it('pasang', 'Pasang di layar HP', 'Cara pasang aplikasi')}<button class="b s13" style="width:100%;text-align:left;padding:14px 0;color:#C23B3B;font-size:14px" data-a="keluar">Keluar</button></div><div class="c mu s12 mt">Tracker Money · versi 1.0</div>`);
};

// ===== AKSI (klik) =====
const H = {
  nav: b => { const v = b.dataset.v; if (v === 'bagi') S.bg = null; go(v, b.dataset.sk ? { sukarela: 1 } : b.dataset.id ? { id: b.dataset.id } : null); }, back: () => history.state ? history.back() : go('beranda', 0, true),
  mata: b => { const i = b.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; },
  tema: async () => { S.set.tema = document.documentElement.classList.contains('dk') ? 'terang' : 'gelap'; tema(); try { await A.setPeng({ tema: S.set.tema }); } catch (e) { toast(pesan(e)); } draw(); },
  tema2: async b => { S.set.tema = b.dataset.v; tema(); try { await A.setPeng({ tema: S.set.tema }); } catch (e) { toast(pesan(e)); } R.pengaturan(); },
  buka: b => go('form', { id: b.dataset.id }), fk: b => { S.fd.kat = b.dataset.id; S.fchips(); muatD(true).catch(e => toast(pesan(e))); },
  fmore: b => busy(b, async () => { S.fd.hal++; await muatD(false); }),
  amb: () => $('#f1').click(), gal: () => $('#f2').click(),
  bt: () => { bacaF(); S.fo.barang.push({ nama: '', jumlah: 1, harga: 0 }); $('#bl').insertAdjacentHTML('beforeend', S.brHtml({ nama: '', jumlah: 1, harga: 0 })); selisih(); },
  bx: b => { b.closest('.br').remove(); selisih(); }, 

  fsimpan: b => busy(b, async () => {
    const F = bacaF(), mk = F.jenis === 'masuk'; if (mk && F.total <= 0) throw ramah('Isi jumlah yang masuk dulu'); if (!F.toko) throw ramah(mk ? 'Isi keterangannya dulu, misal: Gaji November' : 'Isi nama tokonya dulu'); if (!/^\d{4}-\d{2}-\d{2}$/.test(F.tanggal)) throw ramah('Isi tanggalnya dulu'); if (F.total <= 0) throw ramah('Isi totalnya dulu'); if (F.ppn > F.total) throw ramah('PPN tidak boleh lebih besar dari total'); if (!F.kategori_id) throw ramah('Pilih kategorinya dulu'); if (F.barang.some(b => !b.nama)) throw ramah('Ada barang yang belum diberi nama');
    if (!F.rekening_id) throw ramah(mk ? 'Pilih uangnya masuk ke mana' : 'Pilih bayar pakai apa'); await A.simpan({ id: F.id || null, rekening_id: F.rekening_id, jenis: F.jenis || 'keluar', tanggal: F.tanggal, toko: F.toko, kategori_id: F.kategori_id, total: F.total, ppn: mk ? 0 : F.ppn, sumber: F.sumber, barang: mk ? [] : F.barang }); toast(mk ? 'Pemasukan tersimpan' : 'Catatan tersimpan'); F.id ? history.back() : go('beranda', 0, true);
  }),
  fhapus: b => tanya({ j: 'Hapus catatan ini?', s: 'Catatan yang dihapus tidak bisa dikembalikan.', ya: 'Ya, hapus', r: 1 }, 'fhapus2', b),
  fhapus2: b => busy(b, async () => { await A.hapus(S.fo.id); tutup(); toast('Catatan dihapus'); history.back(); }), tutup,
  bmode: b => { bacaB(); S.bg.mode = b.dataset.m; formB(); }, bpt: () => { bacaB(); S.bg.p.push(''); formB(); },
  bpx: b => { bacaB(); const i = +b.dataset.i; S.bg.p.splice(i, 1); S.bg.items.forEach(x => x.s = x.s.filter(k => k !== i).map(k => k > i ? k - 1 : k)); formB(); },
  bit: () => { bacaB(); S.bg.items.push({ n: '', h: 0, s: [] }); formB(); }, bfoto: () => $('#bf').click(), bgal: () => $('#bf2').click(), bix: b => { bacaB(); S.bg.items.splice(+b.dataset.b, 1); formB(); },
  bchk: b => { bacaB(); const x = S.bg.items[+b.dataset.b], i = +b.dataset.i; x.s = x.s.includes(i) ? x.s.filter(k => k !== i) : x.s.concat(i); hitB(); },
  bwa: () => { try { const { B, r, nm, items } = dataB(); kirimWA(waText({ judul: B.judul, tanggal: B.tgl, total: r.total, ppn: r.ppn, pct: String(B.pct).replace('.', ','), p: B.p.map((_, i) => ({ nama: nm(i), bagian: r.bag[i] })), items: items.map(x => ({ nama: x.nama, harga: x.harga, untuk: x.s.map(nm).join(', ') })) })); } catch (e) { toast(pesan(e)); } },
  bsimpan: b => busy(b, async () => {
    const { B, r, nm, items } = dataB(); const id = await A.simpanT({ tanggal: B.tgl, judul: B.judul, subtotal: r.sub, ppn_persen: B.pct, ppn: r.ppn, mode: B.mode, simpan_jatah: B.jatah, kategori_id: B.jatah ? B.kat : null, rekening_id: B.jatah ? B.rek || null : null, peserta: B.p.map((_, i) => ({ nama: nm(i), saya: i === 0, bagian: r.bag[i] })), barang: items.map(x => ({ nama: x.nama, harga: x.harga, peserta: x.s })) });
    S.bg = null; toast('Tagihan tersimpan'); go('tagihanDetail', { id }, true);
  }),
  tbuka: b => go('tagihanDetail', { id: b.dataset.id }), twa: () => { const d = S.td; kirimWA(waText({ ...d, pct: String(d.pct).replace('.', ',') })); },
  thapus: b => tanya({ j: 'Hapus tagihan ini?', s: 'Jatahmu yang tercatat sebagai pengeluaran juga ikut terhapus.', ya: 'Ya, hapus', r: 1 }, 'thapus2', b),
  thapus2: b => busy(b, async () => { await A.hapusT(S.td.id); tutup(); toast('Tagihan dihapus'); history.back(); }),
  lm: b => go('laporan', { m: b.dataset.m }, true),
  asimpan: b => busy(b, async () => {
    const ch = [], H0 = hari(); document.querySelectorAll('[data-k]').forEach(e => { const k = e.dataset.k, v = num(e.value); if (v !== pickB(S.ag, k, H0)) ch.push(k === 'total' ? { batas: v } : { kategori_id: k, batas: v }); });
    if (!ch.length) throw ramah('Belum ada yang diubah'); await A.atur(ch); toast('Anggaran tersimpan'); history.back();
  }),
  um: b => { S.ux.m = b.dataset.m; document.querySelectorAll('[data-a=um]').forEach(x => { const on = x.dataset.m === S.ux.m; x.style.borderColor = on ? 'var(--pb)' : 'transparent'; x.querySelector('span').style.borderColor = on ? 'var(--pb)' : 'var(--ln2)'; x.querySelector('i').style.background = on ? 'var(--pb)' : 'transparent'; }); $('#ub').style.display = S.ux.m === 'tertentu' ? '' : 'none'; },
  uunduh: b => busy(b, bikinXlsx),
  pasang: () => { const sdh = matchMedia('(display-mode: standalone)').matches || navigator.standalone; modal(`<div class="b" style="font-size:18px">Pasang di layar HP</div>${sdh ? '<div class="note g">Aplikasi sudah terpasang di perangkat ini.</div>' : `${S.ip ? `<div class="mt">${btn('ipasang', 'Pasang sekarang')}</div>` : ''}<div class="s13 mt" style="line-height:1.7"><b>iPhone / iPad (Safari):</b> ketuk tombol Bagikan (kotak dengan panah ke atas), lalu pilih "Tambah ke Layar Utama".<br><b>Android (Chrome):</b> ketuk menu titik tiga, lalu "Instal aplikasi".<br><b>Laptop / PC (Chrome atau Edge):</b> klik ikon pasang di sebelah kanan kolom alamat.</div>`}<div class="mt2">${btn('tutup', 'Tutup', 'o')}</div>`); },
  ipasang: async () => { if (S.ip) { S.ip.prompt(); await S.ip.userChoice.catch(() => { }); S.ip = null; } tutup(); },
  kbaru: b => modalKat(null, b.dataset.j || 'keluar'), kedit: b => modalKat(S.kat.find(k => k.id === b.dataset.id)),
  kwarna: b => { S.ke.warna = b.dataset.w; document.querySelectorAll('[data-a=kwarna]').forEach(x => x.style.outline = x.dataset.w === S.ke.warna ? '3px solid var(--tx)' : 'none'); },
  ksimpan: b => busy(b, async () => {
    const nm = $('#kn').value.trim().replace(/\s+/g, ' '); if (!nm) throw ramah('Isi nama kategorinya dulu');
    if (S.kat.some(k => k.id !== S.ke.id && (k.jenis || 'keluar') === S.ke.jenis && k.nama.toLowerCase() === nm.toLowerCase())) throw ramah('Nama kategori itu sudah ada');
    const id = await A.katSimpan({ id: S.ke.id, nama: nm, warna: S.ke.warna, jenis: S.ke.jenis, urutan: S.kat.length + 1 }); S.kat = await A.kategori(); tutup(); toast('Kategori tersimpan');
    if (S.cur[0] === 'form' && $('#o-kat')) { const F = bacaF(); if (!S.ke.id && id) F.kategori_id = id; return go('form', { draft: F }, true); }
    if (S.cur[0] === 'aturAnggaran') { S.agDraft = {}; document.querySelectorAll('#v [data-k]').forEach(e => S.agDraft[e.dataset.k] = e.value); } draw();
  }),
  khapus: b => busy(b, async () => {
    const k = S.ke, lain = S.kat.filter(x => x.id !== k.id && (x.jenis || 'keluar') === k.jenis); if (!lain.length) throw ramah('Minimal harus ada satu kategori'); const jml = (await A.catatan({ kat: k.id, per: 1 })).total, def = (lain.find(x => x.nama === 'Lainnya') || lain[0]).id;
    modal(`<div class="b" style="font-size:18px">Hapus kategori ${E(k.nama)}?</div>${jml ? `<div class="mu s13 mt" style="line-height:1.5">Ada ${jml} catatan di kategori ini. Supaya tidak hilang, catatan itu dipindah ke:</div><div class="f"><select class="in" id="kp">${lain.map(x => `<option value="${E(x.id)}" ${x.id === def ? 'selected' : ''}>${E(x.nama)}</option>`).join('')}</select></div>` : '<div class="mu s13 mt">Belum ada catatan di kategori ini.</div>'}<div class="mu s12 mt">Batas anggaran untuk kategori ini ikut terhapus.</div>
    <div class="mt2">${btn('khapus2', jml ? 'Pindahkan dan hapus' : 'Ya, hapus', '', '', 'Menghapus…')}</div><div class="mt">${btn('tutup', 'Batal', 'o')}</div>`);
  }),
  khapus2: b => busy(b, async () => { await A.katHapus(S.ke.id, $('#kp')?.value || null); S.kat = await A.kategori(); tutup(); toast('Kategori dihapus'); draw(); }),
  kgeser: b => busy(b, async () => { const jn = b.dataset.j, i = +b.dataset.i, j = i + +b.dataset.d, a = S.kat.filter(k => (k.jenis || 'keluar') === jn); if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; const all = jn === 'masuk' ? KK().concat(a) : a.concat(KM()); await A.katUrut(all.map(k => k.id)); S.kat = all; R.kategori(); }),
  plus: () => modal(`<div class="b" style="font-size:18px">Mau catat apa?</div>${[['scan', 'cam', 'Catat pengeluaran', 'Foto struk, atau ketik manual', 1], ['masuk', 'arIn', 'Catat pemasukan', 'Gaji, bonus, jualan, kiriman'], ['pindah', 'swap', 'Pindah uang', 'Tarik tunai, isi e-wallet, antar bank']].map(([v, i, t, d, u]) => `<button class="row" style="width:100%;text-align:left;padding:14px;border-radius:20px;background:var(--bgs);margin-top:10px" data-a="pilih" data-v="${v}"><span style="width:46px;height:46px;border-radius:16px;display:flex;align-items:center;justify-content:center;flex:none;${u ? 'background:var(--pb);color:#fff' : 'background:var(--chip);color:var(--pr)'}">${ic(i, 22)}</span><span><div class="b" style="font-size:15px">${t}</div><div class="mu s12" style="margin-top:2px">${d}</div></span></button>`).join('')}<div class="mt">${btn('tutup', 'Batal', 'o')}</div>`),
  pilih: b => { const v = b.dataset.v; tutup(); v === 'scan' ? go('scan') : v === 'pindah' ? go('pindah') : go('form', { jenis: v }); },
  kpilih: b => { $('#o-kat').value = b.dataset.id; document.querySelectorAll('[data-a=kpilih]').forEach(x => x.classList.toggle('on', x === b)); },
  fj: b => { S.fd.jenis = b.dataset.j; S.fd.kat = ''; S.fchips(); muatD(true).catch(e => toast(pesan(e))); },
  rpilih: b => { const t = b.dataset.t; $('#' + t).value = b.dataset.id; b.parentElement.querySelectorAll('[data-a=rpilih]').forEach(x => { const on = x === b; x.style.background = on ? 'var(--pb)' : ''; x.style.borderColor = on ? 'var(--pb)' : ''; x.style.color = on ? '#fff' : ''; }); },
  rbaru: () => modalRek(null), redit: () => modalRek(S.rd),
  rjenis: b => { S.re.jenis = b.dataset.j; S.rseg(); },
  rwarna: b => { S.re.warna = b.dataset.w; document.querySelectorAll('[data-a=rwarna]').forEach(x => x.style.outline = x.dataset.w === S.re.warna ? '3px solid var(--tx)' : 'none'); },
  rsimpan: b => busy(b, async () => {
    const nm = $('#rn').value.trim().replace(/\s+/g, ' '), sal = num($('#rs').value); if (!nm) throw ramah('Isi nama rekeningnya dulu');
    if (S.rek.some(r => r.id !== S.re.id && r.nama.toLowerCase() === nm.toLowerCase())) throw ramah('Nama rekening itu sudah ada');
    const lama = S.re.id ? S.rek.find(r => r.id === S.re.id) : null, draft = S.cur[0] === 'form' && $('#o-kat') ? bacaF() : S.cur[0] === 'pindah' ? bacaP() : null;
    const id = await A.rekSimpan({ id: S.re.id, nama: nm, jenis: S.re.jenis, warna: S.re.warna, urutan: S.rek.length + 1, saldo_awal: sal });
    if (lama && sal !== Math.abs(Number(lama.saldo))) await A.rekSaldo(lama.id, sal - Number(lama.saldo));
    S.rek = await A.rek(); tutup(); toast('Rekening tersimpan');
    if (draft && S.cur[0] === 'form') { if (!lama && id) draft.rekening_id = id; return go('form', { draft }, true); }
    if (draft && S.cur[0] === 'pindah') return go('pindah', { draft }, true);
    draw();
  }),
  rhapus: b => busy(b, async () => {
    try { await A.rekHapus(S.re.id); } catch (e) { const nm = E(S.rek.find(r => r.id === S.re.id)?.nama || 'ini'); tutup(); return tanya({ j: 'Rekening ' + nm + ' belum bisa dihapus', s: `${E(pesan(e))}<br><br><b>Langkahnya:</b><br>1. Buka rekening ${nm} di Dompet &amp; rekening.<br>2. Ketuk tiap catatan, ganti "Bayar pakai" ke rekening lain, lalu simpan.<br>3. Pindah uang yang memakai rekening ini: ketuk lalu hapus.<br>4. Setelah kosong, hapus rekening ini lagi.`, info: 1 }); }
    S.rek = await A.rek(); tutup(); toast('Rekening dihapus'); go('dompet', 0, true); }),
  rbln: b => go('rekDetail', { id: S.rd.id, bln: b.dataset.b }, true),
  phapus: b => { S.ph = b.dataset.id; tanya({ j: 'Hapus pindah uang ini?', s: 'Saldo kedua rekening kembali seperti sebelum dipindah. Biaya adminnya (kalau ada) ikut terhapus.', ya: 'Ya, hapus', r: 1 }, 'phapus2', b); },
  phapus2: b => busy(b, async () => { await A.hapusPindah(S.ph); tutup(); toast('Pindah uang dihapus'); draw(); }),
  psimpan: b => busy(b, async () => {
    const d = bacaP(); if (d.jumlah <= 0) throw ramah('Isi jumlah yang dipindah dulu'); if (!d.dari || !d.ke) throw ramah('Pilih rekening asal dan tujuannya'); if (d.dari === d.ke) throw ramah('Rekening asal dan tujuan harus beda'); if (!/^\d{4}-\d{2}-\d{2}$/.test(d.tanggal)) throw ramah('Isi tanggalnya dulu');
    await A.pindah(d); S.rek = await A.rek(); toast('Uang sudah dipindah'); go('dompet', 0, true);
  }),
  keluar: b => tanya({ j: 'Keluar dari aplikasi?', s: 'Nanti perlu masuk lagi pakai email dan kata sandi.', ya: 'Ya, keluar', r: 1 }, 'keluar2', b),
  keluar2: b => busy(b, async () => { await A.keluar(); S.u = null; S.bg = null; tutup(); go('masuk', 0, true); }),
};
addEventListener('beforeinstallprompt', e => { e.preventDefault(); S.ip = e; });
document.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b || !H[b.dataset.a]) return; const a = b.dataset.a; if (KON[a] && !b.disabled) { const o = KON[a](); return o.info ? tanya(o) : tanya(o, a, b); } H[a](b, e); });
document.addEventListener('input', e => {
  const t = e.target; if (t.classList.contains('mn')) t.value = fmt(num(t.value));
  if (t.id === 'g-p' && S.bg) S.bg.ppnRp = null;
  const i = t.dataset.i; if (i === 'sandi') S.cek?.(); else if (i === 'bg' && $('#gh')) { if (t.type === 'checkbox' || t.tagName === 'SELECT') bacaB(); hitB(); } else if (i === 'fd') { const F = S.fd; F.bln = $('#fb').value ? $('#fb').value + '-01' : ''; clearTimeout(S.dt); S.dt = setTimeout(() => { F.q = $('#fq').value.trim(); muatD(true).catch(x => toast(pesan(x))); }, 300); }
  else if (t.closest('#bl') || t.id === 'o-ppn' || t.id === 'o-px') selisih();
});
document.addEventListener('change', e => { if (e.target.id === 'g-k' || e.target.id === 'g-t') hitB(); });
$('#mod').addEventListener('click', e => { if (e.target.id === 'mod') tutup(); });
addEventListener('unhandledrejection', e => { e.preventDefault(); toast(pesan(e.reason)); });

// ===== MULAI =====
async function mulai() {
  const [pg, kt, rk] = await Promise.all([A.peng(), A.kategori(), A.rek()]); S.set = pg; S.kat = kt; S.rek = rk; tema();
  const st = history.state, ok = st && R[st.v] && !['masuk', 'gantiSandi', 'namaku'].includes(st.v);
  !pg.sandi_diganti ? go('gantiSandi', {}, true) : !pg.nama ? go('namaku', {}, true) : ok ? go(st.v, st.p, true) : go('beranda', 0, true);
}
(async () => {
  if ('serviceWorker' in navigator && !IS_PREVIEW) navigator.serviceWorker.register('./sw.js').catch(() => { });
  if (!A || (!IS_PREVIEW && /^ISI_/.test(CFG.URL))) return render(`<div class="card c" style="margin-top:30vh"><div class="b">${!A ? 'Butuh internet untuk membuka data' : 'Aplikasi belum disambungkan ke database'}</div><div class="mu s13 mt">${!A ? 'Sambungkan ke internet, lalu coba lagi.' : 'Pemilik aplikasi perlu mengisi alamat dan kunci Supabase.'}</div>${!A ? `<div class="mt">${btn('muat', 'Coba lagi')}</div>` : ''}</div>`);
  H.muat = () => location.reload(); tema();
  try { if (IS_PREVIEW) { S.u = { id: 'u1', email: 'vira@email.com' }; await mulai(); } else { S.u = await A.sesi(); S.u ? await mulai() : go('masuk', 0, true); } } catch (e) { go('masuk', 0, true); toast(pesan(e)); }
})();
