
import React from 'react';
import { BarChart3, TrendingUp, Target, Search, DollarSign, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'campaign', label: 'Campaign Metrics', icon: Target },
  { id: 'competitive', label: 'Competitive Metrics', icon: TrendingUp },
  { id: 'auction', label: 'Auction Changes', icon: DollarSign },
  { id: 'search-terms', label: 'Search Terms', icon: Search },
  { id: 'keywords', label: 'Keyword Metrics', icon: Activity },
];

const DashboardLayout = ({ children, activeSection = 'overview', onSectionChange }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Google Ads Monitor
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Change History Dashboard
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSectionChange?.(item.id)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                        activeSection === item.id
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
