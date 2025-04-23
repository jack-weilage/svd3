export interface AxisScale<Domain> {
	(x: Domain): number | undefined;
	domain(): Domain[];
	range(): number[];
	copy(): this;
	bandwidth?(): number;
	round(): boolean;
	ticks(...args: any[]): Domain[];
	tickFormat(...args: any[]): this;
}

export type AxisDomain = number | string | Date | { valueOf(): number };
