'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '@/i18n/provider';
import { MapPin, Phone, Mail, Building } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const { t } = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.contact.title}</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24 bg-[#FAFDF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              {submitted ? (
                <div className="bg-[#F0F7F0] rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#40916C] rounded-full mx-auto flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1B4332] mb-2">
                    {t.contact.form.success}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-2 focus:ring-[#40916C]/20 bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-2 focus:ring-[#40916C]/20 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                        {t.contact.form.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-2 focus:ring-[#40916C]/20 bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                      {t.contact.form.type} *
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-2 focus:ring-[#40916C]/20 bg-white transition-all appearance-none"
                    >
                      <option value="">—</option>
                      <option value="bio">{t.contact.form.typeOptions.bio}</option>
                      <option value="dehydration">{t.contact.form.typeOptions.dehydration}</option>
                      <option value="automated">{t.contact.form.typeOptions.automated}</option>
                      <option value="smartlake">{t.contact.form.typeOptions.smartlake}</option>
                      <option value="survey">{t.contact.form.typeOptions.survey}</option>
                      <option value="other">{t.contact.form.typeOptions.other}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-2 focus:ring-[#40916C]/20 bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold py-4 rounded-xl text-lg transition-colors"
                  >
                    {t.contact.form.submit}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div
              {...fadeInUp}
              className="lg:col-span-2"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1B4332] mb-6">
                  {t.contact.company.name}
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[#4a5568]">
                      {t.contact.company.address}<br />
                      {t.contact.company.city}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Building className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[#4a5568]">
                      {t.contact.company.ico}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[#4a5568]">
                      info@ecomud.eu
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[#4a5568]">
                      +421 XXX XXX XXX
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Fiľakovo, Slovensko</p>
                  <p className="text-xs mt-1">Google Maps — tu bude beágyazott térkép</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
