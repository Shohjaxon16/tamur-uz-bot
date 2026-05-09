import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function HistoryPage() {
  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header title="TARIX" />
      <div className="page-animate">
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <i className="ti ti-clock" style={{ fontSize: 48, display: 'block', marginBottom: 12 }}></i>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 2 }}>TARIX BO'SH</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>Siz hali xarid qilmadingiz</div>
      </div>
      </div>
      <BottomNav />
    </div>
  );
}
