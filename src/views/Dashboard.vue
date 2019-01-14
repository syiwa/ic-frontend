<template>
  <div>
    <b-jumbotron header="Welcome" lead="This is Dashboard page." >
	  <p>This page is only accessible for authenticated user both User and Admin role. Your role here is <strong>{{ this.$store.getters['auth/myRole'] }}.</strong></p>
	</b-jumbotron>
  </div>
</template>
