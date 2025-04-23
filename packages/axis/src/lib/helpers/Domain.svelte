<script lang="ts" generics="Scale extends AxisScale<AxisDomain>">
	import type { AxisDomain, AxisScale } from "../types.js";

	import { Orientation } from "../utils.js";

	let {
		orient,
		scale,

		tickSizeOuter,
		k,
		offset,
	}: {
		orient: Orientation;
		scale: Scale;

		tickSizeOuter: number;
		k: number;
		offset: number;
	} = $props();

	let range = $derived(scale.range());
	let range0 = $derived(+range[0] + offset);
	let range1 = $derived(+range[range.length - 1] + offset);
</script>

<path
	class="domain"
	stroke="currentColor"
	d={orient === Orientation.Left || orient === Orientation.Right
		? tickSizeOuter
			? `M${k * tickSizeOuter},${range0}H${offset}V${range1}H${k * tickSizeOuter}`
			: `M${offset},${range0}V${range1}`
		: tickSizeOuter
			? `M${range0},${k * tickSizeOuter}V${offset}H${range1}V${k * tickSizeOuter}`
			: `M${range0},${offset}H${range1}`}
/>
