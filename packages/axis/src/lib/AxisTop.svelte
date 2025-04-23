<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";

	import { Orientation } from "./utils.js";
	import Axis from "./helpers/Axis.svelte";

	let {
		children,
		...restProps
	}: {
		children?: Snippet;
	} & Omit<ComponentProps<typeof Axis>, "orient"> = $props();
</script>

<Axis orient={Orientation.Top} {...restProps}>
	{@render children?.()}
</Axis>
