# Budget Planner App

A comprehensive personal finance management application built with Next.js, MongoDB, and modern web technologies.

## Features

- **Income Tracking**: Record and categorize your income sources
- **Expense Management**: Track expenses with detailed categorization
- **Investment Portfolio**: Monitor your investments and returns
- **Financial Goals**: Set and track progress toward financial objectives
- **Dashboard Analytics**: Visual charts and summaries of your financial data
- **Monthly Reports**: Detailed financial reports and trends
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd v0-budget-planner-app-main
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: A secure random string for NextAuth
- `NEXT_PUBLIC_APP_URL`: Your public app URL

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── expenses/          # Expenses management
│   ├── income/            # Income tracking
│   ├── investments/       # Investment portfolio
│   ├── goals/             # Financial goals
│   └── reports/           # Financial reports
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── models/                # MongoDB/Mongoose models
├── public/                # Static assets
└── styles/                # Global styles
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET/POST /api/income` - Income management
- `GET/POST /api/expenses` - Expense management
- `GET/POST /api/investments` - Investment tracking
- `GET/POST /api/goals` - Financial goals
- `GET /api/summary/monthly` - Monthly financial summary

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
