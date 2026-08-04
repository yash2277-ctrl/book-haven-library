import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  cover: {
    type: String,
    default: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre'],
    enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography', 'History', 'Self-Help', 'Fantasy', 'Poetry', 'Contemporary', 'Historical Fiction']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  isbn: {
    type: String,
    required: [true, 'Please provide ISBN'],
    unique: true,
    trim: true
  },
  publishedYear: {
    type: Number,
    required: [true, 'Please provide published year'],
    min: [1000, 'Year must be valid'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  pages: {
    type: Number,
    required: [true, 'Please provide number of pages'],
    min: [1, 'Pages must be at least 1']
  },
  totalCopies: {
    type: Number,
    required: [true, 'Please provide total copies'],
    min: [1, 'Total copies must be at least 1'],
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, 'Available copies cannot be negative'],
    default: 1
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['available', 'issued', 'out of stock'],
    default: function() {
      return this.availableCopies > 0 ? 'available' : 'out of stock';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for availability
bookSchema.virtual('available').get(function() {
  return this.availableCopies > 0;
});

// Index for search optimization
bookSchema.index({ title: 'text', author: 'text', isbn: 1, genre: 1 });

// Pre-save hook to update status based on availability
bookSchema.pre('save', function(next) {
  if (this.availableCopies > 0) {
    this.status = 'available';
  } else if (this.totalCopies > 0 && this.availableCopies === 0) {
    this.status = 'issued';
  } else {
    this.status = 'out of stock';
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
