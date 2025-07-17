import React from 'react';
import './Testimonials.css';

const testimonials = [
    {
        name: 'Asha Mukherjee',
        role: 'Owner , Skylark Edu Trust',
        feedback:
            "Since integrating this solution into our workflow, we've experienced a significant improvement in efficiency and collaboration.",
        image: '/images/customers/1.png',
    },
    {
        name: 'Ashoke Khandenkar',
        role: 'Manager , SDD LOGISTICS',
        feedback:
            'I’ve tested numerous options in this category, but one stands out for its intuitive design and comprehensive functionality.',
        image: '/images/customers/2.png',
    },
    {
        name: 'Sudha Mishra',
        role: 'Small Business Owner',
        feedback:
            'The tool we’ve adopted has surpassed our expectations, providing invaluable insights and support as our business continues to grow.',
        image: '/images/customers/3.png',
    },
];

function Testimonials() {
    return (
        <section className="testimonials-section">
            <div className="testimonials-content">
                <div className="testimonials-header">
                    <h2>What people say</h2>
                    <p>
                        Discover what our satisfied customers have to say
                        about their experiences with our products/services.
                    </p>
                </div>
                <div className="testimonials-container">
                    {testimonials.map((t, index) => (
                        <div className="testimonial-card" key={index}>
                            <img src={t.image} alt={t.name} className="avatar" />
                            <h3>{t.name}</h3>
                            <span className="role">{t.role}</span>
                            <p className="feedback">{t.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
