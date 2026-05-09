import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function CatalogPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate network request delay for the shimmer effect
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setIsSearching(false);
    }, 1200);
  };

  const handleCatChange = (id) => {
    setActiveCat(id);
    setIsSearching(true);
    clearTimeout(window.catTimeout);
    window.catTimeout = setTimeout(() => {
      setIsSearching(false);
    }, 1200);
  };

  const filtered = products.filter(p => {
    const matchesCat = activeCat === 'all' || p.category === activeCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
      <Header title="KATALOG" />
      <div className="page-animate">
      <div style={{ padding: '16px 14px 8px' }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 12, top: 11, color: 'var(--text-muted)' }}>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <input 
            type="text" 
            placeholder="Qidirish..." 
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '100%', padding: '10px 12px 10px 38px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 6, color: 'var(--text-primary)', outline: 'none',
              fontSize: 13, fontFamily: "'Inter', sans-serif"
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, margin: '0 -14px', paddingLeft: 14 }}>
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
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 12, padding: '8px 14px 80px'
      }}>
        {isSearching 
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length > 0 
            ? filtered.map(p => <ProductCard key={p.id} product={p} />)
            : <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>Hech narsa topilmadi</div>
        }
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
