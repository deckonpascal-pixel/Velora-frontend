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

