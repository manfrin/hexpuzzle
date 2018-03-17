import Vue from 'vue'
import Vuex from 'vuex'
import config from '../board_config.js'

Vue.use(Vuex)

let tiles = []
for (let type of config.hexTypes) {
  for (let i = 0; i < type.count; i++) {
    tiles.push({type: type.type, color: type.color})
  }
}

let tileCount = config.boardRadius * config.boardRadius * 6 + 1
console.log(tileCount)
for (let i = tiles.length; i <= tileCount; i++) {
  tiles.push({type: 'empty', color: '#fff'})
}

tiles.sort(() => Math.random() - 0.5)

const store = new Vuex.Store({
  state: {
    board: {},
    boardRadius: config.boardRadius
  },
  actions: {
    generateBoard (context) {
      let newtileset = [].concat(tiles)
      newtileset.sort(() => Math.random() - 0.5)
      let counter = 0
      for (let i = 0; i < config.boardWidth; i++) {
        for (let j = 0; j < config.boardWidth; j++) {
          const q = i - config.boardRadius
          const r = j - config.boardRadius
          if (Math.abs(-q - r) <= config.boardRadius) {
            const id = `q${q}r${r}`
            const nonce = Math.floor(Math.random() * 16777215).toString(16)
            let tileType = newtileset.pop()
            console.log(tileType)
            console.log(counter)

            setTimeout(() => {
              context.commit('addTile', {id, type: tileType.type, nonce, color: tileType.color})
            }, 850 * Math.cos(counter++))
          }
        }
      }
    },
    clearBoard (context) {
      context.commit('clearTiles')
    }
  },
  mutations: {
    addTile (state, tile) {
      Vue.set(state.board, tile.id, tile)
    },
    clearTiles (state) {
      Vue.delete(state, 'board')
      Vue.set(state, 'board', {})
    }
  }
})

export default store
