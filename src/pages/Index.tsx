
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FilterPanel from '@/components/FilterPanel';
import MetricCard from '@/components/MetricCard';
import ComparisonMetricCard from '@/components/ComparisonMetricCard';
import CustomLineChart from '@/components/charts/LineChart';
import CustomBarChart from '@/components/charts/BarChart';

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
        <MetricCard
          title="New Search Terms"
          value="342"
          change={18.7}
          changeLabel="vs last period"
          trend="up"
        />
        <MetricCard
          title="Query Match Rate"
          value="94.2%"
          change={1.8}
          changeLabel="vs last period"
          trend="up"
        />
        <MetricCard
          title="Negative Keywords"
          value="156"
          change={23.4}
          changeLabel="added this period"
          trend="up"
        />
      </div>
      
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Search Term Performance</h3>
        <div className="space-y-4">
          {[
            { term: 'google ads management', impressions: 2847, clicks: 189, ctr: 6.64, cpc: 1.23 },
            { term: 'ppc advertising services', impressions: 1956, clicks: 142, ctr: 7.26, cpc: 1.45 },
            { term: 'digital marketing agency', impressions: 3241, clicks: 198, ctr: 6.11, cpc: 1.67 },
            { term: 'search engine marketing', impressions: 1632, clicks: 87, ctr: 5.33, cpc: 1.89 },
          ].map((term, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{term.term}</h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                  <span>{term.impressions.toLocaleString()} impressions</span>
                  <span>{term.clicks} clicks</span>
                  <span>{term.ctr}% CTR</span>
                  <span>${term.cpc} CPC</span>
                </div>
              </div>
            </div>
          ))}
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
