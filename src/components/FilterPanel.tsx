
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, RefreshCw } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    campaign: string;
    adGroup: string;
    changeEvent: string;
    exactChangeEvent: string;
    changeType: string;
    dateRange: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onRefresh: () => void;
}

const FilterPanel = ({ filters, onFilterChange, onRefresh }: FilterPanelProps) => {
  return (
    <div className="bg-surface border border-card-border rounded-lg p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Campaign</label>
          <Select value={filters.campaign} onValueChange={(value) => onFilterChange('campaign', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="brand-search">Brand Search</SelectItem>
              <SelectItem value="generic-search">Generic Search</SelectItem>
              <SelectItem value="display-remarketing">Display Remarketing</SelectItem>
              <SelectItem value="youtube-video">YouTube Video</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Ad Group</label>
          <Select value={filters.adGroup} onValueChange={(value) => onFilterChange('adGroup', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select ad group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ad Groups</SelectItem>
              <SelectItem value="brand-exact">Brand Exact</SelectItem>
              <SelectItem value="brand-phrase">Brand Phrase</SelectItem>
              <SelectItem value="competitor-terms">Competitor Terms</SelectItem>
              <SelectItem value="high-volume-keywords">High Volume Keywords</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Change Event</label>
          <Select value={filters.changeEvent} onValueChange={(value) => onFilterChange('changeEvent', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="bid-changes">Bid Changes</SelectItem>
              <SelectItem value="budget-changes">Budget Changes</SelectItem>
              <SelectItem value="keyword-changes">Keyword Changes</SelectItem>
              <SelectItem value="ad-changes">Ad Changes</SelectItem>
              <SelectItem value="targeting-changes">Targeting Changes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Exact Change Event</label>
          <Select value={filters.exactChangeEvent} onValueChange={(value) => onFilterChange('exactChangeEvent', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select exact event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exact Events</SelectItem>
              <SelectItem value="bid-increase">Bid Increase</SelectItem>
              <SelectItem value="bid-decrease">Bid Decrease</SelectItem>
              <SelectItem value="budget-increase">Budget Increase</SelectItem>
              <SelectItem value="budget-decrease">Budget Decrease</SelectItem>
              <SelectItem value="keyword-add">Keyword Added</SelectItem>
              <SelectItem value="keyword-pause">Keyword Paused</SelectItem>
              <SelectItem value="ad-enabled">Ad Enabled</SelectItem>
              <SelectItem value="ad-paused">Ad Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Change Type</label>
          <Select value={filters.changeType} onValueChange={(value) => onFilterChange('changeType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select change type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="automated">Automated Changes</SelectItem>
              <SelectItem value="manual">Manual Changes</SelectItem>
              <SelectItem value="bulk">Bulk Changes</SelectItem>
              <SelectItem value="script">Script Changes</SelectItem>
              <SelectItem value="rule-based">Rule-based Changes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => onFilterChange('dateRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
