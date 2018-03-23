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
      type: 'blueGem',
      count: 8,
      color: '#00649b',
      matches: ['blueGem']
    },
    pinkGem: {
      type: 'pinkGem',
      count: 8,
      color: '#bc4577',
      matches: ['pinkGem']
    },
    redGem: {
      type: 'redGem',
      count: 8,
      color: '#bd0000',
      matches: ['redGem']
    },
    orangeGem: {
      type: 'orangeGem',
      count: 8,
      color: '#ff7e5a',
      matches: ['orangeGem']
    },
    yellowGem: {
      type: 'yellowGem',
      count: 8,
      color: '#ffc69a',
      matches: ['yellowGem']
    },
    metal: {
      type: 'metal',
      count: 4,
      color: '#333',
      matches: ['salt']
    },
    salt: {
      type: 'salt',
      count: 4,
      color: '#ccc',
      matches: ['metal']
    },
    empty: {
      type: 'empty',
      count: 13,
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
