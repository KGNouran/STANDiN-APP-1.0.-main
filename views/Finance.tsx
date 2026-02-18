
import React, { useState } from 'react';
import { Plus, FileText, Wallet, DollarSign, ArrowRight, Lock, ShieldCheck, CheckCircle2, AlertTriangle, Building, CreditCard, ChevronDown, ChevronUp, Download, Zap, MoreHorizontal } from 'lucide-react';
import { UserProfile, Job } from '../types';

// --- SHARED HELPERS ---
const TransactionRow = ({ title, date, amount, status = 'PAID', type = 'IN', key }: { title: string, date: string, amount: number, status?: 'PAID' | 'OPEN' | 'PROCESSING' | 'COMPLETED', type?: 'IN' | 'OUT', key?: React.Key }) => (
    <div key={key} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors group cursor-pointer border-b border-white/5 last:border-0">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status === 'OPEN' ? 'bg-red-500/10 text-red-500' : 
                type === 'IN' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-gray-500'
            }`}>
                {status === 'OPEN' ? <AlertTriangle size={16} /> : (type === 'IN' ? <ArrowRight size={16} className="rotate-45"/> : <ArrowRight size={16} className="-rotate-45"/>)}
            </div>
            <div>
                <div className="font-bold text-sm text-white">{title}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    {date} 
                    {status === 'OPEN' && <span className="text-red-400 font-bold">• Fällig</span>}
                    {status === 'COMPLETED' && <span className="text-teal-500/60 font-bold">• Gutschrift</span>}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right">
                <div className={`font-mono text-sm font-bold ${type === 'IN' ? 'text-green-400' : 'text-white'}`}>
                    {type === 'IN' ? '+' : '-'}€{Math.abs(amount).toFixed(2)}
                </div>
                <div className={`text-[9px] uppercase font-bold tracking-wider ${status === 'PAID' || status === 'COMPLETED' ? 'text-green-500' : status === 'OPEN' ? 'text-red-500' : 'text-gray-500'}`}>
                    {status === 'COMPLETED' ? 'GUTGESCHRIEBEN' : status}
                </div>
            </div>
            <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all" title="PDF Download">
                <Download size={16} />
            </button>
        </div>
    </div>
);

// --- SCHOOL FINANCE VIEW ---
export const FinanceView = ({ user, onOpenInvoice }: { user: UserProfile, onOpenInvoice: () => void }) => {
    const [autoPay, setAutoPay] = useState(true);

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-20">
             <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-4xl font-bold tracking-tighter mb-1">Finance<span className="text-blue-500">HQ</span></h2>
                    <p className="text-gray-500">Unternehmensausgaben & Rechnungen.</p>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-300 flex items-center gap-2 transition-colors">
                    <FileText size={16} /> Jahresabschluss Export
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                 
                 {/* LEFT: BALANCE & ACTION */}
                 <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl h-full">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                     
                     <div className="relative z-10 mb-8">
                         <div className="flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-wider mb-3">
                             <Building size={16} className="text-blue-500"/> Offener Betrag
                         </div>
                         <div className="text-5xl font-bold font-mono text-white mb-2 tracking-tighter flex items-center gap-3">
                             €{Math.abs(user.balance).toFixed(2)}
                             {user.balance < 0 && <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg border border-red-500/30 tracking-normal">Fällig</span>}
                         </div>
                         <p className="text-xs text-gray-500">Nächster Abrechnungslauf: 01. Nächster Monat</p>
                     </div>

                     <div className="relative z-10 grid grid-cols-2 gap-4">
                         <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                             <div className="text-gray-500 text-xs font-bold uppercase mb-1">Offene Rechnungen</div>
                             <div className="text-2xl font-bold text-white">{user.openInvoices}</div>
                         </div>
                         <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl p-4 text-left transition-colors relative group overflow-hidden">
                             <div className="relative z-10">
                                <div className="text-blue-200 text-xs font-bold uppercase mb-1 flex items-center gap-1 group-hover:gap-2 transition-all">Jetzt Zahlen <ArrowRight size={12}/></div>
                                <div className="text-xl font-bold text-white">1-Click Pay</div>
                             </div>
                             <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                                 <Zap size={60} />
                             </div>
                         </button>
                     </div>
                 </div>

                 {/* RIGHT: PAYMENT METHOD */}
                 <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 relative group">
                     <div className="flex justify-between items-center mb-6">
                         <h3 className="font-bold text-lg text-white">Payment Method</h3>
                         <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors"><MoreHorizontal size={20}/></button>
                     </div>

                     <div className="bg-gradient-to-br from-gray-800 to-black border border-white/10 rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                         <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[40px]"></div>
                         <div className="flex justify-between items-start mb-8 relative z-10">
                             <div className="text-xs font-bold text-gray-400 tracking-widest">BUSINESS DEBIT</div>
                             <div className="font-bold text-lg italic text-white/80">VISA</div>
                         </div>
                         <div className="font-mono text-xl text-white tracking-widest mb-4 relative z-10 shadow-black drop-shadow-md">
                             •••• •••• •••• 4289
                         </div>
                         <div className="flex justify-between items-end relative z-10">
                             <div>
                                 <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Card Holder</div>
                                 <div className="text-xs font-bold text-gray-300 tracking-wider">UDA BERLIN GMBH</div>
                             </div>
                             <div className="text-right">
                                 <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Expires</div>
                                 <div className="text-xs font-bold text-gray-300">12/28</div>
                             </div>
                         </div>
                     </div>

                     <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                         <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${autoPay ? 'bg-green-500/20 text-green-500' : 'bg-gray-700 text-gray-400'}`}>
                                 <Zap size={14} className={autoPay ? "fill-green-500" : ""} />
                             </div>
                             <div>
                                 <div className="text-sm font-bold text-white">Auto-Pay</div>
                                 <div className="text-[10px] text-gray-500">Rechnungen sofort begleichen</div>
                             </div>
                         </div>
                         <div 
                            onClick={() => setAutoPay(!autoPay)}
                            className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${autoPay ? 'bg-green-500' : 'bg-gray-700'}`}
                         >
                             <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${autoPay ? 'translate-x-4' : 'translate-x-0'}`}></div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="bg-surfaceHighlight border border-white/5 rounded-3xl overflow-hidden">
                 <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
                     <div>
                        <h3 className="font-bold text-lg">Transaktionen</h3>
                        <p className="text-xs text-gray-500">Alle Zahlungen und Gutschriften im Überblick.</p>
                     </div>
                 </div>
                 <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                     <TransactionRow title="Hip Hop Vertretung (Urban)" date="02.12.2025" amount={-85.00} type="OUT" status="OPEN" />
                     <TransactionRow title="Monatsbeitrag Pro" date="01.12.2025" amount={-29.00} type="OUT" status="PAID" />
                 </div>
             </div>
        </div>
    );
};

