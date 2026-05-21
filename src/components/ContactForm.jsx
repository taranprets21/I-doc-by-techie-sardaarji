import { useState } from 'react';

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 900);
  };

  return (
    <div className="contact-form-card">
      <form onSubmit={handleSubmit}>
        <label>
          Your name
          <input type="text" name="name" required placeholder="Enter your name" />
        </label>
        <label>
          Company name
          <input type="text" name="company" required placeholder="Company or team" />
        </label>
        <label>
          Email address
          <input type="email" name="email" required placeholder="you@company.com" />
        </label>
        <label>
          Request details
          <textarea name="message" rows="4" placeholder="Tell us your device workflow" />
        </label>
        <button className="button primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Get Started'}
        </button>
        {sent && <p className="form-success">Thanks! We will contact you soon.</p>}
      </form>
    </div>
  );
}

export default ContactForm;
