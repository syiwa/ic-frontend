<template>
	<div class="ic-login">
		<b-form @submit="onSubmit">
		    <b-form-group label="Email" label-for="email">
		        <b-form-input id="email"
		                      type="email"
		                      required>
		        </b-form-input>
		    </b-form-group>

		    <b-form-group label="Password" label-for="password">
		        <b-form-input id="password"
		                      type="password"
		                      required>
		        </b-form-input>
		    </b-form-group>

		    <b-button type="submit" variant="primary">Login</b-button>
		</b-form>
	</div>
</template>

<script>

export default{
	name: 'Login'
}

</script>

<style lang="scss">
	.ic-login{
		text-align: left;
	}
</style>