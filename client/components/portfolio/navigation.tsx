import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import { Menu, X, Home, User, Layers, Code, CheckSquare, Mail } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#", icon: <Home size={16} /> },
  { id: "about", label: "About", href: "#about", icon: <User size={16} /> },
  { id: "technologies", label: "Skills", href: "#technologies", icon: <Layers size={16} /> },
  { id: "projects", label: "Projects", href: "#projects", icon: <Code size={16} /> },
  { id: "certifications", label: "Credentials", href: "#certifications", icon: <CheckSquare size={16} /> },
  { id: "contact", label: "Contact", href: "#contact", icon: <Mail size={16} /> },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollY / totalHeight) * 100);

      const scrollPosition = window.scrollY + 100;

      // Set home as active if near the top of the page
      if (scrollPosition < window.innerHeight) {
        setActiveSection("home");
        return;
      }

      // Check other sections
      for (const sectionId of navItems.map((item) => item.id)) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  const mobileMenuVariants: Variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.3 } },
    exit: { x: "100%", opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.3 } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/30 dark:bg-[hsl(213,50%,12%)]/30 backdrop-blur-xl shadow-xl border-b border-white/20 dark:border-[hsl(172,85%,45%)]/30"
            : "bg-transparent"
        }`}
        role="navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.button
              onClick={() => scrollToSection("#")}
              className="flex items-center space-x-2 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(172,85%,35%)] to-[hsl(213,50%,16%)] dark:from-[hsl(172,85%,45%)] dark:to-[hsl(213,50%,20%)] rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                NM
              </div>
              <span className="text-xl font-semibold dark:text-white hidden sm:block">
                Navodya Manamendra
              </span>
            </motion.button>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className={`relative group px-4 py-2 rounded-lg font-medium text-sm transition-all before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:transition-opacity before:bg-[hsl(172,85%,35%)]/10 group-hover:before:opacity-100 ${
                    activeSection === item.id
                      ? "text-[hsl(172,85%,35%)] dark:text-[hsl(172,85%,45%)]"
                      : "text-[hsl(213,50%,16%)] dark:text-gray-300 hover:text-[hsl(172,85%,35%)] dark:hover:text-[hsl(172,85%,45%)]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[hsl(213,50%,16%)] dark:text-white hover:bg-[hsl(172,85%,35%)]/10 dark:hover:bg-[hsl(172,85%,45%)]/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[hsl(172,85%,35%)] to-[hsl(172,85%,45%)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="md:hidden fixed top-16 right-0 w-3/4 max-w-xs bg-white/90 dark:bg-[hsl(213,50%,12%)]/90 backdrop-blur-md border-l border-[hsl(172,85%,35%)]/20 dark:border-[hsl(172,85%,45%)]/30 shadow-lg"
            >
              <div className="flex flex-col py-4 px-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                    className={`text-left px-4 py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 focus:outline-none ${
                      activeSection === item.id
                        ? "text-[hsl(172,85%,35%)] dark:text-[hsl(172,85%,45%)] bg-[hsl(172,85%,35%)]/10 dark:bg-[hsl(172,85%,45%)]/10"
                        : "text-[hsl(213,50%,16%)] dark:text-gray-300 hover:bg-[hsl(172,85%,35%)]/10 dark:hover:bg-[hsl(172,85%,45%)]/10"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}