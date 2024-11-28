type TCashback = {
	id: number;
	title: string;
	percentage: string;
};

export const cashback:TCashback[] = [
	{
		id: 1,
		title: 'For food delivery, cafes and restaurants',
		percentage: '5%',
	},
	{
		id: 2,
		title: 'In supermarkets with our subscription',
		percentage: '5%',
	},
	{
		id: 3,
		title: "In clothing stores and children's goods",
		percentage: '2%',
	},
	{
		id: 4,
		title: 'Other purchases and payment of services and fines',
		percentage: '1%',
	},
	{
		id: 5,
		title: 'Shopping in online stores',
		percentage: 'up to 3%',
	},
	{
		id: 6,
		title: 'Purchases from our partners',
		percentage: '30%',
	},
]