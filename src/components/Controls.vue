<template>
  <div class="controls">
    <button type="button" v-on:click.prevent="generate">
      Generate
    </button>
    <button type="button" v-on:click="clear">
      Clear Board
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
    }
  }
}
</script>

<style scoped>
</style>
