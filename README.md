# 🚚 Arrivio: Enterprise Logistics Optimization Platform

**Arrivio** is an enterprise-grade logistics optimization platform designed to eliminate failed deliveries, maximize first-time delivery rates, and orchestrate real-time communications between logistics managers, delivery couriers, and end-customers.

By allowing users to register a **Global Weekly Availability Matrix** and alternative delivery fail-safes, Arrivio aligns carrier delivery routes with actual customer home presence, saving fuel, reducing emissions, and ensuring high delivery success.

---

## 🎯 Key Value Propositions

- **Global Availability Syncing**: Instead of scheduling single deliveries, customers submit a weekly availability profile stored globally to optimize all future *pedidos*.
- **Interactive Simulator**: Switch instantly between the Manager, Courier, and Customer portals to test real-time feedback loops.
- **Fail-Safe Orchestration**: Configurable alternative instructions (deliver to a trusted neighbor, drop at SEUR lockers, or safe-place instructions) in case the customer is absent.
- **Dynamic Routing**: Couriers receive instant route re-sequencing as customers update their preferences.

---

## 🚀 Product Evolution Phases (Interactive Tour)

Arrivio is presented via an interactive showcase detailing the three stages of product maturity:

### 1. Proof of Concept (POC)
* **Goal**: Validate the core value proposition with minimal logistics friction.
* **Scope**: Simple text alerts, simulated status updates, and a lightweight customer availability confirmation.

### 2. Minimum Viable Product (MVP)
* **Goal**: Deliver a functional, interactive, and high-fidelity simulator.
* **Scope**: 
  - Simulated smartphone frame hosting an interactive customer flow.
  - **Global Weekly Availability Matrix** calendar with multi-slot toggle.
  - **Fail-safe Delivery Preferences** card supporting standard retry, neighbor routing, local SEUR point pick-ups, and safe place notes.
  - Auto-scrolling, mobile-responsive layout designed to work perfectly inside virtual simulators.

### 3. Full / Scale System
* **Goal**: Enterprise dashboarding with full telemetry.
* **Scope**: Advanced fleet dispatch ledger, multi-vehicle sequence graphs, bulk optimization panels, and integrated performance metrics.

---

## 👥 Simulated Roles & Workflows

### 🏢 1. Logistics Admin Portal (Manager)
* **Dashboard Ledger**: Live overview of fleet capacity, delivery success metrics, and live alerts.
* **Bulk Plan Coordinator**: Orchestrates carrier routes and assigns packages based on synchronized availability matrices.
* **AI Metrics Charts**: Beautifully rendered Recharts visualizers showcasing performance and delivery success optimization.

### 🚛 2. On-Duty Delivery Courier (Driver)
* **Mobile Van Telemetry**: A responsive mobile-view list of upcoming delivery stops.
* **Live Route Sequence Re-Sorting**: As soon as a customer changes their matrix preferences, the courier's route re-orders in real-time to prioritize high-compatibility slots.

### 📱 3. End-Customer Portal (SMS-Sync)
* **SMS Tracking Alerts**: Prompts the user with text alerts when their shipment is active, inviting them to register their availability.
* **Global Weekly Availability Matrix**: A beautifully crafted grid representing calendar slots.
* **Alternative Delivery Preferences**:
  - *👥 Neighbor delivery* with explicit Name and Flat/Apartment inputs.
  - *📦 SEUR Pickup Lockers* with a curated local address picker.
  - *🏡 Safe Place* with custom instructions text area.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System**: [Vite](https://vitejs.dev/) (with fast compilation)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for fully responsive fluid components
* **Animations**: [Motion](https://motion.dev/) (imported from `motion/react`) for smooth interface transitions and step toggles
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Data Visualization**: [Recharts](https://recharts.org/) for analytics charts

---

## 📁 Directory Structure

```bash
/src
  ├── components/
  │   ├── customer/            # Customer Portal views & phone simulators
  │   │   ├── poc/             # POC Customer Portal
  │   │   ├── mvp/             # MVP Customer Portal with Global Matrix & alternative prefs
  │   │   ├── full/            # Full-Scale Customer Portal
  │   │   └── CustomerSimulator.tsx # Top-level Customer phone simulator wrapper
  │   ├── driver/              # Driver App interfaces (POC, MVP, Full)
  │   ├── manager/             # Logistics Manager dashboards, dispatchers & sidebars
  │   └── ...
  ├── lib/
  │   └── utils.ts             # Conditional className merger (clsx + tailwind-merge)
  ├── types.ts                 # Shared Type declarations
  ├── App.tsx                  # Main entry point managing active roles and phases
  └── main.tsx                 # Core application mounting
```

---

## 💻 Local Development

### Prerequisites
Make sure you have Node.js installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will boot up at `http://localhost:3000`.

### 3. Production Build
To package the app for production:
```bash
npm run build
```
The output assets will be generated in the `dist/` directory.

### 4. Code Quality & Linting
Verify TypeScript compilation and code standards:
```bash
npm run lint
```
