<script lang="ts">
	import type { Snippet } from "svelte";

	import { Orientation } from "$lib/types.js";

	let {
		transform,
		orient,

		k,
		tickSizeInner,
		spacing,

		children,
	}: {
		transform: string;
		orient: Orientation;

		k: number;
		tickSizeInner: number;
		spacing: number;

		children?: Snippet;
	} = $props();

	let x: "x" | "y" = $derived(
		orient === Orientation.Left || orient === Orientation.Right ? "x" : "y",
	);
</script>

<g class="tick" opacity="1" {transform}>
	<line stroke="currentColor" {...{ [`${x}2`]: k * tickSizeInner }} />
	<text
		fill="currentColor"
		{...{ [x]: k * spacing }}
		dy={orient === Orientation.Top ? "0em" : orient === Orientation.Bottom ? "0.71em" : "0.32em"}
	>
		{@render children?.()}
	</text>
</g>
