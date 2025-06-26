import React from 'react';
import './Features.css';

const featureList = [
  {
    title: 'Secure Vault',
    desc: 'All your certificates are encrypted and stored securely in the cloud.',
    icon: '🔒',
  },
  {
    title: 'Easy Uploads',
    desc: 'Upload PDFs with a click. Quick and hassle-free interface.',
    icon: '📤',
  },
  {
    title: 'Anytime Access',
    desc: 'Access your documents anytime from any device, anywhere.',
    icon: '🌐',
  },
  {
    title: 'User Authentication',
    desc: 'Only you can access your vault using secure login.',
    icon: '👤',
  },
  {
    title: 'Clean Dashboard',
    desc: 'Minimal, fast-loading dashboard for certificate management.',
    icon: '📋',
  },
  {
    title: 'Dark Mode',
    desc: 'Switch to dark theme for better night-time experience.',
    icon: '🌙',
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">Why Choose CredHex?</h2>
      <div className="features-grid">
        {featureList.map((feat, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feat.icon}</div>
            <h3 className="feature-heading">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
