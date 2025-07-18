// pages/Home.js
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Target, Play, ArrowUpRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

// 1. Define the image paths used in this component
const customerImages = [
    "/images/customers/1.png",
    "/images/customers/2.png",
    "/images/customers/3.png"
];
const workImages = [
    "/images/work1.png",
    "/images/work2.png",
    "/images/work3.png"
];

function Home() {
    const cardsRef = useRef([]);
    const servicesSectionRef = useRef(null);
    const heroRef = useRef(null);
    const whyUsSectionRef = useRef(null);
    const doorContainerRef = useRef(null);
    const travelPathRef = useRef(null);
    const newSectionRef = useRef(null);

    useLayoutEffect(() => {
        // 2. Add the preloading logic
        const imagesToPreload = [...customerImages, ...workImages];
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        ScrollTrigger.refresh();

        // Card animations (unchanged)
        cardsRef.current.forEach((card, i) => {
            // ... all your existing GSAP animation code remains here
            gsap.set(card, {
                y: -i * 60,
                x: i * 20,
                scale: 1 - i * 0.02,
                zIndex: 10 - i,
                rotationY: -i * 2,
            });

            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    y: -i * 60 - 30,
                    x: i * 20 + 15,
                    scale: 1.08,
                    rotationY: i * 2 + 5,
                    rotationX: -5,
                    zIndex: 100,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
                    duration: 0.4,
                    ease: "power2.out",
                });

                cardsRef.current.forEach((otherCard, j) => {
                    if (j > i) {
                        gsap.to(otherCard, {
                            x: j * 20 - 50 - (j - i) * 10,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    y: -i * 60,
                    x: i * 20,
                    scale: 1 - i * 0.02,
                    rotationY: -i * 2,
                    rotationX: 0,
                    zIndex: 10 - i,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    duration: 0.4,
                    ease: "power2.out",
                });

                cardsRef.current.forEach((otherCard, j) => {
                    if (j > i) {
                        gsap.to(otherCard, {
                            x: j * 20,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                });
            });
        });


        // Hero Section Animation (unchanged)
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                opacity: 0.7,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom 20%",
                    scrub: true,
                },
            });
        }


        // Why Us Section Zoom to Travel to Features

        // Cleanup
        return () => {
            cardsRef.current.forEach((card) => {
                card.removeEventListener("mouseenter", () => { });
                card.removeEventListener("mouseleave", () => { });
            });
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div id="app-root">
            <Navbar />
            <div className="hero" ref={heroRef}>
                <div className="hero-left">
                    <div className="customerText">
                        <div className="customerImages">
                            {/* 3. Use the predefined image arrays */}
                            {customerImages.map((src, i) => (
                                <img key={i} src={src} alt={`customer ${i + 1}`} />
                            ))}
                        </div>
                        <span>Join around 400+ happy clients</span>
                    </div>
                    <h1 className="heroTxt">
                        Grow your business from design to development effortlessly.
                    </h1>
                    <div className="heroBtns">
                        <button className="getQuote">Book a Free Consultation</button>
                        <button className="getQuote menuBtn"><ArrowUpRight /></button>
                    </div>
                </div>
                <div className="stacked-cards-container">
                    {workImages.map((src, i) => (
                        <img
                            key={i}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="stacked-card"
                            src={src}
                            alt={`card-${i}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Services />
                <WhyUs />
                <Testimonials />
                <Footer />
            </div>
        </div>
    );
}
export default Home;