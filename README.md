

# Personal Finance Tracker

A simple web application for tracking personal finances built with **Next.js**, **React**, **shadcn/ui**, and **MongoDB**.

## Features

### Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart
- Basic form validation

## Tech Stack

- **Frontend**: Next.js, React, shadcn/ui components
- **Charts**: Recharts
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application can be easily deployed on Vercel:

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the environment variable for MongoDB connection.
4. Deploy.

## Project Structure

```
.
├── app/
│   ├── api/                # API routes
│   │   └── transactions/   # Transaction CRUD endpoints
│   ├── layout.js           # Root layout component
│   └── page.js             # Main dashboard page
├── components/
│   ├── ExpensesChart.jsx   # Monthly expenses chart
│   ├── ThemeProvider.jsx   # Theme context provider
│   ├── TransactionForm.jsx # Form for adding/editing transactions
│   └── TransactionList.jsx # Table view of transactions
├── lib/
│   └── mongodb.js          # MongoDB connection utility
├── models/
│   └── Transaction.js      # Transaction data model
└── public/
    └── ...                 # Static assets
```

---

