import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Bell, Calendar, Clock, Check, RefreshCw, 
  BrainCircuit, ArrowRight, ShieldCheck, Sparkles, CheckCircle, 
  MapPin, Send, User, ChevronRight, Info, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface Persona {
  id: string;
  name: string;
  roleDescription: string;
  phone: string;
  address: string;
  postal: string;
  item: string;
  store: string;
  price: string;
  initialStopOrder: number;
  newStopOrder: number;
}

export const SIMULATION_PERSONAS: Record<string, Persona> = {
  elena: {
    id: 'PRM-84952-MAD',
    name: 'Elena Marín (Residential)',
    roleDescription: 'Working professional. Needs home delivery in Chamartín after office hours.',
    phone: '+34 699 412 855',
    address: 'Calle Hiedra 14, 4ºB',
    postal: '28016 (Chamartín)',
    item: 'Chanel No.5 & Dior Sauvage Luxury Bundle',
    store: 'Primor Madrid Flagship',
    price: '€184.50',
    initialStopOrder: 6,
    newStopOrder: 2
  },
  carlos: {
    id: 'PRM-38914-MAD',
    name: 'Carlos Ruiz (Salamanca Business)',
    roleDescription: 'Corporate Manager. Needs office tower package reception in Salamanca district.',
    phone: '+34 622 108 591',
    address: 'Paseo de la Castellana 112',
    postal: '28046 (Salamanca)',
    item: 'Giorgio Armani Code & Cleansing Kit',
    store: 'Primor Goya Store',
    price: '€129.00',
    initialStopOrder: 8,
    newStopOrder: 3
  },
  sofia: {
    id: 'PRM-19522-MAD',
    name: 'Sofía Alarcón (Centro Pedestrian)',
    roleDescription: 'Boutique Owner. Lives in pedestrian Sol zone with tight commercial access laws.',
    phone: '+34 605 982 173',
    address: 'Calle de Atocha 73',
    postal: '28012 (Centro)',
    item: 'Hermès Terre d\'Hermès Perfume',
    store: 'Primor Sol Outlet',
    price: '€95.00',
    initialStopOrder: 4,
    newStopOrder: 1
  }
};

export const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const HOUR_SLOTS = [
  '8 AM - 9 AM',
  '9 AM - 10 AM',
  '10 AM - 11 AM',
  '11 AM - 12 PM',
  '12 PM - 1 PM',
  '1 PM - 2 PM',
  '2 PM - 3 PM',
  '3 PM - 4 PM',
  '4 PM - 5 PM',
  '5 PM - 6 PM'
];

export function getCellDetails(personaKey: string, day: string, hourSlot: string) {
  const d = day.toUpperCase();
  const isWeekend = d === 'SUN' || d === 'SAT';

  if (personaKey === 'elena') {
    if (isWeekend) {
      return {
        level: 'optimal' as const,
        prob: 98,
        reason: 'Weekend. Fully present at residential address.'
      };
    } else {
      if (hourSlot.includes('4 PM') || hourSlot.includes('5 PM')) {
        return {
          level: 'optimal' as const,
          prob: 95,
          reason: 'Post-office evening hours. Confirmed home presence.'
        };
      } else if (hourSlot.includes('12 PM') || hourSlot.includes('1 PM') || hourSlot.includes('2 PM') || hourSlot.includes('3 PM')) {
        return {
          level: 'moderate' as const,
          prob: 60,
          reason: 'Midday hybrid slot. Intermittent home-office presence.'
        };
      } else {
        return {
          level: 'low' as const,
          prob: 25,
          reason: 'Away at office headquarters in Chamartín.'
        };
      }
    }
  } else if (personaKey === 'carlos') {
    if (isWeekend) {
      return {
        level: 'low' as const,
        prob: 5,
        reason: 'Corporate offices closed for weekends.'
      };
    } else {
      if (hourSlot.includes('5 PM') || hourSlot.includes('8 AM')) {
        return {
          level: 'moderate' as const,
          prob: 65,
          reason: 'Office closing hours or breakfast operations window.'
        };
      } else {
        return {
          level: 'optimal' as const,
          prob: 99,
          reason: 'Standard office hours. Reception desk open.'
        };
      }
    }
  } else {
    if (d === 'SUN') {
      return {
        level: 'low' as const,
        prob: 5,
        reason: 'Atocha pedestrian boutique is closed on Sundays.'
      };
    } else {
      if (hourSlot.includes('12 PM') || hourSlot.includes('1 PM') || hourSlot.includes('2 PM') || hourSlot.includes('3 PM')) {
        return {
          level: 'optimal' as const,
          prob: 94,
          reason: 'Approved commercial transit and loading zone window active.'
        };
      } else if (hourSlot.includes('8 AM') || hourSlot.includes('9 AM') || hourSlot.includes('10 AM') || hourSlot.includes('11 AM')) {
        return {
          level: 'low' as const,
          prob: 30,
          reason: 'Centro Madrid strict heavy-vehicle commercial transit restrictions apply.'
        };
      } else {
        return {
          level: 'moderate' as const,
          prob: 70,
          reason: 'High pedestrian lane rush. Impeded van access.'
        };
      }
    }
  }
}

