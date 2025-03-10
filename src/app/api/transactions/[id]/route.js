// app/api/transactions/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

// GET transaction by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}

// PUT update transaction
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    await connectDB();
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        amount: body.amount,
        date: body.date,
        description: body.description
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

// DELETE transaction
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectDB();
    
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    
    if (!deletedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}