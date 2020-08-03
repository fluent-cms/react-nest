
export enum FetchActionTypes {
	FetchRequest = 'Fetch Request',
}


export class FetchRequest {
  	type = FetchActionTypes.FetchRequest
	constructor(
		public method:'GET'|'POST'|'PUT'|'DELETE',
		public url:string,
		public payload:any, 
		public body:any,
		public onSuccess:any,
		public onError:any,
		public requireToken:boolean = true,
	){}

}