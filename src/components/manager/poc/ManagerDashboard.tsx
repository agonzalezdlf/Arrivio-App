import React from 'react';
import { Dashboard } from '../full/Dashboard';

interface POCDashboardProps {
  setActiveTab: (tab: string) => void;
  deliveries: any[];
  setDeliveries: React.Dispatch<React.SetStateAction<any[]>>;
  routes: any[];
  setRoutes: React.Dispatch<React.SetStateAction<any[]>>;
}

export function POCDashboard({ setActiveTab, deliveries, setDeliveries, routes, setRoutes }: POCDashboardProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Dashboard
        setActiveTab={setActiveTab}
        deliveries={deliveries}
        setDeliveries={setDeliveries}
        routes={routes}
        setRoutes={setRoutes}
        pitchStage="poc"
      />
    </div>
  );
}
