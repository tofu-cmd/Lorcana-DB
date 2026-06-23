import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

export interface FilterOptions {
  rarity?: string[];
  franchise?: string[];
  inkColor?: string[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const RARITIES = ['Common', 'Uncommon', 'Rare', 'Super Rare', 'Legendary'];
const FRANCHISES = ['Frozen', 'Aladdin', 'Beauty and the Beast', 'Cinderella', 'The Little Mermaid', 'Snow White', 'Sleeping Beauty', 'Classic'];
const INK_COLORS = ['Red', 'Blue', 'Purple', 'Yellow', 'Pink', 'Green', 'Black'];

export default function FilterSidebar({
  onFilterChange,
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedFranchises, setSelectedFranchises] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleRarityToggle = (rarity: string) => {
    const updated = selectedRarities.includes(rarity)
      ? selectedRarities.filter((r) => r !== rarity)
      : [...selectedRarities, rarity];
    setSelectedRarities(updated);
    onFilterChange({
      rarity: updated.length > 0 ? updated : undefined,
      franchise: selectedFranchises.length > 0 ? selectedFranchises : undefined,
      inkColor: selectedColors.length > 0 ? selectedColors : undefined,
    });
  };

  const handleFranchiseToggle = (franchise: string) => {
    const updated = selectedFranchises.includes(franchise)
      ? selectedFranchises.filter((f) => f !== franchise)
      : [...selectedFranchises, franchise];
    setSelectedFranchises(updated);
    onFilterChange({
      rarity: selectedRarities.length > 0 ? selectedRarities : undefined,
      franchise: updated.length > 0 ? updated : undefined,
      inkColor: selectedColors.length > 0 ? selectedColors : undefined,
    });
  };

  const handleColorToggle = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updated);
    onFilterChange({
      rarity: selectedRarities.length > 0 ? selectedRarities : undefined,
      franchise: selectedFranchises.length > 0 ? selectedFranchises : undefined,
      inkColor: updated.length > 0 ? updated : undefined,
    });
  };

  const handleReset = () => {
    setSelectedRarities([]);
    setSelectedFranchises([]);
    setSelectedColors([]);
    onFilterChange({});
  };

  const hasActiveFilters = selectedRarities.length > 0 || selectedFranchises.length > 0 || selectedColors.length > 0;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0 lg:w-auto lg:border-0 lg:bg-transparent lg:p-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border lg:border-0 lg:p-0 lg:mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-muted rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Sections */}
      <div className="p-4 lg:p-0 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-none">
        {/* Rarity Filter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Rarity</h3>
          <div className="space-y-2">
            {RARITIES.map((rarity) => (
              <label key={rarity} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRarities.includes(rarity)}
                  onChange={() => handleRarityToggle(rarity)}
                  className="w-4 h-4 rounded border-border accent-accent"
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {rarity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Franchise Filter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Franchise</h3>
          <div className="space-y-2">
            {FRANCHISES.map((franchise) => (
              <label key={franchise} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFranchises.includes(franchise)}
                  onChange={() => handleFranchiseToggle(franchise)}
                  className="w-4 h-4 rounded border-border accent-accent"
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {franchise}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ink Color Filter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Ink Color</h3>
          <div className="space-y-2">
            {INK_COLORS.map((color) => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorToggle(color)}
                  className="w-4 h-4 rounded border-border accent-accent"
                />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
