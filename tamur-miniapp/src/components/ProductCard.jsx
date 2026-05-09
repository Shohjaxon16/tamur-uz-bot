import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTelegram } from '../hooks/useTelegram';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { items, addItem, updateQty } = useCart();
  const { haptic } = useTelegram();

  const productQty = items.filter(i => i.id === product.id).reduce((sum, i) => sum + i.qty, 0);

  const handleDecrement = (e) => {
    e.stopPropagation();
    haptic('light');
    const firstItem = items.find(i => i.id === product.id);
    if (firstItem) updateQty(firstItem.key, firstItem.qty - 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    haptic('light');
    const firstItem = items.find(i => i.id === product.id);
    if (firstItem) updateQty(firstItem.key, firstItem.qty + 1);
    else addItem(product, product.sizes[0], 0);
  };

  return (
    <div onClick={() => navigate(`/product/${product.id}`)}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 6, border: '0.5px solid var(--border)',
        overflow: 'hidden', cursor: 'pointer'
      }}>
      <div style={{
        height: 140, 
        background: 'var(--bg-card)',
        position: 'relative'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute', top: 6, left: 6,
            fontSize: 8, fontWeight: 500,
            padding: '2px 7px', borderRadius: 2,
            letterSpacing: '0.5px',
            background: product.badge === 'new' ? 'var(--text-primary)' : 'var(--danger)',
            color: '#fff'
          }}>
            {product.badge === 'new' ? 'YANGI' : 'CHEGIRMA'}
          </span>
        )}
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{
          fontSize: 11, fontWeight: 500,
          color: 'var(--text-secondary)', marginBottom: 3, letterSpacing: '0.3px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {product.name}
        </div>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span style={{
              fontSize: 10, color: 'var(--text-muted)',
              textDecoration: 'line-through', marginLeft: 4
            }}>
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {productQty > 0 ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 7, padding: '4px', background: 'var(--bg-card)',
            borderRadius: 6, border: '0.5px solid var(--border)'
          }}>
            <button onClick={handleDecrement} style={{
              width: 28, height: 28, borderRadius: 4, border: '0.5px solid var(--border)',
              background: '#ffffff', color: 'var(--text-primary)',
              fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>−</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', minWidth: 24, textAlign: 'center' }}>
              {productQty}
            </span>
            <button onClick={handleIncrement} style={{
              width: 28, height: 28, borderRadius: 4, border: 'none',
              background: 'var(--accent)', color: '#ffffff',
              fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>+</button>
          </div>
        ) : (
          <button
            onClick={handleIncrement}
            style={{
              width: '100%', marginTop: 7, padding: '6px',
              background: '#ffffff', color: 'var(--accent)',
              border: '0.5px solid var(--accent)',
              borderRadius: 3, fontSize: 10, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.5px',
              fontFamily: "'Bebas Neue', sans-serif"
            }}>
            + SAVATGA
          </button>
        )}
      </div>
    </div>
  );
}
