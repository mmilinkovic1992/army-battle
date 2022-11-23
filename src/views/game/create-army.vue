<template>
  <div class="game-wrapper">
    <div class="container">
        <TopBar></TopBar>
        <h1 class="game-title">Create Army</h1>
        <div class="row">
            <div class="offset-md-2"></div>
            <div class="col-md-8">
                <div class="message" v-if="message">{{ message }}</div>
                <form @submit.prevent="create" method="post" class="form">
                    <div class="form-group">
                        <label>Army name*</label>
                        <input type="text" placeholder="Army name" class="form-control" required v-model="armyName">
                    </div>
                    <div class="form-group">
                        <label>Number of soldiers (80-100)*</label>
                        <input type="number" placeholder="Number of soldiers (80-100)" min="80" max="100" class="form-control" required v-model="numberOfSoldiers">
                    </div>
                    <div class="form-group">
                        <label>Attack strategy</label>
                        <select
                            class="form-control"
                            v-model="attackStrategy"
                            required
                            >
                            <option value="random">Random</option>
                            <option value="weakest">Weakest</option>
                            <option value="strongest">Strongest</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="game-btn ml-0">Create army</button>
                    </div>
                </form>
            </div>
            <div class="offset-md-2"></div>
        </div>
    </div>
  </div>
</template>

<script>
import TopBar from './components/top-bar'
import axios from 'axios'
export default {
  name: "create-army",
  components: {
      TopBar
  },
  data() {
      return {
          armyName: '',
          numberOfSoldiers: null,
          attackStrategy: null,
          message: ''
      }
  },
  methods: {
    create() {
        const data = {
            name: this.armyName,
            units: this.numberOfSoldiers,
            attack_strategy: this.attackStrategy
        }

        axios.post('http://army-battle.online/api/army/create', data)
            .then(res => this.message = res.data.message)
            .catch(err => console.error(err))

        this.armyName = '',
        this.numberOfSoldiers = null,
        this.attackStrategy = null

        this.$router.push("/game/add-army");
    }
  }
}
</script>

<style scoped>

</style>