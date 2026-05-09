import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { 
    path: '/', 
    label: 'Bosh',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    )
  },
  { 
    path: '/catalog', 
    label: 'Katalog',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6h-6z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6h-6z" />
        <circle cx="17" cy="17" r="3" />
      </svg>
    )
  },
  { 
    path: '/cart', 
    label: 'Savat',
    isSpecial: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
    )
  },
  { 
    path: '/history', 
    label: 'Tarix',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 7l0 5l3 3" />
      </svg>
    )
  },
  { 
    path: '/settings', 
    label: 'Sozlamalar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      </svg>
    )
  }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav style={{
      display: 'flex',
      background: 'var(--nav-bg)',
      borderTop: '0.5px solid var(--border)',
      padding: '8px 4px 12px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      maxWidth: '480px',
      zIndex: 100,
      alignItems: 'flex-end',
      backdropFilter: 'blur(10px)'
    }}>
      {navItems.map(item => {
        const isActive = location.pathname === item.path;
        
        return (
          <button key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              position: 'relative',
              padding: '8px 0'
            }}>
            <div style={{ 
              position: 'relative',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              transform: item.isSpecial ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 0.2s ease',
              marginBottom: item.isSpecial ? 2 : 0
            }}>
              {item.icon}
              {item.path === '/cart' && totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4, right: -8,
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: 8, fontWeight: 700,
                  borderRadius: '50%',
                  width: 15, height: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid var(--nav-bg)'
                }}>{totalItems}</span>
              )}
            </div>
            <span style={{
              fontSize: 9, letterSpacing: '0.5px',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: isActive ? 600 : 500
            }}>
              {item.label}
            </span>
            {isActive && !item.isSpecial && (
              <div style={{
                width: 3, height: 3, borderRadius: '50%',
                background: 'var(--text-primary)',
                position: 'absolute', bottom: 4
              }}></div>
            )}
          </button>
        );
      })}
    </nav>
  );
}
