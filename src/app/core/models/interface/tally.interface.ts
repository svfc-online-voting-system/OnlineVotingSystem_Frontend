interface TallyOption {
	count: number;
	text: string;
}

type TallyInfo = Record<number, TallyOption>;

export interface TallyResponse {
	code: string;
	tally_info: TallyInfo;
}
