import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header style={{
      background: 'var(--header-bg)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '0.5px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {showBack ? (
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          color: 'var(--text-primary)', fontSize: 11, letterSpacing: '0.5px'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            ORQAGA
          </span>
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* LOGOTIP SHU YERDA CHIQADI */}
          <img 
            src="/logo.jpg" 
            alt="TAMUR Logo" 
            style={{ width: 34, height: 34, objectFit: 'cover', borderRadius: '50%' }} 
          />
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20, letterSpacing: 3,
              color: 'var(--text-primary)',
              lineHeight: 1
            }}>
              {title || 'TAMUR'}
            </div>
            <div style={{
              fontSize: 9, letterSpacing: 2,
              color: 'var(--text-muted)',
              marginTop: 2
            }}>
              MEN'S WEAR
            </div>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: 20, border: '0.5px solid var(--border)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
          +998 90 123 45 67
        </span>
      </div>
    </header>
  );
}
