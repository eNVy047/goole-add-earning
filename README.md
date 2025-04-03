# Ad Revenue Platform

A Next.js application that allows users to watch ads and earn money through Google AdSense, with PayPal withdrawal functionality.

## Features

- User authentication with Clerk
- Google AdSense integration
- PayPal withdrawal system
- Real-time earnings tracking
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- Clerk account
- Google AdSense account
- PayPal Business account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ad-revenue-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your credentials:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=your_google_adsense_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Started

1. Sign up for a Clerk account and get your API keys
2. Set up a Google AdSense account and get your publisher ID
3. Create a PayPal Business account and get your client ID
4. Add your credentials to the `.env.local` file
5. Start the development server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 