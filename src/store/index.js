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

let tileCount = 61

for (let i = tiles.length; i <= tileCount; i++) {
  tiles.push({type: 'empty', color: 'rgba(0,0,0,0)'})
}

tiles.sort(() => Math.random() - 0.5)

const store = new Vuex.Store({
  state: {
    board: {},
    boardRadius: config.boardRadius
  },
  actions: {
    generateBoard (context) {
      console.log('generate')
      let newtileset = [].concat(tiles)
      let newBoard = {}
      let counter = 0
      newtileset.sort(() => Math.random() - 0.5)
      for (let i = 0; i < config.boardWidth; i++) {
        for (let j = 0; j < config.boardWidth; j++) {
          const q = i - config.boardRadius
          const r = j - config.boardRadius
          if (Math.abs(-q - r) <= config.boardRadius) {
            const id = `q${q}r${r}`
            // const nonce = Math.floor(Math.random() * 16777215).toString(16)
            let tileType = newtileset.pop()
            // context.commit('addTile', {id, type: tileType.type, color: tileType.color})
            newBoard[id] = {id, type: tileType.type, color: tileType.color}
            counter++
          }
        }
      }
      context.commit('addTiles', newBoard)
      console.log(counter)
    },
    clearBoard (context) {
      context.commit('clearTiles')
    }
  },
  mutations: {
    addTiles (state, tiles) {
      Vue.set(state, 'board', tiles)
    },
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
