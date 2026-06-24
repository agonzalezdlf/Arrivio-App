import React, { useState } from 'react';
import { 
  Check, Calendar, Clock, Bell, RefreshCw, Send, MapPin, 
  ArrowRight, Sparkles, Smartphone, ChevronRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { SIMULATION_PERSONAS } from '../CustomerSimulator';

export function MVPCustomer() {
  const [personaKey, setPersonaKey] = useState<string>('elena');
  const activePersona = SIMULATION_PERSONAS[personaKey];

  const [simState, setSimState] = useState<'sms' | 'matrix' | 'done'>('sms');
  const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedHour, setSelectedHour] = useState('11 AM - 12 PM');

  const confirmPreferences = () => {
    setSimState('done');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8 text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Persona Select */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#2563EB] font-mono">Demo Cohort</span>
            <h3 className="text-[17px] font-black leading-none mt-1">Select Active Recipient</h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Toggle between recipients to check how the availability matrix updates to reflect their respective constraints.
            </p>

            <div className="space-y-2 mt-4">
              {Object.entries(SIMULATION_PERSONAS).map(([key, item]) => (
                <button
                  key={key}
                  disabled={simState === 'done'}
                  onClick={() => {
                    setPersonaKey(key);
                    setSimState('sms');
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    personaKey === key 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                  }`}
                >
                  <h5 className="text-[12.5px] font-bold leading-none">{(item as any).name}</h5>
                  <p className="text-[10px] text-slate-400 mt-1">{(item as any).address}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Handheld simulator with matrix */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm aspect-[1/2.05] bg-slate-950 md:border-[10px] border-slate-900 rounded-[38px] shadow-2xl relative overflow-hidden flex flex-col">
            
            <div className="flex-1 bg-white relative flex flex-col overflow-hidden pt-6 pb-2 text-left">
              
              {simState === 'sms' && (
                <div className="flex-1 flex flex-col justify-between p-4 bg-slate-900 text-white animate-fade-in">
                  <div className="pt-4 text-center">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black">Outbound SMS Sync Notify</span>
                    <h4 className="text-[20px] font-black text-[#38BDF8] mt-1 uppercase italic">Sync Invitation</h4>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 space-y-3 shadow-md my-auto hover:bg-slate-750 transition-all cursor-pointer active:scale-98"
                       onClick={() => setSimState('matrix')}>
                    <div className="flex justify-between items-center text-[8px] font-mono uppercase text-[#38BDF8] tracking-wider">
                      <span>ARRIVIO NODE SECURE</span>
                      <span>Just Now</span>
                    </div>
                    <p className="text-[11px] leading-normal text-slate-200 font-semibold">
                      Your SEUR carrier package is en-route. Prevent delay by syncing your week availability matrix.
                    </p>
                    <div className="p-2 bg-blue-950 border border-blue-900 rounded-xl text-[10.5px] font-mono text-blue-300 flex justify-between items-center">
                      <span>node.arrivio.es/secure-sync</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[10.5px] text-[#38BDF8] font-bold tracking-widest animate-pulse uppercase">
                      👆 TAP SCREEN TO LAUNCH MATRIX Portal
                    </span>
                  </div>
                </div>
              )}

              {simState === 'matrix' && (
                <div className="flex-1 flex flex-col justify-between p-4 animate-in slide-in-from-bottom max-h-full overflow-hidden">
                  <div className="space-y-3.5 min-h-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[8.5px] font-mono bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full font-black uppercase">
                          SEUR MADRID
                        </span>
                      </div>
                      <h4 className="text-[13.5px] font-black tracking-tight text-slate-900">
                        Indicate Preferred Hours
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Tap safe slots to align delivery and avoid courier missed attempts.
                      </p>
                    </div>

                    {/* Matrix Mon-Tue-Wed */}
                    <div className="border border-slate-250 rounded-xl overflow-hidden bg-white shadow-xs text-left min-h-0 flex-1 flex flex-col mt-2">
                      <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 text-center text-[9px] font-mono font-black py-2">
                        <div className="text-slate-400 border-r border-[#E2E8F0]">CEST</div>
                        {['MON', 'TUE', 'WED'].map(d => (
                          <div key={d} className="text-slate-600">{d}</div>
                        ))}
                      </div>

                      <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
                        {[
                          '9 AM - 10 AM',
                          '10 AM - 11 AM',
                          '11 AM - 12 PM',
                          '12 PM - 1 PM',
                          '3 PM - 4 PM'
                        ].map((hour) => {
                          const label = hour.split(' - ')[0];
                          return (
                            <div key={hour} className="grid grid-cols-4 h-9">
                              <div className="text-[8.5px] font-mono text-slate-400 font-bold bg-slate-50/50 flex items-center justify-center border-r border-[#E2E8F0]">
                                {label}
                              </div>
                              {['MON', 'TUE', 'WED'].map(d => {
                                const isSelected = selectedDay === d && selectedHour === hour;
                                return (
                                  <button
                                    key={d}
                                    type="button"
                                    onClick={() => {
                                      setSelectedDay(d);
                                      setSelectedHour(hour);
                                    }}
                                    className={cn(
                                      "relative flex items-center justify-center transition-all cursor-pointer h-full border-r border-slate-100 last:border-0",
                                      isSelected ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
                                    )}
                                  >
                                    {isSelected ? (
                                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                                      </div>
                                    ) : (
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview lock highlight */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[10px] space-y-1">
                      <div className="font-extrabold flex items-center gap-1.5 text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        Preferred: {selectedDay} during {selectedHour}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={confirmPreferences}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all hover:bg-blue-500 shadow-md cursor-pointer mt-3"
                  >
                    Commit Selected Slot
                  </button>
                </div>
              )}

              {simState === 'done' && (
                <div className="flex-1 flex flex-col justify-between p-5 bg-slate-900 text-white text-center animate-in zoom-in-95">
                  <div className="my-auto space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto shadow-md">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-black tracking-tight leading-none uppercase">Preference Locked!</h4>
                      <p className="text-[11px] text-slate-400 mt-2 leading-normal">
                        Your preferred window has been registered. SEUR logistics node updated carrier scheduling for this delivery run safely.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1 text-left text-[11px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Carrier ID:</span>
                        <span className="font-bold text-indigo-300">SEUR MADRID</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Locked Slot:</span>
                        <span className="font-extrabold text-yellow-300 italic">{selectedHour} ({selectedDay})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSimState('sms');
                    }}
                    className="text-[9.5px] uppercase font-black text-slate-400 hover:text-white underline decoration-dotted tracking-wider cursor-pointer"
                  >
                    ← Simulate Another Slot
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Home lines bar */}
            <div className="h-4 bg-slate-950 flex items-center justify-center">
              <div className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
