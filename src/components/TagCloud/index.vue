<template>
	<div class="tagCloud">
		<div class="warp" @mousemove="handleMousemove">
			<tag
				v-for="(tag, ky) in tags"
				:key="ky"
				:tag="tag"
				:R="R"
				:focalLength="focalLength"
			/>
			<!-- <a
				class="tag"
				href="javascript:;"
				v-for="(tag, ky) in tags"
				:key="ky"
				:style="tag.style">
				{{tag.tag}}
			</a> -->
		</div>
	</div>
</template>
<script>
import tag from './tag.vue';
export default {
	name: 'tagCloud',
	components: {
		tag,
	},
	props: {
		// 球体半径
		R: {
			type: Number,
			default: 80,
		},
		speed: {
			type: Number,
			default: 1,
		},
		tagsData: Object,
	},
	data() {
		const baseAngle = Math.PI / 360;
		return {
			baseAngle,
			angleX: this.speed * baseAngle,
			angleY: -this.speed * baseAngle,
			focalLength: this.R * 1.5,
			tags: [],
		};
	},
	// https://blog.csdn.net/chestnut_647/article/details/73106133
	methods: {
		// x = r * sinθ * cosφ
		// y = r * sinθ * sinφ
		// z = r * cos θ
		// 均匀分布
		// θ = arccos((2 * i - 1)/ len - 1);
		// φ = θ * sqrt(len * PI)
		// 旋转公式
		// x1 = cosθ * x - sinθ * y;
		// y1 = cosθ * y + sinθ * x;
		init(tagsData) {
			// this.$el.querySelector('.warp');
			let tags = [];
			const {sin, cos, acos, sqrt, PI} = Math;
			Object.keys(tagsData).forEach((tag, idx, arr) => {
				let Theta = acos((2 * (idx + 1) - 1) / arr.length - 1);
				let Phi = Theta * sqrt(arr.length * PI);
				let x = this.R * sin(Theta) * cos(Phi);
				let y = this.R * sin(Theta) * sin(Phi);
				let z = this.R * cos(Theta);
				// console.log(x, y, z);
				let newTag = this.initTag(tag, x, y, z);
				// this.move(newTag);
				tags.push(newTag);
				this.animate();
			});
			this.tags = tags;
		},
		// 初始化标签
		initTag(tag, x, y, z) {
			const {floor, random} = Math;
			return {
				x,
				y,
				z,
				tag,
				color: `#${floor(random() * 0xffffff).toString(16)}`,
				// style: {
				// 	color: `#${floor(random() * 0xffffff).toString(16)}`,
				// },
			};
		},
		// move(tag) {
		// 	console.log(tag.x);
		// 	const scale = this.focalLength / (this.focalLength - tag.z),
		// 		alpha = (tag.z + this.R) / (2 * this.R);
		// 	tag.style.left = `${tag.x}px`;
		// 	tag.style.top = `${tag.y}px`;
		// 	tag.style.fontSize = `${14 * scale}px`;
		// 	tag.style.opacity = alpha + 0.5;
		// },
		// x轴旋转
		rotateX() {
			let cos = Math.cos(this.angleX),
				sin = Math.sin(this.angleX);
			this.tags.forEach(tag => {
				let y = tag.y * cos - tag.z * sin,
					z = tag.z * cos + tag.y * sin;
				tag = {
					...tag,
					y,
					z,
				};
			});
		},
		// y轴旋转
		rotateY() {
			let cos = Math.cos(this.angleY),
				sin = Math.sin(this.angleY);
			this.tags.forEach(tag => {
				let x = tag.x * cos - tag.z * sin,
					z = tag.z * cos + tag.x * sin;
				tag = {
					...tag,
					x,
					z,
				};
			});
		},
		animate() {
			setInterval(() => {
				this.rotateX();
				this.rotateY();
				// this.tags.forEach(tag => {
				// 	this.move(tag);
				// });
			}, 20);
		},
		handleMousemove(e) {
			this.angleY = 2 * (e.clientX / this.$el.getBoundingClientRect().width - 0.5) * this.speed * this.baseAngle;
			this.angleX = 2 * (e.clientY / this.$el.getBoundingClientRect().height - 0.5) * this.speed * this.baseAngle;
		},
	},
	watch: {
		tagsData(nv, v) {
			if (Object.keys(nv).length > 0) {
				this.init(nv);
			}
		},
		// tags: {
		// 	deep: true,
		// 	handler(nv, v) {
		// 		this.$nextTick();
		// 	},
		// }
	},
};
</script>
<style lang="scss" scoped>
	.tagCloud {
		position: relative;
		.warp {
			position: absolute;
			top: 50%;
			left: 50%;
			// width: 100%;
			// height: 100%;
			// transform: translate(-50%, -50%);
			// .tag {
			// 	position: absolute;
			// 	display: inline-block;
			// 	height: 30px;
			// 	line-height: 30px;
			// 	text-decoration: none;
			// }
		}
	}
</style>
