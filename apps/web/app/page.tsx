"use client";

import { useState } from "react";

// Design tokens (white + green accents + black text)
const C = {
  white: "#FFFFFF",
  green: "#148A4B",
  black: "#121212",
};

function Nav({ onJoin }: { onJoin: () => void }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: C.white,
        boxShadow: "0 4px 18px rgba(18,18,18,0.14)",
        padding: "0 1.25rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: C.black,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        ShelterHub
      </span>
      <button
        onClick={onJoin}
        style={{
          background: C.green,
          color: C.white,
          border: `1px solid ${C.green}`,
          padding: "0.55rem 1.1rem",
          borderRadius: 8,
          fontSize: "0.88rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Join the Waitlist
      </button>
    </nav>
  );
}

function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "6.5rem 1.25rem 5rem",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          color: C.green,
          border: `1px solid ${C.green}`,
          fontSize: "0.76rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.35rem 0.8rem",
          borderRadius: 999,
          marginBottom: "1.3rem",
        }}
      >
        Built for animal shelters
      </span>

      <h1
        style={{
          fontSize: "clamp(2.1rem, 5vw, 3.5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: C.black,
          marginBottom: "1.2rem",
        }}
      >
        Minimal software for
        <br />
        modern shelter operations
      </h1>

      <p
        style={{
          fontSize: "1.03rem",
          color: C.black,
          maxWidth: 620,
          margin: "0 auto 2rem",
          opacity: 0.85,
        }}
      >
        Shelter Hub replaces spreadsheets, paper forms, and fragmented tools
        with one clean workflow from intake to outcome.
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.85rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onJoin}
          style={{
            background: C.green,
            color: C.white,
            border: `1px solid ${C.green}`,
            padding: "0.82rem 1.7rem",
            borderRadius: 10,
            fontSize: "0.97rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Join the Waitlist
        </button>
        <a
          href="#overview"
          style={{
            background: C.white,
            color: C.green,
            border: `1px solid ${C.green}`,
            padding: "0.82rem 1.7rem",
            borderRadius: 10,
            fontSize: "0.97rem",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Explore Platform
        </a>
      </div>
    </section>
  );
}

function Overview() {
  const items = [
    { value: "6", label: "Core modules" },
    { value: "1", label: "Unified platform" },
    { value: "0", label: "Spreadsheets needed" },
  ];

  return (
    <section id="overview" style={{ padding: "0 1.25rem 4.5rem" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          border: `1px solid ${C.black}`,
          borderRadius: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          textAlign: "center",
        }}
      >
        {items.map((s) => (
          <div key={s.label} style={{ padding: "2rem 1rem", borderRight: `1px solid ${C.black}` }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: C.black }}>{s.value}</div>
            <div style={{ fontSize: "0.88rem", color: C.black, opacity: 0.75 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  sub,
}: {
  label: string;
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.76rem",
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: C.green,
          marginBottom: "0.7rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(1.45rem, 3vw, 2.1rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: C.black,
          marginBottom: "0.7rem",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          textAlign: "center",
          color: C.black,
          fontSize: "1rem",
          maxWidth: 560,
          margin: "0 auto 2.7rem",
          opacity: 0.75,
        }}
      >
        {sub}
      </p>
    </>
  );
}

function Modules() {
  const cards = [
    "Animal lifecycle",
    "Medical and care records",
    "Foster management",
    "Adoption workflow",
    "People and partner records",
    "Reporting and dashboards",
  ];

  return (
    <section style={{ padding: "2rem 1.25rem 4.5rem" }}>
      <SectionHeader
        label="Overview"
        title="Everything in one place"
        sub="Shelter Hub keeps your entire operation in a single, focused system."
      />

      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "0.9rem",
        }}
      >
        {cards.map((title) => (
          <div
            key={title}
            style={{
              border: `1px solid ${C.black}`,
              borderRadius: 10,
              padding: "1.1rem 1rem",
              color: C.black,
              fontSize: "0.95rem",
              fontWeight: 600,
              background: C.white,
            }}
          >
            {title}
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Record intake",
      body: "Create an animal profile in seconds with source, condition, and status.",
    },
    {
      title: "Track care",
      body: "Keep medical notes, treatments, and reminders attached to each animal.",
    },
    {
      title: "Manage placement",
      body: "Coordinate foster and adoption steps from one shared workflow.",
    },
    {
      title: "Close with confidence",
      body: "Log outcomes with clear history and complete visibility across your team.",
    },
  ];

  return (
    <section style={{ padding: "2rem 1.25rem 5rem" }}>
      <SectionHeader
        label="How it works"
        title="Simple by design"
        sub="A clean flow from intake to outcome."
      />

      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {steps.map((s, i) => (
          <div
            key={s.title}
            style={{
              border: `1px solid ${C.green}`,
              borderRadius: 10,
              padding: "0.9rem 1rem",
              display: "grid",
              gridTemplateColumns: "44px 1fr",
              gap: "0.8rem",
              alignItems: "start",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.green,
                color: C.white,
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
            <div>
              <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: C.black, marginBottom: "0.2rem" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: C.black, lineHeight: 1.6, opacity: 0.8 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta({ onJoin }: { onJoin: () => void }) {
  return (
    <section
      style={{
        padding: "4.5rem 1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(1.65rem, 4vw, 2.2rem)",
            fontWeight: 800,
            color: C.black,
            letterSpacing: "-0.02em",
            marginBottom: "0.85rem",
          }}
        >
          Ready for a cleaner way to run your shelter?
        </h2>

        <p style={{ color: C.black, fontSize: "1rem", marginBottom: "1.6rem", opacity: 0.8 }}>
          Join the waitlist and get early access when Shelter Hub launches.
        </p>

        <button
          onClick={onJoin}
          style={{
            background: C.green,
            color: C.white,
            border: `1px solid ${C.green}`,
            padding: "0.9rem 2rem",
            borderRadius: 10,
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Join the Waitlist
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        boxShadow: "0 -4px 18px rgba(18,18,18,0.14)",
        padding: "1.8rem 1.25rem 2.2rem",
        textAlign: "center",
        fontSize: "0.84rem",
        color: C.black,
        opacity: 0.78,
      }}
    >
      <strong>Shelter Hub</strong> - shelter operations, simplified.
    </footer>
  );
}

function JoinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shelter, setShelter] = useState("");
  const [size, setSize] = useState("");

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
      setName("");
      setEmail("");
      setShelter("");
      setSize("");
    }, 300);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${C.green}`,
    borderRadius: 8,
    padding: "0.65rem 0.8rem",
    fontSize: "0.95rem",
    color: C.black,
    background: C.white,
    outline: "none",
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,138,75,0.18)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 14,
          padding: "2rem",
          width: "min(460px, 90vw)",
          border: `1px solid ${C.green}`,
          boxShadow: "0 22px 54px rgba(20,138,75,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "0.9rem",
            background: "none",
            border: "none",
            fontSize: "1.15rem",
            color: C.green,
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.85rem", color: C.green }}>✓</div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: C.green, marginBottom: "0.5rem" }}>
              You&apos;re on the list
            </h3>
            <p style={{ color: C.black, opacity: 0.8 }}>
              We&apos;ll reach out as soon as Shelter Hub is ready for your team.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: C.black, marginBottom: "0.45rem" }}>
              Join the Waitlist
            </h2>
            <p style={{ fontSize: "0.9rem", color: C.black, opacity: 0.8, marginBottom: "1.5rem" }}>
              Tell us about your shelter and we&apos;ll be in touch.
            </p>

            {[
              { label: "Your name", id: "name", type: "text", value: name, onChange: setName, placeholder: "Jane Smith" },
              { label: "Work email", id: "email", type: "email", value: email, onChange: setEmail, placeholder: "jane@animalshelter.org" },
              { label: "Shelter name", id: "shelter", type: "text", value: shelter, onChange: setShelter, placeholder: "Happy Paws Animal Shelter" },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: C.black, marginBottom: "0.4rem" }}>
                  {f.label}
                </label>
                <input type={f.type} value={f.value} onChange={(e) => f.onChange(e.target.value)} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: C.black, marginBottom: "0.4rem" }}>Shelter size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle}>
                <option value="">Select...</option>
                <option>1–5 staff</option>
                <option>6–20 staff</option>
                <option>21–50 staff</option>
                <option>50+ staff</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                background: C.green,
                color: C.white,
                border: `1px solid ${C.green}`,
                padding: "0.85rem",
                borderRadius: 8,
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Reserve my spot
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Nav onJoin={openModal} />
      <Hero onJoin={openModal} />
      <Overview />
      <Modules />
      <HowItWorks />
      <Cta onJoin={openModal} />
      <Footer />
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
