import { LorcanaCard } from '@/hooks/useLorcanaCards';

export const MOCK_CARDS: LorcanaCard[] = [
  {
    Name: 'Elsa',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Elsa',
    Rarity: 'Rare',
    Franchise: 'Frozen',
    InkColor: 'Blue',
    Cost: 4,
    Power: 4,
  },
  {
    Name: 'Mickey Mouse',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Mickey',
    Rarity: 'Common',
    Franchise: 'Classic',
    InkColor: 'Red',
    Cost: 2,
    Power: 2,
  },
  {
    Name: 'Cinderella',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Cinderella',
    Rarity: 'Super Rare',
    Franchise: 'Cinderella',
    InkColor: 'Purple',
    Cost: 5,
    Power: 5,
  },
  {
    Name: 'Ariel',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Ariel',
    Rarity: 'Rare',
    Franchise: 'The Little Mermaid',
    InkColor: 'Blue',
    Cost: 3,
    Power: 3,
  },
  {
    Name: 'Belle',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Belle',
    Rarity: 'Uncommon',
    Franchise: 'Beauty and the Beast',
    InkColor: 'Yellow',
    Cost: 3,
    Power: 3,
  },
  {
    Name: 'Jasmine',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Jasmine',
    Rarity: 'Rare',
    Franchise: 'Aladdin',
    InkColor: 'Purple',
    Cost: 4,
    Power: 4,
  },
  {
    Name: 'Snow White',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Snow+White',
    Rarity: 'Super Rare',
    Franchise: 'Snow White',
    InkColor: 'Red',
    Cost: 5,
    Power: 5,
  },
  {
    Name: 'Aurora',
    Image: 'https://via.placeholder.com/300x450/1a1a2e/d4a574?text=Aurora',
    Rarity: 'Uncommon',
    Franchise: 'Sleeping Beauty',
    InkColor: 'Pink',
    Cost: 3,
    Power: 3,
  },
];

export function getMockCards(pageSize: number, page: number): LorcanaCard[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Create a larger mock dataset by repeating and modifying the base cards
  const extendedCards: LorcanaCard[] = [];
  for (let i = 0; i < 100; i++) {
    const baseCard = MOCK_CARDS[i % MOCK_CARDS.length];
    extendedCards.push({
      ...baseCard,
      Name: `${baseCard.Name} #${i + 1}`,
    });
  }

  return extendedCards.slice(startIndex, endIndex);
}
