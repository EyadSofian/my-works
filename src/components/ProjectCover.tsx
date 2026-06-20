/* ============================================================
   ProjectCover — branded, self-contained promo art per project.
   Replaces flat/black gradient covers with a cohesive
   "Cobalt × Solar Amber" visual language: a cobalt→indigo field,
   a faint dot grid, a soft corner glow, white line-art and a
   single warm amber accent that signals the brand across the grid.
   Pure SVG → crisp at any size, theme-independent, zero network.
   ============================================================ */

// Cobalt → indigo base fields, cycled for rhythm (all stay on-brand).
const FIELDS = [
  'linear-gradient(150deg, #1D4ED8 0%, #4338CA 100%)',
  'linear-gradient(150deg, #2563EB 0%, #4F46E5 100%)',
  'linear-gradient(150deg, #1E3A8A 0%, #3730A3 100%)',
  'linear-gradient(150deg, #0EA5E9 0%, #2563EB 100%)',
];

const W = '#FFFFFF';
const AMBER = '#FBBF24'; // solar accent
const AMBER_D = '#F59E0B';

/** Recognisable motif per project id (viewBox 400×200, safe zone x:50–350 y:40–160). */
function Motif({ id }: { id: string }) {
  switch (id) {
    /* 40-node call-QA pipeline: waveform → nodes → scored check */
    case 'call-qa':
      return (
        <g fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const h = [28, 54, 38, 70, 44, 60, 30][i];
            return (
              <rect key={i} x={62 + i * 12} y={100 - h / 2} width="5" height={h} rx="2.5" fill={W} stroke="none" opacity={0.85} />
            );
          })}
          <path d="M168 100 H196" opacity="0.55" strokeDasharray="3 6" />
          <rect x="200" y="80" width="40" height="40" rx="10" opacity="0.9" />
          <path d="M244 100 H272" opacity="0.55" strokeDasharray="3 6" />
          <rect x="276" y="80" width="40" height="40" rx="10" fill={AMBER} stroke="none" />
          <path d="M286 100 l7 7 13-15" stroke="#1E3A8A" strokeWidth="4" />
        </g>
      );

    /* Fahad — production conversational agent: AR + EN chat bubbles */
    case 'fahad':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g fill={W} fillOpacity="0.16" stroke={W} strokeOpacity="0.5" strokeWidth="2">
            <path d="M70 56 h150 a14 14 0 0 1 14 14 v22 a14 14 0 0 1 -14 14 h-120 l-18 16 v-16 h-12 a14 14 0 0 1 -14 -14 v-22 a14 14 0 0 1 14 -14 Z" />
          </g>
          <g fill={W} opacity="0.7">
            <circle cx="92" cy="81" r="4" /><circle cx="110" cy="81" r="4" /><circle cx="128" cy="81" r="4" />
          </g>
          <path d="M330 108 h-150 a14 14 0 0 0 -14 14 v22 a14 14 0 0 0 14 14 h120 l18 16 v-16 h12 a14 14 0 0 0 14 -14 v-22 a14 14 0 0 0 -14 -14 Z" fill={AMBER} />
          <path d="M196 136 h84 M196 150 h56" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <circle cx="250" cy="52" r="6" fill={AMBER} />
        </g>
      );

    /* Majed — educational assistant: graduation cap over a knowledge bubble */
    case 'majed':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.5" strokeWidth="2">
            <rect x="120" y="92" width="160" height="74" rx="18" />
          </g>
          <path d="M150 118 h100 M150 134 h78" stroke={W} strokeWidth="3" opacity="0.7" />
          <g stroke="none">
            <path d="M200 40 l66 24 -66 24 -66 -24 Z" fill={AMBER} />
            <path d="M200 88 c-18 0 -34 -6 -42 -10 v22 c0 9 19 16 42 16 s42 -7 42 -16 v-22 c-8 4 -24 10 -42 10 Z" fill={W} fillOpacity="0.85" />
            <path d="M266 64 v26" stroke={AMBER_D} strokeWidth="3" /><circle cx="266" cy="92" r="5" fill={AMBER_D} />
          </g>
        </g>
      );

    /* Arabic LLM fine-tuning: layered neural net with one tuned (amber) adapter */
    case 'arabic-llm': {
      const L = [
        [70, [70, 130]],
        [160, [56, 100, 144]],
        [250, [70, 130]],
        [330, [100]],
      ] as [number, number[]][];
      const nodes = L.flatMap(([x, ys]) => ys.map((y) => ({ x, y })));
      const edges: [number, number, number, number][] = [];
      for (let i = 0; i < L.length - 1; i++)
        for (const y1 of L[i][1]) for (const y2 of L[i + 1][1]) edges.push([L[i][0], y1, L[i + 1][0], y2]);
      return (
        <g>
          {edges.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={W} strokeOpacity="0.28" strokeWidth="1.5" />
          ))}
          {nodes.map((n, i) => {
            const tuned = n.x === 250 || n.x === 330;
            return <circle key={i} cx={n.x} cy={n.y} r={n.x === 330 ? 11 : 8} fill={tuned ? AMBER : W} opacity={tuned ? 1 : 0.92} />;
          })}
        </g>
      );
    }

    /* Sayeq — bilingual sales agent: calendar booked + chat */
    case 'sayeq':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.55" strokeWidth="2.5">
            <rect x="78" y="56" width="150" height="118" rx="16" />
          </g>
          <path d="M78 86 h150" stroke={W} strokeOpacity="0.55" strokeWidth="2.5" />
          <path d="M108 50 v16 M198 50 v16" stroke={W} strokeWidth="4" strokeLinecap="round" />
          <g fill={W} opacity="0.6">
            {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => <circle key={`${c}-${r}`} cx={102 + c * 34} cy={108 + r * 22} r="4" />))}
          </g>
          <circle cx="246" cy="128" r="40" fill={AMBER} />
          <path d="M230 128 l11 12 21 -24" stroke="#1E3A8A" strokeWidth="5" fill="none" />
        </g>
      );

    /* HR-in-a-Box: 18-module grid, one active */
    case 'hr-in-a-box':
      return (
        <g>
          {[0, 1, 2, 3].map((c) =>
            [0, 1].map((r) => {
              const active = c === 2 && r === 0;
              return (
                <rect
                  key={`${c}-${r}`}
                  x={74 + c * 70}
                  y={64 + r * 56}
                  width="54"
                  height="40"
                  rx="9"
                  fill={active ? AMBER : W}
                  fillOpacity={active ? 1 : 0.14}
                  stroke={W}
                  strokeOpacity={active ? 0 : 0.5}
                  strokeWidth="2"
                />
              );
            }),
          )}
          <path d="M101 104 v16 M171 104 v16 M241 104 v16 M311 104 v16" stroke={W} strokeOpacity="0.3" strokeWidth="2" />
        </g>
      );

    /* JARVIS — local voice assistant: pulsing orb + waveform */
    case 'jarvis':
      return (
        <g fill="none" strokeLinecap="round">
          <circle cx="200" cy="100" r="58" stroke={W} strokeOpacity="0.18" strokeWidth="2" />
          <circle cx="200" cy="100" r="42" stroke={W} strokeOpacity="0.3" strokeWidth="2" />
          <circle cx="200" cy="100" r="24" fill={AMBER} />
          <circle cx="200" cy="100" r="24" fill="none" stroke={W} strokeOpacity="0.6" strokeWidth="2" />
          {[-1, 0, 1].map((i) => (
            <path key={i} d={`M${188 + i * 6} 92 v16`} stroke="#1E3A8A" strokeWidth="3" />
          ))}
          <path d="M70 100 q14 -26 28 0 t28 0" stroke={W} strokeOpacity="0.5" strokeWidth="3" />
          <path d="M274 100 q14 26 28 0 t28 0" stroke={W} strokeOpacity="0.5" strokeWidth="3" />
        </g>
      );

    /* Shopify loyalty & points: card + star reward */
    case 'shopify-loyalty':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="86" y="64" width="160" height="100" rx="14" fill={W} fillOpacity="0.14" stroke={W} strokeOpacity="0.5" strokeWidth="2" />
          <rect x="86" y="86" width="160" height="14" fill={W} fillOpacity="0.5" />
          <path d="M104 132 h70 M104 146 h44" stroke={W} strokeWidth="3" opacity="0.7" />
          <circle cx="276" cy="120" r="40" fill={AMBER} />
          <path d="M276 98 l7 14 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2 Z" fill="#1E3A8A" />
        </g>
      );

    /* UChat → Chatwoot migration: db → flow → db */
    case 'uchat-migration':
      return (
        <g fill="none" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <g opacity="0.85">
            <ellipse cx="96" cy="68" rx="30" ry="11" fill={W} fillOpacity="0.16" />
            <path d="M66 68 v52 a30 11 0 0 0 60 0 v-52" fill={W} fillOpacity="0.16" />
            <path d="M66 94 a30 11 0 0 0 60 0" />
          </g>
          <g opacity="0.85">
            <ellipse cx="304" cy="80" rx="30" ry="11" fill={AMBER} fillOpacity="0.9" stroke="none" />
            <path d="M274 80 v52 a30 11 0 0 0 60 0 v-52" fill={AMBER} fillOpacity="0.9" stroke="none" />
            <path d="M274 106 a30 11 0 0 0 60 0" stroke="#1E3A8A" />
          </g>
          <path d="M140 104 H250" strokeDasharray="2 9" strokeOpacity="0.7" />
          <path d="M236 96 l16 8 -16 8" fill="none" stroke={AMBER} />
          <g fill={W} stroke="none">
            <circle cx="170" cy="104" r="3.5" /><circle cx="196" cy="104" r="3.5" /><circle cx="222" cy="104" r="3.5" />
          </g>
        </g>
      );

    /* Al-Bakry B2B travel portal: globe + route */
    case 'albakry-portal':
      return (
        <g fill="none" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="170" cy="100" r="56" stroke={W} strokeOpacity="0.55" fill={W} fillOpacity="0.1" />
          <ellipse cx="170" cy="100" rx="22" ry="56" stroke={W} strokeOpacity="0.4" />
          <path d="M114 100 h112 M124 74 h92 M124 126 h92" stroke={W} strokeOpacity="0.4" />
          <path d="M150 138 q70 -52 140 -64" strokeDasharray="2 8" stroke={AMBER} strokeWidth="3" />
          <g stroke="none">
            <path d="M290 56 c-12 0 -22 10 -22 22 0 16 22 34 22 34 s22 -18 22 -34 c0 -12 -10 -22 -22 -22 Z" fill={AMBER} />
            <circle cx="290" cy="78" r="8" fill="#1E3A8A" />
          </g>
        </g>
      );

    /* Fallback — abstract connected system */
    default:
      return (
        <g>
          {[[110, 70], [200, 130], [290, 70], [200, 60]].map(([x, y], i, a) =>
            i < a.length - 1 ? (
              <line key={i} x1={x} y1={y} x2={a[i + 1][0]} y2={a[i + 1][1]} stroke={W} strokeOpacity="0.3" strokeWidth="2" />
            ) : null,
          )}
          <circle cx="110" cy="70" r="12" fill={W} opacity="0.9" />
          <circle cx="200" cy="130" r="14" fill={AMBER} />
          <circle cx="290" cy="70" r="12" fill={W} opacity="0.9" />
        </g>
      );
  }
}

export function ProjectCover({ id, index }: { id: string; index: number }) {
  const uid = `pc-${id}`;
  return (
    <div className="absolute inset-0" style={{ background: FIELDS[index % FIELDS.length] }}>
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-hidden
      >
        <defs>
          <pattern id={`${uid}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#FFFFFF" opacity="0.12" />
          </pattern>
          <radialGradient id={`${uid}-glow`} cx="0.82" cy="0.16" r="0.9">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill={`url(#${uid}-dots)`} />
        <rect width="400" height="200" fill={`url(#${uid}-glow)`} />
        <Motif id={id} />
      </svg>
    </div>
  );
}
