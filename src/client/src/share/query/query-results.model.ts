export class QueryResultsModel {
	constructor(
		public items: any[] = [], 
		public totalCount: number = 0, 
		public errorMessage: string = ''
		) { }
}
