import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Users,
  Sparkles,
  Zap,
  Clock3,
  TrendingUp,
  Sparkle,
  Clock,
  ChevronDown,
  Info,
  Star,
  Target,
  BellRing,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin
} from 'lucide-react';
import { Job, RegularClass, JobCategory, UrgencyLevel } from '../types';
import { IS_DEMO_MODE } from '../constants';

/**
 * Mapping der Kategorien zu spezifischen Tanz- oder Sportstilen.
 */
const DETAILED_STYLES: Record<string, string[]> = {
  'DANCE': ['Hip Hop', 'Ballet', 'Contemporary', 'Jazz', 'Commercial', 'House', 'Heels', 'Breakdance', 'Dancehall', 'K-Pop', 'Urban', 'Afro'],
  'BODY_MIND': ['Vinyasa Yoga', 'Hatha Yoga', 'Pilates', 'HIIT / Fitness', 'Meditation', 'Barre', 'Mobility', 'Boxen'],
  'MUSIC_VOICE': ['Vocal Coaching', 'Piano Begleitung', 'Gitarre', 'DJ', 'Sound Engineer', 'Chorleitung'],
  'EVENTS_FASHION': ['Model', 'Host/Hostess', 'Promoter', 'Styling', 'Fotograf', 'Videograf']
};

/**
 * Formatiert ein Date-Objekt in einen String "TT.MM.JJJJ".
 * @param date - Das zu formatierende Datum.
 * @returns Der formatierte Datumsstring.
 */
const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
};

/**
 * Parst einen String im Format "TT.MM.JJJJ" zurück in ein Date-Objekt.
 * @param dateStr - Der Datumsstring.
 * @returns Das Date-Objekt.
 */
const parseDateString = (dateStr: string) => {
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
};

// --- Custom DatePicker Overlay ---

/**
 * Komponente für die Datumsauswahl (Overlay).
 * Zeigt einen Kalender zur Auswahl eines Tages an.
 */
