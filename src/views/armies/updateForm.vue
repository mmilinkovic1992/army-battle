<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Army </strong><small> Update </small>
      </CCardHeader>
      <CCardBody>
        <label class=""> Name </label>
        <input type="text" name="" v-bind:value="this.army.name" class="form-control" ref="name"> <br>
        <label class=""> Units </label>
        <input type="text" name="" v-bind:value="this.army.units" class="form-control" ref="units"> <br>
        <CSelect
            label="Attack Strategy"
            :options="{1: 'Select....', 2: 'random', 3: 'strongest', 4: 'weakest'}"
            ref="attack_strategy"
        />
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="primary" @click="save"><CIcon name="cil-check-circle"/> Submit</CButton>
        <CButton type="reset" size="sm" color="danger" @click="reset"><CIcon name="cil-ban"/> Reset</CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import axios from "axios";
import 'babel-polyfill';
import Armies from "../../data/Armies";

export default {
  name: "updateForm.vue",
  data() {
    return {
      army: null,
    }
  },
  async mounted() {
    try {
      let id = this.$route.params.armyId
      const response = await axios.get('http://army-battle.test/api/armies/' + id);
      this.army = response.data.army
    } catch (error) {
      console.log(error)
    }
  },
  methods : {
    save() {
      let id = this.$route.params.armyId
      const name = this.$refs.name.value
      const units = this.$refs.units.value
      const attackStrategy = this.$refs.attack_strategy.state.toLowerCase()
      const info = Armies.methods.update({name: name, units: units, attack_strategy: attackStrategy}, id)
      alert("Success")
    }
  }
}
</script>

<style scoped>

</style>