<template>
	<div>
		<b-pagination size="md" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
	</div>
</template>

<script type="text/javascript">
	
export default{
	name: 'Pagination',
	props: {
		total: Number,
		page: Number,
		perPage: Number
	},
	data: function(){
		return {
			currentPage: this.page
		}
	},
	watch: {
		page: function(val){
			this.currentPage = val;
		},
		currentPage: function(val){
			this.$emit('pageMove', val);
		}
	}
}	

</script>