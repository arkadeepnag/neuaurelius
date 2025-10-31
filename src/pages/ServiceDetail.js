// src/pages/ServiceDetail.js
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import services from "../data/services";
import "./ServiceDetails.css";

function ServiceDetail() {
    const { id } = useParams();
    const service = services.find((s) => s.id === id);

    const [activeFAQ, setActiveFAQ] = useState(null);
    const faqRefs = useRef([]);

    const toggleFAQ = (index) => {
        const el = faqRefs.current[index];
        if (!el) return;

        if (activeFAQ === index) {
            gsap.to(el, { height: 0, duration: 0.3 });
            setActiveFAQ(null);
        } else {
            faqRefs.current.forEach((ref, i) => {
                if (ref && i !== index) gsap.to(ref, { height: 0, duration: 0.2 });
            });
            gsap.set(el, { height: "auto" });
            gsap.from(el, { height: 0, duration: 0.3 });
            setActiveFAQ(index);
        }
    };

    if (!service) return <h2>Service Not Found</h2>;

    const defaultFAQs = [
        {
            question: `What makes your ${service.title} service unique?`,
            answer: `We tailor our ${service.title.toLowerCase()} solutions to your exact business goals—ensuring scalability, security, and measurable ROI.`,
        },
        {
            question: `How long does a typical ${service.title} engagement take?`,
            answer: `Timelines depend on the scope, but most implementations take 3 to 8 weeks from discovery to deployment. Complex solutions may involve iterative phases or dedicated team assignments.`,
        },
        {
            question: "Do you offer post-service support?",
            answer: "Absolutely. We offer long-term maintenance, upgrade plans, and on-demand consultation to ensure your systems evolve with your business.",
        },
    ];

    const faqs = service.faqs && service.faqs.length > 0 ? service.faqs : defaultFAQs;

    const defaultReviews = [
        {
            name: "Aditi Mehra",
            stars: 5,
            comment: `Outstanding experience! The ${service.title} team was responsive, fast, and deeply knowledgeable. They aligned our tech stack with our business needs.`,
        },
        {
            name: "Ravi Kulkarni",
            stars: 4,
            comment: `We saw measurable improvements in just 2 weeks. Great communication and delivery on all promises. Excellent value for money.`,
        },
    ];

    const reviews = service.reviews && service.reviews.length > 0 ? service.reviews : defaultReviews;

    return (
        <div className="service-detail-container">
            <div className="back-link">
                <Link to="/">← Back to Services</Link>
            </div>

            {service.banner && (
                <img src={service.banner} alt={`${service.title} Banner`} className="banner-img" />
            )}

            <div className="service-content">
                <h1>{service.title}</h1>

                {/* Long Description with paragraphs */}
                <div className="long-description">
                    {service.longDescription.split("\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>

                {/* Features */}
                {service.features && (
                    <div className="features">
                        <h3>Key Features</h3>
                        <ul>
                            {service.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Tools Used */}
                {service.toolsUsed && (
                    <div className="tools-used">
                        <h3>Tools & Technologies</h3>
                        <div className="tool-list">
                            {service.toolsUsed.map((tool, index) => (
                                <span className="tool-tag" key={index}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Case Studies */}
                {service.caseStudies && (
                    <div className="case-studies">
                        <h3>Case Studies</h3>
                        {service.caseStudies.map((caseItem, index) => (
                            <div key={index} className="case-study-card">
                                <img src={caseItem.image} alt={caseItem.title} />
                                <div>
                                    <h4>{caseItem.title}</h4>
                                    <p>{caseItem.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Consultation Section */}
                <div className="book-section">
                    <h3>Interested in {service.title}?</h3>
                    <button className="book-btn">📅 Book a Free Consultation</button>
                </div>

                {/* Client Reviews */}
                <div className="reviews">
                    <h3>What Our Clients Say</h3>
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <strong>{review.name}</strong>
                            <div className="stars">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* FAQs Section */}
                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button className="faq-question" onClick={() => toggleFAQ(index)}>
                                {faq.question}
                            </button>
                            <div
                                className="faq-answer"
                                ref={(el) => (faqRefs.current[index] = el)}
                                style={{ height: 0, overflow: "hidden" }}
                            >
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
