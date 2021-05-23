<template>
  <div></div>
</template>

<script>
import axios from "axios"

export default {
  name: "Armies",
  data() {
    return {
      info: null
    }
  },
  methods: {
    getArmies() {
        axios.get('http://army-battle.test/api/armies')
             .then(response => (this.info = response))

      return this.info.data
    }
  }
}
</script>

<style scoped>

</style>