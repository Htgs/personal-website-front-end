<template>
	<a
		class="tag"
		href="javascript:;"
		:style="style">
		{{tag.tag}}
	</a>
</template>
<script>
export default {
	name: 'tag',
	props: {
		R: Number,
		focalLength: Number,
		tag: Object,
		// tag: String,
		// color: String,
		// x: Number,
		// y: Number,
		// scale: Number,
		// alpha: Number,
	},
	data() {
		const scale = this.focalLength / (this.focalLength - this.tag.z),
			alpha = (this.tag.z + this.R) / (2 * this.R);
		return {
			style: {
				left: `${this.tag.x}px`,
				top: `${this.tag.y}px`,
				fontSize: `${14 * scale}px`,
				opacity: alpha + 0.5,
				color: this.tag.color,
			},
		};
	},
	methods: {
		updateStyle(type, value) {
			this.style[type] = value;
		},
	},
	watch: {
		tag: {
			deep: true,
			handler(nv, v) {
				console.log(nv);
				const scale = this.focalLength / (this.focalLength - nv.z),
					alpha = (nv.z + this.R) / (2 * this.R);
				this.style = {
					left: `${nv.x}px`,
					top: `${nv.y}px`,
					fontSize: `${14 * scale}px`,
					opacity: alpha + 0.5,
					color: nv.color,
				};
			},
		},
		// x(nv, v) {
		// 	this.updateStyle('left', `${nv}px`);
		// },
		// y(nv, v) {
		// 	this.updateStyle('top', `${nv}px`);
		// },
		// scale(nv, v) {
		// 	this.updateStyle('fontSize', `${14 * nv}px`);
		// },
		// alpha(nv, v) {
		// 	this.updateStyle('opacity', `${nv + 0.5}px`);
		// },
	},
};
</script>
<style scoped>
	.tag {
		position: absolute;
		display: inline-block;
		height: 30px;
		line-height: 30px;
		text-decoration: none;
	}
</style>
