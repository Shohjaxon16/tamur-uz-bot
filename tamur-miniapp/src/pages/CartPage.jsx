import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const DELIVERY = 20000;

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!items.length) return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header title="SAVATCHA" />
      <div className="page-animate">
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <i className="ti ti-shopping-bag" style={{ fontSize: 48, display: 'block', marginBottom: 12, color: 'var(--text-primary)' }}></i>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 2, color: 'var(--text-primary)' }}>SAVATCHA BO'SH</div>
        <button onClick={() => navigate('/')} style={{
          marginTop: 20, padding: '10px 24px',
          background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 4, cursor: 'pointer',
          fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: 2
        }}>XARID QILISH</button>
      </div>
      </div>
      <BottomNav />
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header title={`SAVATCHA (${totalItems})`} />
      <div className="page-animate">
      <div style={{ paddingBottom: 80 }}>
        {items.map(item => (
          <div key={item.key} style={{
            display: 'flex', gap: 12, padding: '12px 14px',
            borderBottom: '0.5px solid var(--border-light)', alignItems: 'center',
            background: 'var(--bg-secondary)', marginBottom: 4
          }}>
            <div style={{
              width: 60, height: 75,
              background: 'var(--bg-card)', borderRadius: 4,
              border: '0.5px solid var(--border)',
              overflow: 'hidden', flexShrink: 0
            }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500,
                color: 'var(--text-primary)', marginBottom: 4 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)',
                marginBottom: 6, letterSpacing: '0.3px' }}>
                O'lcham: {item.size} · {item.colors[item.colorIndex]?.name}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                {(item.price * item.qty).toLocaleString()} so'm
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-app)', padding: '4px 8px', borderRadius: 6, border: '0.5px solid var(--border)' }}>
                <button onClick={() => updateQty(item.key, item.qty - 1)} style={{
                  width: 28, height: 28, borderRadius: 4,
                  border: '0.5px solid var(--border)',
                  background: '#ffffff', color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 600,
                  color: 'var(--text-primary)', minWidth: 20, textAlign: 'center' }}>
                  {item.qty}
                </span>
                <button onClick={() => updateQty(item.key, item.qty + 1)} style={{
                  width: 28, height: 28, borderRadius: 4,
                  border: 'none',
                  background: 'var(--accent)', color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>+</button>
              </div>
              <button onClick={() => removeItem(item.key)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', display: 'flex',
                justifyContent: 'center', width: '100%'
              }}>
                <i className="ti ti-trash" style={{ fontSize: 18 }}></i>
              </button>
            </div>
          </div>
        ))}

        {/* Yig'indi */}
        <div style={{
          margin: '14px',
          background: 'var(--bg-secondary)',
          borderRadius: 6, border: '0.5px solid var(--border)',
          padding: '12px 14px'
        }}>
          {[
            [`Mahsulotlar (${totalItems} ta)`, `${totalPrice.toLocaleString()} so'm`],
            ['Yetkazib berish', `${DELIVERY.toLocaleString()} so'm`]
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between',
              fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.3px' }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between',
            fontSize: 16, fontWeight: 600, color: 'var(--text-primary)',
            paddingTop: 8, borderTop: '0.5px solid var(--border)', marginTop: 4 }}>
            <span style={{ fontFamily: "'Bebas Neue'", letterSpacing: 1 }}>JAMI TO'LOV</span>
            <span>
              {(totalPrice + DELIVERY).toLocaleString()} so'm
            </span>
          </div>
        </div>

        <button onClick={() => navigate('/order')} style={{
          margin: '0 14px 14px', width: 'calc(100% - 28px)',
          padding: 14, background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 4, cursor: 'pointer',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 16, letterSpacing: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <i className="ti ti-credit-card" style={{ fontSize: 18 }}></i>
          BUYURTMA BERISH
        </button>
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
