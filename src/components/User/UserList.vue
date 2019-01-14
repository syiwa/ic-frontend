<template>
	<div>
		<router-link to="/users/add">
			<b-button variant="info" size="sm" class="mr-2 ic-new-user">
		    	New User
		    </b-button>
	    </router-link> 
		<b-table striped hover :items="users" :fields="fields">
			<template slot="actions" slot-scope="row">
				<router-link v-bind:to="`/users/${row.item.id}/edit`">
					<b-button variant="warning" size="sm"class="mr-2">
				    	Edit
				    </b-button>
			    </router-link> 
			    <b-button variant="danger" v-if="isNotMe(row.item.id)" size="sm"class="mr-2" @click="deleteUser(row.item.id)">
					Delete
			    </b-button>
			</template>
		</b-table>

		<Pagination @pageMove="movePage" :total="usersMeta.total" :page="usersMeta.current_page" :perPage="usersMeta.per_page" />

		<b-modal ref="delete" id="delete" title="Delete User" ok-title="Delete" ok-variant="danger" @ok="confirmDeleteUser">
	    	<p class="my-4">Are you sure want to delete user <strong>{{ toDeletedUser.email }}</strong>?</p>
	  	</b-modal>
	</div>
</template>

<script type="text/javascript">

import Pagination from '@/components/Pagination'
	
export default{
	name: 'UserList',
	components:{
		Pagination
	},
	data: () => {
		return {
			usersData: [],
			usersMeta: {},
			fields: [
				'name',
				'email',
				'phone',
				'address',
				'actions'
			],
			toDeletedUser: {}
		}
	},
	computed: {
		users: function(){
			return _.map(this.usersData, function(o){
				return _.pick(o, ['id','name','email','phone','address'])
			})
		},
		page: function(){
			return this.$route.query.page
		}
	},
	methods: {
		loadUsers: function(page){
			this.$store.dispatch('loader/show');
			this.$store.dispatch('user/loadUsers', {
				params: {
					page: (page) ? page : 1
				},
				callback: (data) => {
					this.$store.dispatch('loader/hide');
					this.usersData = data.data;
					this.usersMeta = _.pick(data, ['current_page','per_page','total']);
				}
			})
		},
		deleteUser: function(id){
			this.toDeletedUser = _.findWhere(this.usersData, {id: id});
			if(this.toDeletedUser){
				this.$refs.delete.show();
			}
		},
		isNotMe: function(id){
			return this.$store.state.auth.user.id != id;
		},
		confirmDeleteUser: function(){
			this.$store.dispatch('user/deleteUser',{
				id: this.toDeletedUser.id,
				callback: (response) => {
					if(response.status == "success"){
						this.usersData = _.without(this.usersData, _.findWhere(this.usersData, {id: this.toDeletedUser.id}));
						this.toDeletedUser = {};
					}
				}
			})
		},
		movePage: function(to){
			this.$router.push({
				path: 'users',
				query: {
					page: to
				}
			})
			this.loadUsers(this.page);
		}
	},
	beforeMount: function(){
		this.loadUsers(this.page);
	}
}

</script>

<style type="text/css" lang="scss">
	.ic-new-user{
		margin-bottom: 20px;
	}
</style>