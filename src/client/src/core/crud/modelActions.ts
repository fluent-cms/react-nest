import { QueryParamsModel } from '../../share/query/query-params';
import { MyBaseEntity } from 'share/entities/myBaseEntity';

export enum ModelActionTypes {

	GetModelRequest = "Get Model Request",
	ModelLoaded = "Model Loaded",
	ModelLoadError = "Model Load Error",

	CreateModelRequest = 'Created Model Request',
	ModelCreated = 'Model Created',

	UpdateModelRequest = "Update Model Request",
	ModelUpdated = 'Model Updated',

	ModelUpsertError = "Model Upsert Error",
	ResetUpsertSatus = "Reset Upsert Action Status",

	DeleteModelRequst = 'Delete Model Request',
	ModelDeleted = 'Model Deleted',
	ModelDeleteError = 'Model Delete Error'
}

export class GetModelRequest {
	public type = ModelActionTypes.GetModelRequest
	constructor(
		public payload:{ repoName:string,query:QueryParamsModel }
	){}
}

export class CreateModelRequest {
	public type = ModelActionTypes.CreateModelRequest
	constructor (
		public payload :{ repoName:string, model:Object} ){}
}

export class UpdateModelRequest {
	public type = ModelActionTypes.UpdateModelRequest
	constructor (
		public payload:{repoName:string, model:MyBaseEntity}
		) {}
}

export class DeleteModelRequest {
	public type = ModelActionTypes.DeleteModelRequst
 	constructor (
		 public payload:{ repoName:string,
			ids:number[]}
		 ) {}
} 

export class ResetCRUDState {
	public type = ModelActionTypes.ResetUpsertSatus
	constructor(public payload:{ repoName:string}) {} 
}
