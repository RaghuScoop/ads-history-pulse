
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard = ({ title, value, change, changeLabel, trend, className }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-accent-green" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-accent-red" />;
      default:
        return <Minus className="h-4 w-4 text-text-muted" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-accent-green';
      case 'down':
        return 'text-accent-red';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className={cn("metric-card animate-slide-up", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <div className="flex items-center space-x-1">
          <span className={cn("text-sm font-medium", getTrendColor())}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-text-muted">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
