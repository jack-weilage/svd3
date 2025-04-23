import type { AxisScale } from "./types.js";

const EPSILON = 1e-6;

export function center(scale: AxisScale<unknown>, offset: number) {
	offset = Math.max(0, scale.bandwidth?.() ?? 0 - offset * 2) / 2;

	if (scale.round?.()) {
		offset = Math.round(offset);
	}

	return (d: unknown) => +(scale(d) ?? 0) + offset;
}
export function number(scale: AxisScale<unknown>) {
	return (d: unknown) => +(scale(d) ?? 0);
}

export enum Orientation {
	Top = 1,
	Right = 2,
	Bottom = 3,
	Left = 4,
}
