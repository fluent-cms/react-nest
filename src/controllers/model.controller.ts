import {
  Controller, Get, Post, Body, Param, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger,
  NotFoundException, BadRequestException, InternalServerErrorException, Put
} from '@nestjs/common';
import { hashUserPassword } from '../repos/userRepo';
import { getRepository, Like, FindManyOptions, In} from 'typeorm';
import { QueryParamsModel, destruct } from 'client/src/share/query/query-params';
import { QueryResultsModel } from 'client/src/share/query/query-results.model';
import { User } from 'client/src/share/entities/user.entity';
import { GetUser } from 'decorators/getUserDecorator';
import { AuthGuard } from "@nestjs/passport";
import { BatchParamerter } from './../client/src/share/query/batch-params';


@Controller('api/model')
@UseGuards(AuthGuard())
export class ModelController {
  private logger = new Logger('ModelController');
  constructor(
  ) { }

  @Put('/:model')
  async updateMany(
    @Param('model') model: string,
    @Body() req :BatchParamerter ,
    @GetUser() user: User,
  ) {
    const repo = getRepository(model)
    const { action, ids } = req
    const arr = await repo.findByIds(ids)
    if (arr.length != ids.length)
    {
      throw new NotFoundException()
    }
    if (action === "delete") {
      try {
        if(repo === getRepository(User))
        {
          if (ids.includes(user.id))
          {
            throw new BadRequestException(`can not delete current user`)
          }
        }
        await repo.delete(ids)
      }
      catch (err) {
        if (err.number === 547) {
          throw new BadRequestException(`delete failed, the ${model}  was associated with other entities`)
        }else if (err instanceof(BadRequestException)){
          throw err
        }
        throw new InternalServerErrorException()
      }
    }
    else if (action === "update") { }
  }

  @Put('/:model/:id')
  async update(
    @Param('model') model: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() item: any,
    @GetUser() user: User,
  ) {
    const repo = getRepository(model)
    const found = await repo.findOne({id});
    if (!found) {
      throw new NotFoundException(` ${model} with ID "${id}" not found`);
    }

    if (repo == getRepository(User) && item.password) {
      item = await hashUserPassword(item)
    }
    console.log(item)


    Object.keys(item).filter(x=>x !='id').forEach(x => found[x] = item[x]?item[x]:null)

    await repo.save(found)
  }


  @Post('/:model')
  @UsePipes(ValidationPipe)
  async  create(
    @Param('model') model: string,
    @Body() item: any,
    @GetUser() user: User,
  ): Promise<unknown> {
   const repo = getRepository(model)
    if (repo == getRepository(User)) {
      item = await hashUserPassword(item)
    }

    try {
      const result = await repo.insert(item)
      return item;
    }
    catch (err) {
      if (err.number === 2627) {
        throw new BadRequestException('dupliated record')
      }
      console.log(err)
      throw new InternalServerErrorException('some thing is wrong!')
    }
  }
  
  @Get('/:model')
  async get(
    @GetUser() user: User,
    @Param('model') model: string,
    @Query() queryParam: QueryParamsModel
  ): Promise<QueryResultsModel> {

    const repo = getRepository(model)
    const scopeFilter: any = {}
    const order:any = {}
    const findOption:FindManyOptions = { order }
    order[queryParam.sf] = queryParam.so === 'asc'? 'ASC':'DESC'
    const where:any[]=[]
    if (queryParam.q === 'one')
    {
      where.push({...scopeFilter,id:queryParam.id})
    }
    else if (queryParam.q === 'page')
    {
    
      if (queryParam.k.length > 0) {
        const flds = destruct(queryParam.f)
        flds.forEach(fld => {
          const fieldWhere :any = {}
          fieldWhere[fld] = Like(`%${queryParam.k}%`)
          where.push({...scopeFilter,...fieldWhere})
        })
      }
       else {
        where.push(scopeFilter)
      }
      findOption.skip = (queryParam.pn * queryParam.ps)
      findOption.take = +queryParam.ps
    }
    else {
        where.push(scopeFilter)
    }
    findOption.where = where
    if(queryParam.r)
    {
      findOption.relations = destruct(queryParam.r)
    }
    try{
      
      const [items,total] = await repo.findAndCount(findOption)
      const dtos = items.map(x => x['toDTO'] ? x['toDTO'](x) : x)
      const resultModel = new QueryResultsModel(dtos, total)
      
      return resultModel
    }
    catch(err)
    {
      console.log(err)
    }
  }
}
