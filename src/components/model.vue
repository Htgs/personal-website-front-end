<template>
	<div>
		model
	</div>
</template>

<script>
export default {
	name: 'Model',
	mounted() {
		console.log(this.$router.history.current);
	},
	methods: {
	}
};
</script>

<style scoped>
</style>
