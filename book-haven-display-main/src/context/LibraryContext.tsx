import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Book, BorrowedBook, defaultBorrowedBooks, books as allBooks } from "@/lib/books-data";
import { format, addDays } from "date-fns";

interface LibraryContextType {
  borrowedBooks: BorrowedBook[];
  borrowBook: (book: Book) => boolean;
  returnBook: (bookId: string) => void;
  renewBook: (bookId: string) => void;
  isBookBorrowed: (bookId: string) => boolean;
  booksRead: number;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>(defaultBorrowedBooks);
  const [booksRead, setBooksRead] = useState(47);

  const isBookBorrowed = useCallback(
    (bookId: string) => borrowedBooks.some((b) => b.id === bookId),
    [borrowedBooks]
  );

  const borrowBook = useCallback(
    (book: Book): boolean => {
      if (isBookBorrowed(book.id)) return false;
      if (!book.available) return false;
      if (borrowedBooks.length >= 5) return false;

      const today = new Date();
      const due = addDays(today, 14);

      const borrowed: BorrowedBook = {
        ...book,
        borrowedDate: format(today, "yyyy-MM-dd"),
        dueDate: format(due, "yyyy-MM-dd"),
        isOverdue: false,
      };

      setBorrowedBooks((prev) => [...prev, borrowed]);
      return true;
    },
    [borrowedBooks, isBookBorrowed]
  );

  const returnBook = useCallback(
    (bookId: string) => {
      setBorrowedBooks((prev) => prev.filter((b) => b.id !== bookId));
      setBooksRead((prev) => prev + 1);
    },
    []
  );

  const renewBook = useCallback(
    (bookId: string) => {
      setBorrowedBooks((prev) =>
        prev.map((b) => {
          if (b.id !== bookId) return b;
          const newDue = addDays(new Date(), 14);
          return {
            ...b,
            dueDate: format(newDue, "yyyy-MM-dd"),
            isOverdue: false,
          };
        })
      );
    },
    []
  );

  return (
    <LibraryContext.Provider
      value={{
        borrowedBooks,
        borrowBook,
        returnBook,
        renewBook,
        isBookBorrowed,
        booksRead,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
