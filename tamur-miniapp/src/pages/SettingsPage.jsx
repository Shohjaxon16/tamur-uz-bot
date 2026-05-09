import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useTelegram } from '../hooks/useTelegram';

export default function SettingsPage() {
  const { user } = useTelegram();

  const settingsItems = [
    {
      label: 'SHAXSIY MA\'LUMOTLAR',
      items: [
        { label: 'Ism', value: user?.first_name || 'Mijoz' },
        { label: 'Username', value: user?.username ? `@${user.username}` : 'Mavjud emas' },
        { label: 'Telefon (Bot)', value: '+998 90 123 45 67' }, // Placeholder for registered phone
      ]
    },
    {
      label: 'YORDAM VA ALOQA',
      items: [
        { 
          label: 'Admin bilan bog\'lanish', 
          value: 'Telegram orqali', 
          onClick: () => window.open('https://t.me/admin_tamur', '_blank'),
          isLink: true 
        },
        { 
          label: 'Ishonch telefoni', 
          value: '+998 90 123 45 67',
          onClick: () => window.open('tel:+998901234567'),
          isLink: true
        }
      ]
    }
  ];

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh' }}>
      <Header title="SOZLANMALAR" />
      <div className="page-animate">
        <div style={{ padding: '20px 16px 100px' }}>
          
          {settingsItems.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 24 }}>
              <div style={{ 
                fontFamily: "'Bebas Neue'", fontSize: 14, 
                letterSpacing: 2, color: 'var(--text-muted)',
                marginBottom: 12, paddingLeft: 4
              }}>
                {section.label}
              </div>
              <div style={{ 
                background: 'var(--bg-secondary)', 
                borderRadius: 12, border: '0.5px solid var(--border)',
                overflow: 'hidden'
              }}>
                {section.items.map((item, i) => (
                  <div key={i} 
                    onClick={item.onClick}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 16px',
                      borderBottom: i === section.items.length - 1 ? 'none' : '0.5px solid var(--border)',
                      cursor: item.onClick ? 'pointer' : 'default'
                    }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ 
                        fontSize: 13, fontWeight: 600, 
                        color: item.isLink ? 'var(--accent)' : 'var(--text-primary)' 
                      }}>
                        {item.value}
                      </span>
                      {item.isLink && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 2, color: 'var(--text-primary)' }}>
              TAMUR MEN'S WEAR
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, letterSpacing: 1 }}>
              VERSION 2.1.0 (2026)
            </div>
          </div>

        </div>
      </div>
      <BottomNav />
    </div>
  );
}
