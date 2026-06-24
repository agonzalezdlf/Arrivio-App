import React from 'react';
import { Dashboard } from '../full/Dashboard';

interface MVPDashboardProps {
  setActiveTab: (tab: string) => void;
  deliveries: any[];
  setDeliveries: React.Dispatch<React.SetStateAction<any[]>>;
  routes: any[];
  setRoutes: React.Dispatch<React.SetStateAction<any[]>>;
}

export function MVPDashboard({ setActiveTab, deliveries, setDeliveries, routes, setRoutes }: MVPDashboardProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Dashboard
        setActiveTab={setActiveTab}
        deliveries={deliveries}
        setDeliveries={setDeliveries}
        routes={routes}
        setRoutes={setRoutes}
        pitchStage="mvp"
      />
    </div>
  );
}
