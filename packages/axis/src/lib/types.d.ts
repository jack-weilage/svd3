export interface AxisScale<Domain> {
	(x: any): number | undefined;
	domain(): Domain[];
	range(): number[];
	copy(): this;
	bandwidth?(): number;
	round?(): boolean;
	ticks(...args: any[]): Domain[];
	tickFormat(...args: any[]): (d: any) => string;
}

export type AxisDomain = number | string | Date | { valueOf(): number };
