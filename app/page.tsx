"use client";

import { FormEvent, useState } from "react";

const steps = [
  {
    number: "1",
    title: "Free of charge",
    text: "We design and print brochures or presentation folders at no cost to your business, creating a professional marketing tool that works for you.",
    accent: "step-a",
  },
  {
    number: "2",
    title: "Bespoke to you",
    text: "Each brochure or folder is fully customised to match your branding and business, giving clients a premium take-away piece that reflects your offer.",
    accent: "step-b",
  },
  {
    number: "3",
    title: "Supported by relevant advertisers",
    text: "The costs are covered by complementary local businesses featured at the back of your publication, creating a win-win for you and your advertisers.",
    accent: "step-c",
  },
];

const reasons = [
  { title: "Zero cost", text: "Your brochures or folders are completely free, with design and print costs covered by sponsorship revenue.", accent: "reason-a" },
  { title: "Professional finish", text: "High quality paper, expert design and a polished presentation for your business branding.", accent: "reason-b" },
  { title: "Digital version included", text: "Send a free digital copy by email to prospective clients and keep your marketing working online too.", accent: "reason-c" },
  { title: "Relevant local reach", text: "We only place advertisers who are relevant to your business, increasing the value for your readers.", accent: "reason-d" },
];

export default function Home() {
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [ratesStatus, setRatesStatus] = useState<string | null>(null);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isRatesSubmitting, setIsRatesSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>, endpoint: "contact" | "rates") {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (endpoint === "contact") {
      setIsContactSubmitting(true);
      setContactStatus(null);
    } else {
      setIsRatesSubmitting(true);
      setRatesStatus(null);
    }

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message right now.");
      }

      form.reset();

      if (endpoint === "contact") {
        setContactStatus("Thanks — your enquiry has been sent to info@theproperty-network.com.");
      } else {
        setRatesStatus("Thanks — your rate enquiry has been sent to sales@theproperty-network.com.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your message right now.";

      if (endpoint === "contact") {
        setContactStatus(message);
      } else {
        setRatesStatus(message);
      }
    } finally {
      if (endpoint === "contact") {
        setIsContactSubmitting(false);
      } else {
        setIsRatesSubmitting(false);
      }
    }
  }
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-wrap">
            <div className="brand-mark">
              <img
                src="https://cdn.jsdelivr.net/gh/solana-labs/solana@master/solana.png"
                alt="The Property Network logo"
              />
            </div>
            <div className="brand-copy">
              <div className="eyebrow">Free brochure & folder service</div>
              <div className="brand-name">The Property Network</div>
            </div>
          </div>

          <nav className="topnav" aria-label="Main navigation">
            <a href="#benefits">Benefits</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>
              Free
              <span className="hero-line">Brochures &amp; Folders</span>
              <span className="block">For Your Business</span>
            </h1>
            <p>
              Bespoke printed and digital brochure solutions, designed and produced at no cost to your business.
            </p>

            <div className="cta-row">
              <a href="#contact" className="button primary">Request a brochure</a>
              <a href="#services" className="button secondary">Find out more</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section-light">
        <div className="content width-limiter center-text">
          <p className="section-kicker">Free of charge brochures and folders</p>
          <p className="section-subtitle">
            Our service provides businesses with either marketing brochures or presentation folders over a two-year period at absolutely no cost to your business.
          </p>

          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className={`step-number ${step.accent}`}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="section section-light section-pad-bottom">
        <div className="content width-limiter center-text">
          <p className="section-kicker">Why it works</p>
          <div className="reasons-grid">
            {reasons.map((reason) => (
              <article key={reason.title} className={`reason-card ${reason.accent}`}>
                <div className="check">✓</div>
                <h4>{reason.title}</h4>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="width-limiter center-text">
          <h2>Free of charge brochures and folders designed &amp; printed cost free.</h2>
          <p>
            We work closely with you to create a customised brochure or folder that reflects your branding, while the publication is supported by relevant local businesses to keep it free for you.
          </p>
          <div className="cta-row">
            <a href="#contact" className="button primary">Get started</a>
            <a href="#contact" className="button secondary alt">Speak to an expert</a>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="width-limiter contact-grid">
          <div className="panel">
            <p className="section-kicker">Book your design</p>
            <h3>Get a free brochure or folder for your business.</h3>
            <form
              className="form-grid"
              onSubmit={(event) => handleSubmit(event, "contact")}
            >
              <input name="businessName" placeholder="Your business name" aria-label="Your business name" required />
              <input name="businessEmail" type="email" placeholder="Contact email" aria-label="Contact email" required />
              <textarea name="businessMessage" placeholder="Tell us about your business and the brochure or folder you need" aria-label="Tell us about your business and the brochure or folder you need" required />
              <button type="submit" className="button primary full-width" disabled={isContactSubmitting}>
                {isContactSubmitting ? "Sending..." : "Send enquiry"}
              </button>
              {contactStatus ? <p className="form-status">{contactStatus}</p> : null}
            </form>
          </div>

          <div className="panel muted-panel">
            <p className="section-kicker">Who can benefit</p>
            <h3>Business types that can benefit include wedding venues, golf clubs, estate agents and funeral directors.</h3>
            <form
              className="form-grid"
              onSubmit={(event) => handleSubmit(event, "rates")}
            >
              <input name="companyName" placeholder="Your company name" aria-label="Your company name" required />
              <input name="companyPhone" placeholder="Phone number" aria-label="Phone number" required />
              <textarea name="companyMessage" placeholder="Tell us about your service or audience and we’ll advise on the right format" aria-label="Tell us about your service or audience and we’ll advise on the right format" required />
              <button type="submit" className="button primary full-width" disabled={isRatesSubmitting}>
                {isRatesSubmitting ? "Sending..." : "Request rates"}
              </button>
              {ratesStatus ? <p className="form-status">{ratesStatus}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
