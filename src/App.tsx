/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/manager/Sidebar';

import { POCDashboard } from './components/manager/poc/ManagerDashboard';
import { POCDriver } from './components/driver/poc/DriverApp';
import { POCCustomer } from './components/customer/poc/CustomerPortal';

import { MVPDashboard } from './components/manager/mvp/ManagerDashboard';
import { MVPDriver } from './components/driver/mvp/DriverApp';
import { MVPCustomer } from './components/customer/mvp/CustomerPortal';
import { MVPJourney } from './components/manager/mvp/ManagerJourney';

import { FullDashboard } from './components/manager/full/ManagerDashboard';
import { FullDriver } from './components/driver/full/DriverApp';
import { FullCustomer } from './components/customer/full/CustomerPortal';
import { FullDispatch } from './components/manager/full/ManagerDispatch';
import { FullJourney } from './components/manager/full/ManagerJourney';
import { motion, AnimatePresence } from 'motion/react';
import { ROUTE_SUMMARIES, MOCK_DELIVERIES } from './data';
import { 
  LayoutDashboard, Send, Truck, Smartphone, BellRing, 
  Building2, ArrowRight, ShieldCheck, Sparkles, KeyRound, 
  Info, LogOut, HeartHandshake, ShieldAlert
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pitchStage, setPitchStage] = useState<'poc' | 'mvp' | 'full'>('full');
  const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);
  const [routes, setRoutes] = useState(ROUTE_SUMMARIES);
  
  // Real-time login role selection
  // null -> displays high fidelity Arrivio Role Gateway/Selection
  const [userRole, setUserRole] = useState<'manager' | 'driver' | 'customer' | null>(null);

  const handleSetPitchStage = (stage: 'poc' | 'mvp' | 'full') => {
    setPitchStage(stage);
    if (stage === 'poc') {
      if (activeTab === 'dispatch' || activeTab === 'journey') {
        setActiveTab('dashboard');
      }
    } else if (stage === 'mvp') {
      if (activeTab === 'dispatch') {
        setActiveTab('dashboard');
      }
    }
  };

  const handleLogIn = (role: 'manager' | 'driver' | 'customer') => {
    setUserRole(role);
    if (role === 'manager') {
      setActiveTab('dashboard');
    } else if (role === 'driver') {
      setActiveTab('mobile');
    } else {
      setActiveTab('customer');
    }
  };

  const handleLogOut = () => {
    setUserRole(null);
  };

  const renderContent = () => {
    if (pitchStage === 'poc') {
      if (userRole === 'driver') {
        return <POCDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
      } else if (userRole === 'customer') {
        return <POCCustomer />;
      } else {
        switch (activeTab) {
          case 'mobile':
            return <POCDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
          case 'customer':
            return <POCCustomer />;
          case 'dashboard':
          default:
            return (
              <POCDashboard 
                setActiveTab={setActiveTab} 
                deliveries={deliveries} 
                setDeliveries={setDeliveries} 
                routes={routes}
                setRoutes={setRoutes}
              />
            );
        }
      }
    } else if (pitchStage === 'mvp') {
      if (userRole === 'driver') {
        return <MVPDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
      } else if (userRole === 'customer') {
        return <MVPCustomer />;
      } else {
        switch (activeTab) {
          case 'journey':
            return <MVPJourney />;
          case 'mobile':
            return <MVPDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
          case 'customer':
            return <MVPCustomer />;
          case 'dashboard':
          default:
            return (
              <MVPDashboard 
                setActiveTab={setActiveTab} 
                deliveries={deliveries} 
                setDeliveries={setDeliveries} 
                routes={routes}
                setRoutes={setRoutes}
              />
            );
        }
      }
    } else {
      if (userRole === 'driver') {
        return <FullDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
      } else if (userRole === 'customer') {
        return <FullCustomer />;
      } else {
        switch (activeTab) {
          case 'dispatch':
            return <FullDispatch />;
          case 'journey':
            return <FullJourney />;
          case 'mobile':
            return <FullDriver deliveries={deliveries} setDeliveries={setDeliveries} />;
          case 'customer':
            return <FullCustomer />;
          case 'dashboard':
          default:
            return (
              <FullDashboard 
                deliveries={deliveries} 
                setDeliveries={setDeliveries} 
                routes={routes} 
                setRoutes={setRoutes}
              />
            );
        }
      }
    }
  };

  // 1. GATEWAY: RENDER LOGIN / ROLE SELECTOR IF USER ROLE IS NULL
  if (userRole === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
        
        {/* Top bar with Product Evolution Phase tour */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 shadow-sm">
          <div className="flex items-center gap-3 text-left w-full md:w-auto">
            <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full shadow-[0_0_0_4px_rgba(37,99,235,0.2)] shrink-0" />
            <div>
              <h1 className="text-[20px] font-[900] text-[#2563EB] tracking-[-0.8px] italic leading-none">Arrivio</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-tight mt-0.5">CONTINUOUS SLA DEPLOYMENT PLATFORM</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-[11px] font-heavy w-full md:w-auto overflow-x-auto select-none">
            <button 
              onClick={() => handleSetPitchStage('poc')}
              className={`flex-1 md:flex-initial py-1.5 px-3.5 rounded-lg transition-all duration-200 uppercase tracking-widest text-[10px] font-black ${pitchStage === 'poc' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              POC Phase
            </button>
            <span className="text-slate-300 font-bold shrink-0 mx-0.5 select-none text-[9px]">❯</span>
            <button 
              onClick={() => handleSetPitchStage('mvp')}
              className={`flex-1 md:flex-initial py-1.5 px-3.5 rounded-lg transition-all duration-200 uppercase tracking-widest text-[10px] font-black ${pitchStage === 'mvp' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              MVP Phase
            </button>
            <span className="text-slate-300 font-bold shrink-0 mx-0.5 select-none text-[9px]">❯</span>
            <button 
              onClick={() => handleSetPitchStage('full')}
              className={`flex-1 md:flex-initial py-1.5 px-3.5 rounded-lg transition-all duration-200 uppercase tracking-widest text-[10px] font-black ${pitchStage === 'full' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Full Product
            </button>
          </div>
        </header>

        {/* Dynamic Contextual Helper Notice */}
        <div className="bg-slate-50 border-b border-slate-200/60 px-4 md:px-8 py-2 md:py-2.5 text-center md:text-left select-none text-[12px] shrink-0">
          <p className="text-slate-600 font-semibold max-w-7xl mx-auto">
            {pitchStage === 'poc' && (
              <span>⚡ <strong>POC Tour Active:</strong> Simulates basic direct connectivity mapping. Try logging in as Driver or triggering SMS notifications.</span>
            )}
            {pitchStage === 'mvp' && (
              <span>🚀 <strong>MVP Tour Active:</strong> Includes live logistics operations ledger, SLA tracking, and timeline audits.</span>
            )}
            {pitchStage === 'full' && (
              <span>🌐 <strong>Full Product Tour Active:</strong> Access the complete suite including dynamic Bulk Dispatch Planners & priority cache nodes.</span>
            )}
          </p>
        </div>

        {/* Main Selection Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl space-y-3 mb-10 md:mb-14">
            <span className="text-[10px] uppercase font-black tracking-widest bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full inline-block font-mono">
              Access Simulation Dashboard
            </span>
            <h2 className="text-[32px] md:text-[42px] tracking-tight font-black text-slate-900 leading-tight">
              Select Your Workspace Portal
            </h2>
            <p className="text-[14px] md:text-[16px] text-slate-500 font-medium leading-relaxed">
              Arrivio provides zero-friction delivery orchestration, enabling fluid synchronization between planning terminals, active drivers, and Madrid clients.
            </p>
          </div>

          {/* Three Option Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
            
            {/* CARD 1: Logistics Manager */}
            <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between text-left shadow-sm group hover:border-blue-400 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-black text-slate-900">Logistics Manager</h3>
                    <span className="text-[8.5px] font-black tracking-widest bg-blue-500 text-white px-1.5 py-0.5 rounded leading-none">ADMIN</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium leading-normal">
                    Centralized dispatcher console to schedule merchant consignments, analyze live routes, and evaluate courier SLA forecasts.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">ENABLED UTILITIES</span>
                  <ul className="space-y-2.5 text-[11px] text-slate-600 font-semibold">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Live Madrid Operations Ledger
                    </li>
                    {pitchStage !== 'poc' && (
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Real-time Customer Journey Audit
                      </li>
                    )}
                    {pitchStage === 'full' && (
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Dynamic Bulk Dispatch Planner
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleLogIn('manager')}
                  className="w-full h-12 bg-slate-900 group-hover:bg-[#2563EB] text-white rounded-2xl font-black text-[11.5px] uppercase tracking-wider transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Enter Admin Console <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 2: Delivery Driver */}
            <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between text-left shadow-sm group hover:border-blue-400 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Truck className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-black text-slate-900">Courier / Driver</h3>
                    <span className="text-[8.5px] font-black tracking-widest bg-amber-600 text-white px-1.5 py-0.5 rounded leading-none">IN-CAB</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium leading-normal">
                    Assists van couriers with sequential delivery stops, integrated regional route navigation, and instant delivery state approvals.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">DRIVER WORKFLOW</span>
                  <ul className="space-y-2.5 text-[11px] text-slate-600 font-semibold">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> stop-by-stop interactive routing lists
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Dynamic arrival ETAs & drop actions
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Instant sequence updates from customers
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleLogIn('driver')}
                  className="w-full h-12 bg-slate-900 group-hover:bg-[#2563EB] text-white rounded-2xl font-black text-[11.5px] uppercase tracking-wider transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Enter Handheld App <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 3: SMS Customer Portal Simulator */}
            <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between text-left shadow-sm group hover:border-blue-400 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-5 opacity-[0.03] pointer-events-none">
                <KeyRound className="w-48 h-48" />
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                  <BellRing className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-black text-slate-900">End-Customer (SMS)</h3>
                    <span className="text-[8.5px] font-black tracking-widest bg-emerald-600 text-white px-1.5 py-0.5 rounded leading-none uppercase">NO LOGIN</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium leading-normal">
                    Simulates the client's direct tracking experience. No password needed; they engage safely via dynamic web tokens fired upon courier dispatch.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">FRICTIONLESS EXPERIENCE</span>
                  <ul className="space-y-2.5 text-[11px] text-slate-600 font-semibold">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Receive automated outbound SMS hooks
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> input preferred hour slots in seconds
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> dynamic in-van sequence reordering
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleLogIn('customer')}
                  className="w-full h-12 bg-slate-900 group-hover:bg-[#2563EB] text-white rounded-2xl font-black text-[11.5px] uppercase tracking-wider transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Enter SMS Simulator <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="mt-12 p-4 bg-blue-50/50 border border-blue-150 rounded-2xl text-[11px] text-blue-800 leading-normal max-w-2xl text-center font-medium">
             💡 <strong>SaaS Architecture Note:</strong> End-users do not register profiles. To guarantee 99%+ delivery rates, Arrivio handles continuous orchestration behind the scenes, alerting buyers immediately via secure lightweight web links.
          </div>
        </div>

        {/* Footer info branding */}
        <footer className="text-center py-6 border-t border-slate-100 text-[11px] text-slate-400 font-medium bg-white">
          Arrivio Last-Mile Logistics Engine • Madrid Node Terminal
        </footer>
      </div>
    );
  }

  // 2. MAIN LAYOUT: ACTIVE WHEN USER LOGS IN AS 'manager', 'driver', or 'customer'
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      
      {/* Sidebar - Desktop Only (Render only for Logistics Manager) */}
      {userRole === 'manager' && (
        <div className="hidden lg:block shrink-0">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            pitchStage={pitchStage === 'full' ? 'scale' : pitchStage} 
            onLogOut={handleLogOut}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 pb-24 lg:pb-0 flex flex-col min-h-screen ${userRole === 'manager' ? 'lg:ml-64' : 'lg:ml-0'}`}>
        
        {/* Dynamic Top bar header detailing selected simulation role and logout actions */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 z-30 shadow-sm select-none">
           <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                userRole === 'manager' ? 'bg-blue-50 text-blue-600' :
                userRole === 'driver' ? 'bg-amber-50 text-amber-600' :
                'bg-purple-50 text-purple-600'
              }`}>
                {userRole === 'manager' && <Building2 className="w-4 h-4" />}
                {userRole === 'driver' && <Truck className="w-4 h-4" />}
                {userRole === 'customer' && <BellRing className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider font-mono leading-none block">ACTIVE SIMULATION AGENT</span>
                <h2 className="text-[13px] font-extrabold text-[#1E293B] mt-0.5 flex items-center gap-1.5 font-sans leading-none">
                  {userRole === 'manager' && "Logistics Admin Portal"}
                  {userRole === 'driver' && "On-Duty Delivery Courier"}
                  {userRole === 'customer' && "End-Customer Portal (SMS-Sync)"}
                  
                  <span className="text-slate-350 font-medium">|</span>
                  
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">
                     {pitchStage === 'poc' && "POC Tour"}
                     {pitchStage === 'mvp' && "MVP Tour"}
                     {pitchStage === 'full' && "Full Product"}
                  </span>
                </h2>
              </div>
           </div>

           {/* Quick actions: dynamic stage switcher + logout button */}
           <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px] font-semibold">
                <button 
                  onClick={() => handleSetPitchStage('poc')}
                  className={`py-1 px-3.5 rounded-lg transition-all text-[10px] uppercase font-bold tracking-wider leading-none ${pitchStage === 'poc' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  POC
                </button>
                <button 
                  onClick={() => handleSetPitchStage('mvp')}
                  className={`py-1 px-3.5 rounded-lg transition-all text-[10px] uppercase font-bold tracking-wider leading-none ${pitchStage === 'mvp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  MVP
                </button>
                <button 
                  onClick={() => handleSetPitchStage('full')}
                  className={`py-1 px-3.5 rounded-lg transition-all text-[10px] uppercase font-bold tracking-wider leading-none ${pitchStage === 'full' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Full Product
                </button>
              </div>

              <button
                onClick={handleLogOut}
                className="px-3.5 py-1.5 border border-slate-250 hover:bg-slate-50 text-slate-600 hover:text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" /> Return to Gateway
              </button>
           </div>
        </div>

        {/* Workspace specific contextual alert for non-manager roles */}
        {userRole !== 'manager' && (
          <div className="bg-slate-900 text-white px-4 md:px-8 py-2 md:py-2.5 flex items-center justify-between gap-4 shrink-0 text-left text-[11px] font-medium leading-none select-none">
            <span className="flex items-center gap-2 text-slate-300">
               <Info className="w-4 h-4 text-blue-400 shrink-0" />
               {userRole === 'driver' && "You are inside the mobile application van telemetry list. Any customer time-window changes automatically re-sort your itinerary Stops."}
               {userRole === 'customer' && "Customers are invited via link upon dispatch. Change stop times below and see them update in real-time."}
            </span>
            <button 
              onClick={() => handleLogIn('manager')}
              className="text-[#38BDF8] hover:underline font-black uppercase tracking-wider text-[10px]"
            >
              Switch to Central Admin →
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Quick Mobile/Tablet/Manager Tab Bar Navigation */}
      {userRole === 'manager' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-around z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] selection:bg-transparent">
           <MobileNavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={LayoutDashboard} label="Ledger" />
           {pitchStage === 'full' && (
             <MobileNavItem active={activeTab === 'dispatch'} onClick={() => setActiveTab('dispatch')} icon={Send} label="Bulk Plan" />
           )}
           {pitchStage !== 'poc' && (
             <MobileNavItem active={activeTab === 'journey'} onClick={() => setActiveTab('journey')} icon={Truck} label="Journey" />
           )}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 flex-1 h-full py-1.5 transition-all select-none ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Icon className={`w-[18px] h-[18px] transition-transform ${active ? 'scale-110 stroke-[2.5px]' : 'stroke-[2px]'}`} />
      <span className="text-[8.5px] font-black uppercase tracking-wider leading-none">{label}</span>
      {active && <motion.div layoutId="mobile-indicator" className="w-1 h-1 bg-blue-600 rounded-full mt-0.5" />}
    </button>
  );
}
