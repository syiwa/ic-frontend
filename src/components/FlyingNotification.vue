<template>
	<div>
  		<div v-if="notification" role="alert" aria-live="polite" aria-atomic="true" class="alert-info alert-dismissible ic-flying-notification">
    		{{ notification }}
  		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default{
	name: 'FlyingNotification',
	computed: mapState({
		notification: state => state.notification.notification
	}),
	watch: {
		notification: function(notification) {
			setTimeout(() => {
				this.$store.dispatch('notification/show',null);
			},5000);
		}
	}
}

</script>

<style lang="scss">
	.ic-flying-notification{
		position: fixed;
		top: 20px;
		right: 20px;
		width: 30%;
		max-width: 350px;
		text-align: left;
	    padding: 0.75rem 1.25rem;
	    margin-bottom: 1rem;
	    border: 1px solid transparent;
	    border-radius: 0.25rem;
	}
</style>