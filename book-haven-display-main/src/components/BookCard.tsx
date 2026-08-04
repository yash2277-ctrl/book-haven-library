import { motion } from "framer-motion";
import { Book } from "@/lib/books-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Calendar, CheckCircle } from "lucide-react";
import { useLibrary } from "@/context/LibraryContext";

interface BookCardProps {
  book: Book;
  index?: number;
  onBorrow?: (book: Book) => void;
}

export function BookCard({ book, index = 0, onBorrow }: BookCardProps) {
  let isBorrowed = false;
  try {
    const { isBookBorrowed } = useLibrary();
    isBorrowed = isBookBorrowed(book.id);
  } catch {
    // Not within LibraryProvider (e.g., landing page)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl bg-card book-shadow transition-all duration-300 group-hover:book-shadow-hover">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Availability Badge */}
          <div className="absolute left-3 top-3">
            {isBorrowed ? (
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle className="mr-1 h-3 w-3" />
                Borrowed
              </Badge>
            ) : (
              <Badge
                variant={book.available ? "default" : "destructive"}
                className={book.available ? "bg-success text-success-foreground" : ""}
              >
                {book.available ? `${book.availableCopies} Available` : "Unavailable"}
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-sm font-medium backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {book.rating}
          </div>

          {/* Quick Actions - Visible on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {isBorrowed ? (
              <Button variant="secondary" className="w-full" disabled>
                <CheckCircle className="mr-2 h-4 w-4" />
                Already Borrowed
              </Button>
            ) : (
              <Button
                variant={book.available ? "gold" : "secondary"}
                className="w-full"
                disabled={!book.available}
                onClick={() => onBorrow?.(book)}
              >
                {book.available ? "Borrow Now" : "Join Waitlist"}
              </Button>
            )}
          </motion.div>
        </div>

        {/* Book Info */}
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {book.genre}
          </p>
          <h3 className="mt-1 font-serif text-lg font-semibold leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            by {book.author}
          </p>
          
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {book.pages} pages
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {book.publishedYear > 0 ? book.publishedYear : `${Math.abs(book.publishedYear)} BC`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
