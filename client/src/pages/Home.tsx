import { useState } from 'react';
import Header from '@/components/Header';
import CardGrid from '@/components/CardGrid';
import PaginationControls from '@/components/PaginationControls';
import { useLorcanaCards } from '@/hooks/useLorcanaCards';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663781667632/dqMfAQQ5EhnKfkSbzDGswa/lorcana-logo-j8KUEAF3ZKYGqpsu788nT6.webp';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 30;

  const { cards, loading, error, totalPages } = useLorcanaCards({
    pageSize,
    page: currentPage,
    search: searchQuery || undefined,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} searchValue={searchQuery} logo={LOGO_URL} />

      <main className="container py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Lorcana Cards'}
          </h2>
          <p className="text-muted-foreground">
            {searchQuery
              ? `Found ${cards.length} card${cards.length !== 1 ? 's' : ''}`
              : 'Browse the complete Lorcana card collection'}
          </p>
        </div>

        {/* Card Grid */}
        <CardGrid
          cards={cards}
          loading={loading}
          error={error}
          emptyMessage={
            searchQuery
              ? `No cards found for "${searchQuery}". Try a different search.`
              : 'No cards available.'
          }
        />

        {/* Pagination */}
        {!loading && cards.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Lorcana Card Database • Powered by Lorcana API</p>
          <p className="mt-2 text-xs">
            Explore, search, and discover your favorite Disney Lorcana trading cards
          </p>
        </div>
      </footer>
    </div>
  );
}
