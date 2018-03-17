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
  tiles.push({type: 'empty', color: 'rgba(255,255,255,.2)'})
}

tiles.sort(() => Math.random() - 0.5)

const store = new Vuex.Store({
  state: {
    board: {},
    boardRadius: config.boardRadius
  },
  comnputed: {
    tileCount () {
      return Object.kays(this.state.board).length
    }
  },
  actions: {
    generateBoard (context) {
      context.commit('clearTiles')
      let newtileset = [].concat(tiles)
      let newBoard = {}
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
          }
        }
      }
      context.commit('addTiles', newBoard)
    },
    clearBoard (context) {
      context.commit('clearTiles')
    },
    deleteRandom (context) {
      context.commit('deleteRandomTile')
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
      Vue.delete(state, 'board', {})
    },
    deleteRandomTile (state) {
      let id = Object.keys(state.board)[0]
      Vue.delete(state.board, id)
    }
  }
})

export default store
