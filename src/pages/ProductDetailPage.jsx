import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTelegram } from '../hooks/useTelegram';
import { products } from '../data/products';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { haptic } = useTelegram();
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return <div style={{ color: 'var(--text-primary)', padding: 20 }}>Topilmadi</div>;

  const handleAdd = () => {
    haptic('medium');
    addItem(product, selectedSize, selectedColor);
    navigate('/cart');
  };

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header showBack />
      <div className="page-animate">

      {/* Mahsulot rasmi */}
      <div style={{
        height: 350, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-card)', borderBottom: '0.5px solid var(--border)'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '14px 16px 100px', background: 'var(--bg-secondary)', borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: -16, position: 'relative', zIndex: 10, boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 4, marginTop: 4 }}>
          TAMUR EXCLUSIVE
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 24, letterSpacing: 2,
          color: 'var(--text-primary)', marginBottom: 4
        }}>
          {product.name}
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
          {product.price.toLocaleString()} so'm
          {product.oldPrice && (
            <span style={{ fontSize: 13, color: 'var(--text-muted)',
              textDecoration: 'line-through', marginLeft: 8, fontWeight: 400 }}>
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
          <i className="ti ti-star-filled" style={{ color: 'var(--text-primary)', fontSize: 12 }}></i>
          {product.rating} ({product.reviews} ta sharh)
        </div>

        {/* O'lchamlar */}
        <div style={{ fontSize: 10, letterSpacing: 1,
          color: 'var(--text-primary)', fontWeight: 600, marginBottom: 8 }}>O'LCHAM</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {product.sizes.map(sz => (
            <button key={sz} onClick={() => setSelectedSize(sz)} style={{
              padding: '8px 16px',
              border: sz === selectedSize ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: 4, fontSize: 11, cursor: 'pointer',
              background: sz === selectedSize ? 'var(--accent)' : 'none',
              color: sz === selectedSize ? '#fff' : 'var(--text-primary)',
              fontWeight: sz === selectedSize ? 600 : 400
            }}>{sz}</button>
          ))}
        </div>

        {/* Ranglar */}
        <div style={{ fontSize: 10, letterSpacing: 1,
          color: 'var(--text-primary)', fontWeight: 600, marginBottom: 10 }}>RANG</div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {product.colors.map((c, i) => (
            <div key={i} onClick={() => setSelectedColor(i)} style={{
              width: 26, height: 26, borderRadius: '50%',
              background: c.hex, cursor: 'pointer',
              border: '1px solid #ddd',
              outline: i === selectedColor ? '2px solid var(--accent)' : 'none',
              outlineOffset: 2
            }}></div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: 'var(--text-secondary)',
          lineHeight: 1.6, marginBottom: 24 }}>
          {product.description}
        </div>

        {/* Savatga tugma */}
        <button onClick={handleAdd} style={{
          width: '100%', padding: 14,
          background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 4,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 16, letterSpacing: 2, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <i className="ti ti-shopping-cart" style={{ fontSize: 18 }}></i>
          SAVATGA QO'SHISH
        </button>
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
