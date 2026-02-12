import { motion } from "framer-motion";
import { ArrowRight, Code, Server, Smartphone, Globe, Mail, Phone, MapPin, Monitor, Zap, Database, Layout } from "lucide-react";
import { useState, useEffect } from "react";
import { QuoteBooklet } from "@/components/features/QuoteBooklet";
import { BraidingDemo } from "@/components/demos/BraidingDemo";
import { MechanicDemo } from "@/components/demos/MechanicDemo";

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const techStack = [
    { name: "React", icon: Code, percent: 95, color: "from-pink-500 to-pink-600" },
    { name: "TypeScript", icon: Code, percent: 90, color: "from-green-500 to-green-600" },
    { name: "Node.js", icon: Server, percent: 92, color: "from-pink-500 to-pink-600" },
    { name: "Python", icon: Database, percent: 88, color: "from-green-500 to-green-600" },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Custom responsive websites built with modern tech stack for your business needs",
      icon: Globe,
      features: ["React/TypeScript", "Responsive Design", "SEO Optimized", "Fast Performance"]
    },
    {
      title: "Full Stack Apps",
      description: "Complete web applications with frontend and backend integration",
      icon: Server,
      features: ["Node.js Backend", "Database Design", "API Development", "Cloud Hosting"]
    },
    {
      title: "Custom PC Building",
      description: "Personalized computer builds tailored to your specific requirements and budget",
      icon: Monitor,
      features: ["Gaming PCs", "Workstations", "Budget Builds", "Expert Assembly"]
    },
    {
      title: "Local Development",
      description: "Localhost development and testing environments for your projects",
      icon: Zap,
      features: ["Development Setup", "Testing Environment", "Version Control", "Code Review"]
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Floating Navigation Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["home", "about", "services", "skills", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSection === section
                  ? "bg-pink-500 w-4 h-4 glow-pink"
                  : "bg-gray-600 hover:bg-green-500"
              }`}
              aria-label={`Go to ${section}`}
            />
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center section-scroll py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 code-grid-bg opacity-20"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl font-code"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
                opacity: 0 
              }}
              animate={{
                y: -100,
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                color: i % 2 === 0 ? "#ec4899" : "#22c55e",
              }}
            >
              {['<', '/>', '{ }', '[ ]', '( )', '</>'][i % 6]}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 flex justify-center lg:justify-start"
              >
                <img
                  src="/images/sonoaaclogos.PNG"
                  alt="Sonoaac"
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
                />
              </motion.div>

              {/* SWS Letters */}
              <div className="flex items-center justify-center lg:justify-start gap-1 mb-6">
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-3d-pink">S</span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-3d-green">W</span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-3d-pink">S</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d mb-4">
                Sonoaac Web Services
              </h1>

              {/* Code-style subtitle */}
              <p className="font-code text-green-400 text-base sm:text-lg mb-6">
                <span className="text-gray-500">//</span> SaaS Developer & Founder
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Transform your digital presence with custom web solutions. Small business owners, 
                get enterprise-quality websites at a fraction of agency costs. Also offering custom PC builds 
                tailored to your needs.
              </p>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 justify-center lg:justify-start">
                {["React", "TSX", "Python", "Node.js"].map((tech, i) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-code text-xs sm:text-sm hover-glow-pink"
                    style={{
                      color: i % 2 === 0 ? "#ec4899" : "#22c55e",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white bg-gradient-primary hover-glow-pink transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
                >
                  Get a Quote
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white bg-gray-900 border border-gray-800 hover:border-green-500 hover-glow-green transition-all text-sm sm:text-base"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>

            {/* Right - Profile/Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center items-center order-first lg:order-last"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-pulse"></div>
                
                {/* Main Circle */}
                <div className="relative w-full h-full rounded-full border-4 border-pink-500 glow-pink overflow-hidden bg-gray-900 flex items-center justify-center">
                  <Code className="text-pink-500 opacity-30" size={120} />
                </div>

                {/* Floating Tech Badges */}
                {[
                  { icon: Code, label: "React", top: "10%", right: "-10%", color: "pink" },
                  { icon: Server, label: "Node.js", bottom: "20%", right: "-15%", color: "green" },
                  { icon: Database, label: "Python", top: "50%", left: "-15%", color: "pink" },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    className={`absolute bg-gray-900 border-2 ${badge.color === 'pink' ? 'border-pink-500' : 'border-green-500'} 
                      rounded-2xl p-3 sm:p-4 hidden md:flex items-center gap-2 sm:gap-3`}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                    }}
                    style={{
                      top: badge.top,
                      bottom: badge.bottom,
                      left: badge.left,
                      right: badge.right,
                    }}
                  >
                    <badge.icon 
                      className={badge.color === 'pink' ? 'text-pink-500' : 'text-green-500'} 
                      size={24} 
                    />
                    <span className="text-white font-bold text-xs sm:text-sm">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-gray-500 text-sm">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-pink-500"
            >
              <ArrowRight className="rotate-90" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 section-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="font-code text-2xl sm:text-3xl text-pink-500 text-3d-pink">01</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d font-code">
                <span className="text-green-500">&lt;</span>
                About Sonoaac
                <span className="text-green-500">/&gt;</span>
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-primary"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left - Text Content */}
              <div>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  I'm a <span className="text-pink-500 font-bold">SaaS developer and founder</span> specializing in 
                  building modern web applications that help small businesses thrive online. With expertise in 
                  <span className="text-green-500 font-bold"> React, TypeScript, Python, and Node.js</span>, 
                  I create solutions that are both powerful and affordable.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                  Whether you need a stunning website, a full-stack application, or a custom-built PC, 
                  I provide personalized service with enterprise-quality results.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { number: "50+", label: "Projects" },
                    { number: "5+", label: "Years Experience" },
                    { number: "30+", label: "Happy Clients" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 text-center hover-glow-pink"
                    >
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Code Block */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 font-code text-xs sm:text-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-gray-500">sonoaac.tsx</span>
                </div>
                <div className="space-y-2 overflow-x-auto">
                  <div><span className="text-pink-500">const</span> <span className="text-cyan-400">sonoaac</span> <span className="text-gray-500">=</span> <span className="text-yellow-500">{'{'}</span></div>
                  <div className="pl-4"><span className="text-cyan-400">name</span><span className="text-gray-500">:</span> <span className="text-green-400">'Sonoaac Web Services'</span>,</div>
                  <div className="pl-4"><span className="text-cyan-400">location</span><span className="text-gray-500">:</span> <span className="text-green-400">['NY', 'NJ']</span>,</div>
                  <div className="pl-4"><span className="text-cyan-400">global</span><span className="text-gray-500">:</span> <span className="text-pink-500">true</span>,</div>
                  <div className="pl-4"><span className="text-cyan-400">techStack</span><span className="text-gray-500">:</span> <span className="text-yellow-500">[</span></div>
                  <div className="pl-8"><span className="text-green-400">'React'</span>, <span className="text-green-400">'TypeScript'</span>,</div>
                  <div className="pl-8"><span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'Python'</span></div>
                  <div className="pl-4"><span className="text-yellow-500">]</span>,</div>
                  <div className="pl-4"><span className="text-cyan-400">specialties</span><span className="text-gray-500">:</span> <span className="text-yellow-500">[</span></div>
                  <div className="pl-8"><span className="text-green-400">'Web Development'</span>,</div>
                  <div className="pl-8"><span className="text-green-400">'Custom PC Builds'</span>,</div>
                  <div className="pl-8"><span className="text-green-400">'Local Development'</span></div>
                  <div className="pl-4"><span className="text-yellow-500">]</span></div>
                  <div><span className="text-yellow-500">{'}'}</span><span className="text-gray-500">;</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-950 section-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="font-code text-2xl sm:text-3xl text-green-500 text-3d-green">02</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d font-code">
                <span className="text-pink-500">&lt;</span>
                Services
                <span className="text-pink-500">/&gt;</span>
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-reverse"></div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover-glow-pink transition-all group"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${index % 2 === 0 ? 'bg-gradient-primary' : 'bg-gradient-reverse'} 
                    flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white text-3d mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                        <span className={`text-${index % 2 === 0 ? 'pink' : 'green'}-500`}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills/Tech Stack Section */}
      <section id="skills" className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 section-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="font-code text-2xl sm:text-3xl text-pink-500 text-3d-pink">03</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d font-code">
                <span className="text-green-500">&lt;</span>
                Tech Stack
                <span className="text-green-500">/&gt;</span>
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-primary"></div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center`}>
                        <tech.icon className="text-white" size={24} />
                      </div>
                      <span className="text-lg sm:text-xl font-bold text-white text-3d font-code">{tech.name}</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gradient font-code">{tech.percent}%</span>
                  </div>
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${tech.color} relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Tech */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 text-center"
            >
              <p className="text-gray-400 mb-6 text-sm sm:text-base">Also experienced with:</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                {["Express", "MongoDB", "PostgreSQL", "Git", "Docker", "AWS", "Tailwind CSS", "Next.js"].map((tech, i) => (
                  <span
                    key={tech}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl font-code text-xs sm:text-sm hover-glow-green transition-all"
                    style={{
                      color: i % 2 === 0 ? "#ec4899" : "#22c55e",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects/Demos Section */}
      <section id="projects" className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-950 section-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="font-code text-2xl sm:text-3xl text-green-500 text-3d-green">04</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d font-code">
                <span className="text-pink-500">&lt;</span>
                Live Projects
                <span className="text-pink-500">/&gt;</span>
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-reverse"></div>
            </div>

            <p className="text-base sm:text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
              Explore fully functional UI components built for real clients across various industries
            </p>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Demo 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-3d">Beauty & Salon Booking</h3>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 hover-glow-pink transition-all">
                  <BraidingDemo />
                </div>
              </motion.div>

              {/* Demo 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    2
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-3d">Automotive Service Menu</h3>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 hover-glow-green transition-all">
                  <MechanicDemo />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 section-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 sm:mb-16">
              <span className="font-code text-2xl sm:text-3xl text-pink-500 text-3d-pink">05</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-3d font-code">
                <span className="text-green-500">&lt;</span>
                Get In Touch
                <span className="text-green-500">/&gt;</span>
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-primary"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover-glow-pink transition-all group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="text-white" size={28} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-code">Phone</p>
                      <a href="tel:8627559845" className="text-xl sm:text-2xl font-bold text-gradient text-3d hover:opacity-80 transition-opacity">
                        (862) 755-9845
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover-glow-green transition-all group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-reverse flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="text-white" size={28} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-code">Location</p>
                      <p className="text-xl sm:text-2xl font-bold text-gradient-reverse text-3d">
                        NY & NJ
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Serving clients worldwide</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 hover-glow-pink transition-all group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="text-white" size={28} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-code">Email</p>
                      <a href="mailto:info@sonoaac.com" className="text-lg sm:text-xl font-bold text-gradient text-3d hover:opacity-80 transition-opacity break-all">
                        info@sonoaac.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-primary rounded-2xl p-8 sm:p-12 text-center flex flex-col justify-center items-center"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-3d mb-6">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-base sm:text-lg text-white/90 mb-8 max-w-md">
                  Let's discuss your project and bring your vision to life with cutting-edge technology
                </p>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-black font-bold rounded-xl text-base sm:text-lg hover:bg-gray-100 transition-all flex items-center gap-3 group"
                >
                  Start Your Project
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm sm:text-base">
                © 2025 <span className="text-gradient font-bold">Sonoaac Web Services</span>
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Built with React, TypeScript & passion</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-code text-xs sm:text-sm text-pink-500">&lt;/&gt;</span>
              <span className="text-gray-500 text-xs sm:text-sm">with</span>
              <span className="text-green-500 text-lg sm:text-xl">♥</span>
              <span className="text-gray-500 text-xs sm:text-sm">in NY & NJ</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Quote Booklet Modal */}
      <QuoteBooklet open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </div>
  );
}

