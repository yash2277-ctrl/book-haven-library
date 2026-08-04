import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { BorrowedBookCard } from "@/components/BorrowedBookCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useAuth } from "@/context/AuthContext";
import { useLibrary } from "@/context/LibraryContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Trophy,
} from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function MyBooksPage() {
  const { user } = useAuth();
  const { borrowedBooks, returnBook, renewBook, booksRead } = useLibrary();

  const overdueBooks = borrowedBooks.filter((book) => {
    const dueDate = parseISO(book.dueDate);
    return differenceInDays(dueDate, new Date()) < 0;
  });

  const dueSoonBooks = borrowedBooks.filter((book) => {
    const dueDate = parseISO(book.dueDate);
    const daysLeft = differenceInDays(dueDate, new Date());
    return daysLeft >= 0 && daysLeft <= 3;
  });

  const handleReturn = (book: typeof borrowedBooks[0]) => {
    returnBook(book.id);
    toast.success(`"${book.title}" returned successfully!`);
  };

  const handleRenew = (book: typeof borrowedBooks[0]) => {
    renewBook(book.id);
    toast.success(`"${book.title}" renewed for 14 more days!`);
  };

  // Reading goal progress
  const readingGoal = 50;
  const progressPercentage = (booksRead / readingGoal) * 100;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-warning/5 via-background to-secondary py-12">
        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                    <BookOpen className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h1 className="font-serif text-3xl font-bold md:text-4xl">
                      My Books
                    </h1>
                    <p className="text-muted-foreground">
                      Track your borrowed books and reading progress
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {borrowedBooks.length} Currently Borrowed
                  </Badge>
                  {overdueBooks.length > 0 && (
                    <Badge variant="destructive" className="px-4 py-2 text-sm">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      {overdueBooks.length} Overdue
                    </Badge>
                  )}
                  {dueSoonBooks.length > 0 && (
                    <Badge variant="outline" className="border-warning px-4 py-2 text-sm text-warning">
                      <Clock className="mr-2 h-4 w-4" />
                      {dueSoonBooks.length} Due Soon
                    </Badge>
                  )}
                </div>
              </div>

              {/* Reading Goal Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 book-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <Trophy className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold">
                      Reading Goal 2024
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booksRead} of {readingGoal} books
                    </p>
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4 h-3" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {readingGoal - booksRead} books to go! You're doing great! 🎉
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warning/10 blur-3xl" />
      </section>

      {/* Borrowed Books List */}
      <section className="py-12">
        <div className="container">
          {borrowedBooks.length > 0 ? (
            <>
              {/* Overdue Section */}
              {overdueBooks.length > 0 && (
                <div className="mb-8">
                  <ScrollReveal>
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      <h2 className="font-serif text-xl font-bold">
                        Overdue Books
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Please return these books as soon as possible
                    </p>
                  </ScrollReveal>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {overdueBooks.map((book, index) => (
                      <BorrowedBookCard
                        key={book.id}
                        book={book}
                        index={index}
                        onReturn={handleReturn}
                        onRenew={handleRenew}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Due Soon Section */}
              {dueSoonBooks.length > 0 && (
                <div className="mb-8">
                  <ScrollReveal>
                    <div className="flex items-center gap-2 text-warning">
                      <Clock className="h-5 w-5" />
                      <h2 className="font-serif text-xl font-bold">Due Soon</h2>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      These books are due within 3 days
                    </p>
                  </ScrollReveal>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dueSoonBooks.map((book, index) => (
                      <BorrowedBookCard
                        key={book.id}
                        book={book}
                        index={index}
                        onReturn={handleReturn}
                        onRenew={handleRenew}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Borrowed Books */}
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <h2 className="font-serif text-xl font-bold">
                      All Borrowed Books
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete list of your currently borrowed books
                  </p>
                </ScrollReveal>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {borrowedBooks.map((book, index) => (
                    <BorrowedBookCard
                      key={book.id}
                      book={book}
                      index={index}
                      onReturn={handleReturn}
                      onRenew={handleRenew}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold">
                No borrowed books
              </h3>
              <p className="mt-2 text-muted-foreground">
                Start exploring our catalog and borrow your first book!
              </p>
              <Link to="/catalog">
                <Button variant="hero" className="mt-6">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Catalog
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Reading History Summary */}
          <ScrollReveal>
            <div className="mt-16 rounded-2xl border border-border bg-gradient-to-r from-card to-muted/30 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold">
                    Your Reading Journey
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Member since {user?.memberSince || "January 2023"}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-primary">
                      {booksRead}
                    </p>
                    <p className="text-sm text-muted-foreground">Books Read</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-warning">
                      {borrowedBooks.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Currently Borrowed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-success">
                      12
                    </p>
                    <p className="text-sm text-muted-foreground">On Wishlist</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
