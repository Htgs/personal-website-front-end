<template>
	<div id="editor">
		<mavon-editor style="height: 100%"></mavon-editor>
	</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	name: 'editor',
	components: {
		mavonEditor,
	}
};
</script>
<style>
#editor {
	margin: auto;
	width: 100%;
	height: 530px;
}
</style>
