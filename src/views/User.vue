<template>
	<div class="ic-users">
		<h1>User</h1>
		<div class="ic-box">
			<router-view />
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.ic-users{
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