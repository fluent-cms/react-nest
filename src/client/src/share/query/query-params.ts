import { mergeStringArray } from '../utilities/arrayUtility';
export type SortType ='asc'|'desc'
export type queryType = 'all'|'page'|'one'
export class QueryParamsModel {
	constructor(
		public q :queryType = 'page',
		public so: SortType = 'asc',
		public sf:string ='id',
		public pn:number = 0,
		public ps:number = -1,
		public k:string ='',
		public f:string ='',
		public id:number = 0,
		public r:string ='',
		public pf:string ='',
		public pv:number =0
		) { }
}

export const buildQueryParam = (queryParam: QueryParamsModel) => {
  const { f, k, r,pn, ps, so, sf, id, q,pf,pv } = queryParam
  return `?pf=${pf}&pv=${pv}&r=${r}&q=${q}&id=${id}&f=${f}&pn=${pn}&ps=${ps}&so=${so}&sf=${sf}&k=${encodeURIComponent(k)}`
}

export const construct = (arr:string[]) => mergeStringArray(arr,'-') 
export const destruct = (str:string) => str.split('-')