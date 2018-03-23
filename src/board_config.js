// 3r^2 - 3r + 1
// 3*25 - 15 + 1
// 75 - 15 + 1 = 61

module.exports = {
  'boardRadius': 4,
  'boardWidth': 9,
  'hexWidth': 64,
  'hexSpacing': 3,
  hexTypes: {
    blueGem: {
      name: 'Sapphire',
      type: 'blueGem',
      count: 8,
      color: '#00649b',
      matches: ['blueGem', 'bomb']
    },
    pinkGem: {
      name: 'Garnet',
      type: 'pinkGem',
      count: 8,
      color: '#bc4577',
      matches: ['pinkGem', 'bomb']
    },
    redGem: {
      name: 'Ruby',
      type: 'redGem',
      count: 8,
      color: '#bd0000',
      matches: ['redGem', 'bomb']
    },
    orangeGem: {
      name: 'Citrine',
      type: 'orangeGem',
      count: 8,
      color: '#ff7e5a',
      matches: ['orangeGem', 'bomb']
    },
    yellowGem: {
      name: 'Amber',
      type: 'yellowGem',
      count: 8,
      color: '#ffc69a',
      matches: ['yellowGem', 'bomb']
    },
    metal: {
      name: 'Ore',
      type: 'metal',
      count: 4,
      color: '#333',
      sides: 5,
      matches: ['salt']
    },
    salt: {
      name: 'Flux',
      type: 'salt',
      count: 4,
      color: '#ccc',
      sides: 5,
      matches: ['metal']
    },
    bomb: {
      name: 'Bomb',
      type: 'bomb',
      count: 4,
      color: '#c5e29e',
      sides: 3,
      matches: ['blueGem', 'yellowGem', 'orangeGem', 'redGem', 'pinkGem', 'bomb']
    },
    empty: {
      name: 'Empty',
      type: 'empty',
      count: 9,
      color: '#fff',
      matches: []
    }
  },
  configKonva: {
    width: 580,
    height: 580
  },
  configCircle: {
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
  }
}
