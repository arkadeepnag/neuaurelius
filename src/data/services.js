const services = [
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        description:
            "Enhancing the strength of your platforms to meet the growing trend of cyberattacks.",
        longDescription: `
Cyber threats are more advanced and aggressive than ever before, targeting businesses of all sizes with ransomware, phishing, and data breaches. Our cybersecurity service acts as a digital fortress for your enterprise. We assess your current vulnerabilities, implement real-time monitoring systems, and enforce enterprise-grade security policies tailored to your specific industry.

We don’t just stop attacks—we predict them. Our team blends threat intelligence, penetration testing, and compliance auditing to build a proactive defense system. Whether you're a financial institution, e-commerce platform, or SaaS provider, we ensure that your users, data, and reputation remain intact under any digital assault.`,
        image: "/images/services/cybersecurity.jpg",
        faqs: [
            {
                question: "Do you provide 24/7 monitoring?",
                answer: "Yes, we offer round-the-clock monitoring with real-time alerts and incident response support."
            },
            {
                question: "Can you help us with ISO/PCI/DSS compliance?",
                answer: "Absolutely. Our team specializes in helping businesses meet regulatory compliance standards."
            }
        ],
        testimonials: [
            {
                name: "Ananya B.",
                feedback: "After the cybersecurity audit, we discovered vulnerabilities we had never noticed. Their team is incredibly thorough and proactive."
            },
            {
                name: "Rahul M.",
                feedback: "Their managed threat detection helped us prevent a ransomware breach. Game-changing!"
            }
        ]
    },
    {
        id: "brand-identity",
        title: "Brand Identity",
        description:
            "Crafting cohesive visual and emotional brand presence that connects and converts.",
        longDescription: `
A strong brand is more than just a logo—it's a story, a feeling, a promise. Our brand identity service is designed to help startups and established companies alike clarify their mission and visually express it across all platforms. We begin by understanding your vision, values, and audience, then translate them into logos, typography, color systems, and emotional voice.

Your brand is how people remember you—and we make sure they remember you for the right reasons. Whether you're launching a new venture or rebranding a legacy, our design and strategy experts ensure your identity is consistent, compelling, and conversion-driven.`,
        image: "/images/services/brand-identity.jpg",
        faqs: [
            {
                question: "Can I hire you for just logo design?",
                answer: "Yes, we offer standalone logo design as well as full identity systems."
            },
            {
                question: "Do you conduct brand workshops?",
                answer: "Yes, we provide discovery workshops to align brand vision across stakeholders."
            }
        ],
        testimonials: [
            {
                name: "Neha R.",
                feedback: "They captured the soul of our company in our new brand. We've never been prouder of how we present ourselves."
            },
            {
                name: "Vikram S.",
                feedback: "Their design team is magic. Everything felt premium, thoughtful, and so 'us'."
            }
        ]
    },
    {
        id: "cloud-computing",
        title: "Cloud Computing",
        description:
            "Scalable cloud solutions to host, process, and secure your infrastructure with confidence.",
        longDescription: `
Modern businesses can’t afford to be slowed down by legacy servers or rigid infrastructure. Our cloud computing service provides you with the agility to scale, adapt, and grow—without worrying about downtime or overprovisioning. From architecture planning to migration and cost optimization, we handle every phase of your cloud journey.

We specialize in deploying secure, hybrid, and multi-cloud environments using AWS, Azure, and GCP. Whether you're transitioning from on-prem, integrating SaaS platforms, or building cloud-native microservices, our engineers will make your operations faster, cheaper, and smarter.`,
        image: "/images/services/cloud-computing.jpg",
        faqs: [
            {
                question: "Which cloud platforms do you support?",
                answer: "We work with AWS, Google Cloud, Azure, and hybrid environments."
            },
            {
                question: "Do you offer DevOps automation?",
                answer: "Yes, including CI/CD pipelines, infrastructure as code, and autoscaling."
            }
        ],
        testimonials: [
            {
                name: "Sonal T.",
                feedback: "Our migration to the cloud was seamless. Cost dropped, speed increased!"
            },
            {
                name: "Dinesh A.",
                feedback: "They turned our architecture into a high-performance, scalable system. Highly recommend."
            }
        ]
    },
    {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        description:
            "Deploy intelligent systems that adapt, predict, and automate tasks with minimal input.",
        longDescription: `
AI isn't just the future—it's the competitive edge of today. Our AI service helps you implement smart systems that learn from your data and evolve with your business needs. Whether you need predictive analytics, intelligent chatbots, fraud detection systems, or advanced image processing, we tailor AI to your workflows.

We believe in ethical, explainable, and high-impact AI. That means no black-box models—just transparent solutions that improve decision-making, customer experiences, and operational efficiency. With cutting-edge tools and custom model training, we bring machine intelligence to your fingertips.`,
        image: "/images/services/ai.jpg",
        faqs: [
            {
                question: "Can you build custom models for specific industries?",
                answer: "Yes, we specialize in industry-specific AI solutions tailored to your data."
            },
            {
                question: "Is your AI explainable?",
                answer: "Always. We build interpretable systems using XAI techniques where needed."
            }
        ],
        testimonials: [
            {
                name: "Priya J.",
                feedback: "We integrated their recommendation engine—CTR went up by 37%!"
            },
            {
                name: "Kabir N.",
                feedback: "Finally, an AI solution that makes sense to our business. Brilliant work!"
            }
        ]
    },
    {
        id: "web-services",
        title: "Web Services",
        description:
            "Reliable, secure, and scalable web solutions tailored to your business.",
        longDescription: `
Your website or platform is often your customer's first impression—and we help you make it count. Our web services range from stunning brochure websites to complex backend platforms capable of handling millions of users. We build with performance, accessibility, and security as top priorities.

Every project is responsive, SEO-optimized, and powered by modern frameworks like React, Next.js, and Django. Whether you're an e-commerce store, a SaaS startup, or a large enterprise, our team ensures that your online presence is fast, intuitive, and conversion-ready from the ground up.`,
        image: "/images/services/web.jpg",
        faqs: [
            {
                question: "Do you handle both front-end and backend?",
                answer: "Yes, we offer full-stack development with modern tools and frameworks."
            },
            {
                question: "Is SEO included in the build?",
                answer: "Absolutely. All websites are SEO-friendly and Google-index optimized."
            }
        ],
        testimonials: [
            {
                name: "Ritika P.",
                feedback: "Our new website is beautiful, fast, and ranking well. Great job!"
            },
            {
                name: "Shubham L.",
                feedback: "These folks know how to blend tech with design. 10/10 experience."
            }
        ]
    },
    {
        id: "mobile-apps",
        title: "Mobile Apps",
        description:
            "Intuitive and efficient mobile applications built for iOS and Android platforms.",
        longDescription: `
Today’s users expect powerful, fast, and beautiful mobile apps—and we deliver just that. Whether you're building a customer-facing product or an internal utility, our mobile development service covers strategy, design, development, and post-launch scaling. 

From real-time messaging and payment gateways to offline sync and biometric security, we handle every technical detail so your users enjoy a flawless experience. With React Native, Flutter, and native tech, we ship robust apps that run smoothly across devices and markets.`,
        image: "/images/services/mobile.jpg",
        faqs: [
            {
                question: "Do you develop apps for both iOS and Android?",
                answer: "Yes, we use cross-platform tools like Flutter and React Native, as well as native development where required."
            },
            {
                question: "Do you publish apps to Play Store and App Store?",
                answer: "Yes, we manage the full release pipeline, including store submission and compliance."
            }
        ],
        testimonials: [
            {
                name: "Aman V.",
                feedback: "Our mobile app works flawlessly across all devices. Users love it!"
            },
            {
                name: "Tanya S.",
                feedback: "Very efficient and beautifully designed app. Their UX game is strong!"
            }
        ]
    }
];

export default services;
