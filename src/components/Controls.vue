<template>
  <div class="controls">
    <button type="button" v-on:click.prevent="generate">
      Generate
    </button>
    <button type="button" v-on:click="clear">
      Clear Board
    </button>
    <button type="button" v-on:click="deleteR">
      Delete Random
    </button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  methods: {
    generate () {
      this.$store.dispatch('generateBoard')
    },
    clear () {
      this.$store.dispatch('clearBoard')
    },
    deleteR () {
      this.$store.dispatch('deleteRandom')
    }
  }
}
</script>

<style scoped>
</style>
