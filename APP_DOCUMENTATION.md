# LV Connect - Application Documentation

## 1. Project Overview

**LV Connect** is a Next.js-based client management and strategy generation platform designed for digital marketing agencies. It bridges the gap between manual data tracking and actionable strategic insights by providing:

*   **Real-time Dashboards**: Visualizing funnel performance.
*   **AI-Powered Strategy**: Generating custom implementation plans using LLMs (Llama 3.1 via Hugging Face).
*   **Centralized Client Data**: A unified "Client Snapshot" containing deep context, ICP details, and tone of voice.
*   **Agency Operations**: Internal tools for tracking and reporting.

---

## 2. Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/) components.
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI Integration**: [Hugging Face Inference SDK](https://huggingface.co/docs/huggingface.js/inference/README) (using `meta-llama/Llama-3.1-8B-Instruct`)
*   **Charts**: [Recharts](https://recharts.org/) (implied for dashboard visualizations)
*   **Document Generation**: `docx` and `file-saver` (for exporting reports)
*   **Validation**: `zod` and `react-hook-form`

---

## 3. Getting Started

### Prerequisites

*   Node.js 18+ installed.
*   A Hugging Face API Key (for AI features).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd client-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your API credentials:
    ```env
    HUGGINGFACE_API_KEY=hf_your_api_key_here
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

---

## 4. Project Structure

```
client-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── actions/         # Server Actions (AI generation, etc.)
│   │   ├── dashboard/       # Client Dashboard page
│   │   ├── internal/        # Agency Admin pages
│   │   ├── snapshot/        # Client Profile & Strategy views
│   │   ├── layout.tsx       # Root layout with Sidebar and ThemeProvider
│   │   └── page.tsx         # Landing/Login page
│   ├── components/
│   │   ├── dashboard/       # Dashboard specific components (Charts, Simulator)
│   │   ├── layout/          # Sidebar, Header
│   │   ├── snapshot/        # Strategy history, Profile detail views
│   │   └── ui/              # Reusable Shadcn UI components
│   └── lib/
│       ├── types.ts         # TypeScript interfaces (ClientProfile, StrategyData)
│       └── utils.ts         # Helper functions (cn, etc.)
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

---

## 5. Core Features & Architecture

### A. Client Dashboard (`/dashboard`)
*   **Purpose**: The "money screen" for clients.
*   **Features**:
    *   Visualizes key funnel metrics (Story Views, Downloads, VSL Views, Bookings).
    *   Highlights bottlenecks (e.g., specific drop-off points).
    *   Includes a **Sales Simulator** to project revenue based on hypothetical improvements.

### B. Client Snapshot (`/snapshot`)
*   **Purpose**: A single source of truth for client context.
*   **Data Points**:
    *   **Funnel Data**: Quantitative metrics.
    *   **Onboarding Data**: Qualitative data including Tone of Voice, ICP (Ideal Customer Profile), Company Goals, and Pain Points.
    *   **Architecture**: Uses the `ClientProfile` interface defined in `src/lib/types.ts`.

### C. AI Strategy Generator (`src/app/actions/generate-strategy.ts`)
*   **Functionality**: Generates detailed 2-phase implementation plans.
*   **Input**: Takes the full `ClientProfile` + optional user "Focus" or "Notes".
*   **Process**:
    1.  Constructs a rich prompt containing client context (Industry, Bottleneck, ICP, Goals).
    2.  Sends request to Hugging Face Inference API (`meta-llama/Llama-3.1-8B-Instruct`).
    3.  Returns a structured JSON response (`StrategyData`) containing:
        *   Title & Executive Summary
        *   Strategic Reasoning (Why Now, Expected Impact)
        *   Phased Implementation Steps
*   **Usage**: Accessible via the "Generate Strategy" button in the Strategy Workstation.

### D. Agency Admin (`/internal`)
*   **Purpose**: Operational backbone for the agency.
*   **Sections**:
    *   **Tracking**: Weekly performance inputs.
    *   **Automation**: Workflow management.
    *   **Reports**: Generate download DOCX reports for clients.

---

## 6. Key Data Models

### ClientProfile
The core object powering the application.
```typescript
interface ClientProfile {
    name: string;
    industry: string;
    offer: string;
    funnelData: EcomFunnelData; // Numeric metrics
    onboardingData: OnboardingData; // Deep context (Rich text)
    currrentBottleneck: string;
    // ...other fields
}
```

### StrategyData
The structure of AI-generated responses.
```typescript
interface StrategyData {
    title: string;
    executiveSummary: string;
    strategicReasoning: {
        whyNow: string;
        expectedImpact: string[];
    };
    phases: Array<{
        title: string;
        items: string[];
    }>;
}
```

---

## 7. Future Roadmap

*   **Integration**: Direct connection to CRM/Ad Platforms for live data.
*   **Multi-Model Support**: Option to switch between Llama 3, GPT-4, or Claude.
*   **User Auth**: Full authentication system with role-based access control (Client vs. Admin).
