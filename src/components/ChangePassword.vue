<template>
	<div>
		<b-alert dismissible variant="success" :show="showSuccessAlert" @dismissed="successMessage = null">
		    {{ successMessage }}
		</b-alert>
		<b-alert variant="danger"
            dismissible
            :show="showValidationAlert"
            @dismissed="clearValidation">
            <li v-for="error in allValidationMessages">
            	{{ error }}
            </li>
	    </b-alert>
		<b-form v-on:submit.prevent="onSubmit" class="col-md-8 col-xs-12 ic-password-form" v-if="form">
		    <b-form-group label="Current Password" horizontal breakpoint="md" label-class="text-sm-right">
		        <b-form-input type="password" v-model="form.old_password"></b-form-input>
		    </b-form-group>
		    <b-form-group label="New Password" horizontal breakpoint="md" label-class="text-sm-right">
		        <b-form-input type="password" v-model="form.new_password"></b-form-input>
		    </b-form-group>
		    <b-form-group label="New Password Retype" horizontal breakpoint="md" label-class="text-sm-right">
		        <b-form-input type="password" v-model="form.new_password_retype"></b-form-input>
		    </b-form-group>

		    <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
		</b-form>
	</div>
</template>

<script type="text/javascript">

export default{
	name: 'ChangePassword',
	data: function(){
		return {
			form: {
				old_assword: null,
				new_password: null,
				new_password_retype: null
			},
			validation: {
				_general: [],
				old_assword: [],
				new_password: [],
				new_password_retype: [],
			},
			successMessage: null
		}
	},
	computed: {
		showSuccessAlert(){
			return this.successMessage && this.successMessage.length > 0
		},
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
		onSubmit: function(){
			this.clearValidation();
			this.$store.dispatch('auth/changePassword', {
				data: this.form,
				callback: (data) => {
					if(data.status == "success"){
						this.successMessage = "Password successfully updated!";
					}else{
						data = data.data;
						this.validation._general = [data.message];
						this.validation.old_password = data.old_password;
						this.validation.new_password = data.new_password;
						this.validation.new_password_retype = data.new_password_retype;
					}
				}
			})
		},
		clearValidation: function(){
			this.successMessage = null;
			this.validation = {
				_general: [],
				old_password: [],
				new_password: [],
				new_password_retype: [],
			}
		}
	}
}

</script>

<style type="text/css" lang="scss">
.ic-password-form{
	margin: auto;
	padding-bottom: 50px;
}
</style>