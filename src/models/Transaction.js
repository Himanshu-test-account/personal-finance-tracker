// models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
}, {
  timestamps: true,
});

// Use mongoose.models to check if the model is already defined (for Next.js hot reloading)
export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);