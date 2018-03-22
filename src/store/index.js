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
tiles.sort(() => Math.random() - 0.5)

const store = new Vuex.Store({
  state: {
    board: {},
    selected: ''
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
            let tileType = newtileset.pop()
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
    },
    clicked (context, id) {
      if (this.state.selected.length > 0) {
        context.commit('matchTile', id)
      } else {
        context.commit('selectTile', id)
      }
    }
  },
  mutations: {
    matchTile (state, tileId) {
      Vue.delete(state.board, tileId)
      Vue.delete(state.board, state.selected)
      Vue.set(state, 'selected', '')
    },
    selectTile (state, tileId) {
      Vue.set(state, 'selected', tileId)
    },
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
      let len = Object.keys(state.board).length
      let rand = Math.floor(Math.random() * len)
      let id = Object.keys(state.board)[rand]
      Vue.set(state.board, id, {id: id, type: 'empty', color: '#000'})
    }
  }
})

export default store
