"use client";

import { useState } from "react";

// ── Design tokens (mirrored from globals.css)
const C = {
  brand:    "#2D6A4F",
  brandLt:  "#40916C",
  brandDim: "#1B4332",
  accent:   "#F4845F",
  accentLt: "#FFF0EB",
  bg:       "#FAFAF8",
  surface:  "#FFFFFF",
  border:   "#E8E8E4",
  text:     "#1A1A1A",
  muted:    "#6B7280",
};

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({ onJoin }: { onJoin: () => void }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.border}`,
      padding: "0 2rem", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64,
    }}>
      <span style={{ fontSize: "1.15rem", fontWeight: 700, color: C.brandDim, letterSpacing: "-0.02em" }}>
        Shelter<span style={{ color: C.accent }}>Hub</span>
      </span>
      <button onClick={onJoin} style={{
        background: C.brand, color: "#fff", border: "none",
        padding: "0.5rem 1.25rem", borderRadius: 8,
        fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
      }}>
        Join the Waitlist
      </button>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section style={{ maxWidth: 780, margin: "0 auto", padding: "7rem 2rem 5rem", textAlign: "center" }}>
      <span style={{
        display: "inline-block", background: C.accentLt, color: C.accent,
        fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em",
        textTransform: "uppercase", padding: "0.3rem 0.85rem",
        borderRadius: 999, marginBottom: "1.5rem",
      }}>
        Built for animal shelters
      </span>
      <h1 style={{
        fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800,
        lineHeight: 1.15, letterSpacing: "-0.03em", color: C.brandDim,
        marginBottom: "1.25rem",
      }}>
        Run your shelter with{" "}
        <span style={{ color: C.brandLt }}>one unified platform</span>
      </h1>
      <p style={{ fontSize: "1.15rem", color: C.muted, maxWidth: 560, margin: "0 auto 2.5rem" }}>
        Shelter Hub replaces the scattered spreadsheets, messaging apps, and social media your
        team uses every day — with a single system built for how shelters actually work.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onJoin} style={{
          background: C.brand, color: "#fff", border: "none",
          padding: "0.85rem 2rem", borderRadius: 12,
          fontSize: "1rem", fontWeight: 700, cursor: "pointer",
        }}>
          Join the Waitlist
        </button>
        <a href="#features" style={{
          background: "transparent", color: C.brand,
          border: `2px solid ${C.brand}`,
          padding: "0.85rem 2rem", borderRadius: 12,
          fontSize: "1rem", fontWeight: 700, textDecoration: "none",
          display: "inline-block",
        }}>
          See Features
        </a>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function Stats() {
  const items = [
    { value: "6",    label: "Core modules" },
    { value: "1",    label: "Unified platform" },
    { value: "0",    label: "Spreadsheets needed" },
    { value: "More", label: "Successful adoptions" },
  ];
  return (
    <div style={{ background: C.brandDim, padding: "3rem 2rem" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "2rem", textAlign: "center",
      }}>
        {items.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Shared section header ─────────────────────────────────────────────────────

function SectionHeader({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
    <>
      <p style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.brandLt, marginBottom: "0.75rem" }}>{label}</p>
      <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", color: C.brandDim, marginBottom: "0.75rem" }}>{title}</h2>
      <p style={{ textAlign: "center", color: C.muted, fontSize: "1.05rem", maxWidth: 540, margin: "0 auto 3.5rem" }}>{sub}</p>
    </>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function Problem() {
  const cards = [
    { icon: "📋", title: "Spreadsheet chaos",  body: "Animal records, adoption status, and volunteer schedules scattered across dozens of sheets with no single source of truth." },
    { icon: "💬", title: "Missed inquiries",   body: "Adopter messages arrive via email, Facebook, Instagram, and text — and fall through the cracks between staff shifts." },
    { icon: "📅", title: "Scheduling friction", body: "Adoption visits, vet appointments, and volunteer shifts managed through back-and-forth messages with no shared calendar." },
    { icon: "👥", title: "Coordination gaps",  body: "Volunteers and staff lack visibility into what needs doing, leading to duplicated effort and things falling through the cracks." },
  ];
  return (
    <section style={{ padding: "5rem 2rem", background: "#f3f4f2" }}>
      <SectionHeader
        label="The problem"
        title="Shelters are drowning in fragmented tools"
        sub="Most shelters patch together disconnected tools that create delays, missed messages, and coordination gaps."
      />
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        {cards.map((c) => (
          <div key={c.title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{c.icon}</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: C.text, marginBottom: "0.4rem" }}>{c.title}</h3>
            <p style={{ fontSize: "0.875rem", color: C.muted, lineHeight: 1.55 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

function Features() {
  const cards = [
    { icon: "🐾", title: "Animal Management",       body: "Create and update animal profiles, track intake and adoption status, manage photos, foster assignments, and public adoptable listings." },
    { icon: "👥", title: "Adopter Profiles",         body: "Maintain adopter contact information, track application history, manage inquiry pipelines, and keep a full interaction timeline." },
    { icon: "📨", title: "Unified Messaging",        body: "One inbox for all adopter conversations — regardless of channel. Threaded discussions, quick reply templates, and delivery tracking." },
    { icon: "🔒", title: "Staff & Volunteer Mgmt",   body: "Role-based access control, conversation and task assignment, activity logs, and full volunteer lifecycle management." },
    { icon: "📅", title: "Appointment Scheduling",   body: "Schedule adoption visits, vet appointments, and internal tasks. Assign staff, set reminders, and keep everyone on the same page." },
    { icon: "🔄", title: "Adoption Workflow",        body: "Manage adoption pipelines from first inquiry to final adoption. Automate follow-ups and track every step of the process." },
  ];
  return (
    <section id="features" style={{ padding: "5rem 2rem" }}>
      <SectionHeader
        label="What we offer"
        title="Everything your shelter needs, in one place"
        sub="Six integrated modules designed around how shelters actually operate."
      />
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {cards.map((c) => (
          <div key={c.title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.75rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: C.accentLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", marginBottom: "1rem" }}>
              {c.icon}
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.brandDim, marginBottom: "0.5rem" }}>{c.title}</h3>
            <p style={{ fontSize: "0.875rem", color: C.muted, lineHeight: 1.6 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { title: "Adopter submits an inquiry",         body: "Whether it arrives via your website, email, or a messaging platform, every inquiry lands in the same unified inbox automatically." },
    { title: "Staff picks up the conversation",    body: "Conversations are assigned to the right staff member. Templates speed up responses. Nothing gets missed between shifts." },
    { title: "Application moves through pipeline", body: "The adopter progresses from Inquiry → Screening → Visit Scheduled → Pending → Adopted, with reminders at every stage." },
    { title: "Adoption is completed",              body: "Animal status is updated, records are finalized, and the shelter has full visibility into every successful outcome." },
  ];
  return (
    <section style={{ padding: "5rem 2rem", background: "#f3f4f2" }}>
      <SectionHeader
        label="How it works"
        title="From inquiry to adoption — all in one system"
        sub="Shelter Hub guides every interaction through a clear, trackable process."
      />
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column" }}>
        {steps.map((s, i) => (
          <div key={s.title} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", position: "relative" }}>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", left: 19, top: 44, width: 2, height: "calc(100% - 12px)", background: C.border }} />
            )}
            <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: C.brand, color: "#fff", fontWeight: 800, fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
              {i + 1}
            </div>
            <div style={{ paddingBottom: "2.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.brandDim, marginBottom: "0.4rem", marginTop: "0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.875rem", color: C.muted, lineHeight: 1.6 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function Cta({ onJoin }: { onJoin: () => void }) {
  return (
    <section style={{ background: C.brandDim, padding: "5rem 2rem", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          Ready to simplify your shelter?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", marginBottom: "2rem" }}>
          Join our waitlist and be among the first shelters to use Shelter Hub when we launch.
        </p>
        <button onClick={onJoin} style={{
          background: C.accent, color: "#fff", border: "none",
          padding: "1rem 2.5rem", borderRadius: 12,
          fontSize: "1.05rem", fontWeight: 700, cursor: "pointer",
        }}>
          Join the Waitlist
        </button>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2rem", textAlign: "center", fontSize: "0.85rem", color: C.muted }}>
      <strong style={{ color: C.brandDim }}>Shelter Hub</strong> &mdash; Shelter operations, simplified. &copy; 2026 Shelter Hub. All rights reserved.
    </footer>
  );
}

// ── Join Modal ────────────────────────────────────────────────────────────────

function JoinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [shelter, setShelter] = useState("");
  const [size, setSize]       = useState("");

  if (!open) return null;

  function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setName(""); setEmail(""); setShelter(""); setSize("");
    }, 300);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8,
    padding: "0.65rem 0.85rem", fontSize: "0.95rem", color: C.text,
    background: C.bg, outline: "none",
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{ background: C.surface, borderRadius: 16, padding: "2.5rem", width: "min(460px, 90vw)", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", position: "relative" }}>
        <button onClick={handleClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", fontSize: "1.25rem", color: C.muted, cursor: "pointer" }}>
          &times;
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: C.brandDim, marginBottom: "0.5rem" }}>You&apos;re on the list!</h3>
            <p style={{ color: C.muted }}>Thank you for your interest. We&apos;ll reach out as soon as Shelter Hub is ready for your shelter.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: C.brandDim, marginBottom: "0.5rem" }}>Join the Waitlist</h2>
            <p style={{ fontSize: "0.9rem", color: C.muted, marginBottom: "1.75rem" }}>Tell us about your shelter and we&apos;ll be in touch when Shelter Hub launches.</p>

            {[
              { label: "Your name",    id: "name",    type: "text",  value: name,    onChange: setName,    placeholder: "Jane Smith" },
              { label: "Work email",   id: "email",   type: "email", value: email,   onChange: setEmail,   placeholder: "jane@animalshelter.org" },
              { label: "Shelter name", id: "shelter", type: "text",  value: shelter, onChange: setShelter, placeholder: "Happy Paws Animal Shelter" },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: C.text, marginBottom: "0.4rem" }}>{f.label}</label>
                <input type={f.type} value={f.value} onChange={(e) => f.onChange(e.target.value)} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: C.text, marginBottom: "0.4rem" }}>Shelter size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle}>
                <option value="">Select...</option>
                <option>1–5 staff</option>
                <option>6–20 staff</option>
                <option>21–50 staff</option>
                <option>50+ staff</option>
              </select>
            </div>

            <button onClick={handleSubmit} style={{ width: "100%", background: C.brand, color: "#fff", border: "none", padding: "0.85rem", borderRadius: 8, fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: "0.5rem" }}>
              Reserve my spot
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Nav onJoin={openModal} />
      <Hero onJoin={openModal} />
      <Stats />
      <Problem />
      <Features />
      <HowItWorks />
      <Cta onJoin={openModal} />
      <Footer />
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
