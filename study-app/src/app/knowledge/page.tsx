'use client';

import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { getAllWeeks } from '@/data/infi-weeks';
import { Search, BookOpen, Scale, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

interface KnowledgeEntry {
  id: string;
  title: string;
  type: 'definition' | 'theorem' | 'technique';
  weekNumber: number;
  weekTitle: string;
  topics: string[];
}

function buildKnowledgeItems(): KnowledgeEntry[] {
  const weeks = getAllWeeks();
  const items: KnowledgeEntry[] = [];

  for (const week of weeks) {
    for (let i = 0; i < week.keyDefinitions.length; i++) {
      items.push({
        id: `def-${week.weekNumber}-${i}`,
        title: week.keyDefinitions[i],
        type: 'definition',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
        topics: week.topicsHe,
      });
    }
    for (let i = 0; i < week.keyTheorems.length; i++) {
      items.push({
        id: `thm-${week.weekNumber}-${i}`,
        title: week.keyTheorems[i],
        type: 'theorem',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
        topics: week.topicsHe,
      });
    }
    for (let i = 0; i < week.keyTechniques.length; i++) {
      items.push({
        id: `tech-${week.weekNumber}-${i}`,
        title: week.keyTechniques[i],
        type: 'technique',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
        topics: week.topicsHe,
      });
    }
  }

  return items;
}

const typeConfig = {
  definition: { label: 'הגדרה', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: BookOpen },
  theorem: { label: 'משפט', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Scale },
  technique: { label: 'טכניקה', color: 'bg-green-100 text-green-800 border-green-200', icon: Wrench },
};

export default function KnowledgePage() {
  const allItems = useMemo(() => buildKnowledgeItems(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'definition' | 'theorem' | 'technique'>('all');
  const [weekFilter, setWeekFilter] = useState<number | 'all'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const weeks = getAllWeeks();

  const typeCounts = useMemo(() => ({
    definition: allItems.filter(i => i.type === 'definition').length,
    theorem: allItems.filter(i => i.type === 'theorem').length,
    technique: allItems.filter(i => i.type === 'technique').length,
  }), [allItems]);

  const filteredItems = useMemo(() => {
    let filtered = [...allItems];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    if (weekFilter !== 'all') {
      filtered = filtered.filter(item => item.weekNumber === weekFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.topics.some(t => t.toLowerCase().includes(query)) ||
        item.weekTitle.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allItems, typeFilter, weekFilter, searchQuery]);

  function toggleExpand(id: string) {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <Layout>
      <div className="p-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">בסיס הידע</h1>
          <p className="text-gray-600">
            כל ההגדרות, המשפטים והטכניקות מ-12 שבועות הקורס
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{typeCounts.definition}</div>
            <div className="text-sm text-blue-700">הגדרות</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{typeCounts.theorem}</div>
            <div className="text-sm text-purple-700">משפטים</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{typeCounts.technique}</div>
            <div className="text-sm text-green-700">טכניקות</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="חפש לפי כותרת, נושא או שבוע..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">סוג:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                הכל ({allItems.length})
              </button>
              {(Object.entries(typeConfig) as [keyof typeof typeConfig, typeof typeConfig[keyof typeof typeConfig]][]).map(([type, config]) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {config.label} ({typeCounts[type]})
                </button>
              ))}
            </div>
          </div>

          {/* Week Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">שבוע:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setWeekFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  weekFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                הכל
              </button>
              {weeks.map(w => (
                <button
                  key={w.weekNumber}
                  onClick={() => setWeekFilter(w.weekNumber)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    weekFilter === w.weekNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {w.weekNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            מציג {filteredItems.length} מתוך {allItems.length} פריטים
          </p>
        </div>

        {/* Items List */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600">
              לא נמצאו פריטים התואמים את החיפוש והפילטרים.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const isExpanded = expandedItems.has(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full p-4 text-right"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${config.color} shrink-0 mt-0.5`}>
                        <Icon size={12} className="inline ml-1" />
                        {config.label}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm leading-relaxed">{item.title}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400 shrink-0 mt-1" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400 shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          שבוע {item.weekNumber} — {item.weekTitle}
                        </span>
                        {item.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
