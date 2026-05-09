import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header />
      <div className="page-animate">
      <div style={{
        padding: '48px 20px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center'
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#1a2a1a', border: '1px solid #2d5a2d',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: 18
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <div style={{
          fontFamily: "'Bebas Neue'", fontSize: 20,
          letterSpacing: 2, color: 'var(--text-primary)', marginBottom: 8
        }}>
          BUYURTMA QABUL QILINDI
        </div>

        <div style={{
          fontSize: 12, color: 'var(--text-muted)',
          lineHeight: 1.7, marginBottom: 16, letterSpacing: '0.3px'
        }}>
          Tez orada operator siz bilan bog'lanadi<br/>
          va yetkazib berish vaqtini tasdiqlaydi.
        </div>

        <div style={{
          background: 'var(--bg-secondary)',
          border: '0.5px solid var(--accent)',
          borderRadius: 4, padding: '8px 24px',
          fontFamily: "'Bebas Neue'", fontSize: 14,
          color: 'var(--accent)', marginBottom: 24, letterSpacing: 2
        }}>
          #{state?.orderId || 'TAMUR-2025-001'}
        </div>

        <button onClick={() => navigate('/')} style={{
          padding: '10px 28px', background: 'var(--bg-secondary)',
          border: '0.5px solid var(--border)',
          borderRadius: 4, fontSize: 12, color: 'var(--text-secondary)',
          cursor: 'pointer', fontFamily: "'Bebas Neue'", letterSpacing: 1
        }}>
          XARID DAVOM ETTIRISH
        </button>
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
