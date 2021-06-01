<template>
  <header>
    <div class="container">
        <div class="game-links">
            <router-link to="/game/create-game" class="game-btn">Create new game</router-link>
            <i class="far fa-arrow-alt-circle-right"></i>
            <router-link to="/game/create-army" class="game-btn">Create new army</router-link>
            <i class="far fa-arrow-alt-circle-right"></i>
            <router-link to="/game/add-army" class="game-btn">Add army to the game</router-link>
            <i class="far fa-arrow-alt-circle-right"></i>
            <router-link to="/game/game-list" class="game-btn">Game list</router-link>
        </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "top-bar"
}
</script>

<style scoped>

</style>