const DatePickerOverlay = ({
  currentDate,
  onClose,
  onSelect
}: {
  currentDate: string,
  onClose: () => void,
  onSelect: (d: string) => void
}) => {
  // Initialisiert das Ansichtsdatum basierend auf dem aktuell gewählten Datum oder heute
  const [viewDate, setViewDate] = useState(() => currentDate ? parseDateString(currentDate) : new Date());

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  // Korrektur, damit Montag der erste Tag ist (0 = Sonntag -> 6)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  /**
   * Wählt einen Tag aus und schließt das Overlay.
   */
  const handleSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onSelect(formatDate(newDate));
    onClose();
  };

  /**
   * Wechselt den Monat (vor/zurück).
   */
  const changeMonth = (delta: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      {/* DatePicker Container */}
      <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[50px] rounded-full pointer-events-none"></div>
        
        {/* Header mit Titel und Schließen-Button */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-lg font-bold text-white">Datum wählen</h3>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        {/* Monatsnavigation */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-teal-400">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Wochentage Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
            <div key={d} className="text-[10px] font-bold text-gray-500 uppercase">{d}</div>
          ))}
        </div>

        {/* Tage Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: adjustedFirstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = formatDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)) === currentDate;
            return (
              <button
                key={day}
                onClick={() => handleSelect(day)}
                className={`h-10 rounded-xl font-bold text-sm transition-all ${isSelected ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'hover:bg-white/10 text-white'}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Custom TimePicker Overlay ---

/**
 * Komponente für die Zeitauswahl (Overlay).
 * Bietet eine analoge Uhr-Oberfläche zur Auswahl von Stunden und Minuten.
 */
const TimePickerOverlay = ({
  initialTime,
  onClose,
  onSelect
}: {
  initialTime: string,
  onClose: () => void,
  onSelect: (t: string) => void
}) => {
  const [mode, setMode] = useState<'HOURS' | 'MINUTES'>('HOURS');
  const [hours, setHours] = useState(initialTime ? parseInt(initialTime.split(':')[0]) : 12);
  const [minutes, setMinutes] = useState(initialTime ? parseInt(initialTime.split(':')[1]) : 0);

  /**
   * Berechnet die Position der Zahlen auf dem Kreis (Uhr).
   */
  const getPos = (index: number, total: number, radius: number) => {
    const angle = (index * (360 / total)) - 90;
    const rad = angle * (Math.PI / 180);
    return {
      left: `${50 + radius * Math.cos(rad)}%`,
      top: `${50 + radius * Math.sin(rad)}%`
    };
  };

  /**
   * Setzt die Stunde und wechselt zur Minutenansicht.
   */
  const handleHourSelect = (h: number) => {
    setHours(h);
    setMode('MINUTES');
  };

  /**
   * Setzt die Minute, formatiert die Zeit und schließt das Overlay.
   */
  const handleMinuteSelect = (m: number) => {
    setMinutes(m);
    onSelect(`${hours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      {/* TimePicker Container */}
      <div className="bg-gray-900 border border-white/10 rounded-[40px] p-6 w-full max-w-xs shadow-2xl relative flex flex-col items-center">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>
        
        {/* Header mit digitaler Anzeige */}
        <div className="w-full flex justify-between items-start mb-6 z-10">
          <div>
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Zeit wählen</span>
            <div className="flex items-end gap-1 text-4xl font-mono font-black text-white mt-1">
              <button
                onClick={() => setMode('HOURS')}
                className={`${mode === 'HOURS' ? 'text-teal-400' : 'text-white/50'}`}
              >
                {hours.toString().padStart(2, '0')}
              </button>
              <span className="text-white/30 animate-pulse">:</span>
              <button
                onClick={() => setMode('MINUTES')}
                className={`${mode === 'MINUTES' ? 'text-teal-400' : 'text-white/50'}`}
              >
                {minutes.toString().padStart(2, '0')}
              </button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        {/* Uhr Ziffernblatt */}
        <div className="relative w-64 h-64 bg-black/50 rounded-full border border-white/5 shadow-inner mb-4">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></div>
          {mode === 'HOURS' && (
            <>
              {/* Innere Stunden (13-00) */}
              {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0].map((h, i) => {
                const pos = getPos(i + 1, 12, 28);
                return (
                  <button
                    key={h}
                    onClick={() => handleHourSelect(h)}
                    style={{ left: pos.left, top: pos.top }}
                    className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs font-bold transition-all ${hours === h ? 'bg-teal-500 text-black scale-110 shadow-lg shadow-teal-500/30 z-10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    {h === 0 ? '00' : h}
                  </button>
                );
              })}
              {/* Äußere Stunden (1-12) */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h, i) => {
                const pos = getPos(i + 1, 12, 42);
                return (
                  <button
                    key={h}
                    onClick={() => handleHourSelect(h)}
                    style={{ left: pos.left, top: pos.top }}
                    className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-lg font-bold transition-all ${hours === h ? 'bg-teal-500 text-black scale-110 shadow-lg shadow-teal-500/30 z-10' : 'text-white hover:bg-white/10'}`}
                  >
                    {h}
                  </button>
                );
              })}
            </>
          )}
          {mode === 'MINUTES' && (
            <>
              {/* Minuten in 5er Schritten */}
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => {
                const displayM = i * 5;
                return (
                  <button
                    key={displayM}
                    onClick={() => handleMinuteSelect(displayM)}
                    style={{ left: getPos(i, 12, 40).left, top: getPos(i, 12, 40).top }}
                    className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-lg font-bold transition-all ${minutes === displayM ? 'bg-teal-500 text-black scale-110 shadow-lg shadow-teal-500/30 z-10' : 'text-white hover:bg-white/10'}`}
                  >
                    {displayM.toString().padStart(2, '0')}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Hauptkomponente für den Job-Erstellungs-Wizard.
 * Ermöglicht das Erstellen und Veröffentlichen von Vertretungsjobs.
 */
export const JobPostingWizard = ({
  onPublish,
  onCancel,
  initialData
}: {
  onPublish: (job: Partial<Job>) => void,
  onCancel: () => void,
  initialData?: RegularClass | null
}) => {
  // State für Formularfelder
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('DANCE');
  const [specificStyle, setSpecificStyle] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [baseFee, setBaseFee] = useState<string>('');

  // State für Overlay-Sichtbarkeit
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

  // State für SOS Feature
  const [sosEnabled, setSosEnabled] = useState(false);
  const [sosHours, setSosHours] = useState(4);
  const [sosBonus, setSosBonus] = useState(25);

  // State für Targeting
  const [targetingMode, setTargetingMode] = useState<'ALL' | 'FAVORITES'>('ALL');
  const [favTarget, setFavTarget] = useState<'STARRED' | 'ALL_FAVS'>('ALL_FAVS');
  const [favUntilHours, setFavUntilHours] = useState<number>(4);
  const [autoOpenHours, setAutoOpenHours] = useState<number>(2);

  // Füllt das Formular mit Daten, wenn eine existierende Klasse (initialData) übergeben wurde
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title + ' Vertretung');
      setCategory(initialData.category);
      setTimeStart(initialData.timeStart);
      setTimeEnd(initialData.timeEnd);
      setBaseFee(initialData.baseFee.toString());
      setLocation(`${initialData.room}, Urban Dance Academy`);
      setDescription(`Vertretung für ${initialData.regularTeacher}. Bitte pünktlich sein.`);
    }
  }, [initialData]);

  // Berechnet die Dauer und das Label für die Anzeige
  const durationInfo = useMemo(() => {
    if (!timeStart || !timeEnd) return { hours: 0, label: '' };
    try {
      const [h1, m1] = timeStart.split(':').map(Number);
      const [h2, m2] = timeEnd.split(':').map(Number);
      const diffMin = (h2 * 60 + m2) - (h1 * 60 + m1);
      if (diffMin <= 0) return { hours: 0, label: '' };
      const hours = diffMin / 60;
      return { hours, label: hours === 1 ? '1 Std.' : `${hours.toString().replace('.', ',')} Std.` };
    } catch (e) {
      return { hours: 0, label: '' };
    }
  }, [timeStart, timeEnd]);

  // Berechnet den Stundenlohn basierend auf Basisgage und Dauer
  const hourlyRate = useMemo(() => {
    const feeNum = parseFloat(baseFee);
    if (isNaN(feeNum) || durationInfo.hours <= 0) return 0;
    return feeNum / durationInfo.hours;
  }, [baseFee, durationInfo]);

  // Zeigt einen Hinweis an, wenn der Stundenlohn unter einem fairen Wert liegt
  const showFairPayNudge = hourlyRate > 0 && hourlyRate < 42;

  // Berechnet den Multiplikator für die SOS-Funktion
  const currentMultiplier = useMemo(() => {
    if (!sosEnabled) return 1;
    return 1 + (sosBonus / 100);
  }, [sosEnabled, sosBonus]);

  const calculatedTotal = baseFee ? parseFloat(baseFee) * currentMultiplier : 0;

  // Validierung: Prüft, ob alle Pflichtfelder ausgefüllt sind (Datum und Standort inklusive)
  const isValid = title.length > 0 && category.length > 0 && location.length > 0 && baseFee !== '' && !isNaN(parseFloat(baseFee)) && timeStart.length > 0 && timeEnd.length > 0 && date.length > 0;

  /**
   * Füllt das Formular mit Testdaten für Demo-Zwecke.
   */
  const fillTestData = () => {
    setTitle('Vertretung Modern Jazz');
    setCategory('DANCE');
    setSpecificStyle('Jazz');
    setTimeStart('18:00');
    setTimeEnd('19:30');
    setBaseFee('45');
    setLocation('Studio 2, Berlin Kreuzberg');
    setDescription('Mittelstufe Kurs, Fokus auf Technik und kleine Choreo.');
  };

  /**
   * Erstellt das Job-Objekt und ruft die onPublish Callback-Funktion auf.
   */
  const handlePublish = () => {
    if (!isValid) return;
    let finalDescription = specificStyle ? `Stil: ${specificStyle}. ${description}` : description;

    let finalUrgency: UrgencyLevel = 'STANDARD';
    if (sosEnabled) {
      if (sosBonus >= 75) finalUrgency = 'SOS_LEVEL_3';
      else if (sosBonus >= 50) finalUrgency = 'SOS_LEVEL_2';
      else finalUrgency = 'SOS_LEVEL_1';
    }

    onPublish({
      title,
      category,
      date,
      timeStart,
      timeEnd: timeEnd,
      fee: parseFloat(baseFee),
      totalFee: calculatedTotal,
      location,
      description: finalDescription,
      urgency: finalUrgency,
      isExclusive: targetingMode === 'FAVORITES'
    });
  };

  /**
   * Handhabt Änderungen im Gage-Eingabefeld (nur Zahlen und Dezimalpunkt).
   */
  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setBaseFee(val);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-20 md:pb-10 relative">
      {/* Overlays rendern, falls sichtbar */}
      {showDatePicker && (
        <DatePickerOverlay
          currentDate={date}
          onClose={() => setShowDatePicker(false)}
          onSelect={setDate}
        />
      )}
      {showTimePickerStart && (
        <TimePickerOverlay
          initialTime={timeStart}
          onClose={() => setShowTimePickerStart(false)}
          onSelect={setTimeStart}
        />
      )}
      {showTimePickerEnd && (
        <TimePickerOverlay
          initialTime={timeEnd}
          onClose={() => setShowTimePickerEnd(false)}
          onSelect={setTimeEnd}
        />
      )}

      {/* Header Bereich: Titel und Buttons */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tighter">Job Posten</h2>
        <div className="flex gap-2">
          {IS_DEMO_MODE && !initialData && (
            <button
              onClick={fillTestData}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-black transition-colors"
            >
              <Sparkle size={14} /> TEST-DATEN
            </button>
          )}
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold hover:bg-white/5 transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>

      {/* Haupt-Formular Container */}
      <div className="space-y-8 bg-surfaceHighlight border border-white/5 p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-2xl">

        <div className="space-y-6">
          {/* Titel Eingabe */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-3">Was wird gesucht?</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Hip Hop Vertretung"
              className="w-full bg-black border border-white/10 rounded-2xl p-5 text-xl font-bold text-white placeholder-gray-700 focus:border-teal-500 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Standort Eingabefeld */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-3">Wo findet es statt?</label>
            <div className="relative group">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-teal-400 transition-colors" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="z.B. Urban Dance Academy, Studio 1"
                className="w-full bg-black border border-white/10 rounded-2xl pl-12 p-5 text-lg font-bold text-white placeholder-gray-700 focus:border-teal-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Grid: Kategorie & Datum */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-2 px-1">Kategorie</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value as JobCategory); setSpecificStyle(''); }}
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-teal-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="DANCE">Dance</option>
                  <option value="BODY_MIND">Body & Mind</option>
                  <option value="MUSIC_VOICE">Music & Voice</option>
                  <option value="EVENTS_FASHION">Events & Fashion</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-2 px-1">Datum</label>
              <div
                onClick={() => setShowDatePicker(true)}
                className="relative group cursor-pointer"
              >
                <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-teal-400 transition-colors" />
                <div className="w-full bg-black border border-white/10 rounded-2xl pl-12 p-4 text-white font-bold group-hover:border-teal-500/50 transition-all select-none flex items-center">
                  {date}
                </div>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Grid: Disziplin & Zeitraum */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-2 px-1">Disziplin</label>
              <div className="relative">
                <select
                  value={specificStyle}
                  onChange={(e) => setSpecificStyle(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-teal-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">- Bitte wählen -</option>
                  {DETAILED_STYLES[category]?.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="">
              <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-2 px-1">Zeitraum</label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 group cursor-pointer" onClick={() => setShowTimePickerStart(true)}>
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-teal-400 transition-colors" />
                  <div className={`w-full bg-black border border-white/10 rounded-2xl pl-12 p-4 outline-none text-center font-mono font-bold group-hover:border-teal-500/50 transition-all ${timeStart ? 'text-white' : 'text-gray-700'}`}>
                    {timeStart || '18:00'}
                  </div>
                </div>
                <span className="text-gray-700 font-bold">bis</span>
                <div className="relative flex-1 group cursor-pointer" onClick={() => setShowTimePickerEnd(true)}>
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-teal-400 transition-colors" />
                  <div className={`w-full bg-black border border-white/10 rounded-2xl pl-12 p-4 outline-none text-center font-mono font-bold group-hover:border-teal-500/50 transition-all ${timeEnd ? 'text-white' : 'text-gray-700'}`}>
                    {timeEnd || '19:30'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gage & Fair Pay Nudge */}
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-2 px-1">Basis Gage</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-600">€</span>
              <input
                type="text"
                inputMode="decimal"
                value={baseFee}
                onChange={handleFeeChange}
                placeholder="60.00"
                className="w-full bg-black border border-white/10 rounded-2xl p-4 pl-8 text-white font-mono font-bold focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          {showFairPayNudge && (
            <div className="animate-bounce-up bg-purple-900/10 border border-purple-500/20 rounded-2xl p-5 flex items-start gap-4 shadow-xl">
              <div className="p-2.5 bg-purple-500/20 rounded-xl">
                <Sparkles size={20} className="text-purple-400 fill-purple-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Gagen-Analyse</h4>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Dein Stundensatz von <span className="font-mono font-bold text-white">€{hourlyRate.toFixed(2)}</span> liegt unter dem Marktdurchschnitt. Erhöhe auf €42/Std. für 3x schnellere Buchungen.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Smart Targeting Section */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-teal-500/10 transition-all"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-500/20 rounded-xl text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">Smart Targeting</h3>
                <p className="text-xs text-gray-500">Wer soll den Job zuerst sehen?</p>
              </div>
            </div>
            <div className="flex bg-black border border-white/10 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setTargetingMode('ALL')}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetingMode === 'ALL' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                Alle Pros
              </button>
              <button
                onClick={() => setTargetingMode('FAVORITES')}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetingMode === 'FAVORITES' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-500 hover:text-white'}`}
              >
                Favoriten
              </button>
            </div>
          </div>
          
          {targetingMode === 'FAVORITES' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFavTarget('STARRED')}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all group/btn ${favTarget === 'STARRED' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-surfaceHighlight border-white/5 text-gray-500'}`}
                >
                  <div className={`p-3 rounded-full ${favTarget === 'STARRED' ? 'bg-teal-500 text-black' : 'bg-black text-gray-700'}`}>
                    <Star size={20} fill={favTarget === 'STARRED' ? 'currentColor' : 'none'} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Inner Circle (⭐)</span>
                </button>
                <button
                  onClick={() => setFavTarget('ALL_FAVS')}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all group/btn ${favTarget === 'ALL_FAVS' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-surfaceHighlight border-white/5 text-gray-500'}`}
                >
                  <div className={`p-3 rounded-full ${favTarget === 'ALL_FAVS' ? 'bg-teal-500 text-black' : 'bg-black text-gray-700'}`}>
                    <Users size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Alle Favoriten</span>
                </button>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/5">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                      <Clock size={14} className="text-teal-400" />Exklusiv-Fenster bis...
                    </div>
                    <div className="text-lg font-mono font-bold text-white bg-teal-500/20 px-3 py-1 rounded-lg border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                      {favUntilHours} Std. <span className="text-[10px] text-gray-500 font-sans uppercase">vor Beginn</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="48"
                    step="1"
                    value={favUntilHours}
                    onChange={(e) => setFavUntilHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>
                
                <div className="bg-surfaceHighlight border border-white/5 rounded-2xl p-5 flex items-center justify-between group/safety hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-gray-600 group-hover/safety:text-teal-400 transition-colors">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Auto-Radar Backup</h4>
                      <p className="text-[10px] text-gray-500">Bei {autoOpenHours} Std. vorher für alle öffnen.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAutoOpenHours(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-black hover:bg-white/10 flex items-center justify-center font-bold border border-white/10"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold w-6 text-center text-white">{autoOpenHours}h</span>
                    <button
                      onClick={() => setAutoOpenHours(prev => Math.min(favUntilHours - 1, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-black hover:bg-white/10 flex items-center justify-center font-bold border border-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SOS Feature Section */}
        <div className="border border-white/10 bg-black/40 rounded-[32px] p-6 md:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-colors ${sosEnabled ? 'bg-rose-500 text-black' : 'bg-rose-500/10 text-rose-500'}`}>
                <BellRing size={20} className={sosEnabled ? 'animate-pulse' : ''} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">SOS Feature</h3>
                <p className="text-xs text-gray-500">Automatische Gagen-Anpassung bei Zeitdruck.</p>
              </div>
            </div>
            <div
              onClick={() => setSosEnabled(!sosEnabled)}
              className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${sosEnabled ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-gray-800'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${sosEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {sosEnabled && (
            <div className="space-y-8 pt-4 border-t border-white/5 animate-fade-in relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock3 size={12} /> Aktivierung ab (Stunden)
                  </div>
                  <div className="text-lg font-mono font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">{sosHours}h</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSosHours(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-bold hover:bg-white/5"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="48"
                    step="1"
                    value={sosHours}
                    onChange={(e) => setSosHours(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <button
                    onClick={() => setSosHours(prev => Math.min(72, prev + 1))}
                    className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-bold hover:bg-white/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={12} /> Gage-Bonus (%)
                  </div>
                  <div className="text-lg font-mono font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/30">+{sosBonus}%</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSosBonus(prev => Math.max(0, prev - 5))}
                    className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-bold hover:bg-white/5"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={sosBonus}
                    onChange={(e) => setSosBonus(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <button
                    onClick={() => setSosBonus(prev => Math.min(100, prev + 5))}
                    className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-bold hover:bg-white/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 flex items-start gap-4">
                <Info size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic">
                  Falls der Job weniger als <span className="text-white">{sosHours}h</span> vor Beginn vergeben wird, erhöht sich die Gage automatisch um <span className="text-white">{sosBonus}%</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Gesamtbudget & Veröffentlichen Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Maximale Budget Belastung</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black font-mono text-white tracking-tighter">€{calculatedTotal.toFixed(2)}</span>
              {currentMultiplier > 1 && (
                <span className="text-[10px] px-2 py-1 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded font-black uppercase tracking-widest">Smart SOS</span>
              )}
            </div>
          </div>
          <button
            onClick={handlePublish}
            disabled={!isValid}
            className={`w-full md:w-auto px-12 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 ${isValid ? 'bg-white text-black hover:bg-teal-400' : 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5'}`}
          >
            <span>Job Veröffentlichen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Powered by StandIn Smart Engine v1.5</p>
      </div>
    </div>
  );
};