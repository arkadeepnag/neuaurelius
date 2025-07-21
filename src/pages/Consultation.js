import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Styles for the date picker
import { FaShieldAlt, FaCode, FaRobot, FaCloud, FaServer } from 'react-icons/fa';
import './Consultation.css'; // Import the CSS file
import {
    Shield,
    Code,
    Server,
    Bot,
    Cloud,
} from 'lucide-react';

const Consultation = () => {
    const [selectedService, setSelectedService] = useState('Cybersecurity');
    const [startDate, setStartDate] = useState(new Date());



    const services = [
        { name: 'Cybersecurity', icon: <Shield className="service-icon" /> },
        { name: 'Websites', icon: <Code className="service-icon" /> },
        { name: 'Apps', icon: <Server className="service-icon" /> },
        { name: 'AI Integration', icon: <Bot className="service-icon" /> },
        { name: 'Cloud', icon: <Cloud className="service-icon" /> },
    ];

    return (
        <div className="consultation-background">
            <div className="consultation-container">
                {/* Left Side */}
                <div className="left-panel" style={{
                    backgroundImage: 'url(/images/consultation.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                </div>

                {/* Right Side */}
                <div className="right-panel">
                    <h2 className="form-title">Book a Consultation</h2>
                    <p className="form-subtitle">Our services are tailored to meet your business needs.</p>



                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">
                                    Your name
                                </label>
                                <input
                                    className="form-input"
                                    id="name"
                                    type="text"
                                    placeholder="Michael Jackson"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    className="form-input"
                                    id="email"
                                    type="email"
                                    placeholder="michael.j@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="service">
                                    Select a Service
                                </label>
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
                                <label className="form-label">
                                    Schedule date
                                </label>
                                {/* react-datepicker uses its own classNames, but we can wrap it for layout */}
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="form-input"
                                    wrapperClassName="date-picker-wrapper"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="message">
                                Additional message
                            </label>
                            <textarea
                                className="form-input"
                                id="message"
                                placeholder="I would like to discuss our company's cybersecurity needs."
                                rows="4"
                            ></textarea>
                        </div>

                        <button className="submit-button" type="button">
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Consultation;