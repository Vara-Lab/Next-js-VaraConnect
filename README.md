# Nextwith VaraConnect

## Getting Started

First, run the development server:
 
```bash
npm install
npm run dev
```
## Environment Configuration

VaraConnect uses environment variables for configuration. These variables can be defined in a .env file at the root of your project.

Example .env file (cross-framework support)

```jsx
# For Vite
VITE_PROJECT_ID=your_walletconnect_project_id
VITE_NODE_ADDRESS=wss://rpc.vara.network  # or wss://testnet.vara.network
VITE_NETWORK=mainnet  # or testnet

# For Next.js
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_NODE_ADDRESS=wss://rpc.vara.network # or wss://testnet.vara.network
NEXT_PUBLIC_NETWORK=mainnet  # or testnet

# For Astro / Remix (SPA usage with frontend access)
PROJECT_ID=your_walletconnect_project_id
NODE_ADDRESS=wss://rpc.vara.network # or wss://testnet.vara.network
NETWORK=mainnet # or testnet
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
