<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Army </strong><small> create </small>
      </CCardHeader>
      <CCardBody>
        <CInput
            label="Name"
            placeholder="Enter army name"
            ref="army_name"
        />
        <CInput
            label="Units"
            placeholder="Number of units"
            ref="units"
            type="number"
            min="1"
            max="100"
        />
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
import Armies from "../../data/Armies";

export default {
  name: "create",
  methods: {
    reset() {
      this.$refs.army_name.state = ""
      this.$refs.units.state = ""
      // this.$refs.attack_strategy.state = ""
    },
    save () {
      const name = this.$refs.army_name.state
      const units = this.$refs.units.state.toLowerCase()
      const attackStrategy = this.$refs.attack_strategy.state.toLowerCase()
      //Kad koristis dropdown, uzmi state odnosno naziv opcije, pa posle pronadji u nizu i uzmi key ako ti treba.
      const info = Armies.methods.store({name: name, units: units, attack_strategy: attackStrategy})
      console.log(info)
    }
  }
}
</script>

<style scoped>

</style>