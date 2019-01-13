<template>
	<div class="ic-login">
		<b-alert variant="danger"
            dismissible
            :show="showValidationAlert"
            @dismissed="showDismissibleAlert=false">
            <li v-for="error in allValidationMessages">
            	{{ error }}
            </li>
	    </b-alert>
		<b-form v-on:submit.prevent="onSubmit" v-if="form">
		    <b-form-group label="Email">
		        <b-form-input v-model="form.email"></b-form-input>
		    </b-form-group>

		    <b-form-group label="Password">
		        <b-form-input type="password" v-model="form.password"></b-form-input>
		    </b-form-group>

		    <b-button type="submit" variant="primary">Login</b-button>
		</b-form>
	</div>
</template>

<script>
export default{
	name: 'Login',
	data: function(){
		return {
			form: {
				email: null,
				password: null
			},
			validation: {
				_general: [],
				email: [],
				password: []
			}
		}
	},
	computed: {
		showValidationAlert() {
			return this.validation._general.length > 0 ||
				this.validation.email.length > 0 ||
				this.validation.password.length > 0
		},
		allValidationMessages() {
			return _.without(_.reduce(this.validation, function(last, o){
				return last.concat(_.values(o));
			}), undefined);
		}
	},
	methods: {
		onSubmit: function(e){
			var vm = this;
			this.$store.dispatch('auth/login', [
				this.form.email,
				this.form.password,
				(data) => {
					if(data.status == "success"){
						this.$emit('loginSuccess');
						this.$router.push('dashboard');
					}else{
						data = data.data;
						this.validation._general = [data.message];
						this.validation.email = data.email;
						this.validation.password = data.password;
					}
				}
			]);
		}
	}
}

</script>

<style lang="scss">
	.ic-login{
		text-align: left;
	}
</style>