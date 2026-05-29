/* ===========================================================
   THE BUILD BOARD — a living card wall of shipped work + an
   inline "brief one in" form. Self-contained React root.
   Mounts into #board-mount. Matches the site's dark/glass look
   with added workspace chrome (mono metadata, status chips).
   =========================================================== */

const BB_LS_CARDS   = 'yiyi_board_cards_v1';
const BB_LS_DENSITY = 'yiyi_board_density_v1';
const BB_EMAIL      = 'nhivu.hcm.work@gmail.com';

const BB_STATUS = {
  shipped:  { label: 'Shipped',     dot: 'oklch(0.74 0.13 155)' },
  progress: { label: 'In progress', dot: 'oklch(0.80 0.13 80)'  },
  idea:     { label: 'Idea',        dot: 'oklch(0.74 0.11 255)' },
};

/* Seeded with only NEW work — the three deep-cut case studies live in the section above. */
const BB_SEED = [
  {
    id: 'linkedin-excel', status: 'progress', title: 'LinkedIn Content Plan → Ready-to-Use Excel',
    brief: 'One prompt that runs the desk research, builds positioning and audience, then hands back a ready-to-use multi-tab Excel workbook — dashboard, 30-day calendar, hook bank, and post templates. Built for a B2B client (details kept generic).',
    metric: '1 prompt', metricLabel: '→ full workbook',
    tags: ['Prompt Design', 'ChatGPT Plus', 'Excel'],
    link: '', date: 'In progress',
    preview: 'excel',
    excelTabs: ['Dashboard', 'Positioning', 'Audience', 'Content Pillars', '30-Day Calendar', 'Hook Bank', 'Post Templates'],
    detailLabel: 'View full prompt',
    detailNote: 'Working notes: rewrite before using · let it ask clarifying questions first, then have it build the Excel file · requires ChatGPT Plus. Client and product details kept generic here.',
    details: `Act as a viral LinkedIn content strategist and personal-branding expert.

Build a high-performing LinkedIn content plan that grows visibility, authority, trust, and inbound sign-ups for the product below.

CONTEXT  (fill in before running)
- Company / product: [one line — what it does and who it's for]
- Target audience: HR, recruiters, recruitment firms, TA leaders
- Content goal: sign-ups on our website
- Brand voice: professional · bold · educational · witty · expert · friendly
- Posting cadence: 3 posts/day, 7 days/week, 30 days

Deliver these sections:

1. POSITIONING — what we should be known for, who we help, and why people should follow.
2. AUDIENCE ANALYSIS — segments, what each cares about, pains, objections, and the content response to each.
3. CONTENT PILLARS — 4–6 pillars. For each: purpose · example topics · best format · why it performs.
4. 30-DAY CALENDAR — a table with: Day · Daily slot · Pillar · Post idea · Hook · Format · Main message · CTA · Goal. Mix story, educational, contrarian, framework, mistakes/lessons, list, founder-style, case-study, and conversation formats.
5. HOOK BANK — 25 specific, curiosity-driven hooks. No clickbait.
6. POST TEMPLATES — 5 reusable: educational framework · personal story · contrarian opinion · mistakes/lessons · soft sales.

RULES
- Authentic, useful, human. No generic motivation, fake authority, or engagement bait.
- Punchy LinkedIn writing. Prioritise the right audience over empty views.
- Practical enough to start using today.

OUTPUT
First, ask me up to 5 important clarifying questions. After I answer (or, if I don't, make smart assumptions), generate the full plan AND export it as a ready-to-use Excel workbook with these tabs:
• Dashboard — strategy focus, primary CTA, posting cadence, KPIs, and planned posts per pillar
• Positioning
• Audience
• Content Pillars
• 30-Day Calendar
• Hook Bank
• Post Templates`,
  },
];

const DENSITY = {
  tight:  { cols: 'repeat(auto-fill, minmax(248px, 1fr))', gap: 12, pad: 20, visual: 0,   title: 16, metric: 26, brief: 13 },
  medium: { cols: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 16, pad: 28, visual: 118, title: 18, metric: 40, brief: 14 },
  large:  { cols: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 18, pad: 34, visual: 168, title: 21, metric: 52, brief: 15 },
};

