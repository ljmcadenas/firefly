import { KpiDto } from 'src/app/overview/api/dtos/kpi.dto';

export const KPI_DTOS: KpiDto[] = [
	{
		label: 'Cat videos watched',
		current: {
			value: 198,
			time: new Date('2022-07-12'),
		},
		previous: {
			value: 282,
			time: new Date('2022-06-12'),
		},
	},
	{
		label: 'Slices of pizza in the veeeeeeeeeeery biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiig fridge',
		current: {
			value: 5.33333333333,
			time: new Date('2022-07-12'),
		},
		previous: {
			value: 3,
			time: new Date('2022-07-12'),
		},
	},
	{
		label: "Favourite songs beginning with the letter 'A'",
		current: {
			value: 1324,
			time: new Date('2022-07-12'),
		},
		previous: {
			value: 1321,
			time: new Date('2022-07-12'),
		},
	},
];
