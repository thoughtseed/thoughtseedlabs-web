import React, { useState } from 'react';

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-xl font-bold text-white">Get in Touch</h3>
        <p className="text-white/80">
          Ready to implement transformative technology solutions? Connect with our team of specialists 
          in AI integration, consciousness engineering, and smart system development.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          Send Message
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: '📧', label: 'Email', value: 'contact@thoughtseed.com' },
          { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
          { icon: '📍', label: 'Location', value: 'San Francisco, CA' },
        ].map((contact) => (
          <div key={contact.label} className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
            <div className="mb-2 text-2xl">{contact.icon}</div>
            <div className="text-sm text-white/60">{contact.label}</div>
            <div className="text-sm font-semibold text-white">{contact.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactContent;
