'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link2, Lock, AlertCircle, LayoutDashboard, Webhook, FileCode, Asterisk, Check, Mail, Bell, RotateCcw, Sun, Moon } from 'lucide-react';


// --- Header Component (from src/components/Header.tsx) ---
function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-background/20">
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Asterisk className="w-8 h-8 text-gray-900 dark:text-gray-100" strokeWidth={2.5} />
          <span className="text-[28px] font-normal tracking-tight text-gray-900 dark:text-gray-100">router.so</span>
        </div>
        <a href="/login" className="text-[15px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Login
        </a>
      </div>
    </header>
  );
}

// --- Hero Component (from src/components/Hero.tsx) ---
function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20 bg-white dark:bg-background/20">
      <div className="flex gap-6 mb-16">
        <a
          href="#"
          className="text-[15px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
        >
          Star on GitHub <span className="text-gray-500 dark:text-gray-400">★</span>
        </a>
        <a
          href="#"
          className="text-[15px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Read the Docs →
        </a>
      </div>

      <h1 className="text-[56px] leading-[1.15] font-normal tracking-tight text-gray-900 dark:text-gray-100 mb-8 max-w-[900px]">
        The Open Source Option to Manage your Forms and Capture Leads.
      </h1>

      <p className="text-[20px] leading-[1.6] text-gray-600 dark:text-gray-400 mb-12 max-w-[800px]">
        Router.so is headless form handling and lead routing for marketing-minded developers.
      </p>

      <div className="flex gap-4 mb-20">
        <button className="px-6 py-3 text-[15px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Get Started
        </button>
        <button className="px-6 py-3 text-[15px] border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-gray-900 dark:text-gray-100">
          See Pricing
        </button>
      </div>

      <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-orange-400/30 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-orange-600/20 p-[2px]">
        <div className="bg-gradient-to-br from-slate-600 via-purple-500/50 to-orange-400/50 dark:from-slate-800 dark:via-purple-800/50 dark:to-orange-800/50 rounded-2xl p-8">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 700'%3E%3Crect fill='%23ffffff' width='1200' height='700' rx='12'/%3E%3C/svg%3E"
            alt="Router.so Dashboard"
            className="w-full rounded-lg shadow-2xl dark:opacity-90"
          />
        </div>
      </div>
    </section>
  );
}

// --- Features Component (from src/components/Features.tsx) ---
const features = [
  {
    icon: Link2,
    title: 'Endpoint Creation',
    description: 'Easily create custom endpoints for your forms. Streamline data collection with tailored submission points.',
  },
  {
    icon: Lock,
    title: 'Custom Schema',
    description: 'Define and validate your data with custom schemas. Ensure data integrity and structure for each form submission.',
  },
  {
    icon: AlertCircle,
    title: 'Error Tracking',
    description: 'Monitor and manage errors in real-time. Quickly identify and resolve issues to maintain smooth form operations.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Visualize and analyze your form data with intuitive charts and graphs. Gain insights to optimize your lead generation.',
  },
  {
    icon: Webhook,
    title: 'Webhook Routing',
    description: 'Route form submissions to external services seamlessly. Integrate with your existing tools and automate workflows.',
  },
  {
    icon: FileCode,
    title: 'Form Generation',
    description: 'Generate beautiful, responsive forms with Shadcn/ui components. Create professional-looking forms with minimal effort.',
  },
];

