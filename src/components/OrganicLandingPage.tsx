import React, { useState, useEffect, useRef } from 'react';
import CountdownTimer from './CountdownTimer';
import heroImage from '../assets/hero-farmland.jpg';
import leafLogo from '../assets/leaf-logo.png';
import organicGrains from '../assets/organic-grains.jpg';
import organicSpices from '../assets/organic-spices.jpg';
import organicFruits from '../assets/organic-fruits.jpg';
import organicHoney from '../assets/organic-honey.jpg';

const OrganicLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [shakeUrgency, setShakeUrgency] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const raoRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Form validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(name.trim().length > 0 && emailRegex.test(email));
  }, [email, name]);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [formRef, whatsappRef, raoRef, productsRef, footerRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Typewriter effect trigger
  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Urgency shake animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShakeUrgency(true);
      setTimeout(() => setShakeUrgency(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Here you would typically send data to your backend
      alert(`Thank you ${name}! You've been added to our waitlist. We'll contact you at ${email} when we launch!`);
      setName('');
      setEmail('');
    }
  };

  const whatsappUrl = `https://wa.me/+918464039468?text=I'm%20interested%20in%20your%20organic%20products%20launch!`;

  const products = [
    { image: organicGrains, title: 'Organic Grains', delay: '0ms' },
    { image: organicSpices, title: 'Premium Spices', delay: '300ms' },
    { image: organicFruits, title: 'Fresh Fruits', delay: '600ms' },
    { image: organicHoney, title: 'Pure Honey', delay: '900ms' },
  ];

  const raos = [
    {
      title: 'Exclusivity',
      description: 'Be among the first to shop our curated organic range.',
      delay: '0ms'
    },
    {
      title: 'Health',
      description: 'Pure, chemical-free products for your well-being.',
      delay: '200ms'
    },
    {
      title: 'Special Offer',
      description: 'Sign up now for exclusive pre-launch discounts!',
      delay: '400ms'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg transform translate-y-0' 
            : 'bg-transparent transform -translate-y-2'
          }
        `}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={leafLogo} 
              alt="Organic Logo" 
              className="w-10 h-10 animate-logo-bounce"
            />
            <span className="font-montserrat font-bold text-xl text-primary">
              Organic Store
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-primary hover:text-accent transition-colors">Home</a>
            <a href="#products" className="text-primary hover:text-accent transition-colors">Products</a>
            <a href="#contact" className="text-primary hover:text-accent transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 z-10 animate-fade-in-hero">
          {/* Opening Soon Banner */}
          <div className="bg-primary/20 backdrop-blur-sm rounded-full px-8 py-3 mb-8 inline-block border border-white/30">
            <span className="text-white font-montserrat text-lg font-semibold">
              Opening Soon – Launching September 2025
            </span>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-montserrat">
            <span className="animate-word-fade-in inline-block" style={{ animationDelay: '0.5s' }}>Discover</span>{' '}
            <span className="animate-word-fade-in inline-block" style={{ animationDelay: '0.8s' }}>the</span>{' '}
            <span className="animate-word-fade-in inline-block" style={{ animationDelay: '1.1s' }}>Finest</span>{' '}
            <span className="animate-word-fade-in inline-block" style={{ animationDelay: '1.4s' }}>Organic</span>{' '}
            <span className="animate-word-fade-in inline-block" style={{ animationDelay: '1.7s' }}>Products!</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-white/90 mb-8 font-lora" style={{ animationDelay: '2s' }}>
            <span className="animate-word-fade-in inline-block">
              Launching September 2025 – Join us for a healthier, sustainable future!
            </span>
          </h2>

          {/* Typewriter Tagline */}
          <div className="mb-12">
            <p className={`
              text-2xl md:text-3xl text-white font-lora font-medium
              ${showTypewriter ? 'animate-typewriter' : ''}
              overflow-hidden whitespace-nowrap border-r-2 border-primary
            `}>
              Purely Organic, Naturally Yours
            </p>
          </div>

          {/* Social Proof */}
          <div className="animate-stagger-fade-in" style={{ animationDelay: '3s' }}>
            <p className="text-white/80 text-lg font-montserrat">
              Join 2,000+ organic enthusiasts awaiting our launch!
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section 
        ref={formRef}
        id="waitlist"
        className={`
          py-20 bg-secondary/50
          ${visibleElements.has('waitlist') ? 'animate-slide-in-left' : 'opacity-0'}
        `}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary font-montserrat">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground mb-8 font-lora">
              Be the first to know when we launch and get exclusive early access to our premium organic products.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-lora"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-lora"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`
                  w-full py-4 px-8 rounded-xl font-semibold text-lg font-montserrat
                  transition-all duration-300 transform
                  ${isFormValid 
                    ? 'bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg cursor-pointer' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }
                `}
              >
                Join the Waitlist
              </button>
            </form>

            {/* Urgency Message */}
            <div className={`mt-6 ${shakeUrgency ? 'animate-shake' : ''}`}>
              <p className="text-primary font-semibold font-montserrat">
                Limited pre-launch offer spots!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RAO Section */}
      <section 
        ref={raoRef}
        id="benefits"
        className="py-20 bg-accent/5"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-montserrat">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {raos.map((rao, index) => (
              <div
                key={index}
                className={`
                  text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300
                  ${visibleElements.has('benefits') ? 'animate-fade-up-bounce' : 'opacity-0'}
                `}
                style={{ animationDelay: rao.delay }}
              >
                <h3 className="text-2xl font-bold mb-4 text-primary font-montserrat">
                  {rao.title}
                </h3>
                <p className="text-muted-foreground font-lora text-lg">
                  {rao.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section 
        ref={productsRef}
        id="products"
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-montserrat">
            Product Preview
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className={`
                  group cursor-pointer transition-all duration-300 hover:transform hover:scale-110
                  ${visibleElements.has('products') ? 'animate-stagger-fade-in' : 'opacity-0'}
                `}
                style={{ animationDelay: product.delay }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg font-montserrat">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4 text-center text-primary font-montserrat">
                  {product.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section 
        ref={whatsappRef}
        className={`
          py-20 bg-primary/5
          ${visibleElements.has('whatsapp') ? 'animate-slide-in-right' : 'opacity-0'}
        `}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary font-montserrat">
            Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-lora max-w-2xl mx-auto">
            Get instant answers about our upcoming organic products launch. We're here to help!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-montserrat"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className={`
          py-12 bg-accent text-accent-foreground
          ${visibleElements.has('footer') ? 'animate-stagger-fade-in' : 'opacity-0'}
        `}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src={leafLogo} alt="Organic Logo" className="w-8 h-8" />
            <span className="font-montserrat font-bold text-xl">Organic Store</span>
          </div>
          <p className="text-accent-foreground/80 mb-6 font-lora">
            Premium organic products for a healthier lifestyle
          </p>
          <div className="flex justify-center space-x-6">
            {['Facebook', 'Instagram', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-accent-foreground/60 hover:text-accent-foreground transition-colors duration-300 hover:animate-wiggle"
              >
                {social}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-accent-foreground/20">
            <p className="text-accent-foreground/60 font-lora">
              © 2024 Organic Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-slide-in-right"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default OrganicLandingPage;