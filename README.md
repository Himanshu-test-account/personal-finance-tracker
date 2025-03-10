This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Personal Finance Tracker

A simple web application for tracking personal finances built with Next.js, React, shadcn/ui, and MongoDB.

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

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variable for MongoDB connection
4. Deploy

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

## License

MIT