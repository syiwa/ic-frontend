<template>
	<div>
		<b-form v-on:submit.prevent="onSubmit" class="col-md-6 col-xs-12 ic-form">
			<b-alert dismissible variant="success" :show="showSuccessAlert" @dismissed="successMessage = null">
			    {{ successMessage }}
			</b-alert>
			<b-alert show dismissible variant="danger" :show="showValidationAlert" @dismissed="clearValidation">
			    <li v-for="error in allValidationMessages">
	            	{{ error }}
	            </li>
			</b-alert>
	      	<b-form-group horizontal breakpoint="md" label-class="text-sm-right" label="Name" label-for="name" :label-cols="2">
	       		<b-form-input :disabled="!this.$store.getters['auth/hasRole']('admin')" id="name" type="text" v-model="form.name"></b-form-input>
	      	</b-form-group>
	      	<b-form-group horizontal breakpoint="md" label-class="text-sm-right" label="Email" label-for="email" :label-cols="2">
	       		<b-form-input :disabled="!this.$store.getters['auth/hasRole']('admin')" id="email" type="text" v-model="form.email"></b-form-input>
	      	</b-form-group>
	      	<b-form-group horizontal breakpoint="md" label-class="text-sm-right" label="Phone" label-for="phone" :label-cols="2">
	       		<b-form-input id="phone" type="text" v-model="form.phone"></b-form-input>
	      	</b-form-group>
	      	<b-form-group horizontal breakpoint="md" label-class="text-sm-right" label="Address" label-for="address" :label-cols="2">
	       		<b-form-textarea :disabled="!this.$store.getters['auth/hasRole']('admin')" :rows="2" id="address" type="text" v-model="form.address"></b-form-textarea>
	      	</b-form-group>

		    <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
	    </b-form>
	</div>
</template>

<script type="text/javascript">
	
export default{
	name: 'UserForm',
	data: function(){
		return {
			form: {
				name: null,
				email: null,
				phone: null,
				address: null
			},
			successMessage: null,
			validation: {
				name: [],
				email: [],
				phone: [],
				address: []
			},
			toUpdatedUserID: null
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
		loadUserData: function(id){
			this.$store.dispatch('loader/show');
			this.$store.dispatch('user/loadUser', {
				id: id,
				callback: (data) => {
					this.$store.dispatch('loader/hide');
					if(data.status == "success"){
						this.form = _.pick(data.data, ['name','email','phone','address']);
						this.toUpdatedUserID = data.data.id;
					}
				}
			})
		},
		onSubmit: function(){
			var data = _.clone(this.form)

			this.clearValidation();

			if(this.$store.getters['auth/hasRole']('user')){
				data = _.pick(data, ['phone']);
			}

			var callback = (data) => {
				this.$store.dispatch('loader/hide');
				if(data.status == "success"){
					if(this.$route.meta.purpose == 'add'){
						this.successMessage = "Data successfully saved!";
						this.clearForm();
					}else{
						this.successMessage = "Data successfully updated!";
						this.form = _.pick(data.data, ['name','email','phone','address']);
						if(this.$store.state.auth.user.id == data.data.id){
							this.$store.dispatch('auth/setUser', _.pick(data.data, ['id','name','email','phone','address']))
						}
					}
				}else{
					data = data.data;
					this.validation.name = data.name;
					this.validation.email = data.email;
					this.validation.phone = data.phone;
					this.validation.address = data.address;
				}
			};

			if(this.$route.meta.purpose == 'add'){
				this.$store.dispatch('loader/show');
				this.$store.dispatch('user/addUser', {
					data: data,
					callback: callback
				})
			}else{
				this.$store.dispatch('loader/show');
				this.$store.dispatch('user/updateUser', {
					id: this.toUpdatedUserID,
					data: data,
					callback: callback
				})
			}
		},
		clearForm: function(){
			this.form = {
				name: null,
				email: null,
				phone: null,
				address: null
			}
		},
		clearValidation: function(){
			this.successMessage = null;
			this.validation = {
				name: [],
				email: [],
				phone: [],
				address: []
			}
		}
	},
	beforeMount: function(){
		switch(this.$route.meta.purpose){
			case "edit": {
				this.loadUserData(this.$route.params.id);
			}break;

			case "setting": {
				this.loadUserData('self');
			}break;
		}
	}
}


</script>

<style type="text/css" lang="scss">
	.ic-form{
		margin: auto;
		padding-bottom: 40px;
	}
</style>