export function CustomerSimulator({ pitchStage = 'scale' }: { pitchStage?: 'poc' | 'mvp' | 'scale' }) {
  const [personaKey, setPersonaKey] = useState<string>('elena');
  const activePersona = SIMULATION_PERSONAS[personaKey] || SIMULATION_PERSONAS.elena;

  // Simulation steps State flow
  // 'idle' -> 'notified_sms' -> 'customer_portal' -> 'fully_synced'
  const [simState, setSimState] = useState<'idle' | 'notified_sms' | 'customer_portal' | 'fully_synced'>('idle');
  const [isSending, setIsSending] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Selected Day and Hour coordinate
  const [selectedDay, setSelectedDay] = useState<string>('MON');
  const [selectedHour, setSelectedHour] = useState<string>('5 PM - 6 PM');

  const activeCellObj = getCellDetails(personaKey, selectedDay, selectedHour);

  const [simLogs, setSimLogs] = useState<{ time: string; text: string; type: 'info' | 'success' | 'warning' }[]>([
    { time: '20:41:32', text: 'Persona simulation sandbox initiated.', type: 'info' }
  ]);

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const stamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setSimLogs(prev => [{ time: stamp, text, type }, ...prev]);
  };

  // Reset simulator state when switching personas
  useEffect(() => {
    setSimState('idle');
    // Set typical optimal starting cells for each persona
    if (personaKey === 'elena') {
      setSelectedDay('MON');
      setSelectedHour('5 PM - 6 PM');
    } else if (personaKey === 'carlos') {
      setSelectedDay('MON');
      setSelectedHour('10 AM - 11 AM');
    } else {
      setSelectedDay('MON');
      setSelectedHour('12 PM - 1 PM');
    }
    setSimLogs([
      { time: new Date().toLocaleTimeString('en-GB', { hour12: false }), text: `Avatar loaded: ${activePersona.name}. Ready for simulation run.`, type: 'info' }
    ]);
  }, [personaKey]);

  // Handle Dispatch Simulation Trigger
  const triggerSimulation = () => {
    setIsSending(true);
    addLog(`Filing merchant order request for ${activePersona.name} (${activePersona.id})`, 'info');
    
    setTimeout(() => {
      setIsSending(false);
      setSimState('notified_sms');
      addLog(`Package pre-calculated as STOP #${activePersona.initialStopOrder} on SEUR Central hub line.`, 'info');
      addLog(`Secure SMS token dispatched to mobile line ${activePersona.phone}`, 'success');
    }, 1000);
  };

  const handleOpenSms = () => {
    setSimState('customer_portal');
    addLog(`Customer tapped SMS webhook link. Initiating secure client portal session...`, 'info');
  };

  const commitSynchronize = () => {
    setIsSyncing(true);
    addLog(`Submitting newly selected client slot preference: ${selectedDay} during ${selectedHour}`, 'info');
    
    setTimeout(() => {
      setIsSyncing(false);
      setSimState('fully_synced');
      addLog(`Hermética Neural Solver recalculated courier stops! Staging optimized Stop sequence from Stop #${activePersona.initialStopOrder} down to Stop #${activePersona.newStopOrder}.`, 'success');
      addLog(`Courier route updated. Carrier ETA reliability logged at ${activeCellObj.prob}% confidence.`, 'success');
    }, 1200);
  };

  const resetAll = () => {
    setSimState('idle');
    setSimLogs([
      { time: new Date().toLocaleTimeString('en-GB', { hour12: false }), text: 'Simulation reset complete. Select a persona to test the flow.', type: 'info' }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Upper Title Section */}
      <header className="px-4 md:px-8 py-5 border-b border-[#E2E8F0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 select-none shrink-0">
        <div>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            Interactive Customer Touchpoints
          </span>
          <h1 className="text-[20px] font-black text-[#1E293B] mt-1">End-Customer Portal & SMS Sync</h1>
          <p className="text-[12px] text-slate-500 font-medium whitespace-normal">
            Interact with the simulated SMS notification to experience how customers select their availability matrix, automatically updating the delivery route.
          </p>
        </div>

        <button 
          onClick={resetAll}
          className="px-4 py-2 text-[11px] font-black uppercase text-slate-700 hover:text-slate-900 border border-slate-250 bg-white rounded-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Simulation
        </button>
      </header>

      {/* Primary Simulator Workspace Layout */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* CONTROL SECTION (LOGISTICS CONSOLE) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Choose Simulation Scenario Persona Panel */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm text-left space-y-4">
              <div>
                <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest font-mono block">Simulation Setup</span>
                <h3 className="text-[17px] font-black text-slate-900 tracking-tight mt-1">Choose Your Simulation Persona</h3>
                <p className="text-[11.5px] text-slate-500 font-medium">
                  Select a persona profile representing a real customer scenario in Madrid. Each persona features unique scheduling demands and delivery locations.
                </p>
              </div>

              {/* Persona Chooser Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {(Object.keys(SIMULATION_PERSONAS) as Array<keyof typeof SIMULATION_PERSONAS>).map((key) => {
                  const item = SIMULATION_PERSONAS[key];
                  const isSel = personaKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPersonaKey(key)}
                      disabled={simState !== 'idle'}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-40",
                        isSel 
                          ? "bg-slate-900 border-slate-900 shadow-md transform text-white scale-[1.01]" 
                          : "bg-white border-slate-200 hover:border-slate-350 cursor-pointer disabled:opacity-50 text-slate-800"
                      )}
                    >
                      <div className="space-y-1">
                        <span className={cn(
                          "text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded tracking-widest block w-fit",
                          isSel ? "bg-white/10 text-blue-300" : "bg-slate-100 text-slate-500"
                        )}>
                          MAD-NODE
                        </span>
                        <h4 className="text-[12.5px] font-black leading-tight mt-1 truncate">{item.name}</h4>
                        <p className={cn("text-[9.5px] line-clamp-2 leading-snug", isSel ? "text-slate-350" : "text-slate-500")}>
                          {item.roleDescription}
                        </p>
                      </div>

                      <div className={cn("pt-2.5 border-t text-[10px] space-y-0.5", isSel ? "border-white/10" : "border-slate-100")}>
                        <div className="flex justify-between font-mono">
                          <span className={isSel ? "text-slate-400" : "text-slate-400"}>VALUE:</span>
                          <span className="font-bold">{item.price}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Trigger Button */}
              <div className="pt-2">
                {simState === 'idle' ? (
                  <button
                    onClick={triggerSimulation}
                    disabled={isSending}
                    className="w-full h-13 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating Notification Code...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Assign & Trigger SMS Webhook Scenario
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between text-[11.5px] text-emerald-800 font-semibold">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      SIMULATION TRIGGER ACTIVE. Direct notifications sent.
                    </span>
                    <button 
                      onClick={resetAll} 
                      className="text-[10px] font-black uppercase text-emerald-900 border border-emerald-250 bg-white px-3 py-1 rounded-lg hover:bg-emerald-100/50"
                    >
                      Reset State
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Live Server Sync Logs */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm flex-1 flex flex-col justify-between text-left">
              <div>
                <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">System Simulation Event Logs</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Automated console outputs reporting carrier scheduling telemetry in Madrid.</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 h-44 overflow-y-auto mt-4 font-mono text-[11px] text-slate-350 space-y-2 select-none">
                {simLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 leading-normal">
                    <span className="text-indigo-400 text-[10px] font-bold select-noneshrink-0">[{log.time}]</span>
                    <span className={cn(
                      "flex-1",
                      log.type === 'success' ? "text-emerald-400 font-bold" : "",
                      log.type === 'warning' ? "text-amber-400" : "text-slate-300"
                    )}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SIMULATED SMARTPHONE (USER EXPERIENCE WORKPLACE) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="w-full max-w-[340px] aspect-[1/2.05] bg-slate-950 md:border-[13px] border-slate-900 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col pointer-events-auto">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-950 rounded-full z-40 hidden md:block" />

              {/* Inside Screen Container */}
              <div className="flex-1 bg-white relative flex flex-col overflow-hidden pt-6 pb-2 text-left">
                
                {/* STATE 1: PHONE LOCK SCREEN WAITING */}
                {simState === 'idle' && (
                  <div className="flex-1 flex flex-col justify-between p-6 bg-slate-900 text-white animate-fade-in text-center">
                    <div className="my-auto space-y-4">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 mx-auto animate-pulse">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest block">MADRID GATEWAY</span>
                        <h4 className="text-[20px] font-black italic tracking-tighter text-blue-400 uppercase">Lock Screen</h4>
                        <p className="text-[11.5px] text-slate-400 leading-normal max-w-sm mx-auto">
                          Waiting for order assignment. Trigger a webhook using the **Simulation Setup** console on the left.
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono pb-2">
                      PHONE PROTOCOL: SMS-WEBHOOK ACTIVE
                    </div>
                  </div>
                )}

                {/* STATE 2: NEW SMS RECEIVED */}
                {simState === 'notified_sms' && (
                  <div className="flex-1 flex flex-col justify-between p-4 bg-slate-900 text-white animate-fade-in">
                    <div className="pt-6 text-center space-y-1">
                      <span className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest">SLA Notification Alert</span>
                      <h4 className="text-[24px] font-black italic tracking-tighter text-yellow-400 uppercase">1 New SMS</h4>
                    </div>

                    {/* Notification bubble */}
                    <div className="space-y-4 my-auto">
                      <div 
                        onClick={handleOpenSms}
                        className="bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-3xl p-4.5 space-y-3.5 shadow-xl transition-all cursor-pointer active:scale-98"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest flex items-center gap-1">
                            <Smartphone className="w-3 h-3" /> SEUR MADRID
                          </span>
                          <span className="text-[8.5px] font-mono text-slate-400">Just Now</span>
                        </div>

                        <p className="text-[11.5px] text-slate-200 leading-normal font-medium">
                          Hola {activePersona.name}! Your order <strong>#{activePersona.id}</strong> is ready for load assignment.
                        </p>
                        <p className="text-[11.5px] text-slate-350 leading-normal italic font-semibold">
                          Please enter your preferred day x hours on our route matrix to lock a first-run delivery guarantee.
                        </p>

                        <div className="p-2.5 bg-blue-950/80 border border-blue-900 rounded-xl flex items-center justify-between text-[11px] text-blue-300 font-mono">
                          <span>node.seur.com/sync-mad</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] font-black text-blue-400 tracking-wider uppercase animate-pulse">
                          👆 Tap client SMS to launch Web Portal
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-[10px] text-slate-500 font-mono">
                      Spain Carrier Network Simulator
                    </div>
                  </div>
                )}

                {/* STATE 3: INTERACTIVE MATRIX PORTAL */}
                {simState === 'customer_portal' && (
                  <div className="flex-1 flex flex-col justify-between animate-in slide-in-from-bottom duration-300">
                    
                    {/* Simulated Web Header tab */}
                    <div className="bg-slate-50 border-b border-slate-200 py-2 px-3 flex items-center gap-1.5 mx-3 rounded-lg text-[9.5px] font-mono text-slate-500 select-none mt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate flex-1 font-semibold selection:bg-transparent">node.seur.com/sync-mad</span>
                    </div>

                    {/* Virtual app scrolling frame */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                      
                      {/* Package identity tag */}
                      <div className="bg-[#111] text-white rounded-2xl p-3 border border-slate-800 flex items-center gap-2.5 shadow-sm text-left">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500 text-slate-950 font-black italic text-center flex items-center justify-center shrink-0 animate-pulse">P</div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[7.5px] font-sans font-black tracking-widest uppercase text-slate-400 leading-none">ORDER SECURED BY PRIMOR</span>
                          <h4 className="text-[11px] font-black truncate leading-tight mt-0.5 text-slate-100">{activePersona.item}</h4>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-blue-600" /> Availability Matrix
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-normal">
                          Indicate your weekly availability. Click cells matching your free slots. Green indicates our carrier fleet proximity is at its maximum.
                        </p>
                      </div>

                      {/* TRUE GRANULAR MATRIX GRID REFERENCE IMAGE LOOK */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white select-none shadow-xs text-left">
                        
                        {/* Column Headers */}
                        <div className="grid grid-cols-[52px_1fr] border-b border-slate-150 bg-slate-50/70">
                          <div className="py-2.5 text-[8px] font-mono uppercase font-black text-slate-400 text-center border-r border-[#E2E8F0]">
                            CEST
                          </div>
                          <div className="grid grid-cols-7 text-center divide-x divide-slate-100">
                            {WEEKDAYS.map((day) => (
                              <div key={day} className="py-2.5 text-[8.5px] font-mono font-black text-slate-600">
                                {day}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive hour columns */}
                        <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto">
                          {HOUR_SLOTS.map((hour) => {
                            const startHourLabel = hour.split(' - ')[0]; // E.g., '9 AM'
                            return (
                              <div key={hour} className="grid grid-cols-[52px_1fr] hover:bg-slate-50/20">
                                <div className="py-2.5 text-[8.5px] font-mono text-slate-400 text-center flex items-center justify-center bg-slate-50/30 border-r border-[#E2E8F0] shrink-0 font-bold">
                                  {startHourLabel}
                                </div>
                                <div className="grid grid-cols-7 h-9 divide-x divide-slate-100">
                                  {WEEKDAYS.map((day) => {
                                    const details = getCellDetails(personaKey, day, hour);
                                    const isSelected = selectedDay === day && selectedHour === hour;

                                    return (
                                      <button
                                        key={day}
                                        type="button"
                                        onClick={() => {
                                          setSelectedDay(day);
                                          setSelectedHour(hour);
                                        }}
                                        className={cn(
                                          "relative flex items-center justify-center transition-all cursor-pointer h-full group focus:outline-none",
                                          isSelected 
                                            ? "bg-slate-900 z-10 shadow-inner" 
                                            : "bg-white hover:bg-slate-50"
                                        )}
                                      >
                                        {/* Status indicator inside cell */}
                                        {isSelected ? (
                                          <div className={cn(
                                            "w-3.5 h-3.5 rounded-full flex items-center justify-center text-white",
                                            details.level === 'optimal' ? 'bg-emerald-500' :
                                            details.level === 'moderate' ? 'bg-amber-400' : 'bg-rose-450'
                                          )}>
                                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                                          </div>
                                        ) : (
                                          <div className={cn(
                                            "w-2 h-2 rounded-full transition-all group-hover:scale-130 opacity-60",
                                            details.level === 'optimal' ? 'bg-emerald-500/40 group-hover:bg-emerald-500/90' :
                                            details.level === 'moderate' ? 'bg-amber-400/40 group-hover:bg-amber-400/90' : 'bg-red-400/20 group-hover:bg-red-400/70'
                                          )} />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected Matrix Highlight Box */}
                      {pitchStage === 'poc' ? (
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-[10px] text-slate-600 font-medium space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-slate-800">
                             <Clock className="w-3.5 h-3.5 text-slate-500" />
                             Selected Slot: {selectedDay} • {selectedHour}
                          </div>
                          <p className="text-[9.5px] text-slate-500 leading-normal pl-1 pt-1">
                             Selecting this slot reserves a basic delivery attempt with local dispatch.
                          </p>
                        </div>
                      ) : pitchStage === 'mvp' ? (
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/85 text-[10px] text-slate-600 font-medium space-y-2 text-left">
                        <div className="font-bold flex items-center gap-1.5 text-slate-800">
                           <Clock className="w-3.5 h-3.5 text-indigo-600" />
                           Selected: {selectedDay} • {selectedHour}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={cn(
                            "text-[7px] font-mono leading-none uppercase font-black px-1.5 py-0.5 rounded",
                            activeCellObj.level === 'optimal' ? "bg-emerald-100 text-emerald-800" :
                            activeCellObj.level === 'moderate' ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                          )}>
                            {activeCellObj.level} • {activeCellObj.prob}% CONFIDENCE
                          </span>
                        </div>
                        <p className="text-[9.5px] italic text-slate-500 leading-normal pl-0.5">
                          &quot;{activeCellObj.reason}&quot;
                        </p>
                        <div className="pt-1.5 border-t border-slate-200/50">
                           <div className="w-full bg-slate-200 rounded-full h-1">
                              <div 
                                className={cn("h-1 rounded-full", activeCellObj.level === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500')} 
                                style={{ width: `${activeCellObj.prob}%` }} 
                              />
                           </div>
                        </div>
                      </div>
                      ) : (
                        <div className="bg-slate-900 rounded-2xl p-4 border border-indigo-950/60 shadow-sm text-[10px] text-slate-300 font-medium space-y-3 text-left relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-15">
                            <Sparkles className="w-12 h-12 text-blue-400" />
                          </div>
                          <div className="font-extrabold flex items-center gap-1.5 text-white text-[11px]">
                             <Clock className="w-3.5 h-3.5 text-indigo-400" />
                             Matrix Sync: {selectedDay} • {selectedHour}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                             <span className={cn(
                               "text-[8px] font-mono leading-none uppercase font-black px-2 py-0.5 rounded tracking-wider",
                               activeCellObj.level === 'optimal' ? "bg-emerald-500/20 text-emerald-400" :
                               activeCellObj.level === 'moderate' ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-405"
                             )}>
                               ✦ {activeCellObj.level} SLOT • {activeCellObj.prob}% CONFIDENCE
                             </span>
                          </div>
                          <p className="text-[10px] italic text-slate-300 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">
                             &quot;{activeCellObj.reason}&quot;
                          </p>
                          <div className="pt-2 border-t border-white/5 space-y-1 text-[9px] text-slate-400 font-mono">
                             <div className="flex justify-between">
                                <span className="font-medium text-slate-500">CO₂ SAVING:</span>
                                <span className="font-bold text-emerald-400">~1.8 kg avoided 🌳</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="font-medium text-slate-500">COURIER SPLIT:</span>
                                <span className="text-indigo-300 font-extrabold">TRUE (Node Sync) ⚡</span>
                             </div>
                          </div>
                        </div>
                      )}

                      {/* Submit Synchronize Action */}
                      <button
                        onClick={commitSynchronize}
                        disabled={isSyncing}
                        className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-md select-none mt-2"
                      >
                        {isSyncing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Locking Route...
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Confirm Matrix Hour Slot
                          </>
                        )}
                      </button>

                    </div>

                    <div className="bg-slate-100 p-2 text-center text-[7.5px] text-slate-400 font-mono tracking-widest uppercase shrink-0">
                      🔐 Secure SSL Router • Hermética Network Sync
                    </div>
                  </div>
                )}

                {/* STATE 4: SUCCESS SYNC OK */}
                {simState === 'fully_synced' && (
                  <div className="flex-1 flex flex-col justify-between p-5 bg-[#1E293B] text-white animate-in zoom-in-95 duration-200 relative text-center">
                    
                    <div className="my-auto space-y-5">
                      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto shadow-lg animate-bounce">
                        <Check className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[16px] font-black uppercase tracking-tight text-white leading-tight">Hours Synced</h4>
                        <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block font-bold">ROUTE UPDATE RECORDED</span>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-left text-[11px] space-y-2">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400 uppercase font-black text-[8px]">Carrier ID:</span>
                          <span className="text-indigo-300 font-bold">SEUR MADRID</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400 uppercase font-black text-[8px]">Locked Slot:</span>
                          <span className="text-yellow-300 font-black italic">{selectedHour} ({selectedDay})</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400 uppercase font-black text-[8px]">Delivery stop:</span>
                          <span className="text-emerald-400 font-extrabold">STOP #{activePersona.newStopOrder}</span>
                        </div>
                      </div>

                      <p className="text-[9.5px] text-slate-400 italic font-medium leading-relaxed px-1">
                        The delivery scheduler successfully restructured stop priorities to respect your preference. Safe, on-time delivery promised.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={resetAll}
                        className="text-[9.5px] uppercase font-black text-slate-400 hover:text-white underline decoration-dotted tracking-wider"
                      >
                        ← Test other Scenarios
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Home bar anchor line */}
              <div className="h-6 bg-slate-900 border-t border-slate-900/60 flex items-center justify-center shrink-0">
                <div className="w-20 h-1 bg-white/20 rounded-full" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
