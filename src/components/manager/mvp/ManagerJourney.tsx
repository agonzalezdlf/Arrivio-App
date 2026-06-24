import React, { useState } from 'react';
import { Search, MapPin, ShieldCheck, Clock, Check, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_DELIVERIES } from '../../../data';
import { cn } from '../../../lib/utils';

interface JourneyStep {
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'pending';
  time?: string;
  location: string;
  details: string;
}

export function MVPJourney() {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Filter deliveries for candidate list
  const candidates = MOCK_DELIVERIES.filter(d => 
    d.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const activePackage = candidates[focusedIndex] || MOCK_DELIVERIES[0];

  const getTimelineSteps = (pkg: typeof activePackage): JourneyStep[] => {
    const isPickup = pkg.stopType === 'pickup';
    const zoneCode = pkg.assignedRoute.split('-').pop() || 'A1';
    
    return [
      {
        title: 'Collected & Registered',
        subtitle: isPickup ? 'Volume loaded at store Hub' : 'Sorted at primary depot',
        status: 'completed',
        time: '07:15 AM',
        location: isPickup ? (pkg.storeName || 'Zara Madrid') : 'Warehouse Hub Sol, Madrid',
        details: 'Package registered and prepared for the delivery route.'
      },
      {
        title: 'On the Road',
        subtitle: `In transit to ${zoneCode}`,
        status: (pkg.status as string) === 'delivered' || (pkg.status as string) === 'success' || (pkg.status as string) === 'synced' ? 'completed' : 'current',
        time: pkg.predictedArrival ? `${pkg.predictedArrival} AM` : '09:00 AM',
        location: `SEUR Fleet (${pkg.assignedRoute})`,
        details: `Loaded into the delivery van. Scheduled for slot: ${pkg.suggestedSlot}.`
      },
      {
        title: 'Delivered',
        subtitle: (pkg.status as string) === 'delivered' || (pkg.status as string) === 'success' ? 'Completed successfully' : 'Pending delivery',
        status: (pkg.status as string) === 'delivered' || (pkg.status as string) === 'success' ? 'completed' : 'pending',
        time: (pkg.status as string) === 'delivered' || (pkg.status as string) === 'success' ? '10:30 AM' : undefined,
        location: pkg.address,
        details: ((pkg.status as string) === 'delivered' || (pkg.status as string) === 'success')
          ? 'Delivered and confirmed with the customer.'
          : 'En route. Driver is approaching the destination.'
      }
    ];
  };

  const steps = getTimelineSteps(activePackage);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <header className="min-h-[72px] px-6 border-b border-[#E2E8F0] flex flex-col md:flex-row items-start md:items-center justify-between bg-white shrink-0 py-4 md:py-0 gap-4 text-left">
        <div>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded uppercase font-mono tracking-wider font-heavy">
            MVP PHASE
          </span>
          <h1 className="text-[18px] md:text-[20px] font-black text-[#1E293B] mt-1">MVP Customer Journey Ledger</h1>
          <p className="text-[10px] text-[#64748B] font-heavy tracking-wider uppercase leading-none mt-1">
            Tracking customer deliveries and retail pickups
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full text-[10px] font-black uppercase tracking-wider">
            Active MVP Audit Trace
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* Left Panel: Search */}
          <div className="lg:col-span-4 text-left space-y-4">
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Search MVP Parcels</h3>
              <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                Filter by recipient name or parcel ID.
              </p>
              
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Recipient Name..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold focus:outline-none focus:border-blue-500 uppercase placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {candidates.map((pkg, idx) => {
                  const isCur = activePackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setFocusedIndex(idx)}
                      className={cn(
                        "w-full p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group gap-2",
                        isCur 
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-100" 
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div>
                          <div className={cn("text-[10px] font-mono font-black uppercase mb-1", isCur ? "text-indigo-200" : "text-slate-400")}>
                            {pkg.id}
                          </div>
                          <div className="text-[13px] font-black uppercase leading-tight truncate max-w-[150px]">
                            {pkg.stopType === 'pickup' ? (pkg.storeName || 'Zara Madrid') : pkg.userId}
                          </div>
                          <div className={cn("text-[10px] font-mono mt-0.5", isCur ? "text-indigo-200" : "text-slate-400")}>
                            {pkg.entityId || 'NIF/NIE: N/A'}
                          </div>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0",
                          isCur ? "bg-indigo-800 text-white" : "bg-slate-100 text-slate-600"
                        )}>
                          {pkg.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Journey Timeline */}
          <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-200 p-6 md:p-8 shadow-sm space-y-6 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-5 gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest font-mono">MVP Tracker</span>
                <h2 className="text-[18px] font-black text-slate-900 tracking-tight mt-1">Package: {activePackage.id}</h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-slate-700 text-xs font-black uppercase">{activePackage.stopType === 'pickup' ? (activePackage.storeName || 'Zara Madrid') : activePackage.userId}</span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border border-slate-200">
                    {activePackage.entityId || 'NIF/NIE: N/A'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-[11px] font-black text-slate-700">Estimated Delivery: <strong className="text-indigo-600">{activePackage.predictedArrival || '09:45'} AM</strong></span>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="relative pl-8 space-y-8 py-2">
              <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-slate-100" />

              {steps.map((step, idx) => {
                const isComp = step.status === 'completed';
                const isCur = step.status === 'current';

                return (
                  <div key={idx} className="relative">
                    <div className={cn(
                      "absolute -left-[30px] w-8 h-8 rounded-full flex items-center justify-center border transition-all shadow-sm z-10 bg-white",
                      isComp 
                        ? "bg-indigo-600 border-indigo-500 text-white" 
                        : isCur 
                        ? "border-indigo-500 text-indigo-600 scale-105 shadow-md shadow-indigo-100 animate-pulse" 
                        : "border-slate-200 text-slate-300"
                    )}>
                      {isComp ? (
                        <Check className="w-4 h-4 stroke-[3px]" />
                      ) : (
                        <div className={cn("w-2 h-2 rounded-full", isCur ? "bg-indigo-600" : "bg-slate-200")} />
                      )}
                    </div>

                    <div className="pl-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={cn(
                          "text-[14px] md:text-[15px] font-black tracking-tight",
                          isComp ? "text-slate-800" : isCur ? "text-indigo-600" : "text-slate-400"
                        )}>
                          {step.title}
                        </h4>
                        {isCur && (
                          <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[7px] font-black uppercase tracking-wider animate-pulse">LIVE</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide leading-none">{step.subtitle}</p>
                      <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold pt-1">{step.details}</p>
                      <div className="text-[9.5px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                        📍 Location: {step.location} {step.time && `• ${step.time}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <h5 className="text-[11.5px] font-black text-slate-700 uppercase tracking-wider">MVP Simulation Scope</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-0.5">
                  The MVP Journey audit covers core ingest hubs, dispatch sector assignment, and physical drop geostamps on Madrid routes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
