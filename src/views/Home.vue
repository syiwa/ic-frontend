<template>
  	<div class="home">
  		<div class="row">
	  		<div class="col-md-8 col-xs-12">
		  		<b-carousel id="carousel1"
		                style="text-shadow: 1px 1px 2px #333;"
		                controls
		                indicators
		                background="#ababab"
		                :interval="4000"
		                img-width="1024"
		                img-height="480">

			      	<b-carousel-slide caption="Welcome" img-src="https://source.unsplash.com/random/1024x480?business"></b-carousel-slide>
			      	<b-carousel-slide caption="Enjoy" img-src="https://source.unsplash.com/random/1024x480?landscape"></b-carousel-slide>
			      	<b-carousel-slide caption="Teamwork" img-src="https://source.unsplash.com/random/1024x480?teamwork"></b-carousel-slide>

			    </b-carousel>
	  		</div>
	  		<div class="col-md-4 col-xs-12">
	  			<b-jumbotron header="Welcome">
			  		<Login v-if="!isAuth" />

				  	<div class="ic-welcome" v-if="isAuth">
				  		<p>You're already logged in as {{ this.$store.getters['auth/myRole'] }}, now you can access <router-link to="/dashboard">Dashboard</router-link> page.</p> 
				  		<p v-if="this.$store.getters['auth/hasRole']('admin')">Since your role is <strong>Admin</strong>, you must be available to see and access <router-link to="/users">User</router-link> navigation above.</p>
				  	</div>
				</b-jumbotron>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
import Login from '@/components/Login.vue'
import { mapState } from 'vuex'

export default {
  	name: 'home',
  	components: {
  		Login
  	},
  	computed: mapState({
  		isAuth: state => state.auth.isAuth
  	})
}
</script>

<style type="text/css" lang="scss">
	.home{
		text-align: center;
		padding: 20px;
	}
</style>