const bbInput = {
  width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px',
  color: '#fff', fontFamily: 'inherit', fontSize: 14, outline: 'none', transition: 'border-color .2s',
};
const bbMono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

/* ---------- small pieces ---------- */

function StatusChip({ status }) {
  const s = BB_STATUS[status] || BB_STATUS.idea;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, ...bbMono,
      fontSize: 10.5, letterSpacing: '.04em', color: 'rgba(255,255,255,0.65)',
      textTransform: 'uppercase' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot,
        boxShadow: `0 0 8px ${s.dot}` }}></span>
      {s.label}
    </span>
  );
}

function VisualSlot({ height, label }) {
  return (
    <div style={{
      height, borderRadius: 10, overflow: 'hidden', position: 'relative',
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 10px, rgba(255,255,255,0.05) 10px 20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ ...bbMono, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '.05em' }}>
        {label}
      </span>
    </div>
  );
}

/* A generic, anonymized mini-spreadsheet — represents an Excel/Sheets deliverable
   without exposing any client content. Mirrors the real workbook's tab structure. */
function ExcelPreview({ height, tabs }) {
  const rows = [
    { l: 0.7, c: [0.95, 0.55] },
    { l: 0.5, c: [0.7, 0.9, 0.45] },
    { l: 0.6, c: [0.6, 0.5] },
    { l: 0.45, c: [0.85, 0.65, 0.5] },
  ];
  return (
    <div style={{ height, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)',
      background: '#f5f7f7', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#14403d', color: '#e9fffb', fontSize: 9, fontWeight: 700, letterSpacing: '.04em',
        textAlign: 'center', padding: '7px 8px', ...bbMono, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        LinkedIn Content Strategy · Workbook
      </div>
      <div style={{ flex: 1, padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ width: (8 + r.l * 16) + '%', height: 8, borderRadius: 2, background: '#cfe0dd' }}></div>
            {r.c.map((w, j) => <div key={j} style={{ width: (w * 24) + '%', height: 8, borderRadius: 2, background: '#e2e7e7' }}></div>)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 2, padding: '0 6px', background: '#eceef0', borderTop: '1px solid #dde1e1', overflow: 'hidden' }}>
        {tabs.map((t, i) => (
          <div key={t} style={{ ...bbMono, fontSize: 7.5, padding: '5px 7px', whiteSpace: 'nowrap',
            background: i === 0 ? '#f5f7f7' : 'transparent', color: i === 0 ? '#14403d' : '#9aa3a3',
            fontWeight: i === 0 ? 700 : 500, borderBottom: i === 0 ? '2px solid #14403d' : '2px solid transparent' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

const bbTag = { ...bbMono, fontSize: 10, border: '1px solid rgba(255,255,255,0.14)',
  color: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 80, whiteSpace: 'nowrap' };

function BoardCard({ card, d, isNew, onOpenDetail }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: '#141418', border: '1px solid ' + (hover ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'),
        borderRadius: 16, padding: d.pad, display: 'flex', flexDirection: 'column', gap: 14,
        transform: hover ? 'translateY(-3px)' : 'none', transition: 'transform .25s cubic-bezier(.22,1,.36,1), border-color .25s',
        position: 'relative', animation: isNew ? 'bbPop .5s cubic-bezier(.22,1,.36,1)' : 'none',
      }}>
      {isNew && (
        <span style={{ position: 'absolute', top: 14, right: 14, ...bbMono, fontSize: 9,
          letterSpacing: '.1em', color: 'oklch(0.80 0.13 80)', border: '1px solid oklch(0.80 0.13 80 / 0.4)',
          padding: '3px 8px', borderRadius: 80 }}>JUST BRIEFED</span>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <StatusChip status={card.status} />
        {!isNew && <span style={{ ...bbMono, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{card.date}</span>}
      </div>

      {d.visual > 0 && (card.preview === 'excel'
        ? <ExcelPreview height={d.visual} tabs={card.excelTabs || []} />
        : <VisualSlot height={d.visual} label={card.visualLabel || 'screenshot'} />)}

      {card.metric && (
        <div>
          <div style={{ fontSize: d.metric, fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1 }}>{card.metric}</div>
          {card.metricLabel && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{card.metricLabel}</div>}
        </div>
      )}

      <div>
        <div style={{ fontSize: d.title, fontWeight: 600, letterSpacing: '-.015em', marginBottom: 8 }}>{card.title}</div>
        <div style={{ fontSize: d.brief, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, fontWeight: 300 }}>{card.brief}</div>
      </div>

      {card.by && (
        <div style={{ ...bbMono, fontSize: 10.5, color: 'rgba(255,255,255,0.4)' }}>briefed by {card.by}</div>
      )}

      {card.tags && card.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {card.tags.slice(0, 4).map(t => <span key={t} style={bbTag}>{t}</span>)}
        </div>
      )}

      {(card.details || card.link) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {card.details && (
            <button onClick={() => onOpenDetail(card)} style={{
              ...bbMono, fontSize: 12, color: '#fff', background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.85,
              borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              ▷ {card.detailLabel || 'View details'}
            </button>
          )}
          {card.link && (
            <a href={card.link} target="_blank" rel="noopener" style={{
              ...bbMono, fontSize: 12, color: '#fff', textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: 6, opacity: 0.8 }}>↗ View live</a>
          )}
        </div>
      )}
    </div>
  );
}

function AddCard({ d, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: '1px dashed ' + (hover ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.16)'),
        borderRadius: 16, padding: d.pad, minHeight: 180, cursor: 'pointer', color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 12,
        fontFamily: 'inherit', textAlign: 'left', transition: 'all .25s',
      }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 300,
        color: 'rgba(255,255,255,0.7)' }}>+</div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Brief one in</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.55 }}>
          Got a task you'd hand to me? Drop it here — it lands in my inbox and pins to the board.
        </div>
      </div>
    </button>
  );
}

/* ---------- detail modal (full prompt / long notes) ---------- */

function DetailModal({ card, onClose }) {
  const [copied, setCopied] = React.useState(false);
  function copy() {
    const t = card.details || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); });
    } else {
      const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    }
  }
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'bbFade .2s ease-out' }}>
      <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20,
        padding: 32, maxWidth: 720, width: '100%', position: 'relative', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none',
          border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 20, cursor: 'pointer', width: 32, height: 32, borderRadius: 8 }}>✕</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <StatusChip status={card.status} />
        </div>
        <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-.01em', marginBottom: card.detailNote ? 8 : 18, paddingRight: 36 }}>{card.title}</div>
        {card.detailNote && (
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginBottom: 18, fontStyle: 'italic' }}>{card.detailNote}</div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', background: '#0c0c0f', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '20px 22px' }}>
          <pre style={{ ...bbMono, fontSize: 12.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{card.details}</pre>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <button onClick={copy} style={{ padding: '11px 26px', borderRadius: 80, border: 'none',
            background: copied ? 'oklch(0.74 0.13 155)' : '#fff', color: '#09090b', fontFamily: 'inherit',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'background .2s' }}>
            {copied ? '✓ Copied' : 'Copy prompt'}
          </button>
          <button onClick={onClose} style={{ padding: '11px 26px', borderRadius: 80,
            border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#fff',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- brief modal ---------- */

function BriefModal({ onClose, onAdd }) {
  const [f, setF] = React.useState({ title: '', brief: '', status: 'idea', metric: '', link: '', details: '', name: '', email: '' });
  const [status, setStatus] = React.useState('idle');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.title.trim() && f.brief.trim() && f.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);

  function submit(e) {
    e.preventDefault();
    if (!valid || status !== 'idle') return;
    setStatus('sending');

    // optimistic add to the board (persists locally for this visitor)
    onAdd({
      id: 'u_' + Date.now(), status: f.status, title: f.title.trim(), brief: f.brief.trim(),
      metric: f.metric.trim(), metricLabel: f.metric.trim() ? 'target' : '', tags: [],
      link: f.link.trim(), by: f.name.trim(), date: 'New',
      details: f.details.trim(), detailLabel: 'View full prompt',
    });

    // email it to Yiyi via FormSubmit (same setup as the rest of the site)
    const fd = new FormData();
    const t = window._yiyiTracking || {};
    fd.append('_subject', 'New Build Brief — ' + f.title.trim());
    fd.append('project', f.title.trim());
    fd.append('brief', f.brief.trim());
    fd.append('status', f.status);
    if (f.metric.trim()) fd.append('target_metric', f.metric.trim());
    if (f.link.trim()) fd.append('link', f.link.trim());
    if (f.details.trim()) fd.append('full_prompt', f.details.trim());
    fd.append('from_name', f.name.trim());
    fd.append('from_email', f.email.trim());
    fd.append('ref', t.ref || 'direct');
    fd.append('source', window.location.href);
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');
    if (window.gtag) gtag('event', 'build_brief_submitted', { ref: t.ref || 'direct' });

    fetch('https://formsubmit.co/ajax/' + BB_EMAIL, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(r => r.json()).then(d => setStatus(d.success ? 'done' : 'done')).catch(() => setStatus('done'));
  }

  const focusBorder = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.25)';
  const blurBorder  = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)';

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'bbFade .2s ease-out' }}>
      <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20,
        padding: 40, maxWidth: 520, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none',
          border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 20, cursor: 'pointer', width: 32, height: 32,
          borderRadius: 8 }}>✕</button>

        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>✓</div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Briefed.</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
              It's on the board and in my inbox. I'll take a real look and follow up, {f.name.trim().split(' ')[0]}.
            </div>
            <button onClick={onClose} style={{ marginTop: 24, padding: '11px 32px', borderRadius: 80, border: 'none',
              background: '#fff', color: '#09090b', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              See the board
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ fontSize: 21, fontWeight: 600, marginBottom: 6, letterSpacing: '-.01em' }}>Brief a project in</div>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', marginBottom: 26, lineHeight: 1.6 }}>
              Describe something you'd actually want built. It pins to the board and lands in my inbox — the same way I'd log my own work.
            </div>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input value={f.title} onChange={set('title')} placeholder="Project title *" style={bbInput} onFocus={focusBorder} onBlur={blurBorder} />
              <textarea value={f.brief} onChange={set('brief')} placeholder="The brief — what should it do? *" style={{ ...bbInput, resize: 'none', height: 92 }} onFocus={focusBorder} onBlur={blurBorder} />

              <div style={{ display: 'flex', gap: 8 }}>
                {Object.keys(BB_STATUS).map(k => (
                  <button type="button" key={k} onClick={() => setF({ ...f, status: k })}
                    style={{ flex: 1, padding: '9px 0', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                      fontSize: 12, ...bbMono, letterSpacing: '.03em', textTransform: 'uppercase',
                      border: '1px solid ' + (f.status === k ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'),
                      background: f.status === k ? 'rgba(255,255,255,0.07)' : 'transparent',
                      color: f.status === k ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'all .2s' }}>
                    {BB_STATUS[k].label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <input value={f.metric} onChange={set('metric')} placeholder="Target metric (optional)" style={bbInput} onFocus={focusBorder} onBlur={blurBorder} />
                <input value={f.link} onChange={set('link')} placeholder="Link (optional)" style={bbInput} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              <textarea value={f.details} onChange={set('details')} placeholder="Full prompt / detailed notes (optional) — pasted here it gets a 'View full prompt' button + copy on the card" style={{ ...bbInput, resize: 'vertical', height: 92, ...bbMono, fontSize: 12.5, lineHeight: 1.6 }} onFocus={focusBorder} onBlur={blurBorder} />

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }}></div>

              <div style={{ display: 'flex', gap: 12 }}>
                <input value={f.name} onChange={set('name')} placeholder="Your name *" style={bbInput} onFocus={focusBorder} onBlur={blurBorder} />
                <input value={f.email} onChange={set('email')} type="email" placeholder="Your email *" style={bbInput} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              <button type="submit" disabled={!valid || status === 'sending'}
                style={{ marginTop: 6, alignSelf: 'flex-start', padding: '12px 34px', borderRadius: 80, border: 'none',
                  background: valid ? '#fff' : 'rgba(255,255,255,0.15)', color: valid ? '#09090b' : 'rgba(255,255,255,0.35)',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: valid ? 'pointer' : 'default', transition: 'all .2s' }}>
                {status === 'sending' ? 'Sending…' : 'Pin it to the board'}
              </button>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ---------- toolbar ---------- */

function Segmented({ value, options, onChange }) {
  return (
    <div style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: 3, gap: 2 }}>
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)} title={o.label}
          style={{ background: value === o.value ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none',
            borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: value === o.value ? '#fff' : 'rgba(255,255,255,0.45)',
            fontFamily: 'inherit', fontSize: 13, transition: 'all .2s', display: 'flex', alignItems: 'center' }}>
          {o.icon}
        </button>
      ))}
    </div>
  );
}

