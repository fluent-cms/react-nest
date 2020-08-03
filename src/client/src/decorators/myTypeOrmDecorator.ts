
export const Entity = (repoName:string) =>  (target:any)=> {
  target.repoName = repoName
}

export const Column = (pam:any = undefined) => propertyFunc
export const ManyToOne =<T> (typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),inverseSide:  ((object: T) => any),option:any = {}) => propertyFunc
export const OneToMany =<T> (typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),inverseSide:  ((object: T) => any),option:any = {}) => propertyFunc
export const PrimaryGeneratedColumn = () => propertyFunc
export const PrimaryColumn = () => propertyFunc
export const Unique = (ids:string[]) => (target:any)=> { } 
export type ObjectType<T> = { new (): T; } | Function;



export const getRepoByConstructor = (type: new()=>Object) => {
  const prop = type as any
  return prop.repoName
}

const propertyFunc = function(target: Object, propertyKey: string) { 
    let value : string;
    const getter = function() {
      return value;
    };
    const setter = function(newVal: string) {
        value = newVal
    }; 
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    }); 
  }
