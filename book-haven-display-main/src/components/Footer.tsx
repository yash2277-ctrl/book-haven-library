import { motion } from "framer-motion";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">Libraria</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your gateway to endless knowledge. Discover, borrow, and explore our vast collection of books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="transition-colors hover:text-foreground">Browse Catalog</Link></li>
              <li><Link to="/my-books" className="transition-colors hover:text-foreground">My Books</Link></li>
              <li><Link to="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Library Rules</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Membership</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold">Connect</h4>
            <div className="mt-4 flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Libraria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
