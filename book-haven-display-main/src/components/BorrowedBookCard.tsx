import { motion } from "framer-motion";
import { BorrowedBook } from "@/lib/books-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, RotateCcw } from "lucide-react";
import { differenceInDays, parseISO, format } from "date-fns";

interface BorrowedBookCardProps {
  book: BorrowedBook;
  index?: number;
  onReturn?: (book: BorrowedBook) => void;
  onRenew?: (book: BorrowedBook) => void;
}

export function BorrowedBookCard({ book, index = 0, onReturn, onRenew }: BorrowedBookCardProps) {
  const today = new Date();
  const dueDate = parseISO(book.dueDate);
  const daysLeft = differenceInDays(dueDate, today);
  const isOverdue = daysLeft < 0;
  const isDueSoon = daysLeft >= 0 && daysLeft <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className={`flex gap-4 rounded-xl border-2 bg-card p-4 transition-all duration-300 hover:shadow-lg ${
        isOverdue ? "border-destructive/50" : isDueSoon ? "border-warning/50" : "border-border"
      }`}>
        {/* Book Cover Thumbnail */}
        <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg font-semibold leading-tight">
                  {book.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  by {book.author}
                </p>
              </div>
              <Badge
                variant={isOverdue ? "destructive" : isDueSoon ? "outline" : "secondary"}
                className={isDueSoon && !isOverdue ? "border-warning text-warning" : ""}
              >
                {isOverdue ? (
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {Math.abs(daysLeft)} days overdue
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {daysLeft} days left
                  </span>
                )}
              </Badge>
            </div>
            
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Borrowed: {format(parseISO(book.borrowedDate), "MMM d, yyyy")}</span>
              <span className={isOverdue ? "text-destructive font-medium" : isDueSoon ? "text-warning font-medium" : ""}>
                Due: {format(dueDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onRenew?.(book)}
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5" />
              Renew
            </Button>
            <Button
              variant={isOverdue ? "destructive" : "default"}
              size="sm"
              className="flex-1"
              onClick={() => onReturn?.(book)}
            >
              Return Book
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
