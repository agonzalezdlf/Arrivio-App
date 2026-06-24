import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { BulkPlanner } from './DispatchPlanning';
import { Layers, ShieldCheck, HelpCircle, LayoutGrid, Send, Sparkles } from 'lucide-react';

interface FullDashboardProps {
  deliveries: any[];
  setDeliveries: React.Dispatch<React.SetStateAction<any[]>>;
  routes: any[];
  setRoutes: React.Dispatch<React.SetStateAction<any[]>>;
}

export function FullDashboard({ deliveries, setDeliveries, routes, setRoutes }: FullDashboardProps) {
  const [managerTab, setManagerTab] = useState<'dashboard' | 'bulk_planner'>('dashboard');

  return (
    <div className="flex-1 bg-slate-50 flex flex-col text-left">
      
      {/* Sub-navigation bar inside Full Manager */}
      <div className="bg-slate-900 px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 shrink-0 text-white shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-extrabold">
            FULL PRODUCT SUITE
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-[10.5px]">
          <button
            onClick={() => setManagerTab('dashboard')}
            className={`py-1 px-3.5 rounded-lg transition-all font-black uppercase tracking-wider ${
              managerTab === 'dashboard' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-450 hover:text-white'
            }`}
          >
            Ledger & Risks
          </button>
          <button
            onClick={() => setManagerTab('bulk_planner')}
            className={`py-1 px-3.5 rounded-lg transition-all font-black uppercase tracking-wider ${
              managerTab === 'bulk_planner' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-450 hover:text-white'
            }`}
          >
            Bulk Dispatch Planner
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {managerTab === 'dashboard' ? (
          <Dashboard 
            setActiveTab={() => {}} 
            deliveries={deliveries} 
            setDeliveries={setDeliveries} 
            routes={routes} 
            setRoutes={setRoutes} 
            pitchStage="scale" 
          />
        ) : (
          <BulkPlanner 
            setActiveTab={() => {}} 
            deliveries={deliveries} 
            setDeliveries={setDeliveries} 
            routes={routes} 
            setRoutes={setRoutes} 
            pitchStage="scale" 
          />
        )}
      </div>
    </div>
  );
}
