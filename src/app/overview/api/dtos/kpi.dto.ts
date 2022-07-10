export interface KpiDto {
	current: KpiStateDto;
	previous: KpiStateDto;
	label: string;
}

interface KpiStateDto {
	value: number;
	time: Date;
}
