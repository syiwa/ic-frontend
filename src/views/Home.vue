<template>
  <div class="home">
  		<div class="ic-login-box">
	  		<Login />
	  	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
  	Login
  }
}
</script>

<style type="text/css" lang="scss">
	.home{
		text-align: center;
		padding: 20px;

		.ic-login-box{
			width: 400px;
			background-color: white;
			box-shadow: 5px 5px 10px rgba(0,0,0,.2);
			padding: 30px;
			box-sizing: border-box;
			border-radius: 5px;
			margin: auto;
		}
	}
</style>
