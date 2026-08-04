import { motion } from "framer-motion";
import { libraryStats } from "@/lib/books-data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookOpen, Users, Clock, AlertCircle, Library } from "lucide-react";

const stats = [
  {
    label: "Total Books",
    value: libraryStats.totalBooks.toLocaleString(),
    icon: Library,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Available",
    value: libraryStats.availableBooks.toLocaleString(),
    icon: BookOpen,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Borrowed",
    value: libraryStats.borrowedBooks.toLocaleString(),
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Active Members",
    value: libraryStats.activeMembers.toLocaleString(),
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Overdue",
    value: libraryStats.overdueBooks.toLocaleString(),
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export function StatsSection() {
  return (
    <section className="py-16">
      <div className="container">
        <ScrollReveal>
          <h2 className="text-center font-serif text-3xl font-bold md:text-4xl">
            Library at a Glance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Real-time statistics of our growing collection and community
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-card p-6 book-shadow transition-all duration-300"
              >
                <div className={`inline-flex rounded-xl ${stat.bgColor} p-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="mt-4 font-serif text-3xl font-bold"
                >
                  {stat.value}
                </motion.p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                
                {/* Decorative gradient */}
                <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${stat.bgColor} opacity-50 blur-2xl transition-opacity group-hover:opacity-80`} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
