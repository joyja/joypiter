<script lang="ts">
	// import '@joyautomation/salt/styles.scss';
	import '$lib/css/main.scss'
	import '@fontsource/space-grotesk'
	import '@fontsource/righteous'
	import Schedule from '$lib/schedules/latest.md'
	import '$lib/estimate.js'
</script>

<Schedule />

<style lang="scss">
	:global(h2) {
		position: relative;
		padding-bottom: 10px;
	}
	:global(h2::after) {
		content: '';
		display: block;
		width: 100%;
		height: 2px;
		background-color: gainsboro;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
