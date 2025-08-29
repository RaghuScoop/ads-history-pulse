
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FilterPanel from '@/components/FilterPanel';
import MetricCard from '@/components/MetricCard';
import ComparisonMetricCard from '@/components/ComparisonMetricCard';
import CustomLineChart from '@/components/charts/LineChart';
import CustomBarChart from '@/components/charts/BarChart';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const generateTimeSeriesData = () => [
  { date: '2024-01-01', impressions: 12500, clicks: 850, cost: 1200, cpc: 1.41 },
  { date: '2024-01-02', impressions: 13200, clicks: 920, cost: 1350, cpc: 1.47 },
  { date: '2024-01-03', impressions: 11800, clicks: 780, cost: 1100, cpc: 1.41 },
  { date: '2024-01-04', impressions: 14500, clicks: 1050, cost: 1480, cpc: 1.41 },
  { date: '2024-01-05', impressions: 13800, clicks: 980, cost: 1420, cpc: 1.45 },
  { date: '2024-01-06', impressions: 15200, clicks: 1120, cost: 1650, cpc: 1.47 },
  { date: '2024-01-07', impressions: 14100, clicks: 1010, cost: 1520, cpc: 1.50 },
];

const generateCompetitorData = () => [
  { name: 'Position 1', share: 35, overlap: 22, outranking: 18 },
  { name: 'Position 2', share: 28, overlap: 31, outranking: 25 },
  { name: 'Position 3', share: 22, overlap: 28, outranking: 20 },
  { name: 'Position 4', share: 15, overlap: 19, outranking: 15 },
];