function Features() {
  return (
    <section className="bg-white dark:bg-background/20 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[40px] leading-[1.2] font-normal tracking-tight text-gray-900 dark:text-gray-100 mb-16">
          Out of the Box Features for Forms and Lead Routing
        </h2>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-white dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <feature.icon className="w-6 h-6 flex-shrink-0 mt-1 text-gray-900 dark:text-gray-100" strokeWidth={2} />
                <div>
                  <h3 className="text-[24px] font-normal text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Pricing Component (from src/components/Pricing.tsx) ---
const plans = [
  {
    name: 'Free',
    subtitle: 'Free forever',
    price: '$0',
    features: [
      '100 form submissions',
      'Unlimited endpoints',
      'Unlimited Form Generations',
      'Unlimited Webhooks',
    ],
    cta: 'Sign Up Free',
    ctaStyle: 'text',
  },
  {
    name: 'Lite',
    subtitle: 'Perfect for small projects and individual developers.',
    price: '$7',
    yearlyPrice: '$60/year (save $24)',
    features: [
      '1,000 form submissions',
      'Unlimited endpoints',
      'Unlimited Form Generations',
      'Unlimited Webhooks',
    ],
    cta: 'Purchase Lite',
    ctaStyle: 'text',
  },
  {
    name: 'Pro',
    subtitle: 'Best for growing teams and businesses.',
    price: '$20',
    yearlyPrice: '$200/year (save $40)',
    features: [
      '10,000 form submissions',
      'Unlimited endpoints',
      'Unlimited Form Generations',
      'Unlimited Webhooks',
    ],
    cta: 'Purchase Pro',
    ctaStyle: 'text',
  },
  {
    name: 'Business',
    subtitle: 'Advanced features for larger organizations.',
    price: '$50',
    yearlyPrice: '$500/year (save $100)',
    features: [
      '50,000 form submissions',
      'Unlimited endpoints',
      'Unlimited Form Generations',
      'Unlimited Webhooks',
      'CRM Integrations (Beta)',
      'Slack Support',
    ],
    cta: 'Purchase Business',
    ctaStyle: 'text',
  },
];

function Pricing() {
  return (
    <section className="bg-white dark:bg-background/20 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[40px] leading-[1.2] font-normal tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Simple Pricing for Powerful Form Handling
        </h2>
        <p className="text-[18px] text-gray-500 dark:text-gray-400 mb-16">
          Choose the plan that fits your needs
        </p>

        <div className="space-y-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-10 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-white dark:bg-gray-900"
            >
              <div className="mb-6">
                <h3 className="text-[28px] font-normal text-gray-900 dark:text-gray-100 mb-2">
                  {plan.name}
                </h3>
                <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4">
                  {plan.subtitle}
                </p>
                <div className="mb-2">
                  <span className="text-[48px] font-normal text-gray-900 dark:text-gray-100">
                    {plan.price}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <p className="text-[14px] text-gray-500 dark:text-gray-400">
                    {plan.yearlyPrice}
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-900 dark:text-gray-100" strokeWidth={2} />
                    <span className="text-[15px] text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full text-center py-3 text-[15px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Roadmap Component (from src/components/Roadmap.tsx) ---
const roadmapItems = [
  {
    icon: Check,
    title: 'Optional Fields in Forms',
    subtitle: 'Add flexibility to your forms by including optional fields for additional information.',
    description: 'This new feature will allow you to create more versatile forms by designating certain fields as optional. Users can choose to fill these fields or leave them blank, providing a better user experience and potentially increasing form completion rates.',
  },
  {
    icon: Mail,
    title: 'Share a Lead by Email',
    subtitle: 'Easily share lead information with team members or clients via email.',
    description: 'This feature will allow you to quickly distribute lead details to relevant stakeholders. You will be able to customize the email content and choose recipients directly from the platform, streamlining your lead sharing process.',
  },
  {
    icon: Bell,
    title: 'Email Notifications for Leads Received',
    subtitle: 'Get instant email alerts when new leads are captured through your forms.',
    description: 'Stay on top of your lead generation efforts with real-time notifications. You will be able to configure alert preferences, ensuring you are always informed about new opportunities without being overwhelmed.',
  },
  {
    icon: RotateCcw,
    title: 'Manually Retry Webhook Attempts',
    subtitle: 'Resend failed webhook payloads with a simple click, ensuring no lead data is lost.',
    description: 'This feature will provide a safety net for your integrations. You will have a clear view of failed webhook attempts and the ability to retry them manually, giving you more control over your data flow and reducing the risk of lost leads.',
  }
];

function Roadmap() {
  return (
    <section className="bg-white dark:bg-background/20 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[40px] leading-[1.2] font-normal tracking-tight text-gray-900 dark:text-gray-100 mb-16">
          Router.so Roadmap
        </h2>

        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-10 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-white dark:bg-gray-900"
            >
              <div className="flex items-start gap-4 mb-4">
                <item.icon className="w-6 h-6 flex-shrink-0 mt-1 text-gray-900 dark:text-gray-100" strokeWidth={2} />
                <h3 className="text-[24px] font-normal text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
              </div>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4 leading-[1.6]">
                {item.subtitle}
              </p>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-[1.6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Footer Component (from src/components/Footer.tsx) ---
function Footer() {
  return (
    <footer className="bg-white dark:bg-background/20 border-t border-gray-200 dark:border-gray-800 py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          <Asterisk className="w-7 h-7 text-gray-900 dark:text-gray-100" strokeWidth={2.5} />
          <span className="text-[24px] font-normal tracking-tight text-gray-900 dark:text-gray-100">router.so</span>
        </div>

        <p className="text-[18px] text-gray-600 dark:text-gray-400 mb-12 leading-[1.6] max-w-[600px]">
          We built Router.so to help developers build forms faster and capture leads easier.
        </p>

        <nav className="space-y-3 mb-16">
          <a href="#" className="block text-[15px] text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors border-b border-gray-900 dark:border-gray-100 pb-1 w-fit">
            Github
          </a>
          <a href="#" className="block text-[15px] text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors border-b border-gray-900 dark:border-gray-100 pb-1 w-fit">
            Documentation
          </a>
          <a href="#" className="block text-[15px] text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors border-b border-gray-900 dark:border-gray-100 pb-1 w-fit">
            Login / Signup
          </a>
          <a href="#" className="block text-[15px] text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors border-b border-gray-900 dark:border-gray-100 pb-1 w-fit">
            Privacy Policy
          </a>
          <a href="#" className="block text-[15px] text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors border-b border-gray-900 dark:border-gray-100 pb-1 w-fit">
            Terms of Use
          </a>
        </nav>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-gray-600 dark:text-gray-400">
            © 9d8. All rights reserved. 2024-present.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- ThemeToggle Component (from src/components/ThemeToggle.tsx) ---
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-900 dark:text-gray-100" strokeWidth={2} />
      ) : (
        <Sun className="w-5 h-5 text-gray-900 dark:text-gray-100" strokeWidth={2} />
      )}
    </button>
  );
}

import { ModeToggle } from "@/components/parts/mode-toggle"; // Import global ModeToggle

// --- Main Page Component (combining App.tsx and all other components) ---
export default function Page() {
  return (
    <div className="min-h-screen transition-colors bg-background/20 backdrop-blur-sm">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Roadmap />
      <Footer />
      <ModeToggle /> {/* Use global ModeToggle */}
    </div>
  );
}
