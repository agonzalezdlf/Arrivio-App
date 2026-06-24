import React, { useState } from 'react';
import { LayoutDashboard, Send, Network, Smartphone, Settings, LogOut, ChevronRight, Truck, BellRing, X, Sliders, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pitchStage?: 'poc' | 'mvp' | 'scale';
  onLogOut?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Live Operations Ledger', icon: LayoutDashboard, stage: 'mvp' },
  { id: 'dispatch', label: 'Bulk Dispatch Planner', icon: Send, stage: 'scale' },
  { id: 'journey', label: 'Customer Journey Tracker', icon: Truck, stage: 'mvp' },
];

export function Sidebar({ activeTab, setActiveTab, pitchStage = 'scale', onLogOut }: SidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [optimizerSetting, setOptimizerSetting] = useState('dynamic');
  const [simulationSpeed, setSimulationSpeed] = useState('1x');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowSettings(false);
      }, 1500);
    }, 1000);
  };

  const visibleItems = navItems.filter(item => {
    if (pitchStage === 'poc') {
      return item.id === 'dashboard';
    }
    if (pitchStage === 'mvp') {
      return item.id !== 'dispatch';
    }
    return true;
  });

  return (
    <div className="w-64 h-screen bg-white border-r border-[#E2E8F0] flex flex-col fixed left-0 top-0">
      <div className="px-6 py-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" />
        <h1 className="text-[22px] font-[900] text-[#2563EB] tracking-[-1px] italic">Arrivio</h1>
      </div>

      <nav className="flex-1">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-4.5 text-[14px] font-[500] transition-all relative text-left",
              activeTab === item.id 
                ? "text-[#2563EB] bg-[rgba(37,99,235,0.06)] border-r-[3px] border-[#2563EB]" 
                : "text-[#64748B] hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <item.icon className={cn(
              "w-[18px] h-[18px] transition-transform shrink-0", 
              activeTab === item.id ? "text-[#2563EB]" : "text-[#94A3B8]"
            )} />
            <span className="truncate pr-1">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">SE</div>
            <div className="flex-1 overflow-hidden text-ellipsis">
              <p className="text-xs font-bold truncate">SEUR - Madrid Node</p>
              <p className="text-[10px] text-slate-500 truncate">Premium Provider</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[85%]" />
          </div>
          <p className="text-[9px] text-slate-500 mt-1.5 font-medium">85% Optimization Sync</p>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 text-sm font-medium hover:text-[#2563EB] transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button 
          onClick={onLogOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-500 text-sm font-medium hover:text-red-700 transition-colors mt-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col text-left">
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <span className="text-xs uppercase tracking-widest font-black text-blue-400">Arrivio Engine Config</span>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1.5 bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest leading-none">AI Optimization Guard</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dynamic', title: 'Dynamic Buffer', desc: 'Auto SLA windows' },
                    { id: 'gridlock', title: 'Gridlock Guard', desc: 'Bypass traffic' },
                    { id: 'cargo', title: 'Cargo Focus', desc: 'Store priorities' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setOptimizerSetting(opt.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all",
                        optimizerSetting === opt.id 
                          ? "bg-blue-50 border-blue-400 text-[#1E293B]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span className="text-[11px] font-black leading-tight">{opt.title}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight leading-none">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest leading-none">Simulation speed</label>
                <div className="flex gap-2">
                  {['1x', '2x', '5x', 'Instant'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSimulationSpeed(speed)}
                      className={cn(
                        "flex-1 py-2 text-[11px] font-black uppercase rounded-xl border transition-all",
                        simulationSpeed === speed 
                          ? "bg-slate-900 border-slate-950 text-white" 
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      )}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-black text-blue-800 uppercase tracking-tight">Active Node Node-Lock</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                    Locks down delivery coordinates from local regional terminals into high priority micro-caches to guarantee precision.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving || saveSuccess}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    'Settings Saved!'
                  ) : (
                    'Save Parameters'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
