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
    },
    store (data) {
      axios.post('http://army-battle.test/api/army/create', data)
          .then((response) => {
            this.info = response
          });

      return this.info
    }
  }
}
</script>

<style scoped>

</style>