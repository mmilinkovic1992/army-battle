<template>
  <div>
    <h1>Update army</h1>

    <CInput
        class="mr-sm-2 my-2 my-sm-2"
        placeholder="Search"
        size="sm"
        ref="searchDetails"
        @keyup="searchArmies()"
    />

    <table class="table table-striped table-fixed table-hover table-bordered">
      <th>Name</th><th>Units</th><th>Attack Strategy</th><th>Option</th>
      <tr v-for="item in this.armies">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.units}}
        </td>
        <td>
          {{item.attack_strategy}}
        </td>
        <td>
          <router-link :to="'update/' + item.id" class="btn btn-outline-warning btn-block active">
            Update
          </router-link>

          <router-link :to="'update/' + item.id" class="btn btn-outline-danger btn-block active">
            Delete
          </router-link>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import axios from 'axios'
import 'babel-polyfill';

export default {
  name: "update",
  data() {
    return {
      armies: [],
      backupArmies: [],
    }
  },
  methods: {
    searchArmies() {
      const searchParam = this.$refs.searchDetails.state.toLowerCase()
      this.armies = this.backupArmies
      this.armies = this.armies.filter(army => army.name.toLowerCase().includes(searchParam))
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://army-battle.test/api/armies');
      this.armies = response.data.armies
      this.backupArmies = this.armies
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>

</style>