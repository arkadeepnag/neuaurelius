import React, { useEffect } from "react"; // 1. Import useEffect
import "./Services.css";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Card Component (No changes needed here)
function Card({ title, description, link, img }) {
    // ... (rest of the Card component code is unchanged)
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
    // 2. Define the list of images to preload
    const imagesToPreload = [
        "/images/images/shield.jpg",
        "/images/images/brand.jpg",
        "/images/images/cloud.jpg",
        "/images/images/ai.jpg",
        "/images/images/web.jpg",
        "/images/images/app.jpg"
    ];

    // 3. Add the useEffect hook to preload images
    useEffect(() => {
        imagesToPreload.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;
        });
    }, [imagesToPreload]); // Dependency array ensures this runs when the list changes

    return (
        <div className="services-container">
            <h4 className="containerTitle"><span>/</span>Services</h4>
            <div className="cards-container">
                {/* Cards now use the preloaded image paths */}
                <Card
                    title="Cybersecurity"
                    description="Enhancing the strength of your platforms to meet the growing trend of cyberattacks."
                    link="/services/cybersecurity"
                    img={imagesToPreload[0]}
                />

                <Card
                    title="Brand Identity"
                    description="Crafting cohesive visual and emotional brand presence that connects and converts."
                    link="/services/brand-identity"
                    img={imagesToPreload[1]}
                />

                <Card
                    title="Cloud Computing"
                    description="Scalable cloud solutions to host, process, and secure your infrastructure with confidence."
                    link="/services/cloud-computing"
                    img={imagesToPreload[2]}
                />

                <Card
                    title="Artificial Intelligence"
                    description="Build smarter products with custom-trained AI models tailored to your industry."
                    link="/services/artificial-intelligence"
                    img={imagesToPreload[3]}
                />

                <Card
                    title="Web Services"
                    description="Modern, responsive websites built for performance, SEO, and cross-device compatibility."
                    link="/services/web-services"
                    img={imagesToPreload[4]}
                />

                <Card
                    title="Mobile Apps"
                    description="Sleek, scalable apps designed for Android, iOS, and hybrid platforms with intuitive UX."
                    link="/services/mobile-apps"
                    img={imagesToPreload[5]}
                />
            </div>
        </div>
    );
}