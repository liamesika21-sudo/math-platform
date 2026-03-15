'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { formulaCategories } from '@/data/infi-formulas';
import { Calculator, Search, Printer } from 'lucide-react';

export default function FormulasPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = formulaCategories
    .map(cat => ({
      ...cat,
      formulas: cat.formulas.filter(f =>
        search === '' ||
        f.formula.toLowerCase().includes(search.toLowerCase()) ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.nameHe.includes(search)
      ),
    }))
    .filter(cat => cat.formulas.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter(c => c.id === activeCategory)
    : filteredCategories;

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-purple-600" />
              נוסחאות חשובות
            </h1>
            <p className="text-gray-500">כל הנוסחאות הנדרשות למבחן — מאורגנות לפי נושא</p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors no-print"
          >
            <Printer className="w-4 h-4" />
            <span>הדפסה</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative no-print">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חפש נוסחה..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 no-print">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            הכל
          </button>
          {formulaCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat.titleHe}
            </button>
          ))}
        </div>

        {/* Formula Categories */}
        {displayCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{cat.titleHe}</h2>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {cat.formulas.map((f, i) => (
                  <div key={i} className="formula-box flex flex-col gap-1">
                    <p className="font-mono text-sm text-gray-800">{f.formula}</p>
                    <p className="text-xs text-amber-700 font-medium">{f.nameHe}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {displayCategories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>לא נמצאו נוסחאות מתאימות</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