/* ---------- root ---------- */

function BuildBoard() {
  const [density, setDensity] = React.useState(() => localStorage.getItem(BB_LS_DENSITY) || 'medium');
  const [filter, setFilter] = React.useState('all');
  const [modal, setModal] = React.useState(false);
  const [detailCard, setDetailCard] = React.useState(null);
  const [userCards, setUserCards] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(BB_LS_CARDS)) || []; } catch (e) { return []; }
  });
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 720);
  const [newId, setNewId] = React.useState(null);

  React.useEffect(() => {
    const r = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', r); return () => window.removeEventListener('resize', r);
  }, []);
  React.useEffect(() => { localStorage.setItem(BB_LS_DENSITY, density); }, [density]);

  function addCard(card) {
    const next = [card, ...userCards];
    setUserCards(next); setNewId(card.id);
    localStorage.setItem(BB_LS_CARDS, JSON.stringify(next));
  }

  const all = [...userCards, ...BB_SEED];
  const cards = filter === 'all' ? all : all.filter(c => c.status === filter);
  const d = DENSITY[density];
  const grid = isMobile ? { ...d, cols: '1fr', visual: density === 'tight' ? 0 : 118 } : d;

  const counts = {
    all: all.length, shipped: all.filter(c => c.status === 'shipped').length,
    progress: all.filter(c => c.status === 'progress').length, idea: all.filter(c => c.status === 'idea').length,
  };

  const filterChip = (key, label) => (
    <button onClick={() => setFilter(key)} style={{
      ...bbMono, fontSize: 11, letterSpacing: '.03em', padding: '7px 14px', borderRadius: 80, cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace", transition: 'all .2s',
      border: '1px solid ' + (filter === key ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'),
      background: filter === key ? 'rgba(255,255,255,0.08)' : 'transparent',
      color: filter === key ? '#fff' : 'rgba(255,255,255,0.5)' }}>
      {label} <span style={{ opacity: 0.5 }}>{counts[key]}</span>
    </button>
  );

  return (
    <div style={{ marginTop: 44 }}>
      {/* toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, background: '#0f0f12',
        marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ ...bbMono, fontSize: 11, letterSpacing: '.18em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
            ▦ Running Log
          </span>
          <span style={{ ...bbMono, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            {String(all.length).padStart(2, '0')} projects
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {filterChip('all', 'All')}
            {filterChip('shipped', 'Shipped')}
            {filterChip('progress', 'In progress')}
            {filterChip('idea', 'Idea')}
          </div>
          {!isMobile && (
            <Segmented value={density} onChange={setDensity} options={[
              { value: 'tight',  label: 'Tight grid',  icon: '▤' },
              { value: 'medium', label: 'Medium',      icon: '▦' },
              { value: 'large',  label: 'Large cards', icon: '▧' },
            ]} />
          )}
        </div>
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: grid.cols, gap: grid.gap, alignItems: 'stretch' }}>
        {filter === 'all' && <AddCard d={grid} onClick={() => setModal(true)} />}
        {cards.map(c => <BoardCard key={c.id} card={c} d={grid} isNew={c.id === newId} onOpenDetail={setDetailCard} />)}
      </div>

      {modal && <BriefModal onClose={() => setModal(false)} onAdd={addCard} />}
      {detailCard && <DetailModal card={detailCard} onClose={() => setDetailCard(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('board-mount')).render(<BuildBoard />);
