import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function HomePage() {
  const [activeCat, setActiveCat] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCatChange = (id) => {
    setActiveCat(id);
    setIsLoading(true);
    clearTimeout(window.homeCatTimeout);
    window.homeCatTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Katalog bilan bir xil 1.2s
  };

  const filtered = activeCat === 'all'
    ? products
    : products.filter(p => p.category === activeCat);

  const SkeletonCard = () => (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 6, border: '0.5px solid var(--border)',
      overflow: 'hidden'
    }}>
      <div className="skeleton" style={{ height: 140, width: '100%' }}></div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div className="skeleton" style={{ height: 12, width: '80%', borderRadius: 3, marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 16, width: '50%', borderRadius: 3, marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 26, width: '100%', borderRadius: 3, marginTop: 7 }}></div>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header />
      <div className="page-animate">
      {/* Hero banner */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '24px 16px',
        borderBottom: '0.5px solid var(--border)'
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 8 }}>
          YANGI KOLLEKSIYA 2026
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32, letterSpacing: 2,
          color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 16
        }}>
          ERKAKLAR<br/>USLUBI —{' '}
          <span style={{ color: 'var(--text-muted)' }}>YANGI</span><br/>DARAJA
        </div>
        <button onClick={() => navigate('/catalog')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: 'var(--accent)',
          color: '#fff', fontSize: 12, fontWeight: 500,
          border: 'none', borderRadius: 4, letterSpacing: 1,
          cursor: 'pointer', fontFamily: "'Bebas Neue', sans-serif"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          KO'RISH
        </button>
      </div>

      {/* Kategoriyalar */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 14px 12px', overflowX: 'auto' }}>
        {categories.map(cat => (
          <button key={cat.id}
            onClick={() => handleCatChange(cat.id)}
            style={{
              padding: '6px 14px', borderRadius: 4,
              fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
              cursor: 'pointer', letterSpacing: '0.5px',
              fontFamily: "'Bebas Neue', sans-serif",
              background: activeCat === cat.id ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeCat === cat.id ? '#fff' : 'var(--text-primary)',
              border: activeCat === cat.id ? '1px solid var(--accent)' : '1px solid var(--border)'
            }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mahsulotlar grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 12, padding: '8px 14px 80px'
      }}>
        {isLoading 
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
