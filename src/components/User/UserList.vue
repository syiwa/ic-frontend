<template>
	<div>
		<b-table striped hover :items="users" :fields="fields">
			<template slot="actions" slot-scope="row">
				<router-link v-bind:to="`/${row.item.id}/edit`">
					<b-button variant="warning" size="sm"class="mr-2">
				    	Edit
				    </b-button>
			    </router-link> 
			    <b-button variant="danger" size="sm"class="mr-2">
					Delete
			    </b-button>
			</template>
		</b-table>
	</div>
</template>

<script type="text/javascript">
	
export default{
	name: 'UserList',
	data: () => {
		return {
			usersData: [],
			fields: [
				'name',
				'email',
				'phone',
				'address',
				'actions'
			]
		}
	},
	computed: {
		users: function(){
			return _.map(this.usersData, function(o){
				return _.pick(o, ['id','name','email','phone','address'])
			})
		}
	},
	methods: {
		loadUsers: function(page){
			this.$store.dispatch('user/loadUsers', {
				params: {
					page: (page) ? page : 1
				},
				callback: (data) => {
					this.usersData = data.data;
				}
			})
		}
	},
	beforeMount: function(){
		var page = this.$route.query.page;
		this.loadUsers(page);
	}
}

</script>