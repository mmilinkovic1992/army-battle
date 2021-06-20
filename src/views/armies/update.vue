<template>
  <div>
    <h1>Update army</h1>

    <div class="col-sm-6 col-md-12" v-if="this.info != ''">
      <div class="card text-center bg-success text-white">
        <div class="card-body">
          <blockquote class="card-blockquote">
            <p>{{ this.info }}</p>
          </blockquote>
        </div>
      </div>
    </div>

    <CInput
        class="mr-sm-2 my-2 my-sm-2"
        placeholder="Search"
        size="sm"
        ref="searchDetails"
        @keyup="searchArmies()"
    />

    <table class="table table-striped table-fixed table-hover table-bordered">
      <th>Name</th><th>Units</th><th>Attack Strategy</th><th>Option</th>
      <tr v-for="(item,index) in this.armies" :key="item.id">
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
          <router-link :to="{ name: 'armies-update', params: { armyId: item.id }}" class="btn btn-outline-warning btn-block active">
            Update
          </router-link>

          <a class="btn btn-outline-danger btn-block active" @click="deleteArmy(item.id, index)">Delete</a>

        </td>
      </tr>
    </table>
<!--    <nav aria-label="pagination">-->
<!--      <ul class="pagination  justify-content-start">-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to first page" href="#" target="_self" class="page-link">«</a>-->
<!--        </li>-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to previous page" href="#" target="_self" class="page-link">‹</a>-->
<!--        </li>&lt;!&ndash;&ndash;&gt;-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to page 1" href="#" target="_self" class="page-link c-page-link-number"> 1 </a>-->
<!--        </li>-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to page 2" href="#" target="_self" class="page-link c-page-link-number"> 2 </a>-->
<!--        </li>-->
<!--        <li class="active page-item">-->
<!--          <a aria-label="Current page 3" href="#" target="_self" class="page-link c-page-link-number"> 3 </a>-->
<!--        </li>-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to page 4" href="#" target="_self" class="page-link c-page-link-number"> 4 </a>-->
<!--        </li>-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to next page" href="#" target="_self" class="page-link">›</a>-->
<!--        </li>-->
<!--        <li class="page-item">-->
<!--          <a aria-label="Go to last page" href="#" target="_self" class="page-link">»</a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </nav>-->


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
      info: '',
      perPage: 5,
    }
  },
  methods: {
    searchArmies() {
      const searchParam = this.$refs.searchDetails.state.toLowerCase()
      this.armies = this.backupArmies
      this.armies = this.armies.filter(army => army.name.toLowerCase().includes(searchParam))
    },

    deleteArmy(id, index) {
      this.index = index
      let message;
      axios({
        method: 'delete',
        url: 'http://army-battle.test/api/armies/'+ id +'/delete'
      }).then(response => {
        this.info = response.data.message
      }).catch(function (error) {
        console.log(error);
      });

      this.deleteResponse(message, index)
    },
    deleteResponse(message, index) {
      this.armies.splice(index, 1)
      this.backupArmies.splice(index, 1)
      setTimeout(() => this.info = "", 1500);
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