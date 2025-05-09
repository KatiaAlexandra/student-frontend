<template>
  <div id="app">
      <b-nav class="bg-info d-flex align-items-center">
        <b-img src="https://images.vexels.com/media/users/3/143401/isolated/preview/c1975b75a334884d2aa6c502bacb6a04-dibujos-animados-de-gorro-de-graduacion.png" height="50px" width="50px"></b-img>
        <b-nav-text style="color: white" class="ml-2">Estudiantes</b-nav-text>
      </b-nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
