import { LorcanaCard } from '@/hooks/useLorcanaCards';
import { Loader2 } from 'lucide-react';
import CardItem from './CardItem';

interface CardGridProps {
  cards: LorcanaCard[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export default function CardGrid({
  cards,
  loading = false,
  error = null,
  emptyMessage = 'No cards found. Try a different search.',
}: CardGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-sm font-medium text-destructive">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <CardItem key={`${card.Name}-${index}`} card={card} />
      ))}
    </div>
  );
}
