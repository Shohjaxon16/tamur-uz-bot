import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTelegram } from '../hooks/useTelegram';
import Header from '../components/Header';
import axios from 'axios';

const VILOYATLAR = [
  'Toshkent shahri','Toshkent viloyati','Andijon','Farg\'ona',
  'Namangan','Samarqand','Buxoro','Navoiy','Qashqadaryo',
  'Surxondaryo','Jizzax','Sirdaryo','Xorazm','Qoraqalpog\'iston'
];

export default function OrderPage() {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { haptic } = useTelegram();

  const [form, setForm] = useState({
    name: '', phone: '+998 ', region: '', address: '', note: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const deliveryPrice = 20000;
  const finalTotal = totalPrice + deliveryPrice;

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    let numbers = input.replace(/\D/g, '');
    if (!numbers.startsWith('998')) numbers = '998' + numbers;
    numbers = numbers.substring(0, 12);
    let formatted = '+998';
    if (numbers.length > 3) formatted += ' ' + numbers.substring(3, 5);
    if (numbers.length > 5) formatted += ' ' + numbers.substring(5, 8);
    if (numbers.length > 8) formatted += ' ' + numbers.substring(8, 10);
    if (numbers.length > 10) formatted += ' ' + numbers.substring(10, 12);
    setForm(prev => ({ ...prev, phone: formatted }));
  };

  const handleGetLocation = () => {
    setLocating(true);
    haptic('light');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${longitude},${latitude}`);
          const address = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
          setForm(prev => ({ ...prev, address: address }));
          haptic('success');
        } catch {
          setForm(prev => ({ ...prev, address: `${latitude}, ${longitude}` }));
        } finally {
          setLocating(false);
        }
      }, () => {
        setLocating(false);
        alert("Joylashuvni aniqlash uchun ruxsat bering.");
      });
    } else {
      setLocating(false);
      alert("Geolokatsiya qo'llab-quvvatlanmaydi.");
    }
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) e.name = 'Ism Familiya to\'liq yozing';
    if (form.phone.replace(/\s/g, '').length < 13) e.phone = 'Raqam noto\'g\'ri';
    if (!form.region) e.region = 'Viloyat tanlang';
    if (form.address.trim().length < 5) e.address = 'Manzilni kiriting';
    return e;
  };

  const handleSubmit = async () => {
    setLoading(true);
    haptic('medium');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order`,
        { ...form, items, totalPrice, delivery: deliveryPrice }
      );
      clearCart();
      navigate('/success', { state: { orderId: res.data.orderId } });
    } catch {
      alert('Xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const ConfirmModal = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div className="page-animate" style={{
        background: 'var(--bg-secondary)', borderRadius: 12,
        padding: 24, width: '100%', maxWidth: 320, textAlign: 'center',
        border: '0.5px solid var(--border)'
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: 1 }}>
          BUYURTMANI TASDIQLAYSIZMI?
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>
          Barcha ma'lumotlar to'g'riligiga ishonchingiz komilmi?
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setShowConfirm(false)} style={{
            flex: 1, padding: '12px', borderRadius: 8, border: '0.5px solid var(--border)',
            background: 'none', color: 'var(--text-secondary)',
            fontFamily: "'Bebas Neue'", fontSize: 14, cursor: 'pointer'
          }}>YO'Q</button>
          <button onClick={handleSubmit} style={{
            flex: 1, padding: '12px', borderRadius: 8, border: 'none',
            background: 'var(--accent)', color: '#fff',
            fontFamily: "'Bebas Neue'", fontSize: 14, cursor: 'pointer'
          }}>HA, TASDIQLAYMAN</button>
        </div>
      </div>
    </div>
  );

  const MapModal = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 1001,
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
        <span style={{ fontFamily: "'Bebas Neue'", color: 'var(--text-primary)', fontSize: 16 }}>XARITADAN TANLASH</span>
        <button onClick={() => setShowMap(false)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <iframe 
          src="https://yandex.uz/map-widget/v1/-/CCU8F-H9sA" 
          width="100%" height="100%" frameBorder="0" 
          style={{ border: 'none' }}
        ></iframe>
        <div style={{
          position: 'absolute', bottom: 20, left: 20, right: 20,
          background: 'var(--bg-secondary)', padding: 16, borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '0.5px solid var(--border)'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
            Xaritadan kerakli nuqtani toping va manzilni kiriting.
          </div>
          <button onClick={() => setShowMap(false)} style={{
            width: '100%', padding: '12px', background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 6, fontFamily: "'Bebas Neue'", fontSize: 14
          }}>MANZILNI TASDIQLASH</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header showBack />
      <div className="page-animate">
      <div style={{ padding: '14px 16px 120px' }}>
        <div style={{
          fontFamily: "'Bebas Neue'", fontSize: 18,
          letterSpacing: 2, color: 'var(--text-primary)', marginBottom: 4
        }}>YETKAZIB BERISH</div>
        <div style={{ fontSize: 10, letterSpacing: 1,
          color: 'var(--text-muted)', marginBottom: 16 }}>
          MIJOZ MA'LUMOTLARI
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Ism Familiya"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            style={{
              width: '100%', padding: '12px',
              border: errors.name ? '0.5px solid var(--danger)' : '0.5px solid var(--border)',
              borderRadius: 6, fontSize: 13, color: 'var(--text-primary)',
              background: 'var(--bg-secondary)', outline: 'none'
            }}
          />
          {errors.name && <div style={{ fontSize: 10, color: 'var(--danger)', marginTop: 4 }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="tel"
            value={form.phone}
            onChange={handlePhoneChange}
            style={{
              width: '100%', padding: '12px',
              border: errors.phone ? '0.5px solid var(--danger)' : '0.5px solid var(--border)',
              borderRadius: 6, fontSize: 13, color: 'var(--text-primary)',
              background: 'var(--bg-secondary)', outline: 'none'
            }}
          />
          {errors.phone && <div style={{ fontSize: 10, color: 'var(--danger)', marginTop: 4 }}>{errors.phone}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <select
            value={form.region}
            onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
            style={{
              width: '100%', padding: '12px',
              border: errors.region ? '0.5px solid var(--danger)' : '0.5px solid var(--border)',
              borderRadius: 6, fontSize: 13, color: form.region ? 'var(--text-primary)' : 'var(--text-muted)',
              background: 'var(--bg-secondary)', outline: 'none', appearance: 'none'
            }}>
            <option value="">Viloyat tanlang...</option>
            {VILOYATLAR.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 12, position: 'relative' }}>
          <textarea
            placeholder="Ko'cha, uy raqami, kvartira"
            value={form.address}
            onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
            style={{
              width: '100%', padding: '12px', paddingRight: '70px',
              border: errors.address ? '0.5px solid var(--danger)' : '0.5px solid var(--border)',
              borderRadius: 6, fontSize: 13, color: 'var(--text-primary)',
              background: 'var(--bg-secondary)', outline: 'none',
              minHeight: 60, resize: 'none'
            }}
          />
          <div style={{ position: 'absolute', right: 10, top: 12, display: 'flex', gap: 8 }}>
            <button onClick={handleGetLocation} style={{ background: 'none', border: 'none', color: 'var(--accent)', padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </button>
            <button onClick={() => setShowMap(true)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
            </button>
          </div>
        </div>

        <textarea
          placeholder="Izoh (ixtiyoriy)..."
          value={form.note}
          onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
          style={{
            width: '100%', padding: '12px',
            border: '0.5px solid var(--border)', borderRadius: 6,
            fontSize: 13, color: 'var(--text-primary)',
            background: 'var(--bg-secondary)', height: 80,
            resize: 'none', outline: 'none', marginBottom: 20
          }}
        />

        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 12, padding: 16,
          border: '0.5px solid var(--border)', marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Mahsulotlar ({totalItems}):</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{totalPrice.toLocaleString()} UZS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Yetkazib berish:</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{deliveryPrice.toLocaleString()} UZS</span>
          </div>
          <div style={{ height: '0.5px', background: 'var(--border)', marginBottom: 12 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: 'var(--text-primary)', letterSpacing: 1 }}>UMUMIY SUMMA:</span>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: 'var(--accent)', letterSpacing: 1 }}>{finalTotal.toLocaleString()} UZS</span>
          </div>
        </div>

        <button onClick={() => {
          const e = validate();
          if (Object.keys(e).length) { setErrors(e); haptic('error'); return; }
          setShowConfirm(true);
          haptic('light');
        }} disabled={loading} style={{
          width: '100%', padding: 15,
          background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8,
          fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 2, cursor: 'pointer'
        }}>
          TASDIQLASH
        </button>
      </div>
      </div>
      {showConfirm && <ConfirmModal />}
      {showMap && <MapModal />}
    </div>
  );
}
