import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookCard } from "@/components/BookCard";
import { books } from "@/lib/books-data";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Star,
  Search,
  Library,
  Zap,
  Globe,
  Shield,
  Heart,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [text, started]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}

export default function LandingPage() {
  const { isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();
  const featuredBooks = books.slice(0, 8);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleDemoLogin = async () => {
    await demoLogin();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-border/10 bg-background/80 backdrop-blur-lg"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold">Libraria</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#catalog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Catalog
            </a>
            <a href="#stats" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Stats
            </a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="hero">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Button variant="hero" onClick={handleDemoLogin} className="gap-2">
                  <Zap className="h-4 w-4" />
                  Try Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-primary/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full bg-warning/10 px-4 py-2 text-sm font-medium text-warning"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>36+ curated titles across all genres</span>
                </motion.div>

                <h1 className="mt-6 font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  <TypewriterText text="Your Gateway to" delay={500} />
                  <br />
                  <span className="text-primary">Endless Knowledge</span>
                </h1>

                <p className="mt-6 text-xl text-muted-foreground">
                  Discover, borrow, and explore our vast collection of books. Track your reading journey with our modern library management system.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="gold" size="xl" className="gap-2" onClick={handleDemoLogin}>
                    <Zap className="h-5 w-5" />
                    Try Demo — Instant Access
                  </Button>
                  <Link to="/login">
                    <Button variant="outline" size="xl" className="gap-2">
                      <Search className="h-5 w-5" />
                      Browse Catalog
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-12 flex gap-8">
                  {[
                    { value: 12847, label: "Books", suffix: "" },
                    { value: 2847, label: "Members", suffix: "" },
                    { value: 98, label: "Satisfaction", suffix: "%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <p className="font-serif text-3xl font-bold">
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Floating Book Cards on the right */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative h-[500px]">
                {books.slice(0, 5).map((book, i) => (
                  <motion.div
                    key={book.id}
                    className="absolute rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      width: 160,
                      height: 220,
                      left: `${10 + i * 15}%`,
                      top: `${5 + (i % 3) * 25}%`,
                      zIndex: 5 - i,
                    }}
                    animate={{
                      y: [0, -15 - i * 3, 0],
                      rotate: [-2 + i, 2 + i, -2 + i],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-semibold text-white truncate">{book.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                Everything You Need
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Powerful features to manage your reading journey
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Library,
                title: "Vast Collection",
                description: "Access over 12,000 books across all genres, from classics to contemporary bestsellers.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Clock,
                title: "Due Date Tracking",
                description: "Never miss a return date with automatic reminders and easy renewal options.",
                color: "bg-warning/10 text-warning",
              },
              {
                icon: Search,
                title: "Smart Search",
                description: "Find exactly what you're looking for with advanced search and filtering options.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: Star,
                title: "Personalized Picks",
                description: "Get book recommendations based on your reading history and preferences.",
                color: "bg-success/10 text-success",
              },
              {
                icon: Globe,
                title: "Access Anywhere",
                description: "Browse and manage your library from any device with our responsive web platform.",
                color: "bg-destructive/10 text-destructive",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Your reading data is safe with enterprise-grade security and 99.9% uptime.",
                color: "bg-secondary text-secondary-foreground",
              },
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`inline-flex rounded-xl p-4 ${feature.color}`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section id="stats" className="relative overflow-hidden py-20 gradient-hero text-primary-foreground">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-foreground/5"
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 12847, label: "Books in Collection", icon: BookOpen },
              { value: 2847, label: "Active Members", icon: Users },
              { value: 36, label: "Genre Categories", icon: Library },
              { value: 1200, label: "Books Borrowed Monthly", icon: Heart },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <stat.icon className="mx-auto h-8 w-8 mb-3 opacity-70" />
                  <p className="font-serif text-4xl font-bold md:text-5xl">
                    <AnimatedCounter target={stat.value} duration={2500} />
                    {stat.value > 100 ? "+" : ""}
                  </p>
                  <p className="mt-2 text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="catalog" className="bg-muted/30 py-24">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold md:text-4xl">
                  Featured Books
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Discover our most popular titles from our collection of {books.length}+ books
                </p>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleDemoLogin}>
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section id="about" className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                Loved by Readers
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Join thousands who have transformed their reading habits with Libraria
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Student",
                quote: "Libraria has completely changed how I manage my reading. The due date tracking is a lifesaver!",
                rating: 5,
              },
              {
                name: "Marcus Williams",
                role: "Professor",
                quote: "The search capabilities are incredible. I can find any book in seconds. Best library system I've used.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Book Club Leader",
                quote: "My book club loves using Libraria. We can easily coordinate what we're reading and track our progress.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-border bg-card p-8 book-shadow"
                >
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl gradient-hero p-12 text-center text-primary-foreground md:p-20"
            >
              <div className="relative z-10">
                <h2 className="font-serif text-4xl font-bold md:text-5xl">
                  Ready to Start Reading?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                  Join thousands of readers who have discovered their next favorite book through Libraria.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button variant="gold" size="xl" className="gap-2" onClick={handleDemoLogin}>
                    <Zap className="h-5 w-5" />
                    Try Demo — Free Access
                  </Button>
                  <Link to="/login">
                    <Button variant="heroOutline" size="xl" className="gap-2">
                      Sign In
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
              
              {/* Animated decorative elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-4 w-4 rounded-full bg-primary-foreground/10"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
