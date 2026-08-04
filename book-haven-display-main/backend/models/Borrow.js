import mongoose from 'mongoose';
import { addDays, isPast } from 'date-fns';

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
    default: function() {
      return addDays(new Date(), 14); // 14 days from now
    }
  },
  returnedDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'returned', 'overdue', 'renewed'],
    default: 'active'
  },
  renewalCount: {
    type: Number,
    default: 0,
    max: [2, 'Maximum 2 renewals allowed']
  },
  fine: {
    type: Number,
    default: 0,
    min: [0, 'Fine cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property to check if overdue
borrowSchema.virtual('isOverdue').get(function() {
  if (this.status === 'returned') return false;
  return isPast(new Date(this.dueDate));
});

// Virtual property for days until due
borrowSchema.virtual('daysUntilDue').get(function() {
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Middleware to update book availability when borrowing
borrowSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Book = mongoose.model('Book');
    await Book.findByIdAndUpdate(
      this.book,
      { $inc: { availableCopies: -1 } }
    );
  }
  next();
});

// Static method to return a book
borrowSchema.statics.returnBook = async function(borrowId) {
  const borrow = await this.findById(borrowId);
  if (!borrow) {
    throw new Error('Borrow record not found');
  }
  
  if (borrow.status === 'returned') {
    throw new Error('Book already returned');
  }
  
  borrow.returnedDate = new Date();
  borrow.status = 'returned';
  
  // Calculate fine if overdue
  if (borrow.isOverdue) {
    const daysOverdue = Math.abs(borrow.daysUntilDue);
    borrow.fine = daysOverdue * 1; // $1 per day
  }
  
  await borrow.save();
  
  // Increment available copies
  const Book = mongoose.model('Book');
  await Book.findByIdAndUpdate(
    borrow.book,
    { $inc: { availableCopies: 1 } }
  );
  
  // Update user's books read count
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(
    borrow.user,
    { $inc: { booksRead: 1 } }
  );
  
  return borrow;
};

// Static method to renew a book
borrowSchema.statics.renewBook = async function(borrowId) {
  const borrow = await this.findById(borrowId);
  if (!borrow) {
    throw new Error('Borrow record not found');
  }
  
  if (borrow.status === 'returned') {
    throw new Error('Cannot renew a returned book');
  }
  
  if (borrow.renewalCount >= 2) {
    throw new Error('Maximum renewal limit reached');
  }
  
  borrow.dueDate = addDays(new Date(borrow.dueDate), 14);
  borrow.renewalCount += 1;
  borrow.status = 'renewed';
  
  await borrow.save();
  return borrow;
};

// Index for query optimization
borrowSchema.index({ user: 1, status: 1 });
borrowSchema.index({ book: 1, status: 1 });
borrowSchema.index({ dueDate: 1 });

const Borrow = mongoose.model('Borrow', borrowSchema);

export default Borrow;
