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
const serviceImages = [
    "/images/hero.jpg",
    "/images/images/ai.jpg",
    "/images/images/app.jpg",
    "/images/images/brand.jpg",
    "/images/images/web.jpg",
    "/images/images/shield.jpg",
    "/images/images/cloud.jpg",
];
function Home() {
    const cardsRef = useRef([]);
    const servicesSectionRef = useRef(null);
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        // 2. Add the preloading logic
        const imagesToPreload = [...serviceImages, ...customerImages, ...workImages];
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        ScrollTrigger.refresh();

        // Why Us Section Zoom to Travel to Features

        // Cleanup
        return () => {

        };
    }, []);

    const handleConsultationClick = () => {
        window.location.href = '/consultation';
    };

    return (
        <div id="app-root">
            <Navbar />
            <div className="hero" style={{
                backgroundImage: 'url(/images/hero.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
                data-theme="dark">
                <div className="hero-left">
                    {/* <div className="customerText">
                        <div className="customerImages">
                            
                            {customerImages.map((src, i) => (
                                <img key={i} src={src} alt={`customer ${i + 1}`} />
                            ))}
                        </div>
                        <span>Join around 400+ happy clients</span>
                    </div> */}
                    <h1 className="heroTxt">
                        Grow your business from design to development effortlessly.
                    </h1>

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