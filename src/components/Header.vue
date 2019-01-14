<template>
	<div>
		<b-navbar toggleable="md">

		  	<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		  	<b-navbar-brand href="#">
		    	<router-link to="/">ICSG Test</router-link> 
		  	</b-navbar-brand>

		  	<b-collapse is-nav id="nav_collapse">

		  		<b-navbar-nav>
			      	<b-nav-item v-if="isAuth">
				    	<router-link to="/dashboard">Dashboard</router-link> 
			      	</b-nav-item>
			      	<b-nav-item v-if="isAuth && this.$store.getters['auth/hasRole']('admin')">
				    	<router-link to="/users">Users</router-link> 
			      	</b-nav-item>
			    </b-navbar-nav>

		    	<b-navbar-nav class="ml-auto" v-if="!isAuth">
		      		<b-nav-item v-b-modal.login>Login</b-nav-item>
		    	</b-navbar-nav>

		    	<b-navbar-nav class="ml-auto" v-if="isAuth">
		      		<b-nav-item-dropdown right>
				        <template slot="button-content">
				         	{{ user.name }}
				        </template>
				        <b-dropdown-item to="/profile/settings">
					    	Profile Setting 
				        </b-dropdown-item>
				        <b-dropdown-item to="/profile/password">
					    	Change Password 
				        </b-dropdown-item>
				        <div class="dropdown-divider"></div>
				        <b-dropdown-item @click="logout">
				      		Logout
				        </b-dropdown-item>
				    </b-nav-item-dropdown>
		    	</b-navbar-nav>

		  	</b-collapse>
		</b-navbar>
		
		<b-modal ref="login" id="login" title="Login" hide-footer>
		    <Login @loginSuccess="hideModal" />
		</b-modal>
	</div>
</template>

<script>

import Login from '@/components/Login.vue'
import { mapState } from 'vuex'

export default{
	name: 'Header',
	components: {
		Login
	},
	computed: {
		...mapState({
			isAuth: state => state.auth.isAuth,
			user: state => state.auth.user
		})
	},
	methods: {
		logout: function(){
			this.$store.dispatch('auth/logout', () => {
				this.$router.push('/')
			})
		},
		hideModal: function(){
			this.$refs.login.hide();
		}
	}
}

</script>