// --- TRAINER WALLET VIEW ---
export const TrainerWalletView = ({ user, onUpdateProfile, completedJobs = [] }: { user: UserProfile, onUpdateProfile: (data: Partial<UserProfile>) => void, completedJobs?: Job[] }) => {
    const [isTaxEditing, setIsTaxEditing] = useState(false);
    const [taxData, setTaxData] = useState({
        taxId: user.taxId || '',
        isSmallBusiness: user.isSmallBusiness || false,
        iban: user.iban || '',
        legalAddress: user.legalAddress || ''
    });

    const verificationLevel = user.verificationLevel || 1;
    const isLevel2Ready = taxData.iban.length > 5 && taxData.taxId.length > 5 && taxData.legalAddress.length > 5;

    const handleSaveTax = () => {
        onUpdateProfile({ 
            taxId: taxData.taxId, 
            isSmallBusiness: taxData.isSmallBusiness, 
            iban: taxData.iban,
            legalAddress: taxData.legalAddress,
            verificationLevel: isLevel2Ready ? 2 : 1 
        });
        setIsTaxEditing(false);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-20">
            {/* HERO: BALANCE CARD */}
            <div className="bg-gradient-to-br from-surfaceHighlight to-black border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                     <div>
                         <div className="flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">
                             <Wallet size={16} className="text-green-500"/> Verfügbares Guthaben
                         </div>
                         <div className="text-5xl md:text-6xl font-bold font-mono text-white mb-2 tracking-tighter">
                             €{user.balance.toFixed(2)}
                         </div>
                         <p className="text-xs text-gray-500">Berechnet aus {completedJobs.length} abgeschlossenen Jobs.</p>
                     </div>

                     <div className="w-full md:w-auto">
                        {verificationLevel < 2 ? (
                            <div className="group relative">
                                <button disabled className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-gray-500 rounded-2xl font-bold flex items-center justify-center gap-3 cursor-not-allowed">
                                    <Lock size={18} /> Auszahlen
                                </button>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-black border border-white/20 p-2 rounded-lg text-[10px] text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    Verifiziere dich für Level 2 um Auszahlungen zu aktivieren.
                                </div>
                            </div>
                        ) : (
                            <button className="w-full md:w-auto px-8 py-4 bg-green-500 text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                <ArrowRight size={18} /> Jetzt Auszahlen
                            </button>
                        )}
                     </div>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck size={20} className="text-teal-400"/> Verification Status</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${verificationLevel === 2 ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'}`}>
                                Level {verificationLevel}
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div className="flex-1"><div className="font-bold text-white text-sm">Level 1: Basic Access</div><div className="text-xs text-gray-400">Email bestätigt. Jobs annehmen erlaubt.</div></div>
                            </div>
                            <div className="ml-4 w-0.5 h-6 bg-white/10"></div>
                            <div className={`flex items-center gap-4 ${verificationLevel === 2 ? 'opacity-100' : 'opacity-100'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${verificationLevel === 2 ? 'bg-green-500 border-green-500 text-black' : 'bg-transparent border-yellow-500 text-yellow-500'}`}>
                                    {verificationLevel === 2 ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">2</span>}
                                </div>
                                <div className="flex-1"><div className="font-bold text-white text-sm">Level 2: Payout Ready</div><div className="text-xs text-gray-400">Steuerdaten & Bankverbindung hinterlegen.</div></div>
                                {verificationLevel < 2 && (
                                    <button onClick={() => setIsTaxEditing(true)} className="px-3 py-1.5 bg-yellow-500 text-black rounded-lg text-xs font-bold hover:bg-yellow-400 transition-colors">Vervollständigen</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-6">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Building size={20} className="text-blue-400"/> Steuer & Abrechnung</h3>
                            <button onClick={() => isTaxEditing ? handleSaveTax() : setIsTaxEditing(true)} className="text-xs font-bold text-blue-400 hover:text-white">{isTaxEditing ? 'SPEICHERN' : 'BEARBEITEN'}</button>
                        </div>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl border transition-colors ${taxData.isSmallBusiness ? 'bg-blue-500/10 border-blue-500/30' : 'bg-black/30 border-white/10'}`}>
                                <div className="flex justify-between items-start"><div className="flex items-start gap-3"><div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${taxData.isSmallBusiness ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`} onClick={() => isTaxEditing && setTaxData(prev => ({...prev, isSmallBusiness: !prev.isSmallBusiness}))}>{taxData.isSmallBusiness && <CheckCircle2 size={14} className="text-white"/>}</div><div><div className="font-bold text-sm text-white">Kleinunternehmer (§19 UStG)</div><div className="text-xs text-gray-400 mt-1">Ich weise keine Umsatzsteuer auf meinen Rechnungen aus.</div></div></div></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Steuernummer / USt-ID</label><input disabled={!isTaxEditing} value={taxData.taxId} onChange={e => setTaxData({...taxData, taxId: e.target.value})} className={`w-full bg-black/30 border rounded-xl p-3 text-sm text-white outline-none ${isTaxEditing ? 'border-blue-500/50 focus:border-blue-500' : 'border-white/10 text-gray-400'}`} placeholder="z.B. 12/345/67890"/></div>
                                <div><label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">IBAN (für Auszahlung)</label><input disabled={!isTaxEditing} value={taxData.iban} onChange={e => setTaxData({...taxData, iban: e.target.value})} className={`w-full bg-black/30 border rounded-xl p-3 text-sm text-white font-mono outline-none ${isTaxEditing ? 'border-blue-500/50 focus:border-blue-500' : 'border-white/10 text-gray-400'}`} placeholder="DE00 0000 0000 0000 00"/></div>
                            </div>
                            <div><label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Rechnungsadresse</label><input disabled={!isTaxEditing} value={taxData.legalAddress} onChange={e => setTaxData({...taxData, legalAddress: e.target.value})} className={`w-full bg-black/30 border rounded-xl p-3 text-sm text-white outline-none ${isTaxEditing ? 'border-blue-500/50 focus:border-blue-500' : 'border-white/10 text-gray-400'}`} placeholder="Straße, PLZ, Stadt"/></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-surfaceHighlight border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/5 bg-black/20">
                            <h3 className="font-bold text-lg">Dokumente</h3>
                            <p className="text-xs text-gray-500">Deine Gutschriften aus dem System.</p>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar min-h-[400px]">
                            {completedJobs.length > 0 ? (
                                completedJobs.map(job => (
                                    <TransactionRow 
                                        key={job.id} 
                                        title={job.title} 
                                        date={formatDate(job.createdAt)} 
                                        amount={Number(job.salary) || Number(job.totalFee) || 0} 
                                        status="COMPLETED"
                                        type="IN"
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center text-gray-700 h-full flex flex-col items-center justify-center">
                                    <FileText size={48} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Keine abgeschlossenen Jobs</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-white/5 text-center bg-black/10">
                            <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Archiv öffnen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
