import React, { useEffect, useRef, useState } from 'react';
import './WhyUs.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FileBadge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title: 'Strategic Discovery & Vision Alignment',
        content: 'We deep-dive into your product vision, target market, and business bottlenecks to align the tech solution with long-term growth goals — not just short-term fixes.'
    },
    {
        title: 'Future-Proof Architecture & Clean Codebase',
        content: 'We engineer modular, cloud-native, and scalable systems that evolve with your business. Every line of code is clean, documented, and optimized for performance and extensibility.'
    },
    {
        title: 'Fast Iteration, Transparent Delivery',
        content: 'Using agile sprints and milestone-based roadmaps, we ensure you see real, usable results quickly — without losing sight of the larger product strategy.'
    },
    {
        title: 'Cloud-Secured, AI-Enabled by Default',
        content: 'Security is not an afterthought. We embed compliance and protection at every layer while also setting you up to easily integrate AI/ML and intelligent automation down the road.'
    },
    {
        title: 'Sustained Growth Through Long-Term Support',
        content: 'From post-launch performance monitoring to feature expansion and LTV optimization — we stay with you, driving growth with ongoing R&D, optimization, and tech upgrades.'
    }
];

function WhyUs() {
    const sectionRef = useRef(null);
    const listItemsRef = useRef([]);
    const contentRefs = useRef([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            listItemsRef.current.forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    x: -30,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleExpand = (index) => {
        const isExpanding = expandedIndex !== index;

        // Close all
        contentRefs.current.forEach((el, i) => {
            if (el) {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    display: 'none',
                });
            }
        });

        // Open the selected one
        if (isExpanding) {
            const el = contentRefs.current[index];
            if (el) {
                el.style.display = 'block'; // ensure it's visible to measure height
                const height = el.scrollHeight;
                gsap.fromTo(el,
                    { height: 0, opacity: 0 },
                    {
                        height,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        display: 'block'
                    });
            }
            setExpandedIndex(index);
        } else {
            setExpandedIndex(null);
        }
    };

    return (
        <section
            className="whyus-section"
            ref={sectionRef}
            style={{
                backgroundImage: 'url(/images/collaborate.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            data-theme="dark"
        >
            <div className="whyus-container">
                <div className="whyus-content">
                    <h4 className="containerTitle"><span>/</span>Why Choose Us</h4>
                    <h2>We Empower Your Tech Vision</h2>
                    <p>
                        At Neuaurelius, we engineer reliable, high-performance software solutions that grow with your business. From ideation to deployment, we turn your technology needs into results.
                    </p>
                    <ul className="whyus-list">
                        {items.map((item, i) => (
                            <li key={i} ref={(el) => (listItemsRef.current[i] = el)}>
                                <div className="whyus-header" onClick={() => toggleExpand(i)}>


                                    {item.title}

                                    <span className="arrow">
                                        {expandedIndex === i
                                            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>

                                        }
                                    </span>
                                </div>
                                <div
                                    className="whyus-content-hidden"
                                    ref={(el) => (contentRefs.current[i] = el)}
                                    style={{
                                        height: 0,
                                        overflow: 'hidden',
                                        opacity: 0,
                                        display: 'none',
                                    }}
                                >
                                    {item.content}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;
