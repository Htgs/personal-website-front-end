<template>
	<div class="h100 w100 txt-c fz-24">
		<span>
			咦，迷路了，<el-button type="text" class="fz-24" @click="$router.push('/article')">回去</el-button>看看吧。
		</span>
	</div>
</template>
<script>
export default {
	name: 'NotFound',
};
</script>
