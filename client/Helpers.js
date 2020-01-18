const adjectives = [
  'Excitable',
  'Lazy',
  'Adamant',
  'Boorish',
  'Calamitous',
  'Caustic',
  'Comely',
  'Spastic',
  'Energetic',
  'Bashful',
  'Quick',
  'Angry',
  'Happy',
  'Deadly',
  'Super',
  'Scary',
  'Chipper',
  'Bright',
  'Smart',
  'Silly',
  'Rowdy',
  'Figety',
  'Foolish',
  'Bold',
  'Cranky',
  'Pretty',
  'Poor',
  'Petite',
  'Golden',
  'Broad',
  'Long',
  'Massive',
  'Tiny',
  'Large',
  'Hairy',
  'Scaley',
  'Rough',
  'Smooth',
  'Slimey',
  'Numb',
  'Hyper',
  'Rowdy',
  'Solid',
  'Loud',
];

const nouns = [
  'Sloth',
  'Ardvark',
  'Muscrat',
  'Koala',
  'Bison',
  'Yeti',
  'Dog',
  'Snake',
  'Clown',
  'Bear',
  'Frog',
  'Lizard',
  'Snail',
  'Spider',
  'Panda',
  'Python',
  'Tomato',
  'Avacado',
  'Goose',
  'Duck',
  'Goose',
  'Lion',
  'Bug',
  'Ant',
  'Armadillo',
  'Coffee',
  'Junk',
  'Trash',
  'Person',
  'Yankee',
  'Juice',
  'Chicken',
  'Salsa',
  'Stove',
  'Toilet',
  'Mountain',
  'Finger',
  'Dragon',
  'Ocean',
];

export const NameGenerator = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adj + noun;
};
export const ColorGenerator = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const IdGenerator = () => Math.random().toString(36).substr(2, 9);