const generateAuctionData = () => [
  { name: 'Exact Match', avgCpc: 1.45, qualityScore: 8.2, impressionShare: 72 },
  { name: 'Phrase Match', avgCpc: 1.32, qualityScore: 7.8, impressionShare: 68 },
  { name: 'Broad Match', avgCpc: 1.28, qualityScore: 7.1, impressionShare: 85 },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [filters, setFilters] = useState({
    campaign: 'all',
    adGroup: 'all',
    changeEvent: 'all',
    exactChangeEvent: 'all',
    changeType: 'all',
    dateRange: '30d',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => {
    console.log('Refreshing data with filters:', filters);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics - Comparative View */}
      <div className="dashboard-grid">
        <ComparisonMetricCard
          title="Total Impressions"
          beforeValue="84.7K"
          afterValue="95.2K"
          absoluteChange="+10.5K"
          percentageChange={12.5}
          changeDate="2 days ago"
          isAnomalous={true}
          severity="medium"
        />
        <ComparisonMetricCard
          title="Click-Through Rate"
          beforeValue="6.97%"
          afterValue="6.82%"
          absoluteChange="-0.15%"
          percentageChange={-2.1}
          changeDate="1 day ago"
        />
        <ComparisonMetricCard
          title="Average CPC"
          beforeValue="$1.38"
          afterValue="$1.43"
          absoluteChange="+$0.05"
          percentageChange={3.2}
          changeDate="3 hours ago"
          isAnomalous={true}
          severity="high"
        />
        <ComparisonMetricCard
          title="Cost per Conversion"
          beforeValue="$31.20"
          afterValue="$28.50"
          absoluteChange="-$2.70"
          percentageChange={-8.7}
          changeDate="6 hours ago"
        />
        <ComparisonMetricCard
          title="Quality Score"
          beforeValue="7.8"
          afterValue="7.8"
          absoluteChange="0.0"
          percentageChange={0.0}
          changeDate="No change"
        />
        <ComparisonMetricCard
          title="Impression Share"
          beforeValue="69.7%"
          afterValue="73.5%"
          absoluteChange="+3.8%"
          percentageChange={5.4}
          changeDate="4 hours ago"
        />
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomLineChart
          data={generateTimeSeriesData()}
          lines={[
            { dataKey: 'impressions', name: 'Impressions', color: 'hsl(var(--chart-1))' },
            { dataKey: 'clicks', name: 'Clicks', color: 'hsl(var(--chart-2))' },
          ]}
          title="Traffic Trends"
          height={350}
        />
        <CustomLineChart
          data={generateTimeSeriesData()}
          lines={[
            { dataKey: 'cost', name: 'Cost ($)', color: 'hsl(var(--chart-3))' },
            { dataKey: 'cpc', name: 'Avg CPC ($)', color: 'hsl(var(--chart-4))' },
          ]}
          title="Cost Analysis"
          height={350}
        />
      </div>
    </div>
  );

  const renderCampaignMetrics = () => (
    <div className="space-y-6">
      <div className="dashboard-grid">
        <MetricCard
          title="Campaign Budget"
          value="$15,240"
          change={8.3}
          changeLabel="vs last period"
          trend="up"
        />
        <MetricCard
          title="Budget Utilization"
          value="87.2%"
          change={-3.1}
          changeLabel="vs last period"
          trend="down"
        />
        <MetricCard
          title="Active Keywords"
          value="1,247"
          change={15.2}
          changeLabel="vs last period"
          trend="up"
        />
      </div>
      
      <CustomBarChart
        data={generateAuctionData()}
        bars={[
          { dataKey: 'avgCpc', name: 'Avg CPC ($)', color: 'hsl(var(--chart-1))' },
          { dataKey: 'qualityScore', name: 'Quality Score', color: 'hsl(var(--chart-2))' },
        ]}
        title="Campaign Performance by Match Type"
        height={400}
      />
    </div>
  );

  const renderCompetitiveMetrics = () => (
    <div className="space-y-6">
      <div className="dashboard-grid">
        <MetricCard
          title="Search Impression Share"
          value="73.5%"
          change={2.8}
          changeLabel="vs competitors"
          trend="up"
        />
        <MetricCard
          title="Outranking Share"
          value="45.2%"
          change={-1.5}
          changeLabel="vs competitors"
          trend="down"
        />
        <MetricCard
          title="Top of Page Rate"
          value="62.1%"
          change={7.3}
          changeLabel="vs last period"
          trend="up"
        />
      </div>
      
      <CustomBarChart
        data={generateCompetitorData()}
        bars={[
          { dataKey: 'share', name: 'Impression Share (%)', color: 'hsl(var(--chart-1))' },
          { dataKey: 'overlap', name: 'Overlap Rate (%)', color: 'hsl(var(--chart-2))' },
          { dataKey: 'outranking', name: 'Outranking Share (%)', color: 'hsl(var(--chart-3))' },
        ]}
        title="Competitive Position Analysis"
        height={400}
      />
    </div>
  );

  const renderAuctionChanges = () => (
    <div className="space-y-6">
      <div className="dashboard-grid">
        <MetricCard
          title="Avg. Auction CPC"
          value="$1.67"
          change={12.1}
          changeLabel="vs last period"
          trend="up"
        />
        <MetricCard
          title="Auction Participation"
          value="89.3%"
          change={-2.7}
          changeLabel="vs last period"
          trend="down"
        />
        <MetricCard
          title="Won Auctions"
          value="76.8%"
          change={4.2}
          changeLabel="vs last period"
          trend="up"
        />
      </div>
      
      <CustomLineChart
        data={generateTimeSeriesData()}
        lines={[
          { dataKey: 'cpc', name: 'Avg CPC ($)', color: 'hsl(var(--chart-3))' },
        ]}
        title="CPC Trends Over Time"
        height={400}
      />
    </div>
  );

  const renderSearchTerms = () => (
    <div className="space-y-6">
      <div className="dashboard-grid">
        <ComparisonMetricCard
          title="New Search Terms"
          beforeValue="289"
          afterValue="342"
          absoluteChange="+53"
          percentageChange={18.7}
          changeDate="This period"
        />
        <ComparisonMetricCard
          title="Query Match Rate"
          beforeValue="92.5%"
          afterValue="94.2%"
          absoluteChange="+1.7%"
          percentageChange={1.8}
          changeDate="vs last period"
        />
        <ComparisonMetricCard
          title="Negative Keywords Added"
          beforeValue="126"
          afterValue="156"
          absoluteChange="+30"
          percentageChange={23.4}
          changeDate="This period"
          isAnomalous={true}
          severity="medium"
        />
      </div>
      
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Search Term Performance Changes</h3>
        <div className="space-y-4">
          {[
            { 
              term: 'google ads management', 
              before: { impressions: 2547, clicks: 167, cost: 198.50, cpc: 1.19, conversions: 8 },
              after: { impressions: 2847, clicks: 189, cost: 232.47, cpc: 1.23, conversions: 12 },
              changeDate: '3 hours ago',
              isAnomalous: true,
              severity: 'medium' as const
            },
            { 
              term: 'ppc advertising services', 
              before: { impressions: 1756, clicks: 128, cost: 179.20, cpc: 1.40, conversions: 6 },
              after: { impressions: 1956, clicks: 142, cost: 205.90, cpc: 1.45, conversions: 9 },
              changeDate: '1 day ago',
              isAnomalous: false,
              severity: 'low' as const
            },
            { 
              term: 'digital marketing agency', 
              before: { impressions: 2941, clicks: 168, cost: 267.12, cpc: 1.59, conversions: 7 },
              after: { impressions: 3241, clicks: 198, cost: 330.66, cpc: 1.67, conversions: 11 },
              changeDate: '5 hours ago',
              isAnomalous: true,
              severity: 'high' as const
            },
            { 
              term: 'search engine marketing', 
              before: { impressions: 1432, clicks: 76, cost: 135.24, cpc: 1.78, conversions: 3 },
              after: { impressions: 1632, clicks: 87, cost: 164.43, cpc: 1.89, conversions: 4 },
              changeDate: '2 days ago',
              isAnomalous: false,
              severity: 'low' as const
            },
          ].map((term, index) => {
            const getPercentageChange = (before: number, after: number) => {
              if (before === 0) return after > 0 ? 100 : 0;
              return ((after - before) / before) * 100;
            };

            const getBorderStyle = () => {
              if (!term.isAnomalous) return '';
              const severityBorders = {
                low: 'border-l-4 border-l-yellow-500',
                medium: 'border-l-4 border-l-orange-500',
                high: 'border-l-4 border-l-red-500'
              };
              return severityBorders[term.severity];
            };

            return (
              <div key={index} className={cn(
                "p-6 bg-surface rounded-lg border border-card-border",
                getBorderStyle(),
                term.isAnomalous && "bg-surface-secondary"
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-text-primary text-lg">{term.term}</h4>
                  <div className="flex items-center space-x-2">
                    {term.isAnomalous && (
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        term.severity === 'high' ? 'bg-red-100 text-red-800' :
                        term.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      )}>
                        {term.severity.toUpperCase()} ANOMALY
                      </span>
                    )}
                    <span className="text-sm text-text-muted">{term.changeDate}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {/* Impressions */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-text-secondary">Impressions</h5>
                    <div className="space-y-1">
                      <div className="text-xs text-text-muted">Before: {term.before.impressions.toLocaleString()}</div>
                      <div className="text-sm font-semibold text-text-primary">After: {term.after.impressions.toLocaleString()}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        getPercentageChange(term.before.impressions, term.after.impressions) > 0 ? 'text-accent-green' : 'text-accent-red'
                      )}>
                        {getPercentageChange(term.before.impressions, term.after.impressions) > 0 ? '+' : ''}
                        {getPercentageChange(term.before.impressions, term.after.impressions).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-text-secondary">Clicks</h5>
                    <div className="space-y-1">
                      <div className="text-xs text-text-muted">Before: {term.before.clicks}</div>
                      <div className="text-sm font-semibold text-text-primary">After: {term.after.clicks}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        getPercentageChange(term.before.clicks, term.after.clicks) > 0 ? 'text-accent-green' : 'text-accent-red'
                      )}>
                        {getPercentageChange(term.before.clicks, term.after.clicks) > 0 ? '+' : ''}
                        {getPercentageChange(term.before.clicks, term.after.clicks).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-text-secondary">Cost</h5>
                    <div className="space-y-1">
                      <div className="text-xs text-text-muted">Before: ${term.before.cost.toFixed(2)}</div>
                      <div className="text-sm font-semibold text-text-primary">After: ${term.after.cost.toFixed(2)}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        getPercentageChange(term.before.cost, term.after.cost) > 0 ? 'text-accent-red' : 'text-accent-green'
                      )}>
                        {getPercentageChange(term.before.cost, term.after.cost) > 0 ? '+' : ''}
                        {getPercentageChange(term.before.cost, term.after.cost).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* CPC */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-text-secondary">CPC</h5>
                    <div className="space-y-1">
                      <div className="text-xs text-text-muted">Before: ${term.before.cpc.toFixed(2)}</div>
                      <div className="text-sm font-semibold text-text-primary">After: ${term.after.cpc.toFixed(2)}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        getPercentageChange(term.before.cpc, term.after.cpc) > 0 ? 'text-accent-red' : 'text-accent-green'
                      )}>
                        {getPercentageChange(term.before.cpc, term.after.cpc) > 0 ? '+' : ''}
                        {getPercentageChange(term.before.cpc, term.after.cpc).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Conversions */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-text-secondary">Conversions</h5>
                    <div className="space-y-1">
                      <div className="text-xs text-text-muted">Before: {term.before.conversions}</div>
                      <div className="text-sm font-semibold text-text-primary">After: {term.after.conversions}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        getPercentageChange(term.before.conversions, term.after.conversions) > 0 ? 'text-accent-green' : 'text-accent-red'
                      )}>
                        {getPercentageChange(term.before.conversions, term.after.conversions) > 0 ? '+' : ''}
                        {getPercentageChange(term.before.conversions, term.after.conversions).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderKeywordMetrics = () => (
    <div className="space-y-6">
      <div className="dashboard-grid">
        <MetricCard
          title="Active Keywords"
          value="1,247"
          change={15.2}
          changeLabel="vs last period"
          trend="up"
        />
        <MetricCard
          title="Top Performing"
          value="89"
          change={7.1}
          changeLabel="keywords added"
          trend="up"
        />
        <MetricCard
          title="Paused Keywords"
          value="34"
          change={-12.3}
          changeLabel="vs last period"
          trend="down"
        />
      </div>
      
      <CustomBarChart
        data={generateAuctionData()}
        bars={[
          { dataKey: 'qualityScore', name: 'Quality Score', color: 'hsl(var(--chart-2))' },
          { dataKey: 'impressionShare', name: 'Impression Share (%)', color: 'hsl(var(--chart-4))' },
        ]}
        title="Keyword Performance by Match Type"
        height={400}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'campaign':
        return renderCampaignMetrics();
      case 'competitive':
        return renderCompetitiveMetrics();
      case 'auction':
        return renderAuctionChanges();
      case 'search-terms':
        return renderSearchTerms();
      case 'keywords':
        return renderKeywordMetrics();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Google Ads Change History Monitor
          </h1>
          <p className="text-text-secondary">
            Track and analyze changes across your Google Ads campaigns with detailed reporting segments.
          </p>
        </div>
        
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onRefresh={handleRefresh}
        />
        
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Index;
