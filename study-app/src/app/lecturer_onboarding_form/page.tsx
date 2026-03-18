'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LecturerOnboardingForm() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [savedId, setSavedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    general_notes: '',
    name: '', email: '', course_name: '', semester: '', ta_name: '', ta_email: '',
    mat_slides: false, mat_hw: false, mat_hw_sol: false, mat_formula: false,
    materials_notes: '',
    answer_policy: '',
    answer_policy_detail: '',
    no_hw: false, no_exam_spoil: false, no_shortcuts: false,
    restrictions_other: '',
    terminology: '',
    explanation_level: '',
    language: '',
    hard_topics: '', easy_topics: '',
    track_topics: false, track_repeated: false, track_timing: false, track_groups: false, track_weekly: false,
    report_freq: '',
    date_materials: '', date_review: '', date_launch: '', date_feedback: '',
    extra_notes: '',
  });

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  async function saveToFirebase() {
    const ref = await addDoc(collection(db, 'lecturer_onboarding_submissions'), {
      ...form,
      submittedAt: serverTimestamp(),
    });
    return ref.id;
  }

  function buildEmailBody() {
    const mats = [
      form.mat_slides && 'מצגות / סיכומי הרצאות',
      form.mat_hw && 'גיליונות תרגול / שיעורי בית',
      form.mat_hw_sol && 'פתרונות שיעורי בית',
      form.mat_formula && 'נוסחאון',
    ].filter(Boolean).join(', ');

    const noList = [
      form.no_hw && 'לא לפתור שיעורי בית',
      form.no_exam_spoil && 'לא לתת פתרונות מבחנים',
      form.no_shortcuts && 'לא לתת קיצורי דרך',
    ].filter(Boolean).join(', ');

    const trackList = [
      form.track_topics && 'נושאים נשאלים',
      form.track_repeated && 'קשיים חוזרים',
      form.track_timing && 'תזמון לפני מבחן',
      form.track_groups && 'פערים בין קבוצות',
      form.track_weekly && 'דוח שבועי',
    ].filter(Boolean).join(', ');

    return `=== טופס מרצה – מערכת עזר לימודי AI ===

💬 הערות מהמרצה – מעבר כללי על המערכת:
${form.general_notes || '-'}

👤 פרטי המרצה
שם: ${form.name}
מייל: ${form.email}
קורס: ${form.course_name}
סמסטר: ${form.semester}
מתרגל: ${form.ta_name} (${form.ta_email})

📄 חומרים להעברה: ${mats || '(לא סומן)'}
הערות חומרים: ${form.materials_notes || '-'}

💬 מדיניות הצ'אט:
מדיניות תשובות: ${form.answer_policy}
פירוט: ${form.answer_policy_detail || '-'}
הגבלות: ${noList || '-'}
הגבלות נוספות: ${form.restrictions_other || '-'}
טרמינולוגיה: ${form.terminology || '-'}
רמת הסבר: ${form.explanation_level}
שפה: ${form.language}

⭐ נושאים לפי קושי:
קשים: ${form.hard_topics || '-'}
קלים: ${form.easy_topics || '-'}

📊 מעקב ודיווח: ${trackList || '(לא סומן)'}
תדירות: ${form.report_freq}

📆 לוח זמנים:
העברת חומרים: ${form.date_materials || '-'}
בדיקה ראשונית: ${form.date_review || '-'}
השקה: ${form.date_launch || '-'}
פידבק ראשון: ${form.date_feedback || '-'}

💬 הערות נוספות:
${form.extra_notes || '-'}

---
נשלח דרך טופס מרצה – infi AI Study System`;
  }

  async function handleSubmit() {
    setStatus('saving');
    try {
      const id = await saveToFirebase();
      setSavedId(id);
      setStatus('saved');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  }

  function handleEmail() {
    const subject = encodeURIComponent(`טופס מרצה – ${form.course_name || 'קורס'} | ${form.name || ''}`);
    const body = encodeURIComponent(buildEmailBody());
    window.location.href = `mailto:liamesika2121@gmail.com?subject=${subject}&body=${body}`;
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #d0d4e8', borderRadius: '8px',
    fontFamily: 'inherit', fontSize: '14px', color: '#222', background: '#fafbff',
    direction: 'rtl', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: 600, color: '#444',
    marginBottom: '6px', marginTop: '18px',
  };
  const cardStyle: React.CSSProperties = {
    background: '#fff', border: '1px solid #e8eaf0', borderTop: 'none', padding: '32px 44px',
  };
  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '12px',
    marginBottom: '22px', paddingBottom: '12px', borderBottom: '2px solid #f0f2ff',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap');
        body { font-family: 'Assistant', Arial, sans-serif; background: #f5f6fa; color: #1a1a2e; direction: rtl; }
        .check-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 12px; border: 1.5px solid #e8eaf0; border-radius: 8px; cursor: pointer; transition: border-color 0.15s, background 0.15s; font-size: 14px; margin-bottom: 8px; }
        .check-item:hover { border-color: #4361ee; background: #f0f4ff; }
        .check-item input { width: auto; margin-top: 2px; accent-color: #4361ee; }
        .row-2 { display: flex; gap: 14px; }
        .row-2 > div { flex: 1; }
        @media (max-width: 600px) { .row-2 { flex-direction: column; } }
        input:focus, textarea:focus, select:focus { border-color: #4361ee !important; background: #fff !important; }
      `}</style>

      <div style={{ fontFamily: "'Assistant', Arial, sans-serif", background: '#f5f6fa', color: '#1a1a2e', direction: 'rtl', padding: '32px 16px 60px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)', color: '#fff', padding: '36px 44px 30px', borderRadius: '12px 12px 0 0' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '20px', fontSize: '12px', padding: '3px 14px', marginBottom: '12px' }}>
              טופס מרצה · מרץ 2026
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', marginTop: 0 }}>התאמת מערכת העזר הלימודי לקורס שלך</h1>
            <p style={{ fontSize: '14px', opacity: 0.75, marginBottom: '20px' }}>בסוף מילוי הטופס תועבר למייל לשליחת הפרטים שמילאת, תודה על הזמן!</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['מבני נתונים', 'לוגיקה ותורת הקבוצות'].map(c => (
                <div key={c} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '5px 16px', fontSize: '13px', fontWeight: 600 }}>{c}</div>
              ))}
            </div>
          </div>

          {/* General Notes */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7c3aed', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✍️</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>הערות מהמרצה – מעבר כללי על המערכת</div>
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
              שתף אותנו בכל הערה, רושם ראשוני או בקשה כללית לגבי המערכת – לפני שנכנס לפרטים.
            </p>
            <textarea
              value={form.general_notes}
              onChange={e => set('general_notes', e.target.value)}
              placeholder="לדוגמה: ראיתי את הדמו, נראה מבטיח. חשוב לי ש... / הייתי רוצה שהמערכת תדגיש... / הערה לגבי אופן הצגת החומר..."
              style={{ ...inputStyle, minHeight: '160px', resize: 'vertical', lineHeight: 1.7 }}
            />
          </div>

          {/* Section 0: Lecturer Details */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6c757d', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>👤</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>פרטי המרצה</div>
            </div>
            <div className="row-2">
              <div>
                <label style={labelStyle}>שם מלא</label>
                <input style={inputStyle} type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder='ד"ר / פרופ׳...' />
              </div>
              <div>
                <label style={labelStyle}>כתובת מייל</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="lecturer@university.ac.il" />
              </div>
            </div>
            <div className="row-2" style={{ marginTop: 0 }}>
              <div>
                <label style={labelStyle}>שם הקורס</label>
                <input style={inputStyle} type="text" value={form.course_name} onChange={e => set('course_name', e.target.value)} placeholder="מבני נתונים / לוגיקה..." />
              </div>
              <div>
                <label style={labelStyle}>סמסטר ושנה</label>
                <input style={inputStyle} type="text" value={form.semester} onChange={e => set('semester', e.target.value)} placeholder="אביב 2026" />
              </div>
            </div>
            <label style={labelStyle}>מתרגל/ת ראשי/ת (אם רלוונטי)</label>
            <div className="row-2">
              <div><input style={inputStyle} type="text" value={form.ta_name} onChange={e => set('ta_name', e.target.value)} placeholder="שם המתרגל" /></div>
              <div><input style={inputStyle} type="email" value={form.ta_email} onChange={e => set('ta_email', e.target.value)} placeholder="מייל המתרגל" /></div>
            </div>
          </div>

          {/* Section 1: Materials */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4361ee', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>חומרים להעברה</div>
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>סמן מה תוכל להעביר:</p>
            {[
              { key: 'mat_slides', label: 'מצגות / סיכומי הרצאות (PDF)' },
              { key: 'mat_hw', label: 'גיליונות תרגול / שיעורי בית' },
              { key: 'mat_hw_sol', label: 'פתרונות שיעורי בית' },
              { key: 'mat_formula', label: 'נוסחאון / דפי עזר מורשים בבחינה' },
            ].map(({ key, label }) => (
              <label key={key} className="check-item">
                <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean} onChange={e => set(key, e.target.checked)} />
                {label}
              </label>
            ))}
            <label style={labelStyle}>הערות על החומרים</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.materials_notes} onChange={e => set('materials_notes', e.target.value)} placeholder="..." />
          </div>

          {/* Section 2: Chat Policy */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4361ee', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>כיוון הצ&apos;אט – מדיניות עזרה</div>
            </div>
            <label style={labelStyle}>עד כמה הצ&apos;אט יכול לתת תשובות?</label>
            {[
              { value: 'hint', label: 'לרמוז בלבד – שאלות הנחיה, לא לתת את הפתרון' },
              { value: 'partial', label: 'פתרון חלקי – הסטודנט מסיים לבד' },
              { value: 'full', label: 'פתרון מלא עם הסבר' },
              { value: 'depends', label: 'תלוי בסוג השאלה – פרט למטה' },
            ].map(({ value, label }) => (
              <label key={value} className="check-item">
                <input type="radio" name="answer_policy" value={value} checked={form.answer_policy === value} onChange={() => set('answer_policy', value)} />
                {label}
              </label>
            ))}
            <label style={labelStyle}>פירוט לפי סוג שאלה (אם בחרת &quot;תלוי&quot;)</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.answer_policy_detail} onChange={e => set('answer_policy_detail', e.target.value)} placeholder={'שאלות פתוחות / הוכחות: \nשאלות חישוביות: \nשיעורי בית: '} />
            <hr style={{ border: 'none', borderTop: '1px solid #eef0f8', margin: '28px 0' }} />
            <label style={labelStyle}>מה אסור לצ&apos;אט לעשות?</label>
            {[
              { key: 'no_hw', label: 'לא לפתור שיעורי בית ישירות' },
              { key: 'no_exam_spoil', label: 'לא לתת פתרונות מבחנים עתידיים' },
              { key: 'no_shortcuts', label: 'לא לתת קיצורי דרך שעוקפים את הלמידה' },
            ].map(({ key, label }) => (
              <label key={key} className="check-item">
                <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean} onChange={e => set(key, e.target.checked)} />
                {label}
              </label>
            ))}
            <label style={labelStyle}>הגבלות נוספות</label>
            <input style={inputStyle} type="text" value={form.restrictions_other} onChange={e => set('restrictions_other', e.target.value)} placeholder="..." />
            <hr style={{ border: 'none', borderTop: '1px solid #eef0f8', margin: '28px 0' }} />
            <label style={labelStyle}>סימון וטרמינולוגיה ספציפיים לקורס</label>
            <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={form.terminology} onChange={e => set('terminology', e.target.value)} placeholder="לדוגמה: שמות אלגוריתמים, סימני לוגיקה, מינוחים מיוחדים..." />
            <div className="row-2" style={{ marginTop: 0 }}>
              <div>
                <label style={labelStyle}>רמת הסבר מועדפת</label>
                <select style={inputStyle} value={form.explanation_level} onChange={e => set('explanation_level', e.target.value)}>
                  <option value="">בחר...</option>
                  <option value="basic">בסיסי</option>
                  <option value="mid">בינוני</option>
                  <option value="advanced">מתקדם</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>שפת התגובות</label>
                <select style={inputStyle} value={form.language} onChange={e => set('language', e.target.value)}>
                  <option value="">בחר...</option>
                  <option value="he">עברית בלבד</option>
                  <option value="en">אנגלית בלבד</option>
                  <option value="both">שתיהן</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Difficulty */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4361ee', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>נושאים קשים במיוחד לסטודנטים</div>
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>אילו נושאים בדרך כלל הכי קשים?</p>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.hard_topics} onChange={e => set('hard_topics', e.target.value)} placeholder="לדוגמה: הוכחות באינדוקציה, ניתוח סיבוכיות..." />
            <label style={labelStyle}>נושאים קלים יחסית (לצורך שאלות חימום)</label>
            <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={form.easy_topics} onChange={e => set('easy_topics', e.target.value)} placeholder="לדוגמה: הגדרות בסיסיות..." />
          </div>

          {/* Section 4: Analytics */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4361ee', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>מה תרצה לקבל – ניתוח ומעקב</div>
            </div>
            {[
              { key: 'track_topics', label: 'אילו נושאים הסטודנטים שואלים עליהם הכי הרבה' },
              { key: 'track_repeated', label: 'אילו שאלות גורמות לקושי חוזר' },
              { key: 'track_timing', label: 'עד כמה מוקדם לפני המבחן מתחיל השימוש' },
              { key: 'track_groups', label: 'פערים בין קבוצות תרגול שונות' },
              { key: 'track_weekly', label: 'דוח שבועי לפי נושא' },
            ].map(({ key, label }) => (
              <label key={key} className="check-item">
                <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean} onChange={e => set(key, e.target.checked)} />
                {label}
              </label>
            ))}
            <label style={labelStyle}>תדירות דיווח מועדפת</label>
            {[
              { value: 'realtime', label: 'בזמן אמת (לינק לדשבורד)' },
              { value: 'weekly', label: 'דוח שבועי במייל' },
              { value: 'pre_exam', label: 'לפני כל מבחן' },
              { value: 'on_demand', label: 'לפי בקשה בלבד' },
            ].map(({ value, label }) => (
              <label key={value} className="check-item">
                <input type="radio" name="report_freq" value={value} checked={form.report_freq === value} onChange={() => set('report_freq', value)} />
                {label}
              </label>
            ))}
          </div>

          {/* Section 5: Timeline */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4361ee', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>5</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>לוח זמנים מוצע</div>
            </div>
            <div className="row-2">
              <div>
                <label style={labelStyle}>העברת חומרים ראשוניים</label>
                <input style={inputStyle} type="text" value={form.date_materials} onChange={e => set('date_materials', e.target.value)} placeholder="תאריך יעד" />
              </div>
              <div>
                <label style={labelStyle}>בדיקה ראשונית של הצ&apos;אט</label>
                <input style={inputStyle} type="text" value={form.date_review} onChange={e => set('date_review', e.target.value)} placeholder="תאריך יעד" />
              </div>
            </div>
            <div className="row-2">
              <div>
                <label style={labelStyle}>השקה לסטודנטים</label>
                <input style={inputStyle} type="text" value={form.date_launch} onChange={e => set('date_launch', e.target.value)} placeholder="תאריך יעד" />
              </div>
              <div>
                <label style={labelStyle}>סבב פידבק ראשון</label>
                <input style={inputStyle} type="text" value={form.date_feedback} onChange={e => set('date_feedback', e.target.value)} placeholder="לאחר שבועיים מההשקה" />
              </div>
            </div>
          </div>

          {/* Extra Notes */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6c757d', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>💬</div>
              <div style={{ fontSize: '17px', fontWeight: 700 }}>הערות נוספות</div>
            </div>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={form.extra_notes} onChange={e => set('extra_notes', e.target.value)} placeholder="כל מה שלא הוזכר למעלה ושחשוב שנדע..." />
          </div>

          {/* Status Banner */}
          {status === 'saved' && (
            <div style={{ background: '#e8f5e9', border: '1.5px solid #a5d6a7', borderRadius: '10px', padding: '16px 24px', margin: '0', display: 'flex', alignItems: 'center', gap: '12px', borderTop: 'none' }}>
              <span style={{ fontSize: '24px' }}>✅</span>
              <div>
                <div style={{ fontWeight: 700, color: '#2e7d32', fontSize: '15px' }}>הטופס נשמר בהצלחה!</div>
                <div style={{ fontSize: '12px', color: '#555' }}>מזהה: {savedId} · נשמר ב-Firestore תחת lecturer_onboarding_submissions</div>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#fff3e0', border: '1.5px solid #ffb74d', borderRadius: '10px', padding: '16px 24px', margin: '0', borderTop: 'none' }}>
              <span style={{ fontWeight: 700, color: '#e65100' }}>שגיאה בשמירה ל-Firebase. בדוק חיבור לאינטרנט ונסה שוב.</span>
            </div>
          )}

          {/* Submit Area */}
          <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '12px', color: '#999' }}>לאחר השליחה, ניצור קשר תוך 1-2 ימי עסקים לתיאום הטמעה.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleEmail}
                style={{ background: '#fff', color: '#4361ee', border: '1.5px solid #4361ee', borderRadius: '8px', padding: '11px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                שלח במייל ✉️
              </button>
              <button
                onClick={handleSubmit}
                disabled={status === 'saving'}
                style={{ background: status === 'saved' ? '#2e7d32' : '#4361ee', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '15px', fontWeight: 700, cursor: status === 'saving' ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              >
                {status === 'saving' ? 'שומר...' : status === 'saved' ? '✓ נשמר!' : 'שמור ב-Firebase 💾'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
