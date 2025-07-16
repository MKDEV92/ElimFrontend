import React from 'react';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Contact <span className="text-emerald-600">Elimu Revision</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {/* Support */}
          <div className="bg-emerald-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white">
              📞
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Support</h3>
            <p className="mt-2 text-base text-gray-500">Our friendly team is here to help.</p>
            <p className="mt-4 text-lg text-emerald-600 font-medium">Otienoalfred47@gmail.com</p>
            <p className="mt-1 text-lg text-emerald-600 font-medium">+254 729 645 829</p>
          </div>

          {/* Sales */}
          <div className="bg-emerald-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white">
              📩
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Sales</h3>
            <p className="mt-2 text-base text-gray-500">Questions about our premium plans?</p>
            <p className="mt-4 text-lg text-emerald-600 font-medium">Otienoalfred47@gmail.com</p>
            <p className="mt-1 text-lg text-emerald-600 font-medium">+254 729 645 829</p>
          </div>

          {/* Headquarters */}
          <div className="bg-emerald-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white">
              🏢
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Headquarters</h3>
            <p className="mt-2 text-base text-gray-500">Come say hello at our Kisumu Offices.</p>
            <p className="mt-4 text-lg text-emerald-600 font-medium">Katito town, Kisumu County</p>
            <p className="mt-1 text-lg text-emerald-600 font-medium">Kenya</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
                >
                  <option>General inquiry</option>
                  <option>Technical support</option>
                  <option>Sales questions</option>
                  <option>Partnerships</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-500">privacy policy</a>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Centered in Nairobi, Kenya */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-16">
          <iframe
            title="EduRevise Kenya HQ"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.402383535974!2d36.81597083527313!3d-1.2920656329268079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10dfe672aadf%3A0x32518e40be9c61d2!2sNairobi%20CBD%2C%20Kenya!5e0!3m2!1sen!2ske!4v1721038306546!5m2!1sen!2ske"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* FAQs */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently asked questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How quickly can I expect a response?",
                  answer: "Our team aims to respond to all inquiries within 24 hours during business days.",
                },
                {
                  question: "Do you offer discounts for schools?",
                  answer: "Yes, we have special pricing for educational institutions. Contact our sales team for details.",
                },
                {
                  question: "Can I suggest new revision materials?",
                  answer: "Absolutely! We welcome suggestions from students and educators. Email us your ideas.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept M-Pesa, Airtel Money, and all major credit cards.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-emerald-400">{faq.question}</h3>
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Still have questions?</span>
              <span className="block text-emerald-100">We're here to help.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
                >
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contacts;
