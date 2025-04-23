<script lang="ts" generics="Domain, Scale extends AxisScale<Domain>">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { AxisScale } from "./types.js";

	import { Orientation, center, number } from "./utils.js";
	import Tick from "./Tick.svelte";
	import Domain from "./Domain.svelte";

	let {
		orient,
		scale = $bindable(),

		tickArguments = $bindable([]),
		tickValues = $bindable(null),
		tickFormat = $bindable(null),
		tickSize = $bindable(6),
		tickSizeInner = $bindable(6),
		tickSizeOuter = $bindable(6),
		tickPadding = $bindable(3),
		offset = $bindable(window?.devicePixelRatio > 1 ? 0 : 0.5),

		children,
		...restProps
	}: {
		orient: Orientation;
		scale: Scale;

		tickArguments?: any[];
		tickValues?: Iterable<Domain> | null;
		tickFormat?: ((domainValue: Domain, index: number) => string) | null;
		tickSize?: number;
		tickSizeInner?: number;
		tickSizeOuter?: number;
		tickPadding?: number;
		offset?: number;

		children?: Snippet;
	} & SVGAttributes<SVGGElement> = $props();

	$effect(() => {
		tickSizeInner = tickSize;
		tickSizeOuter = tickSize;
	});

	let k = $derived(orient === Orientation.Top || orient === Orientation.Left ? -1 : 1);
	// let x: "x" | "y" = $derived(
	// 	orient === Orientation.Left || orient === Orientation.Right ? "x" : "y",
	// );
	let transform = $derived(
		orient === Orientation.Top || orient === Orientation.Bottom
			? (x: number) => `translate(${x}, 0)`
			: (y: number) => `translate(0, ${y})`,
	);

	let values = $derived(
		tickValues == null
			? scale.ticks
				? scale.ticks.apply(scale, tickArguments)
				: scale.domain()
			: tickValues,
	);
	let format = $derived(
		tickFormat == null
			? scale.tickFormat
				? scale.tickFormat.apply(scale, tickArguments)
				: (x) => x
			: tickFormat,
	);
	let spacing = $derived(Math.max(tickSizeInner, 0) + tickPadding);
	// let range = $derived(scale.range());
	// let range0 = $derived(+range[0] + offset);
	// let range1 = $derived(+range[range.length - 1] + offset);
	let position = $derived((scale.bandwidth ? center : number)(scale.copy(), offset));
</script>

<g
	fill="none"
	font-size="10"
	font-family="sans-serif"
	text-anchor={orient === Orientation.Right
		? "start"
		: orient === Orientation.Left
			? "end"
			: "middle"}
	{...restProps}
>
	{@render children?.()}

	<Domain {scale} {orient} {tickSizeOuter} {k} {offset} />
	<!-- <path -->
	<!-- 	class="domain" -->
	<!-- 	stroke="currentColor" -->
	<!-- 	d={orient === Orientation.Left || orient === Orientation.Right -->
	<!-- 		? tickSizeOuter -->
	<!-- 			? `M${k * tickSizeOuter},${range0}H${offset}V${range1}H${k * tickSizeOuter}` -->
	<!-- 			: `M${offset},${range0}V${range1}` -->
	<!-- 		: tickSizeOuter -->
	<!-- 			? `M${range0},${k * tickSizeOuter}V${offset}H${range1}V${k * tickSizeOuter}` -->
	<!-- 			: `M${range0},${offset}H${range1}`} -->
	<!-- /> -->

	{#each values as value}
		{@const d = scale(value)}

		<Tick transform={transform(position(d) + offset)} {orient} {k} {tickSizeInner} {spacing}>
			{format(d)}
		</Tick>

		<!-- <g class="tick" opacity="1" transform={transform(position(d) + offset)}> -->
		<!-- 	<line stroke="currentColor" {...{ [`${x}2`]: k * tickSizeInner }} /> -->
		<!-- 	<text -->
		<!-- 		fill="currentColor" -->
		<!-- 		{...{ [x]: k * spacing }} -->
		<!-- 		dy={orient === Orientation.Top -->
		<!-- 			? "0em" -->
		<!-- 			: orient === Orientation.Bottom -->
		<!-- 				? "0.71em" -->
		<!-- 				: "0.32em"} -->
		<!-- 	> -->
		<!-- 		{format(d)} -->
		<!-- 	</text> -->
		<!-- </g> -->
	{/each}
</g>
