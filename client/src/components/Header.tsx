import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchValue?: string;
  logo?: string;
}

export default function Header({ onSearch, searchValue = '', logo }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState(searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {logo && (
              <img src={logo} alt="Lorcana" className="h-8 w-8 object-contain" />
            )}
            <h1 className="text-xl font-bold text-foreground">Lorcana</h1>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cards by name, franchise, or rarity..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Search
          </Button>
          {query && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="px-3"
            >
              Clear
            </Button>
          )}
        </form>
      </div>
    </header>
  );
}
