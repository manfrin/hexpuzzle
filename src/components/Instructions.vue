<template>
  <div class="instructions">
    <Instruction v-for='tile in tiles'
      :key='tile.type'
      :tile='tile'
    />
  </div>
</template>

<script>
import Instruction from './Instruction'

export default {
  name: 'Instructions',
  components: {Instruction},
  props: ['tiles']
}
</script>
