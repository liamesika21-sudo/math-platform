'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  FileQuestion,
  GraduationCap,
  FileSearch,
  Map,
  Layers,
  Calculator,
  Crosshair,
  Bug,
  Menu,
  X,
  Dumbbell,
  ScrollText,
  Flame,
  ExternalLink,
  CalendarDays,
  Brain,
  Swords,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  labelHe: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    labelHe: 'לוח בקרה',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: '/battle-plan',
    label: 'Battle Plan',
    labelHe: 'תוכנית קרב — אינפי',
    icon: <Swords className="w-5 h-5" />,
  },
  {
    href: '/liner-battle-plan',
    label: 'Liner Battle Plan',
    labelHe: 'תוכנית קרב — לינארית',
    icon: <Swords className="w-5 h-5" />,
  },
  {
    href: '/triple-battle-plan',
    label: 'Triple Battle Plan',
    labelHe: 'תוכנית קרב משולשת',
    icon: <Flame className="w-5 h-5" />,
  },
  {
    href: '/study-plan',
    label: 'Study Plan',
    labelHe: 'תוכנית לימודים',
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    href: '/theorems',
    label: 'Theorems Study',
    labelHe: 'שינון משפטים',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    href: '/exam-prep',
    label: 'Exam Prep',
    labelHe: 'הכנה למבחן',
    icon: <Flame className="w-5 h-5" />,
  },
  {
    href: '/weeks',
    label: 'Weekly Study',
    labelHe: 'לימוד שבועי',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    href: '/likelihood',
    label: 'Exam Likelihood',
    labelHe: 'סבירות למבחן',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    href: '/homework',
    label: 'Homework',
    labelHe: 'שיעורי בית',
    icon: <FileQuestion className="w-5 h-5" />,
  },
  {
    href: '/practice',
    label: 'Practice Mode',
    labelHe: 'תרגול',
    icon: <Dumbbell className="w-5 h-5" />,
  },
  {
    href: '/exams',
    label: 'Past Exams',
    labelHe: 'מבחנים קודמים',
    icon: <FileSearch className="w-5 h-5" />,
  },
  {
    href: '/formulas',
    label: 'Key Formulas',
    labelHe: 'נוסחאות חשובות',
    icon: <Calculator className="w-5 h-5" />,
  },
  {
    href: '/review',
    label: 'Exam Review',
    labelHe: 'חזרה למבחן',
    icon: <Crosshair className="w-5 h-5" />,
  },
  {
    href: '/roadmap',
    label: 'Study Roadmap',
    labelHe: 'מפת לימוד',
    icon: <Map className="w-5 h-5" />,
  },
  {
    href: '/print-theorems',
    label: 'Theorems & Proofs',
    labelHe: 'משפטים והוכחות',
    icon: <ScrollText className="w-5 h-5" />,
  },
  {
    href: '/print-weeks-1-3',
    label: 'Weeks 1-3 Summary',
    labelHe: 'סיכום שבועות 1-3',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: '/print-weeks-10-12',
    label: 'Weeks 10-12 Summary',
    labelHe: 'סיכום שבועות 10-12',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: '/debug',
    label: 'Debug',
    labelHe: 'דיבאג',
    icon: <Bug className="w-5 h-5" />,
  },
];

const BDIDA_URL = 'https://bdida-app.vercel.app';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-900">אינפי - מועד ב׳</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 z-40 h-full w-64 bg-white border-l border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">אינפי</h1>
                <p className="text-xs text-gray-500">הכנה למועד ב׳</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.labelHe}</span>
                </Link>
              );
            })}

            {/* Bdida external link */}
            <div className="pt-3 mt-3 border-t border-gray-200">
              <a
                href={BDIDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 bg-linear-to-l from-emerald-50 to-teal-50 text-emerald-700 hover:from-emerald-100 hover:to-teal-100"
              >
                <span className="text-emerald-500">
                  <ExternalLink className="w-5 h-5" />
                </span>
                <span>בדידה</span>
                <span className="text-[10px] mr-auto text-emerald-400">אתר נפרד</span>
              </a>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              מבוסס על החומרים שלך בלבד
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:mr-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <div className="p-4 md:p-6 lg:p-8 flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-200 bg-white">
          <div className="text-center text-sm text-gray-500">
            Built by{' '}
            <a
              href="https://liamesika.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Lia Mesika
            </a>
            . All rights reserved.
          </div>
        </footer>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.labelHe}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
