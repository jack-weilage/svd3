export interface AxisScale<Domain> {
	(x: Domain): number | undefined;
	domain(): Domain[];
	range(): number[];
	copy(): this;
	bandwidth?(): number;
	round(): boolean;
}

export type AxisDomain = number | string | Date | { valueOf(): number };
