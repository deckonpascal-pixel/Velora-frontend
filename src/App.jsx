import React, { useState, useMemo, useCallback } from "react";
import { Heart, ShoppingBag, Menu, X, User, Plus, Minus, ArrowRight, Search, Phone, Mail, Truck, ShieldCheck, Headphones, LayoutDashboard, Package, ClipboardList, Users, Tag, Star, Settings, LogOut } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens — black / gold streetwear-luxury                      */
/* ------------------------------------------------------------------ */
const C = {
  ink: "#0C0C0D",
  surface: "#18171B",
  surfaceLine: "rgba(243,238,227,0.12)",
  gold: "#C9A227",
  goldSoft: "#E8D9A0",
  cream: "#F3EEE3",
  creamDim: "#E9E2D2",
  textDark: "#17161A",
  textDarkMuted: "rgba(23,22,26,0.62)",
  textLight: "#F3EEE3",
  textLightMuted: "rgba(243,238,227,0.62)",
  lineDark: "rgba(23,22,26,0.12)",
  sale: "#B5602E",
  success: "#4C8F63",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Space+Mono:wght@400;700&display=swap');
    .f-head { font-family: 'Archivo', sans-serif; }
    .f-body { font-family: 'Archivo', sans-serif; }
    .f-logo { font-family: 'Cormorant Garamond', serif; }
    .f-mono { font-family: 'Space Mono', monospace; }
    * { box-sizing: border-box; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    @keyframes riseIn { from { opacity: 0; transform: translateY(12px);} to { opacity:1; transform: translateY(0);} }
    .rise { animation: riseIn 0.55s ease both; }
    .icon-btn { padding: 8px; border-radius: 9999px; transition: background 0.15s ease; background: transparent; border: none; cursor: pointer; }
    .icon-btn:hover { background: rgba(255,255,255,0.08); }
    .media-frame { overflow: hidden; }
    .media-frame svg { transition: transform 0.35s ease; }
    .media-frame:hover svg { transform: scale(1.04); }
    @media (prefers-reduced-motion: reduce) {
      .rise, .media-frame svg { animation: none !important; transition: none !important; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/* Crown mark                                                           */
/* ------------------------------------------------------------------ */
function Crown({ size = 20, color = C.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 8L7 11L12 4L17 11L21 8L19 18H5L3 8Z" fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ dark }) {
  return (
    <div className="flex items-center gap-2">
      <Crown size={22} />
      <span className="f-logo tracking-wide" style={{ color: dark ? C.textDark : C.textLight, fontSize: 24 }}>VELORA</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Garment sketch — signature motif, recolorable for light/dark context */
/* ------------------------------------------------------------------ */
function Sketch({ kind, wash, stroke = C.textDark, className, style }) {
  const common = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    top: (<><path d="M70 55 L85 40 L100 48 L115 40 L130 55 L150 75 L135 92 L120 80 L120 175 L80 175 L80 80 L65 92 L50 75 Z" {...common} /><path d="M85 40 Q100 60 115 40" {...common} /></>),
    hoodie: (<><path d="M65 60 Q100 30 135 60 L150 85 L132 95 L128 78 L128 185 L72 185 L72 78 L68 95 L50 85 Z" {...common} /><path d="M78 60 Q100 78 122 60" {...common} /><circle cx="100" cy="50" r="6" {...common} /></>),
    dress: (<><path d="M78 45 L100 35 L122 45 L128 60 L112 55 L112 90 L150 190 L50 190 L88 90 L88 55 L72 60 Z" {...common} /><path d="M88 55 Q100 72 112 55" {...common} /></>),
    jacket: (<><path d="M65 50 L95 38 L100 48 L105 38 L135 50 L150 80 L132 90 L128 70 L128 185 L72 185 L72 70 L68 90 L50 80 Z" {...common} /><path d="M95 38 L88 90 L100 60 L112 90 L105 38" {...common} /></>),
    pants: (<><path d="M78 40 L122 40 L126 100 L140 185 L112 185 L100 110 L88 185 L60 185 L74 100 Z" {...common} /><line x1="78" y1="40" x2="122" y2="40" {...common} /></>),
    bag: (<><rect x="55" y="90" width="90" height="80" rx="6" {...common} /><path d="M75 90 Q75 55 100 55 Q125 55 125 90" {...common} /><line x1="55" y1="120" x2="145" y2="120" {...common} /></>),
    shoe: (<><path d="M40 150 Q40 120 70 115 L100 100 Q130 92 150 108 Q165 118 160 140 L160 150 Q160 160 150 160 L50 160 Q40 160 40 150 Z" {...common} /><path d="M70 115 L70 140" {...common} /><path d="M100 100 L100 130" {...common} /></>),
  };
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} role="img" aria-label={`${kind} sketch`}>
      {wash && <rect x="8" y="8" width="184" height="204" rx="4" fill={wash} opacity="0.9" />}
      {paths[kind] || paths.top}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  { id: "p1", name: "Velora Signature Hoodie", cat: "Hoodies", price: 24000, kind: "hoodie", wash: "#EDE7D8", badge: "New" },
  { id: "p2", name: "Velora Oversized Tee", cat: "T-Shirts", price: 13500, was: 15000, kind: "top", wash: "#F1ECE0", badge: "Sale" },
  { id: "p3", name: "Velora Premium Joggers", cat: "Pants", price: 18500, kind: "pants", wash: "#EAE3D2" },
  { id: "p4", name: "Velora Varsity Jacket", cat: "Jackets", price: 32000, kind: "jacket", wash: "#EDE4D0", badge: "New" },
  { id: "p5", name: "Velora Court Tee", cat: "T-Shirts", price: 12000, kind: "top", wash: "#F1ECE0" },
  { id: "p6", name: "Velora Bomber Jacket", cat: "Jackets", price: 38500, kind: "jacket", wash: "#EAE3D2" },
  { id: "p7", name: "Velora Cargo Pants", cat: "Pants", price: 21500, kind: "pants", wash: "#EDE7D8" },
  { id: "p8", name: "Velora Weekend Tote", cat: "Accessories", price: 15500, kind: "bag", wash: "#F1ECE0" },
  { id: "p9", name: "Velora Court Sneaker", cat: "Accessories", price: 29500, kind: "shoe", wash: "#EAE3D2" },
];

const CATEGORIES = [
  { name: "T-Shirts", kind: "top" },
  { name: "Hoodies", kind: "hoodie" },
  { name: "Jackets", kind: "jacket" },
  { name: "Pants", kind: "pants" },
  { name: "Accessories", kind: "bag" },
];

const fmt = (n) => `₦${n.toLocaleString("en-NG")}`;

/* ------------------------------------------------------------------ */
/* Backend API helper                                                    */
/* ------------------------------------------------------------------ */
const API_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "http://localhost:4000/api";

async function api(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

function normalizeProduct(p) {
  return { ...p, cat: p.category || p.cat };
}

/* ------------------------------------------------------------------ */
/* Small atoms                                                          */
/* ------------------------------------------------------------------ */
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed left-1/2 rise" style={{ bottom: 24, transform: "translateX(-50%)", zIndex: 100, background: C.gold, color: C.ink, padding: "12px 20px", borderRadius: 9999, boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
      <span className="f-body font-medium" style={{ fontSize: 14 }}>{toast}</span>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="f-mono uppercase mb-3 flex items-center gap-2" style={{ color: C.gold, fontSize: 11, letterSpacing: "0.25em" }}>
      <span style={{ width: 16, height: 1, background: C.gold, display: "inline-block" }} />
      {children}
    </div>
  );
}

function GoldButton({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`f-body text-sm font-semibold px-6 py-3 rounded-md transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2 ${className}`} style={{ background: C.gold, color: C.ink }}>
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, dark, className = "" }) {
  return (
    <button onClick={onClick} className={`f-body text-sm font-semibold px-6 py-3 rounded-md border transition-colors inline-flex items-center gap-2 ${className}`} style={{ borderColor: dark ? C.textLight : C.textDark, color: dark ? C.textLight : C.textDark }}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Top utility bar + Header                                             */
/* ------------------------------------------------------------------ */
function TopBar({ goAdmin }) {
  return (
    <div className="hidden md:flex items-center justify-between px-8 f-mono" style={{ height: 36, fontSize: 11, background: C.ink, color: C.textLightMuted, borderBottom: `1px solid ${C.surfaceLine}` }}>
      <span className="flex items-center gap-2"><Crown size={12} /> Free delivery on orders over {fmt(50000)}</span>
      <div className="flex items-center gap-6">
        <span>Track Order</span>
        <span>Help Center</span>
        <span className="flex items-center gap-1"><Phone size={11} /> 07087563363</span>
        <span className="flex items-center gap-1"><Mail size={11} /> em2350990@gmail.com</span>
        <button onClick={goAdmin} className="opacity-60 hover:opacity-100" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", font: "inherit" }}>Admin</button>
      </div>
    </div>
  );
}

function Header({ page, setPage, cartCount, wishCount, onOpenCart, onOpenWish, onOpenAccount, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Shop", "Services", "About", "Contact"];
  return (
    <header className="sticky top-0" style={{ zIndex: 40, background: C.ink, borderBottom: `1px solid ${C.surfaceLine}` }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-6" style={{ height: 80 }}>
        <button onClick={() => { setPage("Home"); setMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><Logo /></button>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <button key={l} onClick={() => setPage(l)} className="f-body text-sm relative pb-1" style={{ color: page === l ? C.gold : C.textLight, background: "none", border: "none", cursor: "pointer" }}>
              {l}
              {page === l && <span className="absolute left-0 w-full" style={{ bottom: -2, height: 2, background: C.gold }} />}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-xs">
          <div className="flex items-center w-full rounded-md px-3 py-2 gap-2" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
            <Search size={14} color={C.textLightMuted} />
            <input placeholder="Search products…" className="f-body bg-transparent outline-none text-sm w-full" style={{ color: C.textLight }} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button aria-label="Wishlist" onClick={onOpenWish} className="icon-btn relative">
            <Heart size={19} color={C.textLight} />
            {wishCount > 0 && <span className="f-mono absolute flex items-center justify-center" style={{ top: -2, right: -2, fontSize: 9, width: 16, height: 16, borderRadius: 9999, background: C.gold, color: C.ink }}>{wishCount}</span>}
          </button>
          <button aria-label="Cart" onClick={onOpenCart} className="icon-btn relative">
            <ShoppingBag size={19} color={C.textLight} />
            {cartCount > 0 && <span className="f-mono absolute flex items-center justify-center" style={{ top: -2, right: -2, fontSize: 9, width: 16, height: 16, borderRadius: 9999, background: C.gold, color: C.ink }}>{cartCount}</span>}
          </button>
          <button aria-label="Account" onClick={onOpenAccount} className="icon-btn">
            {user ? <span className="f-mono flex items-center justify-center" style={{ fontSize: 10, width: 19, height: 19, borderRadius: 9999, background: C.gold, color: C.ink }}>{user[0].toUpperCase()}</span> : <User size={19} color={C.textLight} />}
          </button>
          <button aria-label="Menu" onClick={() => setMenuOpen((v) => !v)} className="icon-btn lg:hidden">
            {menuOpen ? <X size={19} color={C.textLight} /> : <Menu size={19} color={C.textLight} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden flex flex-col px-5 pb-4 gap-3" style={{ borderTop: `1px solid ${C.surfaceLine}` }}>
          {links.map((l) => (
            <button key={l} onClick={() => { setPage(l); setMenuOpen(false); }} className="f-body text-left text-sm py-1" style={{ color: page === l ? C.gold : C.textLight, background: "none", border: "none", cursor: "pointer" }}>{l}</button>
          ))}
          <button onClick={() => { setPage("Admin"); setMenuOpen(false); }} className="f-mono text-left uppercase tracking-wider py-1" style={{ fontSize: 11, color: C.textLightMuted, background: "none", border: "none", cursor: "pointer", borderTop: `1px solid ${C.surfaceLine}`, paddingTop: 10, marginTop: 4 }}>Admin</button>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Product card                                                         */
/* ------------------------------------------------------------------ */
function ProductCard({ p, inWish, inCart, onToggleWish, onAddCart }) {
  return (
    <div>
      <div className="relative media-frame rounded-xl" style={{ background: C.creamDim }}>
        {p.badge && (
          <span className="absolute f-mono uppercase" style={{ top: 12, left: 12, zIndex: 10, fontSize: 10, padding: "4px 8px", borderRadius: 9999, background: p.badge === "New" ? C.gold : C.sale, color: p.badge === "New" ? C.ink : "#fff" }}>
            {p.badge}
          </span>
        )}
        <button onClick={() => onToggleWish(p.id)} aria-label="wishlist" className="absolute flex items-center justify-center" style={{ top: 12, right: 12, zIndex: 10, width: 32, height: 32, borderRadius: 9999, background: C.cream, border: "none", cursor: "pointer" }}>
          <Heart size={14} color={C.gold} fill={inWish ? C.gold : "none"} />
        </button>
        <Sketch kind={p.kind} wash={p.wash} stroke={C.textDark} className="w-full" style={{ height: 224 }} />
      </div>
      <div className="mt-3">
        <div className="f-mono uppercase tracking-wider" style={{ color: C.gold, fontSize: 10 }}>{p.cat}</div>
        <div className="f-body text-sm mt-0.5" style={{ color: C.textDark }}>{p.name}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="f-mono text-sm" style={{ color: C.textDark }}>{fmt(p.price)}</span>
          {p.was && <span className="f-mono text-xs" style={{ color: C.textDarkMuted, textDecoration: "line-through" }}>{fmt(p.was)}</span>}
        </div>
      </div>
      <button onClick={() => onAddCart(p.id)} className="f-body text-xs mt-2 w-full rounded-md flex items-center justify-center gap-2 transition-colors" style={{ padding: "10px 0", border: "none", cursor: "pointer", ...(inCart ? { background: C.textDark, color: C.cream } : { background: C.gold, color: C.ink }) }}>
        <ShoppingBag size={12} /> {inCart ? "In your bag" : "Add to Cart"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                  */
/* ------------------------------------------------------------------ */
function FeatureStrip() {
  const items = [
    { icon: ShieldCheck, title: "Premium Quality", body: "Carefully selected high-quality fabric" },
    { icon: Truck, title: "Fast Delivery", body: "Quick and reliable nationwide delivery" },
    { icon: ShieldCheck, title: "Secure Payments", body: "Safe, one-tap card payments" },
    { icon: Headphones, title: "Customer Support", body: "We're here to help, every day" },
  ];
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 relative" style={{ marginTop: -40, zIndex: 10 }}>
      <div className="rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8" style={{ background: C.cream, boxShadow: "0 20px 45px rgba(0,0,0,0.18)" }}>
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 44, height: 44, background: "rgba(201,162,39,0.15)" }}>
              <it.icon size={18} color={C.gold} />
            </div>
            <div>
              <div className="f-body text-sm font-semibold" style={{ color: C.textDark }}>{it.title}</div>
              <div className="f-body text-xs mt-0.5" style={{ color: C.textDarkMuted }}>{it.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home({ setPage, products, wishIds, cartIds, onToggleWish, onAddCart }) {
  const featured = products.slice(0, 4);
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="rise">
            <Eyebrow>New Collection</Eyebrow>
            <h1 className="f-head text-4xl md:text-6xl font-black mb-5" style={{ color: C.textLight, lineHeight: 1.05 }}>
              Welcome to<br /><span style={{ color: C.gold }}>Velora</span>
            </h1>
            <p className="f-body text-base leading-relaxed max-w-sm mb-8" style={{ color: C.textLightMuted }}>
              Quality clothing, exceptional style, delivered with care.
            </p>
            <div className="flex flex-wrap gap-3">
              <GoldButton onClick={() => setPage("Shop")}>Shop Now <ArrowRight size={15} /></GoldButton>
              <OutlineButton dark onClick={() => setPage("Contact")}>Contact Us <ArrowRight size={15} /></OutlineButton>
            </div>
          </div>
          <div className="relative rise" style={{ animationDelay: "0.1s" }}>
            <div className="absolute rounded-full" style={{ inset: -32, opacity: 0.3, background: `radial-gradient(circle, ${C.gold}33, transparent 70%)` }} />
            <Sketch kind="hoodie" stroke={C.goldSoft} className="relative w-full" style={{ height: 320 }} />
          </div>
        </div>
      </section>

      <FeatureStrip />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="f-head text-2xl md:text-3xl font-bold" style={{ color: C.textDark }}>Categories</h2>
          <button onClick={() => setPage("Shop")} className="f-body text-sm flex items-center gap-1" style={{ color: C.gold, background: "none", border: "none", cursor: "pointer" }}>View all <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((c) => (
            <button key={c.name} onClick={() => setPage("Shop")} className="flex flex-col items-center gap-2" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <div className="rounded-full flex items-center justify-center" style={{ width: 72, height: 72, background: C.creamDim }}>
                <Sketch kind={c.kind} stroke={C.textDark} style={{ width: 36, height: 36 }} />
              </div>
              <span className="f-body text-xs" style={{ color: C.textDark }}>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="f-head text-2xl md:text-3xl font-bold" style={{ color: C.textDark }}>Featured Products</h2>
          <button onClick={() => setPage("Shop")} className="f-body text-sm flex items-center gap-1" style={{ color: C.gold, background: "none", border: "none", cursor: "pointer" }}>View all <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} inWish={wishIds.has(p.id)} inCart={cartIds.has(p.id)} onToggleWish={onToggleWish} onAddCart={onAddCart} />
          ))}
        </div>
      </section>

      <section className="py-16" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>Shop With Confidence</Eyebrow>
            <h3 className="f-head text-2xl md:text-3xl font-bold mb-4" style={{ color: C.textLight }}>Your destination for premium clothing and timeless style.</h3>
            <GoldButton onClick={() => setPage("Shop")}>Shop Now <ArrowRight size={15} /></GoldButton>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["jacket", "hoodie", "pants"].map((k) => (
              <div key={k} className="rounded-xl p-4" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
                <Sketch kind={k} stroke={C.goldSoft} className="w-full" style={{ height: 112 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shop                                                                  */
/* ------------------------------------------------------------------ */
function Shop({ products, wishIds, cartIds, onToggleWish, onAddCart }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...CATEGORIES.map((c) => c.name)];
  const list = useMemo(() => (filter === "All" ? products : products.filter((p) => p.cat === filter)), [filter, products]);
  return (
    <div>
      <div className="py-10" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Eyebrow>Full Collection</Eyebrow>
          <h1 className="f-head text-3xl md:text-4xl font-black" style={{ color: C.textLight }}>Shop Velora</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className="f-mono uppercase tracking-wider rounded-full border transition-colors" style={{ fontSize: 11, padding: "8px 16px", ...(filter === c ? { background: C.gold, color: C.ink, borderColor: C.gold } : { borderColor: C.lineDark, color: C.textDark, background: "none" }) }}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} inWish={wishIds.has(p.id)} inCart={cartIds.has(p.id)} onToggleWish={onToggleWish} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services / About / Contact                                          */
/* ------------------------------------------------------------------ */
function Services() {
  const items = [
    { title: "Custom Fittings", body: "Book a one-on-one fitting session at our Lagos studio to get sizing exactly right." },
    { title: "Style Consultations", body: "A stylist helps you build a capsule wardrobe from the current collection." },
    { title: "Corporate & Bulk Orders", body: "Branded pieces for teams and events, produced in the same small-batch runs." },
  ];
  return (
    <div>
      <div className="py-10" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Eyebrow>What We Offer</Eyebrow>
          <h1 className="f-head text-3xl md:text-4xl font-black" style={{ color: C.textLight }}>Services</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl p-6" style={{ background: C.creamDim }}>
            <div className="rounded-full flex items-center justify-center mb-4" style={{ width: 40, height: 40, background: "rgba(201,162,39,0.18)" }}>
              <Crown size={16} />
            </div>
            <div className="f-head text-lg font-bold mb-2" style={{ color: C.textDark }}>{it.title}</div>
            <p className="f-body text-sm leading-relaxed" style={{ color: C.textDarkMuted }}>{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const values = [
    { label: "Fabric First", body: "We choose the cloth before the silhouette — cotton, fleece, and denim that holds up." },
    { label: "Small Runs", body: "Each style ships in limited batches. When it's gone, it's gone." },
    { label: "Fair Mills", body: "Produced with partners in Lagos held to clear wage and safety standards." },
  ];
  return (
    <div>
      <div className="py-10" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Eyebrow>About Us</Eyebrow>
          <h1 className="f-head text-3xl md:text-4xl font-black" style={{ color: C.textLight }}>The Velora story</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
        <p className="f-body text-base leading-relaxed mb-5" style={{ color: C.textDarkMuted }}>
          Velora started in a single Lagos sewing room in 2023 with one goal: build clothing that looks premium without
          the wait time or markup of imported streetwear. Every hoodie, tee, and jacket is cut and finished locally.
        </p>
        <p className="f-body text-base leading-relaxed mb-10" style={{ color: C.textDarkMuted }}>
          We keep runs small and drops infrequent — fewer pieces, made properly, worn for years instead of a season.
        </p>
        <div className="space-y-6">
          {values.map((v) => (
            <div key={v.label} className="pb-6" style={{ borderBottom: `1px solid ${C.lineDark}` }}>
              <div className="f-head text-lg font-bold mb-1" style={{ color: C.gold }}>{v.label}</div>
              <p className="f-body text-sm leading-relaxed" style={{ color: C.textDarkMuted }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact({ showToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { showToast("Fill in every field first"); return; }
    showToast(`Thanks ${form.name.split(" ")[0]} — we'll reply within a day`);
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div>
      <div className="py-10" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="f-head text-3xl md:text-4xl font-black" style={{ color: C.textLight }}>Get in touch</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-2 gap-12">
        <div className="f-body text-sm space-y-4" style={{ color: C.textDark }}>
          <div><span className="f-mono" style={{ color: C.gold, fontSize: 12 }}>STUDIO</span><br />14 Alaba Close, Lekki Phase 1, Lagos</div>
          <div><span className="f-mono" style={{ color: C.gold, fontSize: 12 }}>PHONE</span><br />07087563363</div>
          <div><span className="f-mono" style={{ color: C.gold, fontSize: 12 }}>EMAIL</span><br />em2350990@gmail.com</div>
          <div><span className="f-mono" style={{ color: C.gold, fontSize: 12 }}>CHECKOUT</span><br />Bank transfer (OPay) — confirm via WhatsApp</div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {["name", "email"].map((field) => (
            <div key={field}>
              <label className="f-mono uppercase tracking-wider block mb-1" style={{ color: C.textDarkMuted, fontSize: 11 }}>{field}</label>
              <input type={field === "email" ? "email" : "text"} value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.lineDark, background: C.cream, color: C.textDark }} />
            </div>
          ))}
          <div>
            <label className="f-mono uppercase tracking-wider block mb-1" style={{ color: C.textDarkMuted, fontSize: 11 }}>Message</label>
            <textarea rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="f-body w-full px-4 py-3 rounded-md border outline-none resize-none" style={{ borderColor: C.lineDark, background: C.cream, color: C.textDark }} />
          </div>
          <GoldButton onClick={submit} className="w-full justify-center">Send Message</GoldButton>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin dashboard                                                       */
/* ------------------------------------------------------------------ */
const STATUS_COLOR = { paid: C.success, pending: "rgba(243,238,227,0.5)", shipped: C.gold, delivered: C.success, cancelled: C.sale };

function AdminLogin({ onLoggedIn, exitAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api("/auth/admin-login", { method: "POST", body: { email, password } });
      onLoggedIn(data.token);
    } catch (err) {
      setError(err.message || "Could not reach the server — is the backend running?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: C.ink }}>
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl p-6" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
        <div className="flex justify-center mb-6"><Logo /></div>
        <h1 className="f-head text-lg font-bold mb-4 text-center" style={{ color: C.textLight }}>Admin login</h1>
        <div className="space-y-3">
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.surfaceLine, background: C.ink, color: C.textLight }} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.surfaceLine, background: C.ink, color: C.textLight }} />
        </div>
        {error && <p className="f-body text-xs mt-3" style={{ color: C.sale }}>{error}</p>}
        <GoldButton onClick={submit} className="w-full justify-center mt-4">{busy ? "Checking…" : "Sign in"}</GoldButton>
        <button type="button" onClick={exitAdmin} className="f-mono block mx-auto mt-4" style={{ fontSize: 11, color: C.textLightMuted, background: "none", border: "none", cursor: "pointer" }}>Exit to storefront</button>
      </form>
    </div>
  );
}

function AdminDashboard({ adminToken, onLoggedIn, exitAdmin, showToast }) {
  const [nav, setNav] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!adminToken) return;
    setLoading(true);
    Promise.all([
      api("/orders", { token: adminToken }),
      api("/products"),
    ])
      .then(([o, p]) => { setOrders(o); setProducts(p.map(normalizeProduct)); })
      .catch((err) => showToast(err.message || "Could not load dashboard data — is the backend running?"))
      .finally(() => setLoading(false));
  }, [adminToken]);

  if (!adminToken) return <AdminLogin onLoggedIn={onLoggedIn} exitAdmin={exitAdmin} />;

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Products", icon: Package },
    { label: "Orders", icon: ClipboardList },
    { label: "Customers", icon: Users },
    { label: "Coupons", icon: Tag },
    { label: "Reviews", icon: Star },
    { label: "Settings", icon: Settings },
  ];

  const totalSales = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomers = new Set(orders.map((o) => o.email)).size;
  const stats = [
    { label: "Total Sales", value: fmt(totalSales), delta: "" },
    { label: "Total Orders", value: String(orders.length), delta: "" },
    { label: "Total Customers", value: String(uniqueCustomers), delta: "" },
    { label: "Products", value: String(products.length), delta: "" },
  ];
  const salesByProduct = {};
  orders.forEach((o) => o.items?.forEach((it) => { salesByProduct[it.productId] = (salesByProduct[it.productId] || 0) + it.quantity; }));
  const topProducts = products
    .map((p) => ({ ...p, sold: salesByProduct[p.id] || 0 }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex" style={{ background: C.ink }}>
      <aside className="hidden md:flex flex-col flex-shrink-0" style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.surfaceLine}` }}>
        <div className="flex items-center px-6" style={{ height: 80 }}><Logo /></div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((it) => (
            <button key={it.label} onClick={() => setNav(it.label)} className="w-full flex items-center gap-3 px-3 rounded-md f-body text-sm transition-colors" style={{ padding: "10px 12px", border: "none", cursor: "pointer", ...(nav === it.label ? { background: C.gold, color: C.ink } : { color: C.textLightMuted, background: "none" }) }}>
              <it.icon size={16} /> {it.label}
            </button>
          ))}
        </nav>
        <button onClick={exitAdmin} className="flex items-center gap-3 px-6 py-4 f-body text-sm" style={{ color: C.textLightMuted, borderTop: `1px solid ${C.surfaceLine}`, background: "none", border: "none", cursor: "pointer" }}>
          <LogOut size={16} /> Exit to storefront
        </button>
      </aside>

      <main className="flex-1 px-6 md:px-10 py-8 overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="f-head text-2xl font-bold" style={{ color: C.textLight }}>{nav}</h1>
          <button onClick={exitAdmin} className="md:hidden f-body text-xs px-3 py-2 rounded-md" style={{ background: C.surface, color: C.textLight, border: "none", cursor: "pointer" }}>Exit</button>
        </div>

        <div className="md:hidden flex gap-2 mb-8 overflow-x-auto no-scrollbar" style={{ paddingBottom: 4 }}>
          {navItems.map((it) => (
            <button key={it.label} onClick={() => setNav(it.label)} className="f-mono uppercase tracking-wider flex-shrink-0 rounded-full" style={{ fontSize: 11, padding: "8px 14px", border: "none", cursor: "pointer", ...(nav === it.label ? { background: C.gold, color: C.ink } : { background: C.surface, color: C.textLightMuted }) }}>
              {it.label}
            </button>
          ))}
        </div>

        {nav === "Dashboard" && (
        <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl p-5" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
              <div className="f-mono uppercase tracking-wider mb-2" style={{ color: C.textLightMuted, fontSize: 10 }}>{s.label}</div>
              <div className="f-head text-xl font-bold mb-1" style={{ color: C.textLight }}>{s.value}</div>
              <div className="f-mono" style={{ color: C.success, fontSize: 11 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-xl p-5 overflow-x-auto" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
            <div className="f-head text-base font-bold mb-4" style={{ color: C.textLight }}>Recent Orders</div>
            {loading ? (
              <p className="f-body text-sm" style={{ color: C.textLightMuted }}>Loading…</p>
            ) : orders.length === 0 ? (
              <p className="f-body text-sm" style={{ color: C.textLightMuted }}>No orders yet.</p>
            ) : (
              <table className="w-full f-body text-sm" style={{ minWidth: 480 }}>
                <thead>
                  <tr className="f-mono uppercase tracking-wider" style={{ color: C.textLightMuted, fontSize: 10 }}>
                    <th className="text-left pb-3">Order ID</th><th className="text-left pb-3">Customer</th><th className="text-left pb-3">Amount</th><th className="text-left pb-3">Status</th><th className="text-left pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderTop: `1px solid ${C.surfaceLine}` }}>
                      <td className="py-3" style={{ color: C.textLight }}>#VL{String(o.id).padStart(4, "0")}</td>
                      <td className="py-3" style={{ color: C.textLightMuted }}>{o.email}</td>
                      <td className="py-3 f-mono" style={{ color: C.textLight }}>{fmt(o.total)}</td>
                      <td className="py-3">
                        <select
                          value={o.status}
                          onChange={async (e) => {
                            const status = e.target.value;
                            try {
                              await api(`/orders/${o.id}/status`, { method: "PATCH", token: adminToken, body: { status } });
                              setOrders((prev) => prev.map((ord) => (ord.id === o.id ? { ...ord, status } : ord)));
                            } catch (err) {
                              showToast(err.message || "Could not update order status");
                            }
                          }}
                          className="f-mono"
                          style={{ fontSize: 10, padding: "4px 8px", borderRadius: 9999, background: `${STATUS_COLOR[o.status] || C.textLightMuted}22`, color: STATUS_COLOR[o.status] || C.textLightMuted, border: "none", cursor: "pointer" }}
                        >
                          {["pending", "paid", "shipped", "delivered", "cancelled"].map((s) => (
                            <option key={s} value={s} style={{ color: C.textDark, background: C.cream }}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 f-mono text-xs" style={{ color: C.textLightMuted }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="rounded-xl p-5" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
            <div className="f-head text-base font-bold mb-4" style={{ color: C.textLight }}>Top Products</div>
            <div className="space-y-4">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Sketch kind={p.kind} wash={C.creamDim} stroke={C.textDark} className="rounded-md flex-shrink-0" style={{ width: 40, height: 40 }} />
                  <div className="flex-1 min-w-0">
                    <div className="f-body text-xs truncate" style={{ color: C.textLight }}>{p.name}</div>
                    <div className="f-mono" style={{ color: C.textLightMuted, fontSize: 10 }}>{p.sold} sold</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
        )}

        {nav === "Products" && (
          <ProductsPanel products={products} setProducts={setProducts} adminToken={adminToken} showToast={showToast} loading={loading} />
        )}
      </main>
    </div>
  );
}

const PRODUCT_KINDS = ["top", "hoodie", "jacket", "pants", "bag", "shoe", "dress"];

function ProductForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial || { name: "", category: "", kind: "top", price: "", was: "", badge: "", stock: "100" });
  const [busy, setBusy] = useState(false);
  const field = (key, label, type = "text") => (
    <div>
      <label className="f-mono uppercase tracking-wider block mb-1" style={{ color: C.textLightMuted, fontSize: 10 }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="f-body w-full px-3 py-2 rounded-md border outline-none"
        style={{ borderColor: C.surfaceLine, background: C.ink, color: C.textLight }}
      />
    </div>
  );
  return (
    <div className="rounded-xl p-5 mb-6" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {field("name", "Product Name")}
        {field("category", "Category (e.g. Hoodies)")}
        <div>
          <label className="f-mono uppercase tracking-wider block mb-1" style={{ color: C.textLightMuted, fontSize: 10 }}>Type</label>
          <select
            value={form.kind}
            onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}
            className="f-body w-full px-3 py-2 rounded-md border outline-none"
            style={{ borderColor: C.surfaceLine, background: C.ink, color: C.textLight }}
          >
            {PRODUCT_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        {field("price", "Price (₦)", "number")}
        {field("was", "Was Price (optional, for Sale)", "number")}
        {field("badge", "Badge (New / Sale / blank)")}
        {field("stock", "Stock quantity", "number")}
      </div>
      <div className="flex gap-3">
        <GoldButton
          onClick={async () => {
            if (!form.name || !form.category || !form.price) { return; }
            setBusy(true);
            await onSave(form);
            setBusy(false);
          }}
        >
          {busy ? "Saving…" : "Save Product"}
        </GoldButton>
        <button onClick={onCancel} className="f-body text-sm" style={{ color: C.textLightMuted, background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

function ProductsPanel({ products, setProducts, adminToken, showToast, loading }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // product being edited, or null

  const createProduct = async (form) => {
    try {
      const created = await api("/products", { method: "POST", token: adminToken, body: form });
      setProducts((prev) => [...prev, normalizeProduct(created)]);
      setShowForm(false);
      showToast("Product added");
    } catch (err) {
      showToast(err.message || "Could not add product");
    }
  };

  const updateProduct = async (id, form) => {
    try {
      const updated = await api(`/products/${id}`, { method: "PUT", token: adminToken, body: form });
      setProducts((prev) => prev.map((p) => (p.id === id ? normalizeProduct(updated) : p)));
      setEditing(null);
      showToast("Product updated");
    } catch (err) {
      showToast(err.message || "Could not update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api(`/products/${id}`, { method: "DELETE", token: adminToken });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted");
    } catch (err) {
      showToast(err.message || "Could not delete product");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="f-body text-sm" style={{ color: C.textLightMuted }}>{products.length} product{products.length === 1 ? "" : "s"} in your store</p>
        {!showForm && (
          <GoldButton onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Product</GoldButton>
        )}
      </div>

      {showForm && !editing && (
        <ProductForm onCancel={() => setShowForm(false)} onSave={createProduct} />
      )}

      {loading ? (
        <p className="f-body text-sm" style={{ color: C.textLightMuted }}>Loading…</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id}>
              {editing === p.id ? (
                <ProductForm
                  initial={{ name: p.name, category: p.cat, kind: p.kind, price: String(p.price), was: p.was ? String(p.was) : "", badge: p.badge || "", stock: String(p.stock ?? 100) }}
                  onCancel={() => setEditing(null)}
                  onSave={(form) => updateProduct(p.id, form)}
                />
              ) : (
                <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: C.surface, border: `1px solid ${C.surfaceLine}` }}>
                  <Sketch kind={p.kind} wash={C.creamDim} stroke={C.textDark} className="rounded-md flex-shrink-0" style={{ width: 48, height: 48 }} />
                  <div className="flex-1 min-w-0">
                    <div className="f-body text-sm" style={{ color: C.textLight }}>{p.name}</div>
                    <div className="f-mono" style={{ color: C.textLightMuted, fontSize: 11 }}>{p.cat} · {fmt(p.price)}{p.was ? ` (was ${fmt(p.was)})` : ""} · stock: {p.stock ?? "—"}</div>
                  </div>
                  <button onClick={() => { setEditing(p.id); setShowForm(false); }} className="f-mono uppercase" style={{ fontSize: 10, color: C.gold, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="f-mono uppercase" style={{ fontSize: 10, color: C.sale, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drawers & modal                                                      */
/* ------------------------------------------------------------------ */
function Drawer({ open, onClose, title, children }) {
  return (
    <>
      <div onClick={onClose} className="fixed transition-opacity" style={{ inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} />
      <div className="fixed top-0 right-0 h-full w-full flex flex-col transition-transform" style={{ maxWidth: 384, zIndex: 50, background: C.cream, transform: open ? "translateX(0)" : "translateX(100%)" }}>
        <div className="flex items-center justify-between px-5" style={{ height: 64, borderBottom: `1px solid ${C.lineDark}` }}>
          <h2 className="f-head text-lg font-bold" style={{ color: C.textDark }}>{title}</h2>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={19} color={C.textDark} /></button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5">{children}</div>
      </div>
    </>
  );
}

const PAYMENT_INFO = {
  bankName: "OPay",
  accountNumber: "8113964173",
  accountName: "Pascal Deckon",
  whatsapp: "2347087563363",
};

function CartDrawer({ open, onClose, cart, products, setQty, removeItem, showToast, user, authToken }) {
  const [guestEmail, setGuestEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const items = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id) })).filter((c) => c.product);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const placeOrder = async () => {
    const email = user?.email || guestEmail;
    if (!email || !email.includes("@")) {
      showToast("Enter a valid email to check out");
      return;
    }
    setBusy(true);
    try {
      const order = await api("/orders", {
        method: "POST",
        token: authToken,
        body: { email, items: items.map((i) => ({ productId: i.product.id, quantity: i.qty })) },
      });
      setPlacedOrder(order);
    } catch (err) {
      showToast(err.message || "Could not reach the server — is the backend running?");
    } finally {
      setBusy(false);
    }
  };

  const closeAndReset = () => {
    setPlacedOrder(null);
    onClose();
  };

  const orderRef = placedOrder ? `VL${String(placedOrder.id).padStart(4, "0")}` : "";
  const waText = placedOrder
    ? encodeURIComponent(`Hi Velora! I just paid for order #${orderRef} (${fmt(placedOrder.total)}). Here's my payment proof:`)
    : "";
  const waLink = `https://wa.me/${PAYMENT_INFO.whatsapp}?text=${waText}`;

  return (
    <Drawer open={open} onClose={closeAndReset} title={placedOrder ? "Complete your payment" : `Your Cart (${items.length})`}>
      {placedOrder ? (
        <div className="space-y-5">
          <p className="f-body text-sm" style={{ color: C.textDark }}>
            Order <strong>#{orderRef}</strong> placed — now send <strong>{fmt(placedOrder.total)}</strong> to:
          </p>
          <div className="rounded-lg p-4 space-y-2" style={{ background: C.creamDim }}>
            <div className="flex justify-between f-body text-sm"><span style={{ color: C.textDarkMuted }}>Bank</span><span style={{ color: C.textDark }}>{PAYMENT_INFO.bankName}</span></div>
            <div className="flex justify-between f-body text-sm"><span style={{ color: C.textDarkMuted }}>Account Number</span><span className="f-mono" style={{ color: C.textDark }}>{PAYMENT_INFO.accountNumber}</span></div>
            <div className="flex justify-between f-body text-sm"><span style={{ color: C.textDarkMuted }}>Account Name</span><span style={{ color: C.textDark }}>{PAYMENT_INFO.accountName}</span></div>
          </div>
          <p className="f-body text-xs leading-relaxed" style={{ color: C.textDarkMuted }}>
            After sending the transfer, tap below to send your payment proof (screenshot) on WhatsApp.
            Your order ships once we confirm the payment.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <GoldButton className="w-full justify-center">Send proof on WhatsApp</GoldButton>
          </a>
          <button onClick={closeAndReset} className="f-body text-xs w-full text-center" style={{ color: C.textDarkMuted, background: "none", border: "none", cursor: "pointer" }}>Done</button>
        </div>
      ) : items.length === 0 ? (
        <p className="f-body text-sm" style={{ color: C.textDarkMuted }}>Your cart is empty — go find something worth wearing.</p>
      ) : (
        <div className="space-y-5">
          {items.map((i) => (
            <div key={i.id} className="flex gap-3">
              <Sketch kind={i.product.kind} wash={C.creamDim} stroke={C.textDark} className="rounded-lg flex-shrink-0" style={{ width: 80, height: 96 }} />
              <div className="flex-1">
                <div className="f-body text-sm" style={{ color: C.textDark }}>{i.product.name}</div>
                <div className="f-mono text-xs mt-1" style={{ color: C.gold }}>{fmt(i.product.price)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => setQty(i.id, Math.max(1, i.qty - 1))} className="rounded-full border flex items-center justify-center" style={{ width: 24, height: 24, borderColor: C.lineDark, background: "none", cursor: "pointer" }}><Minus size={11} color={C.textDark} /></button>
                  <span className="f-mono text-xs text-center" style={{ width: 16 }}>{i.qty}</span>
                  <button onClick={() => setQty(i.id, i.qty + 1)} className="rounded-full border flex items-center justify-center" style={{ width: 24, height: 24, borderColor: C.lineDark, background: "none", cursor: "pointer" }}><Plus size={11} color={C.textDark} /></button>
                  <button onClick={() => removeItem(i.id)} className="f-mono uppercase ml-2" style={{ fontSize: 10, color: C.textDarkMuted, background: "none", border: "none", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-4" style={{ borderTop: `1px solid ${C.lineDark}` }}>
            <div className="flex justify-between f-body text-sm mb-4"><span style={{ color: C.textDark }}>Subtotal</span><span className="f-mono" style={{ color: C.textDark }}>{fmt(subtotal)}</span></div>
            {!user && (
              <input
                placeholder="Email for order confirmation"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="f-body w-full px-4 py-3 rounded-md border outline-none mb-3"
                style={{ borderColor: C.lineDark, background: "#fff", color: C.textDark }}
              />
            )}
            <GoldButton onClick={placeOrder} className="w-full justify-center">{busy ? "Placing order…" : "Place Order"}</GoldButton>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function WishDrawer({ open, onClose, wishIds, products, onToggleWish, onAddCart }) {
  const items = products.filter((p) => wishIds.has(p.id));
  return (
    <Drawer open={open} onClose={onClose} title={`Saved (${items.length})`}>
      {items.length === 0 ? (
        <p className="f-body text-sm" style={{ color: C.textDarkMuted }}>Tap the heart on anything you want to remember.</p>
      ) : (
        <div className="space-y-5">
          {items.map((p) => (
            <div key={p.id} className="flex gap-3">
              <Sketch kind={p.kind} wash={C.creamDim} stroke={C.textDark} className="rounded-lg flex-shrink-0" style={{ width: 80, height: 96 }} />
              <div className="flex-1">
                <div className="f-body text-sm" style={{ color: C.textDark }}>{p.name}</div>
                <div className="f-mono text-xs mt-1" style={{ color: C.gold }}>{fmt(p.price)}</div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => onAddCart(p.id)} className="f-mono uppercase" style={{ fontSize: 10, color: C.textDark, background: "none", border: "none", cursor: "pointer" }}>Add to bag</button>
                  <button onClick={() => onToggleWish(p.id)} className="f-mono uppercase" style={{ fontSize: 10, color: C.textDarkMuted, background: "none", border: "none", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

function AccountModal({ open, onClose, onAuthed, showToast }) {
  const [tab, setTab] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password || (tab === "signup" && !name)) {
      showToast("Fill in every field first");
      return;
    }
    setBusy(true);
    try {
      const data = await api(tab === "signin" ? "/auth/login" : "/auth/signup", {
        method: "POST",
        body: tab === "signin" ? { email, password } : { name, email, password },
      });
      onAuthed(data.user, data.token);
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      showToast(err.message || "Could not reach the server — is the backend running?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed flex items-center justify-center px-5" style={{ inset: 0, zIndex: 60 }}>
      <div onClick={onClose} className="absolute" style={{ inset: 0, background: "rgba(0,0,0,0.6)" }} />
      <div className="relative w-full max-w-sm rounded-2xl p-6 rise" style={{ background: C.cream }}>
        <button onClick={onClose} className="absolute" style={{ top: 16, right: 16, background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.textDark} /></button>
        <div className="flex justify-center mb-4"><Logo dark /></div>
        <div className="flex gap-6 mb-6 justify-center" style={{ borderBottom: `1px solid ${C.lineDark}` }}>
          {["signin", "signup"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className="f-body text-sm pb-3" style={{ color: tab === t ? C.gold : C.textDarkMuted, borderBottom: tab === t ? `2px solid ${C.gold}` : "none", background: "none", border: "none", cursor: "pointer" }}>
              {t === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-3">
          {tab === "signup" && <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.lineDark, background: "#fff", color: C.textDark }} />}
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.lineDark, background: "#fff", color: C.textDark }} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="f-body w-full px-4 py-3 rounded-md border outline-none" style={{ borderColor: C.lineDark, background: "#fff", color: C.textDark }} />
          <GoldButton onClick={submit} className="w-full justify-center">{busy ? "Please wait…" : tab === "signin" ? "Sign in" : "Create account"}</GoldButton>
        </form>
        <p className="f-mono mt-4 text-center" style={{ fontSize: 10, color: C.textDarkMuted }}>Real account, stored in the Velora database.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                                */
/* ------------------------------------------------------------------ */
function Footer({ setPage, auth, signOut }) {
  return (
    <footer style={{ background: C.ink, borderTop: `1px solid ${C.surfaceLine}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <Logo />
          <p className="f-body text-xs max-w-xs mt-2" style={{ color: C.textLightMuted }}>Premium small-batch clothing. Lagos, Nigeria.</p>
        </div>
        <div className="f-mono uppercase tracking-wider space-y-2" style={{ color: C.textLight, fontSize: 12 }}>
          <button onClick={() => setPage("Shop")} className="block" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}>Shop</button>
          <button onClick={() => setPage("Services")} className="block" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}>Services</button>
          <button onClick={() => setPage("About")} className="block" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}>About</button>
          <button onClick={() => setPage("Contact")} className="block" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}>Contact</button>
          {auth && <button onClick={signOut} className="block" style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, font: "inherit" }}>Sign out ({auth.user.name})</button>}
        </div>
      </div>
      <div className="text-center f-mono pb-6" style={{ color: C.textLightMuted, fontSize: 10 }}>© 2026 Velora</div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                  */
/* ------------------------------------------------------------------ */
function loadStoredAuth() {
  try {
    const raw = localStorage.getItem("velora_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function VeloraApp() {
  const [page, setPage] = useState("Home");
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishIds, setWishIds] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [auth, setAuth] = useState(loadStoredAuth);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("velora_admin_token") || null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), 3200); }, []);
  const cartIds = useMemo(() => new Set(cart.map((c) => c.id)), [cart]);

  React.useEffect(() => {
    api("/products")
      .then((data) => setProducts(data.map(normalizeProduct)))
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    if (!reference) return;
    api(`/payments/verify/${reference}`)
      .then((data) => {
        if (data.success) {
          showToast("Payment confirmed — thank you for your order!");
          setCart([]);
        } else {
          showToast("We couldn't confirm that payment — contact us if you were charged.");
        }
      })
      .catch(() => showToast("Could not verify payment — contact us if you were charged."))
      .finally(() => window.history.replaceState({}, "", window.location.pathname));
  }, []);

  const onAddCart = useCallback((id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, qty: 1 }];
    });
    showToast("Added to your cart");
  }, [showToast]);

  const setQty = useCallback((id, qty) => setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c))), []);
  const removeItem = useCallback((id) => setCart((prev) => prev.filter((c) => c.id !== id)), []);
  const onToggleWish = useCallback((id) => {
    setWishIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }, []);

  const onAuthed = (user, token) => {
    const next = { user, token };
    setAuth(next);
    localStorage.setItem("velora_auth", JSON.stringify(next));
    setAccountOpen(false);
    showToast(`Welcome, ${user.name}`);
  };

  const signOut = () => {
    setAuth(null);
    localStorage.removeItem("velora_auth");
    showToast("Signed out");
  };

  const onAdminLoggedIn = (token) => {
    setAdminToken(token);
    localStorage.setItem("velora_admin_token", token);
  };

  const exitAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem("velora_admin_token");
    setPage("Home");
  };

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);

  if (page === "Admin") {
    return (
      <div className="min-h-screen f-body">
        {FONTS}
        <AdminDashboard adminToken={adminToken} onLoggedIn={onAdminLoggedIn} exitAdmin={exitAdmin} showToast={showToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen f-body" style={{ background: C.cream }}>
      {FONTS}
      <TopBar goAdmin={() => setPage("Admin")} />
      <Header page={page} setPage={setPage} cartCount={cartCount} wishCount={wishIds.size}
        onOpenCart={() => setCartOpen(true)} onOpenWish={() => setWishOpen(true)}
        onOpenAccount={() => (auth ? showToast(`Signed in as ${auth.user.name} — tap the footer link to sign out`) : setAccountOpen(true))} user={auth?.user?.name || null} />

      {page === "Home" && <Home setPage={setPage} products={products} wishIds={wishIds} cartIds={cartIds} onToggleWish={onToggleWish} onAddCart={onAddCart} />}
      {page === "Shop" && <Shop products={products} wishIds={wishIds} cartIds={cartIds} onToggleWish={onToggleWish} onAddCart={onAddCart} />}
      {page === "Services" && <Services />}
      {page === "About" && <About />}
      {page === "Contact" && <Contact showToast={showToast} />}

      <Footer setPage={setPage} auth={auth} signOut={signOut} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} products={products} setQty={setQty} removeItem={removeItem} showToast={showToast} user={auth?.user} authToken={auth?.token} />
      <WishDrawer open={wishOpen} onClose={() => setWishOpen(false)} wishIds={wishIds} products={products} onToggleWish={onToggleWish} onAddCart={onAddCart} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} onAuthed={onAuthed} showToast={showToast} />
      <Toast toast={toast} />
    </div>
  );
}
