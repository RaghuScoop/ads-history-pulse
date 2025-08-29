import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonMetricCardProps {
  title: string;
  beforeValue: string;
  afterValue: string;
  absoluteChange: string;
  percentageChange: number;
  changeDate: string;
  isAnomalous?: boolean;
  severity?: 'low' | 'medium' | 'high';
  className?: string;
}

const ComparisonMetricCard = ({ 
  title, 
  beforeValue, 
  afterValue, 
  absoluteChange,
  percentageChange, 
  changeDate,
  isAnomalous = false,
  severity = 'low',
  className 
}: ComparisonMetricCardProps) => {
  const getChangeIcon = () => {
    if (percentageChange > 0) {
      return <TrendingUp className="h-4 w-4 text-accent-green" />;
    } else if (percentageChange < 0) {
      return <TrendingDown className="h-4 w-4 text-accent-red" />;
    }
    return <CheckCircle className="h-4 w-4 text-text-muted" />;
  };

  const getChangeColor = () => {
    if (percentageChange > 0) return 'text-accent-green';
    if (percentageChange < 0) return 'text-accent-red';
    return 'text-text-muted';
  };

  const getAnomalyIndicator = () => {
    if (!isAnomalous) return null;
    
    const severityColors = {
      low: 'text-yellow-500',
      medium: 'text-orange-500', 
      high: 'text-red-500'
    };

    return (
      <AlertTriangle className={cn("h-4 w-4", severityColors[severity])} />
    );
  };

  const getBorderStyle = () => {
    if (!isAnomalous) return '';
    
    const severityBorders = {
      low: 'border-l-4 border-l-yellow-500',
      medium: 'border-l-4 border-l-orange-500',
      high: 'border-l-4 border-l-red-500'
    };

    return severityBorders[severity];
  };

  return (
    <div className={cn(
      "metric-card animate-slide-up", 
      getBorderStyle(),
      isAnomalous && "bg-surface-secondary",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="flex items-center space-x-1">
          {getAnomalyIndicator()}
          {getChangeIcon()}
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Before/After Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-muted mb-1">Before</p>
            <p className="text-lg font-semibold text-text-secondary">{beforeValue}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">After</p>
            <p className="text-lg font-bold text-text-primary">{afterValue}</p>
          </div>
        </div>

        {/* Change Details */}
        <div className="pt-2 border-t border-card-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={cn("text-sm font-medium", getChangeColor())}>
                {percentageChange > 0 ? '+' : ''}{percentageChange}%
              </span>
              <span className="text-xs text-text-muted">({absoluteChange})</span>
            </div>
            <span className="text-xs text-text-muted">{changeDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMetricCard;