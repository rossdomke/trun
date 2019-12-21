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
];

export default {
  NameGenerator() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adj + noun;
  },
};
