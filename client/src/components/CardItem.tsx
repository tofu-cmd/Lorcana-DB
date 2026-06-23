import { LorcanaCard } from '@/hooks/useLorcanaCards';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface CardItemProps {
  card: LorcanaCard;
}

export default function CardItem({ card }: CardItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
      {/* Card Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-muted-foreground/20" />
        )}
        <img
          src={card.Image}
          alt={card.Name}
          onLoad={() => setImageLoaded(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-card-foreground truncate leading-tight">
          {card.Name}
        </h3>

        {/* Metadata */}
        <div className="mt-3 space-y-1.5">
          {card.Rarity && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Rarity</span>
              <span className="text-xs text-accent font-semibold">{card.Rarity}</span>
            </div>
          )}
          {card.Franchise && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Franchise</span>
              <span className="text-xs text-card-foreground truncate">{card.Franchise}</span>
            </div>
          )}
          {card.InkColor && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Ink</span>
              <span className="text-xs text-card-foreground">{card.InkColor}</span>
            </div>
          )}
        </div>

        {/* View Button */}
        <a
          href={card.Image}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors group/link"
        >
          View Card
          <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>

      {/* Accent Border on Hover */}
      <div className="absolute inset-0 rounded-lg border-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none" />
    </div>
  );
}
