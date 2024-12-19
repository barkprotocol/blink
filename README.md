# BARK Initial Wallet Offering (IWO) Interface - Technical Documentation

## Table of Contents

1. [Introduction](#introduction)  
2. [System Architecture](#system-architecture)  
3. [Key Components](#key-components)  
4. [Core Functionalities](#core-functionalities)  
5. [Data Flow](#data-flow)  
6. [Security Measures](#security-measures)  
7. [Integration Points](#integration-points)  
8. [Deployment](#deployment)  
9. [Future Enhancements](#future-enhancements)  

---

## 1. Introduction

The **BARK Initial Wallet Offering (IWO) Interface** is a web-based application designed to provide a seamless and transparent experience for participants in the BARK token sales. With features like real-time statistics, secure bid submission, and dynamic bid weight calculations, the platform ensures a user-friendly and blockchain-integrated process.

---

## 2. System Architecture

The IWO Interface is built on a modern, scalable architecture:

- **Frontend**: React 19 with Next.js 15 (App Router)
- **UI Components**: Shadcn/ui
- **State Management**: React Hooks (useState, useEffect)
- **Blockchain Interaction**: Solana Web3.js
- **Styling**: Tailwind CSS with custom color scheme
- **Charts**: Recharts library

---

## 3. Key Components

### 3.1 **IWO Interface**
The main component that orchestrates the entire IWO process.

### 3.2 **IWO Dashboard**
Centralized hub for real-time statistics, token allocation progress, and remaining time in the offering.

### 3.3 **Bid Simulator**
Interactive tool that allows users to test bid amounts and vesting periods, previewing potential weight calculations.

### 3.4 **Leaderboard**
Dynamic list of top participants ranked by their bid weights, updated in real-time.

### 3.5 **Governance Analytics**
Real-time BARK Protocol Governance data from Solana Realms

### 3.6 **Token Chart**
Historical BARK token price visualizations for trend tracking and insights.

---

## 4. Core Functionalities

### 4.1 **Bid Submission Workflow**
- Users connect their Solana wallets via WalletConnect.
- Input bid amount and choose a vesting period.
- Weight calculations displayed dynamically for transparency.
- Transactions signed and submitted to the Solana blockchain.

### 4.2 **Bid Weight Calculation**
Bid weight is determined by the formula:  
**`weight = bid_amount * vesting_multiplier`**  
- **Vesting Multiplier**: Incentivizes longer vesting periods.

### 4.3 **Real-Time Updates**
- Token pool allocation.  
- Remaining time for IWO.  
- Leaderboard and bid statistics.  

### 4.4 **Token Allocation**
Tokens are allocated at the end of the offering based on bid weight and locked in a vesting schedule.

---

## 5. Data Flow

1. **Frontend Interaction**: Users input bid details through the UI.  
2. **Simulation**: Client-side bid weight calculation for immediate feedback.  
3. **Blockchain Submission**: Signed transaction data sent to Solana smart contracts.  
4. **Backend Processing**: Validates and updates the state.  
5. **Frontend Updates**: Data fetched from the blockchain for real-time visualization.  

---

## 6. Security Measures

- **Wallet Integration**: Secure connections using WalletConnect and Solana-compatible wallets.  
- **Two-Factor Authentication (2FA)**: Enhances bid submission security.  
- **Transaction Validation**: Backend verifies all transactions before submission.  
- **Rate Limiting**: Prevents spamming and abuse.  
- **Data Encryption**: Protects sensitive user data during transit.  

---

## 7. Integration Points

### 7.1 **Solana Blockchain**
- Fetches current token pool statistics and allocation status.  
- Submits bids and locks tokens in vesting contracts.  

### 7.2 **Analytics and Monitoring**
- Tracks historical price trends and token allocation data.  
- Implements error tracking for smooth user experience.  

---

## 8. Deployment

### Prerequisites
- **Node.js**: v14 or later  
- **Package Manager**: Yarn or pnpm  
- **Solana Wallet**: Phantom, Backpack, or Solflare  

### Steps to Deploy

1. Clone the repository:  
   ```bash
   git clone https://github.com/bark-protocol/iwo-platform.git
   cd iwo-platform
   ```

2. Install dependencies:  
   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Configure the environment:  
   Create a `.env.local` file and add:

   ```dotenv
   NEXT_PUBLIC_SOLANA_NETWORK=devnet  
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com  
   NEXT_PUBLIC_BARK_API_URL=https://api.token.barkprotocol.net  
   NEXT_PUBLIC_WALLETCONNECT_BRIDGE=https://bridge.walletconnect.org  
   NEXT_PUBLIC_TOKEN_PROGRAM_ID=TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx  
   NEXT_PUBLIC_IWO_CONTRACT_ADDRESS=  
   JWT_SECRET=your-jwt-secret  
   SECRET_KEY=your-secret-key  
   NEXT_PUBLIC_ANALYTICS_SERVICE_URL=https://analytics.barkprotocol.net  
   NEXT_PUBLIC_ERROR_TRACKING_SERVICE_URL=https://errors.barkprotocol.net  
   ```

4. Start the development server:  
   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

5. Run database configuration:  
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Open the app in your browser: [http://localhost:3000](http://localhost:3000)

---

## 9. Future Enhancements

1. **Enhanced Analytics**: Introduce predictive models for bid outcomes.  
2. **KYC/AML Integration**: Automated compliance checks.  
3. **Multi-Chain Compatibility**: Expand support to Ethereum and Binance Smart Chain.  
4. **Mobile Optimization**: Ensure smooth cross-device functionality.  
5. **Gamified Experience**: Introduce rewards and achievements for top bidders.  
6. **User Dashboard**: Comprehensive tracking of token holdings and vesting schedules.  
7. **Governance Integration**: Enable token holders to participate in decision-making.  

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.