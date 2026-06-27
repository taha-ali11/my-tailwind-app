// SIGNATURE ELEMENT — "Live Status Panel"
// Frames each service as a monitored channel (like a NOC / uptime dashboard).
// This is the one deliberately bold visual idea on the page — it directly
// communicates "secure, technical, always-on" without a single stock photo.
// Pure CSS animation (live-dot pulse + scan sweep) — no client JS required,
// so this component stays a fast server component.

// EDIT HERE — the channels shown in the panel. Keep to 5 or fewer so it
// reads at a glance; each "status" line is freely editable copy.
const CHANNELS = [
  { id: "WEB-DEV", status: "Online", detail: "99.9% uptime" },
  { id: "SEO", status: "Online", detail: "1,240 keywords tracked" },
  { id: "GOOGLE-ADS", status: "Online", detail: "Spend optimized daily" },
  { id: "SOCIAL", status: "Online", detail: "3 posts queued / week" },
  { id: "MEDIA", status: "Online", detail: "Reach expanding" },
];

export default function StatusPanel() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
      {/* faint scan sweep — purely decorative, respects prefers-reduced-motion via globals.css */}
      <div className="pointer-events-none absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-trace/5 to-transparent" />

      {/* panel header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          growth-stack / status
        </span>
        <span className="flex items-center gap-1.5">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          <span className="font-mono text-[11px] text-success">live</span>
        </span>
      </div>

      {/* channel list */}
      <ul className="divide-y divide-line">
        {CHANNELS.map((channel) => (
          <li key={channel.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              <span className="font-mono text-xs text-paper">{channel.id}</span>
            </div>
            <span className="font-mono text-xs text-muted">{channel.detail}</span>
          </li>
        ))}
      </ul>

      {/* panel footer */}
      <div className="border-t border-line px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted">
          all systems operational — checked just now
        </span>
      </div>
    </div>
  );
}
