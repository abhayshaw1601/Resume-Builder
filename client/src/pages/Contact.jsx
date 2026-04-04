import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: integrate with backend
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <section id="contact" className="bg-black text-white py-20 md:py-28 px-4">
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left - Info */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A6FF5D]"></div>
                            <span className="text-xs text-white/60 tracking-wide uppercase">Get In Touch</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            Have a Question?
                            <span className="text-[#A6FF5D]"> Let's Talk</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 mt-4 leading-relaxed max-w-md">
                            We'd love to hear from you. Whether you have a question about features, templates, pricing, or anything else — our team is ready to help.
                        </p>

                        {/* Contact Info Cards */}
                        <div className="flex flex-col gap-4 mt-10">
                            <div className="flex items-center gap-4 group">
                                <div className="w-11 h-11 rounded-xl bg-[#A6FF5D]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email us at</p>
                                    <p className="text-sm font-medium text-white/80">support@resumebuilder.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-11 h-11 rounded-xl bg-[#A6FF5D]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Based in</p>
                                    <p className="text-sm font-medium text-white/80">India</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-11 h-11 rounded-xl bg-[#A6FF5D]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Response time</p>
                                    <p className="text-sm font-medium text-white/80">Within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="relative">
                        <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                            {/* Success message */}
                            {submitted && (
                                <div className="absolute inset-0 z-20 rounded-2xl bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-[#A6FF5D]/20 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-white">Message Sent!</p>
                                    <p className="text-sm text-gray-400">We'll get back to you soon.</p>
                                </div>
                            )}

                            <h3 className="text-lg font-semibold mb-6">Send us a message</h3>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="contact-name" className="text-xs text-gray-400 mb-1.5 block">Your Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A6FF5D]/40 transition-colors duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="text-xs text-gray-400 mb-1.5 block">Your Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A6FF5D]/40 transition-colors duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-subject" className="text-xs text-gray-400 mb-1.5 block">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help?"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A6FF5D]/40 transition-colors duration-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="text-xs text-gray-400 mb-1.5 block">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell us more about your question..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A6FF5D]/40 transition-colors duration-300 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#A6FF5D]/20 active:scale-[0.98]"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact
