import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { BorrowedBookCard } from "@/components/BorrowedBookCard";
import { StatsSection } from "@/components/StatsSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useAuth } from "@/context/AuthContext";
import { useLibrary } from "@/context/LibraryContext";
import { books } from "@/lib/books-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user } = useAuth();
  const { borrowedBooks, borrowBook, returnBook, renewBook } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const featuredBooks = books.slice(0, 4);

  const handleBorrow = (book: typeof books[0]) => {
    const success = borrowBook(book);
    if (success) {
      toast.success(`"${book.title}" borrowed successfully! Due in 14 days.`);
    } else {
      toast.error("Could not borrow this book. You may have reached the limit or already borrowed it.");
    }
  };

  const handleReturn = (book: typeof borrowedBooks[0]) => {
    returnBook(book.id);
    toast.success(`"${book.title}" returned successfully!`);
  };

  const handleRenew = (book: typeof borrowedBooks[0]) => {
    renewBook(book.id);
    toast.success(`"${book.title}" renewed for 14 more days!`);
  };

  return (
    <Layout>
      {/* Welcome Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-secondary via-background to-secondary/50 py-12">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-warning/10 px-4 py-1.5 text-sm font-medium text-warning">
                <Sparkles className="h-4 w-4" />
                Welcome back!
              </div>
              <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
                Hello, {user?.name?.split(" ")[0]}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                You have <span className="font-semibold text-warning">{borrowedBooks.length} books</span> borrowed.
                Let's explore your reading journey.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for books, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 rounded-2xl border-2 bg-background pl-12 pr-4 text-lg shadow-lg transition-shadow focus:shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warning/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* My Borrowed Books */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">
                    My Borrowed Books
                  </h2>
                </div>
                <p className="mt-1 text-muted-foreground">
                  Track your borrowed books and due dates
                </p>
              </div>
              <Link to="/my-books">
                <Button variant="ghost" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {borrowedBooks.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {borrowedBooks.slice(0, 3).map((book, index) => (
                <BorrowedBookCard
                  key={book.id}
                  book={book}
                  index={index}
                  onReturn={handleReturn}
                  onRenew={handleRenew}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 rounded-2xl border-2 border-dashed border-border p-12 text-center"
            >
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-serif text-xl font-semibold">No books borrowed yet</h3>
              <p className="mt-2 text-muted-foreground">Head to the catalog to borrow your first book!</p>
              <Link to="/catalog">
                <Button variant="hero" className="mt-4 gap-2">
                  Browse Catalog
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">
                    Featured Books
                  </h2>
                </div>
                <p className="mt-1 text-muted-foreground">
                  Discover our top picks and trending titles
                </p>
              </div>
              <Link to="/catalog">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} onBorrow={handleBorrow} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-center font-serif text-2xl font-bold md:text-3xl">
              Quick Actions
            </h2>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Browse Catalog",
                description: "Explore our collection",
                href: "/catalog",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Clock,
                title: "My Books",
                description: "View borrowed books",
                href: "/my-books",
                color: "bg-warning/10 text-warning",
              },
              {
                icon: Search,
                title: "Search",
                description: "Find specific titles",
                href: "/catalog",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: TrendingUp,
                title: "Recommendations",
                description: "Personalized picks",
                href: "/catalog",
                color: "bg-success/10 text-success",
              },
            ].map((action, index) => (
              <ScrollReveal key={action.title} delay={index * 0.1}>
                <Link to={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`inline-flex rounded-xl p-3 ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Go to {action.title}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
