
import React, { useState } from 'react';
import { 
    ChevronRight, Shield, FileText, Bell, Smartphone, Moon, Sun, 
    HelpCircle, LogOut, Lock, User, Check, X, ArrowLeft, Mail, 
    RefreshCw, Calendar, Globe, Database, Loader2
} from 'lucide-react';
import { UserProfile } from '../types';

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4 px-2">
        {title}
    </div>
);

const SettingRow = ({ 
    icon: Icon, 
    label, 
    value, 
    type = 'link', 
    onClick 
}: { 
    icon: any, 
    label: string, 
    value?: string | boolean, 
    type?: 'link' | 'toggle' | 'info', 
    onClick?: () => void 
}) => {
    return (
        <div 
            onClick={type !== 'info' ? onClick : undefined}
            className={`flex items-center justify-between p-4 bg-surfaceHighlight border-b border-white/5 first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-white/5 transition-colors ${type !== 'info' ? 'cursor-pointer' : ''}`}
        >
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gray-400">
                    <Icon size={16} />
                </div>
                <span className="font-bold text-sm text-gray-200">{label}</span>
            </div>
            
            <div className="flex items-center gap-2">
                {type === 'toggle' && (
                  <div 
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${value ? 'bg-teal-500' : 'bg-gray-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${value ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                )}
                {type === 'link' && (
                    <ChevronRight size={16} className="text-gray-600" />
                )}
                {type === 'info' && value && (
                    <span className="text-xs text-gray-500 font-mono">{value.toString()}</span>
                )}
            </div>
        </div>
    );
};

const LegalModal = ({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col animate-bounce-up shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText size={20} className="text-gray-400"/> {title}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                    {content}
                </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end">
                <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">Schließen</button>
            </div>
        </div>
    </div>
);

// --- MAIN SETTINGS VIEW ---

export const SettingsView = ({ user, onLogout, onNavigate }: { user: UserProfile, onLogout: () => void, onNavigate: (tab: string) => void }) => {
    // Local State for Toggles
    const [settings, setSettings] = useState({
        push: true,
        email: true,
        faceId: false,
        darkMode: true
    });

    // Integration States
    const [integrations, setIntegrations] = useState<Record<string, { status: 'idle' | 'connecting' | 'connected', lastSync?: string }>>({
      mindbody: { status: 'idle' },
      eversports: { status: 'idle' },
      google: { status: 'idle' },
      apple: { status: 'idle' }
    });

    const [activeModal, setActiveModal] = useState<{title: string, content: React.ReactNode} | null>(null);

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleConnect = (id: string) => {
      setIntegrations(prev => ({
        ...prev,
        [id]: { ...prev[id], status: 'connecting' }
      }));

      // Simulate connection logic
      setTimeout(() => {
        setIntegrations(prev => ({
          ...prev,
          [id]: { status: 'connected', lastSync: 'Just now' }
        }));
      }, 2000);
    };

    // --- DUMMY CONTENT GENERATORS ---
    const getImpressum = () => (
        <>
            <h3>Angaben gemäß § 5 TMG</h3>
            <p>StandIn Platform GmbH<br />Musterstraße 1<br />10115 Berlin</p>
            <p><strong>Vertreten durch:</strong><br />Max Mustermann (CEO)</p>
            <p><strong>Kontakt:</strong><br />Telefon: +49 (0) 123 44 55 66<br />E-Mail: support@standin.app</p>
            <p><strong>Registereintrag:</strong><br />Eintragung im Handelsregister.<br />Registergericht: Amtsgericht Charlottenburg<br />Registernummer: HRB 123456</p>
            <p><strong>Umsatzsteuer-ID:</strong><br />Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />DE 999 999 999</p>
        </>
    );

    const getPrivacy = () => (
        <>
            <h3>Datenschutzerklärung</h3>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            <h4>1. Datenerfassung in unserer App</h4>
            <p>Die Datenverarbeitung auf dieser App erfolgt durch den App-Betreiber. Die Kontaktdaten können Sie dem Impressum dieser App entnehmen.</p>
            <h4>2. FaceID & Biometrie</h4>
            <p>Die Nutzung von FaceID erfolgt lokal auf Ihrem Endgerät. Biometrische Daten werden nicht an unsere Server übertragen.</p>
            <h4>3. Standortdaten</h4>
            <p>Standortdaten werden nur für die Funktion "Check-In" und "Radar" verwendet und nicht permanent gespeichert.</p>
        </>
    );

    return (
        <div className="animate-fade-in max-w-2xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => onNavigate('dashboard')} className="p-2 hover:bg-white/10 rounded-full md:hidden">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Einstellungen</h1>
                    <p className="text-gray-500">App-Präferenzen & Rechtliches</p>
                </div>
            </div>

            {/* Account Section */}
            <SectionHeader title="Account" />
            <div className="rounded-2xl overflow-hidden border border-white/5">
                <div className="p-4 bg-surfaceHighlight flex items-center gap-4 border-b border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center font-bold text-black shadow-lg">
                        {user.avatarInitials}
                    </div>
                    <div>
                        <div className="font-bold text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{user.id} • {user.role}</div>
                    </div>
                    <button 
                        onClick={() => onNavigate(user.role === 'TRAINER' ? 'profile' : 'myspace')}
                        className="ml-auto px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors"
                    >
                        Profil
                    </button>
                </div>
                <SettingRow icon={User} label="Persönliche Daten" onClick={() => onNavigate(user.role === 'TRAINER' ? 'profile' : 'myspace')} />
                <SettingRow icon={Lock} label="Passwort ändern" onClick={() => {}} />
            </div>

            {/* INTEGRATIONS & SYNC */}
            <SectionHeader title="Integrations & Sync" />
            <div className="bg-surfaceHighlight border border-white/5 rounded-2xl overflow-hidden p-6">
              <h3 className="font-bold text-white mb-1">Connect your Management Software</h3>
              <p className="text-xs text-gray-500 mb-6">Synchronisiere deinen Stundenplan automatisch.</p>
              
              <div className="space-y-4">
                {/* Integration List */}
                {[
                  { id: 'mindbody', name: 'Mindbody', icon: Database, color: 'text-orange-500' },
                  { id: 'eversports', name: 'Eversports', icon: Globe, color: 'text-blue-400' },
                  { id: 'google', name: 'Google Calendar', icon: Calendar, color: 'text-red-400' },
                  { id: 'apple', name: 'Apple iCal', icon: Calendar, color: 'text-gray-300' },
                ].map((item) => {
                  const state = integrations[item.id];
                  return (
                    <div key={item.id} className="flex flex-col gap-2 p-4 bg-black/40 border border-white/5 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${item.color}`}>
                            <item.icon size={16} />
                          </div>
                          <span className="font-bold text-sm text-white">{item.name}</span>
                        </div>
                        
                        {state.status === 'connected' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Connected ✅</span>
                          </div>
                        ) : state.status === 'connecting' ? (
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-lg border border-white/10">
                            <Loader2 size={12} className="animate-spin text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Connecting...</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleConnect(item.id)}
                            className="px-4 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-400 transition-colors"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                      
                      {state.status === 'connected' && (
                        <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-1">
                          <div className="text-[10px] text-gray-500 font-mono">Last sync: {state.lastSync}</div>
                          {item.id === 'google' && (
                            <div className="mt-1 flex gap-2 items-start p-2 bg-teal-500/5 rounded-lg border border-teal-500/10">
                              <RefreshCw size={10} className="text-teal-400 mt-0.5" />
                              <p className="text-[9px] text-teal-200/60 leading-tight">
                                Wir blockieren automatisch Räume in STANDiN, die in deinem Google Kalender belegt sind.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* App Settings */}
            <SectionHeader title="App Einstellungen" />
            <div className="rounded-2xl overflow-hidden border border-white/5">
                <SettingRow 
                    icon={Bell} 
                    label="Push-Benachrichtigungen" 
                    type="toggle" 
                    value={settings.push} 
                    onClick={() => toggle('push')} 
                />
                <SettingRow 
                    icon={Smartphone} 
                    label="FaceID Login" 
                    type="toggle" 
                    value={settings.faceId} 
                    onClick={() => toggle('faceId')} 
                />
                 <SettingRow 
                    icon={settings.darkMode ? Moon : Sun} 
                    label="Dark Mode" 
                    type="toggle" 
                    value={settings.darkMode} 
                    onClick={() => toggle('darkMode')} 
                />
            </div>

            {/* Legal */}
            <SectionHeader title="Rechtliches" />
            <div className="rounded-2xl overflow-hidden border border-white/5">
                <SettingRow 
                    icon={FileText} 
                    label="Impressum" 
                    onClick={() => setActiveModal({ title: 'Impressum', content: getImpressum() })} 
                />
                <SettingRow 
                    icon={Shield} 
                    label="Datenschutzerklärung" 
                    onClick={() => setActiveModal({ title: 'Datenschutz', content: getPrivacy() })} 
                />
                <SettingRow 
                    icon={FileText} 
                    label="AGB (Allgemeine Geschäftsbedingungen)" 
                    onClick={() => setActiveModal({ title: 'AGB', content: <p>Platzhalter für Allgemeine Geschäftsbedingungen...</p> })} 
                />
                 <SettingRow 
                    icon={ArrowLeft} 
                    label="Widerrufsbelehrung" 
                    onClick={() => setActiveModal({ title: 'Widerrufsbelehrung', content: <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen...</p> })} 
                />
            </div>

            {/* Support */}
            <SectionHeader title="Support" />
            <div className="rounded-2xl overflow-hidden border border-white/5">
                <SettingRow 
                    icon={HelpCircle} 
                    label="Hilfe Center" 
                    onClick={() => {}} 
                />
                <SettingRow 
                    icon={Mail} 
                    label="Problem melden" 
                    onClick={() => window.location.href = 'mailto:support@standin.app'} 
                />
            </div>

            {/* Meta */}
            <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4 cursor-pointer hover:bg-red-500/10 hover:text-red-500 transition-colors" onClick={onLogout}>
                    <LogOut size={14} />
                    <span className="text-xs font-bold">Abmelden</span>
                </div>
                <p className="text-[10px] text-gray-600 font-mono">StandIn App v1.0.2 (Build 492)</p>
            </div>

            {/* MODAL RENDERER */}
            {activeModal && (
                <LegalModal 
                    title={activeModal.title} 
                    content={activeModal.content} 
                    onClose={() => setActiveModal(null)} 
                />
            )}
        </div>
    );
};
