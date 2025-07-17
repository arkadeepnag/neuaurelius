import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Card Component
function Card({ title, description, link, img }) {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <div
            className="card"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h3 className="card-title">{title}</h3>
            <div className="card-content">
                <p className="card-desc">{description}</p>
                <div className="btn-container">
                    <button className="card-link" onClick={handleClick}>
                        <ArrowUpRight /> Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

// Services Section
export default function Services() {
    return (
        <div className="services-container">
            <h4 className="containerTitle"><span>/</span>Services</h4>
            <div className="cards-container">
                <Card
                    title="Cybersecurity"
                    description="Enhancing the strength of your platforms to meet the growing trend of cyberattacks."
                    link="/services/cybersecurity"
                    img="/images/images/shield.jpg"
                />

                <Card
                    title="Brand Identity"
                    description="Crafting cohesive visual and emotional brand presence that connects and converts."
                    link="/services/brand-identity"
                    img="/images/images/brand.jpg"
                />

                <Card
                    title="Cloud Computing"
                    description="Scalable cloud solutions to host, process, and secure your infrastructure with confidence."
                    link="/services/cloud-computing"
                    img="/images/images/cloud.jpg"
                />

                <Card
                    title="Artificial Intelligence"
                    description="Build smarter products with custom-trained AI models tailored to your industry."
                    link="/services/artificial-intelligence"
                    img="/images/images/ai.jpg"
                />

                <Card
                    title="Web Services"
                    description="Modern, responsive websites built for performance, SEO, and cross-device compatibility."
                    link="/services/web-services"
                    img="/images/images/web.jpg"
                />

                <Card
                    title="Mobile Apps"
                    description="Sleek, scalable apps designed for Android, iOS, and hybrid platforms with intuitive UX."
                    link="/services/mobile-apps"
                    img="/images/images/app.jpg"
                />
            </div>
        </div>
    );
}
