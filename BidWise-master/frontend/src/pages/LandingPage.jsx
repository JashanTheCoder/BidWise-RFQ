import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const iv = setInterval(() => setTick((x) => x + 1), 1000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const features = [
    {
      icon: '⚡',
      title: 'British Auction Engine',
      desc: 'Configurable trigger windows and automatic bid-time extensions keep competition alive until the last moment.',
    },
    {
      icon: '📊',
      title: 'Live Rank Tracking',
      desc: 'Real-time L1/L2/L3 supplier rankings update instantly via WebSockets as bids come in.',
    },
    {
      icon: '🔒',
      title: 'Forced Close Protection',
      desc: 'Every auction has a hard forced-close deadline — no auction runs indefinitely, ensuring time-bound fairness.',
    },
    {
      icon: '🔔',
      title: 'Smart Time Extensions',
      desc: 'Bids within the trigger window automatically extend the auction. Configurable X-minute window and Y-minute extension.',
    },
    {
      icon: '👥',
      title: 'Role-Based Access',
      desc: 'Buyers create RFQs and invite suppliers. Suppliers bid competitively. Admins manage the platform.',
    },
    {
      icon: '📜',
      title: 'Activity Log',
      desc: 'Every bid, rank change, and time extension is logged with timestamps for full audit transparency.',
    },
  ];



  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden',
    }}>

      {/* ─── Topbar ─── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(12,14,26,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 28px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--gold) 0%, #4c1d95 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 14, color: '#fff', fontWeight: 900, letterSpacing: 1,
            }}>B</div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)',
              letterSpacing: 4,
            }}>BIDWISE</span>
            <span style={{
              fontSize: 10, color: 'var(--text-muted)', borderLeft: '1px solid var(--border)',
              paddingLeft: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>British Auction RFQ System</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '8px 20px', background: 'transparent',
                border: '1px solid var(--border-hover)', borderRadius: 8,
                color: 'var(--text-primary)', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-hover)'; e.target.style.color = 'var(--text-primary)'; }}
            >Sign In</button>
            <button
              onClick={() => navigate('/login?mode=register')}
              style={{
                padding: '8px 20px', background: 'var(--gold)', border: 'none', borderRadius: 8,
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-body)', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--gold-light)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; }}
            >Get Started →</button>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '120px 28px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Radial background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(139,92,246,0.1) 0%, transparent 70%)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Live badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 100, background: 'rgba(34,197,94,0.06)',
          marginBottom: 36,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 8px rgba(34,197,94,0.8)',
            display: 'inline-block',
            animation: 'pulse-dot 2s infinite',
          }} />
          <span style={{ fontSize: 12, color: 'var(--accent-green)', fontWeight: 600, letterSpacing: '0.08em' }}>
            LIVE
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          fontWeight: 300,
          color: 'var(--text-secondary)',
          marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          Bid Smarter. <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Compete Harder.</span> Win Faster.
        </h1>

        <p style={{
          fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560,
          lineHeight: 1.7, marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          BIDWISE is a British-style RFQ auction platform where suppliers compete in real-time.
          Automatic time extensions, live rankings, and forced close rules keep every auction fair.
        </p>

        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}>
          <button
            onClick={() => navigate('/login?mode=register')}
            style={{
              padding: '15px 36px', background: 'var(--gold)', border: 'none',
              borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 800,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em', transition: 'all 0.2s',
              boxShadow: '0 0 40px rgba(139,92,246,0.3)',
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 40px rgba(139,92,246,0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 40px rgba(139,92,246,0.3)'; }}
          >Start Bidding Free</button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '15px 36px', background: 'transparent',
              border: '1px solid var(--border-hover)', borderRadius: 10,
              color: 'var(--text-primary)', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-hover)'; e.target.style.color = 'var(--text-primary)'; }}
          >Sign In to Existing Account</button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: 0.4,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>



      {/* ─── How it works ─── */}
      <section style={{ padding: '100px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>The Process</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 52, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>HOW IT WORKS</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {[
            { step: '01', title: 'Buyer Creates RFQ', desc: 'Set up the auction with item details, bid window, trigger config, and forced close time.' },
            { step: '02', title: 'Suppliers Compete', desc: 'Invited suppliers submit bids in real time. Ranks update live — L1, L2, L3 and beyond.' },
            { step: '03', title: 'Auto Extensions Fire', desc: 'Late bids trigger time extensions automatically. Forced close ensures the auction always ends.' },
          ].map((step) => (
            <div key={step.step} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              padding: '40px 32px', position: 'relative',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-border)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 72,
                color: 'rgba(139,92,246,0.08)', position: 'absolute', top: 20, right: 24,
                lineHeight: 1, letterSpacing: 2,
              }}>{step.step}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--gold)',
                letterSpacing: '0.12em', marginBottom: 16,
              }}>{step.step}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* ─── Features ─── */}
      <section style={{ padding: '100px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Platform Capabilities</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 52, letterSpacing: '0.04em' }}>BUILT FOR FAIR AUCTIONS</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{
              padding: '28px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: 12,
              transition: 'all 0.25s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        padding: '100px 28px', textAlign: 'center',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }} />
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
          letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: 20,
          position: 'relative',
        }}>
          READY TO START<br />WINNING AUCTIONS?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 44, position: 'relative' }}>
          Join buyers and suppliers already using BIDWISE for transparent, fair procurement.
        </p>
        <button
          onClick={() => navigate('/login?mode=register')}
          style={{
            padding: '18px 56px', background: 'var(--gold)', border: 'none',
            borderRadius: 10, color: '#fff', fontSize: 16, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
            transition: 'all 0.2s', position: 'relative',
            boxShadow: '0 0 60px rgba(139,92,246,0.35)',
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 12px 60px rgba(139,92,246,0.6)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 60px rgba(139,92,246,0.35)'; }}
        >CREATE FREE ACCOUNT</button>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)', letterSpacing: 3 }}>BIDWISE</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>British Auction RFQ System</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026 BIDWISE. Fair auctions, always.</div>
      </footer>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
