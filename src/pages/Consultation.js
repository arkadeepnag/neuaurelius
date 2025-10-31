import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import emailjs from 'emailjs-com';
import 'react-datepicker/dist/react-datepicker.css';
import './Consultation.css';
import { Shield, Code, Server, Bot, Cloud } from 'lucide-react';
import { useLayoutEffect } from 'react';

const SERVICE_ID = 'service_21lzs9l';
const TEMPLATE_ID = 'template_ot6yk3t';
const PUBLIC_KEY = 'w2khkFc0T5KwTWRwl';

const Consultation = () => {
    useLayoutEffect(() => {
        // Preload consultation background image
        const img = new Image();
        img.src = '/images/consultation.jpg';

        // If you use any scroll-based animation libraries, refresh here
        // Example: window.ScrollTrigger?.refresh();

        // Cleanup if needed
        return () => {
            // No cleanup needed for image preloading
        };
    }, []);
    const [selectedService, setSelectedService] = useState('Cybersecurity');
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const services = [
        { name: 'Cybersecurity', icon: <Shield className="service-icon" /> },
        { name: 'Websites', icon: <Code className="service-icon" /> },
        { name: 'Apps', icon: <Server className="service-icon" /> },
        { name: 'AI Integration', icon: <Bot className="service-icon" /> },
        { name: 'Cloud', icon: <Cloud className="service-icon" /> },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const generateGoogleCalendarLink = () => {
        const start = startDate.toISOString().replace(/-|:|\.\d{3}/g, '');
        const end = new Date(startDate.getTime() + 30 * 60000).toISOString().replace(/-|:|\.\d{3}/g, '');
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            `Consultation for ${selectedService}`
        )}&dates=${start}/${end}&details=${encodeURIComponent(
            formData.message
        )}&location=Online`;
    };
    const calendarLink = generateGoogleCalendarLink();
    const sendConfirmationEmail = () => {
        const emailParams = {
            user_name: formData.name,
            email: formData.email,
            message: formData.message,
            service: selectedService,
            date: startDate.toString(),
            calendar_link: calendarLink,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
            .then(() => {
                setLoading(false);
                alert('Appointment confirmed and email sent!');
            })
            .catch((err) => {
                setLoading(false);
                console.error('EmailJS Error:', err);
                alert('There was a problem sending the email.');
            });
    };



    const generateICSFile = () => {
        const pad = (n) => n.toString().padStart(2, '0');
        const format = (d) =>
            `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
                d.getUTCHours()
            )}${pad(d.getUTCMinutes())}00Z`;

        const start = format(startDate);
        const end = format(new Date(startDate.getTime() + 30 * 60000));

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Consultation for ${selectedService}
DTSTART:${start}
DTEND:${end}
DESCRIPTION:${formData.message}
LOCATION:Online
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        return URL.createObjectURL(blob);
    };

    return (
        <div className="consultation-background">
            <div className="consultation-container">
                <div
                    className="left-panel"
                    style={{
                        backgroundImage: 'url(/images/consultation.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="right-panel">
                    <h2 className="form-title">Book a Consultation</h2>
                    <p className="form-subtitle">Our services are tailored to meet your business needs.</p>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendConfirmationEmail();
                    }}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Your name</label>
                                <input
                                    className="form-input"
                                    id="name"
                                    type="text"
                                    placeholder="Michael Jackson"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input
                                    className="form-input"
                                    id="email"
                                    type="email"
                                    placeholder="michael.j@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="service">Select a Service</label>
                                <select
                                    id="service"
                                    className="form-input"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                >
                                    {services.map(service => (
                                        <option key={service.name} value={service.name}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Schedule date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="form-input"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Additional message</label>
                            <textarea
                                className="form-input"
                                id="message"
                                placeholder="I would like to discuss our company's cybersecurity needs."
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            className="submit-button"
                            type="submit"
                            disabled={loading}
                            style={{ opacity: loading ? 0.6 : 1 }}
                        >
                            {loading ? (
                                <span>
                                    <span className="spinner" /> Sending...
                                </span>
                            ) : (
                                "Book Appointment"
                            )}
                        </button>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default Consultation;
