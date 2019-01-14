<template>
	<div class="ic-change-password">
		<h1>Change Password</h1>
		<div class="ic-box">
			<ChangePassword />
		</div>
	</div>
</template>

<script type="text/javascript">

import ChangePassword from '@/components/ChangePassword.vue'
	
export default{
	components: {
		ChangePassword
	}
}

</script>

<style type="text/css" lang="scss">
	.ic-change-password{
		text-align: left;
		padding: 10px;

		h1{
			margin-left: 40px;
		}

		.ic-box{
			width: 95%;
			background-color: #f1f1f1;
			box-shadow: 5px 5px 10px rgba(0,0,0,.2);
			padding: 30px;
			box-sizing: border-box;
			border-radius: 5px;
			margin: auto;
		}
	}
</style>