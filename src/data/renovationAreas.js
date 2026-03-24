export const RENOVATION_AREAS = {
  entryGarden: {
    id: 'entryGarden',
    name: 'Entry Garden',
    description: 'The welcoming garden at the entrance of Pet Paradise',
    levelsRequired: 10,
    tasks: [
      {
        id: 'fix_fence',
        name: 'Fix the Fence',
        description: 'Repair the broken wooden fence',
        starCost: 3,
        options: [
          { id: 'white_picket', name: 'White Picket', emoji: '🏡', description: 'Classic white picket fence' },
          { id: 'stone_wall', name: 'Stone Wall', emoji: '🧱', description: 'Sturdy stone border' },
          { id: 'flower_hedge', name: 'Flower Hedge', emoji: '🌸', description: 'Beautiful blooming hedge' },
        ],
        requiredTaskId: null,
      },
      {
        id: 'plant_flowers',
        name: 'Plant Flowers',
        description: 'Add colorful flowers to the garden',
        starCost: 5,
        options: [
          { id: 'roses', name: 'Roses', emoji: '🌹', description: 'Classic red roses' },
          { id: 'sunflowers', name: 'Sunflowers', emoji: '🌻', description: 'Cheerful sunflowers' },
          { id: 'wildflowers', name: 'Wildflowers', emoji: '💐', description: 'Natural wildflower mix' },
        ],
        requiredTaskId: 'fix_fence',
      },
      {
        id: 'add_fountain',
        name: 'Add a Fountain',
        description: 'Install a decorative water fountain',
        starCost: 8,
        options: [
          { id: 'bird_bath', name: 'Bird Bath', emoji: '🐦', description: 'Lovely bird bath fountain' },
          { id: 'koi_pond', name: 'Koi Pond', emoji: '🐟', description: 'Serene koi fish pond' },
          { id: 'water_feature', name: 'Water Feature', emoji: '💧', description: 'Modern tiered fountain' },
        ],
        requiredTaskId: 'plant_flowers',
      },
    ],
  },
  petParlor: {
    id: 'petParlor',
    name: 'Pet Parlor',
    description: 'The grooming and pampering salon for pets',
    levelsRequired: 20,
    tasks: [
      {
        id: 'grooming_table',
        name: 'Grooming Table',
        description: 'Set up a professional grooming station',
        starCost: 5,
        options: [
          { id: 'classic_table', name: 'Classic Table', emoji: '🛁', description: 'Traditional grooming setup' },
          { id: 'spa_station', name: 'Spa Station', emoji: '✨', description: 'Luxury spa grooming station' },
          { id: 'outdoor_wash', name: 'Outdoor Wash', emoji: '🚿', description: 'Fun outdoor wash area' },
        ],
        requiredTaskId: null,
      },
      {
        id: 'waiting_area',
        name: 'Waiting Area',
        description: 'Create a cozy waiting room for pets and owners',
        starCost: 6,
        options: [
          { id: 'cozy_couches', name: 'Cozy Couches', emoji: '🛋️', description: 'Comfortable seating' },
          { id: 'play_corner', name: 'Play Corner', emoji: '🎮', description: 'Pet play corner' },
          { id: 'garden_view', name: 'Garden View', emoji: '🪴', description: 'Scenic garden seating' },
        ],
        requiredTaskId: 'grooming_table',
      },
      {
        id: 'display_shelf',
        name: 'Display Shelf',
        description: 'Showcase pet accessories and products',
        starCost: 7,
        options: [
          { id: 'rustic_shelf', name: 'Rustic Shelf', emoji: '📚', description: 'Wooden rustic shelves' },
          { id: 'modern_display', name: 'Modern Display', emoji: '🏪', description: 'Sleek modern shelving' },
          { id: 'colorful_rack', name: 'Colorful Rack', emoji: '🌈', description: 'Colorful tiered rack' },
        ],
        requiredTaskId: 'waiting_area',
      },
    ],
  },
};

export const AREA_ORDER = ['entryGarden', 'petParlor'];
