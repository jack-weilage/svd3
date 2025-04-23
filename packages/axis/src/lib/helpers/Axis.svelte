<script lang="ts" generics="Domain extends AxisDomain, Scale extends AxisScale<Domain>">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { AxisDomain, AxisScale } from "../types.js";

	import { Orientation, center, number } from "../utils.js";
	import Tick from "./Tick.svelte";
	import Domain from "./Domain.svelte";

	let {
		orient,
		scale = $bindable(),

		ticks = [],
		tickValues = $bindable(null),
		tickFormat = $bindable(null),
		tickSize = $bindable(6),
		tickSizeInner = $bindable(6),
		tickSizeOuter = $bindable(6),
		tickPadding = $bindable(3),
		offset = $bindable(globalThis["window"]?.devicePixelRatio > 1 ? 0 : 0.5),

		children,
		...restProps
	}: {
		orient: Orientation;
		scale: Scale;

		ticks?: any[];
		tickValues?: Iterable<Domain> | null;
		tickFormat?: ((domainValue: Domain, index: number) => string) | null;
		tickSize?: number;
		tickSizeInner?: number;
		tickSizeOuter?: number;
		tickPadding?: number;
		offset?: number;

		children?: Snippet;
	} & Omit<SVGAttributes<SVGGElement>, "scale"> = $props();

	$effect(() => {
		tickSizeInner = tickSize;
		tickSizeOuter = tickSize;
	});

	const k = orient === Orientation.Top || orient === Orientation.Left ? -1 : 1;
	const transform =
		orient === Orientation.Top || orient === Orientation.Bottom
			? (x: number) => `translate(${x}, 0)`
			: (y: number) => `translate(0, ${y})`;
	let values = $derived(
		tickValues == null
			? scale.ticks
				? scale.ticks.apply(scale, ticks)
				: scale.domain()
			: tickValues,
	);
	let format = $derived(
		tickFormat == null
			? scale.tickFormat
				? scale.tickFormat.apply(scale, ticks)
				: (x: any) => x
			: tickFormat,
	);
	let spacing = $derived(Math.max(tickSizeInner, 0) + tickPadding);
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

	{#each values as value, i}
		<Tick transform={transform(position(value) + offset)} {orient} {k} {tickSizeInner} {spacing}>
			{format(value, i)}
		</Tick>
	{/each}
</g>
