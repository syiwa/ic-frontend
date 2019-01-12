<template>
	<div>
		<b-navbar toggleable="md">

		  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		  <b-navbar-brand href="#">ICSG Test</b-navbar-brand>

		  <b-collapse is-nav id="nav_collapse">

		    <!-- Right aligned nav items -->
		    <b-navbar-nav class="ml-auto">
		      <b-nav-item v-b-modal.login>Login</b-nav-item>
		    </b-navbar-nav>

		  </b-collapse>
		</b-navbar>
		
		<b-modal id="login" title="Login" hide-footer>
		    <Login />
		</b-modal>
	</div>
</template>

<script>

import Login from '@/components/Login.vue'

export default{
	name: 'Header',
	components: {
		Login
	}
}

</script>
