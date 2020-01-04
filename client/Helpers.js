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

const helpers = {
  NameGenerator() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adj + noun;
  },
  ColorGenerator() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
};

export default helpers;
