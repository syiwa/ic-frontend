<template>
	<div class="ic-login">
		<b-alert variant="danger"
            dismissible
            :show="showValidationAlert"
            @dismissed="clearValidation">
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
			var show = false;
			_.each(this.validation, (key, val) => {
				if(this.validation[val] && this.validation[val].length > 0) show = true;
			})
			return show;
		},
		allValidationMessages() {
			return _.without(_.reduce(this.validation, function(last, o){
				if(!last) last = [];
				return last.concat(_.values(o));
			}), undefined);
		}
	},
	methods: {
		onSubmit: function(e){
			var vm = this;
			this.clearValidation();
			this.$store.dispatch('auth/login', {
				email: this.form.email,
				password: this.form.password,
				callback: (data) => {
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
			});
		},
		clearValidation: function(){
			this.validation = {
				_general: [],
				email: [],
				password: []
			}
		}
	}
}

</script>

<style lang="scss">
	.ic-login{
		text-align: left;
	}
</style>