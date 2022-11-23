<template>
  <div></div>
</template>

<script>
import axios from "axios"
import 'babel-polyfill';

export default {
  name: "Armies",
  data() {
    return {
      info: null
    }
  },
  methods: {
    store (data) {
      axios.post('http://army-battle.online/api/army/create', data)
          .then((response) => {
            this.info = response
          });

      return this.info
    },
    update (data, id) {
      axios.post('http://army-battle.online/api/armies/' + id + '/update', data)
          .then((response) => {
            this.info = response
          });

      return this.info
    },

    delete(id) {
      axios.delete('http://army-battle.online/api/armies/' + id + '/delete')
          .then((response) => {
            this.info = response
          });

      return this.info;
    }
  }
}
</script>

<style scoped>

</style>