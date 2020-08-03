function myParseNumber(s:string, format:string, key:string ) {
    const start = format.indexOf(key)
    const length = key.length
    return +s.substr(start,length)
}

export function myParseDate (str:any, format:string = 'yyyyMMddhhmmss') {
    if (!str) {
        return new Date('2020-01-01')
    }
    const s = str as string
    return new Date(myParseNumber(s, format,'yyyy'),
        myParseNumber(s,format,'MM') -1,
        myParseNumber(s,format,'dd'),
        myParseNumber(s,format,'hh'),
        myParseNumber(s,format,'mm'),
        myParseNumber(s,format,'ss')
    )
}

export function addMinutes(d:Date, val:number)
{
    const myDate = new Date(d)
    myDate.setMinutes(myDate.getMinutes() + val)
    return myDate
}

export function myDateToString(d :Date, format:string = 'MM/dd/yyyy') {
    const myDate = new Date(d)
    const result = format
        .replace('yyyy', myDate.getFullYear().toString())
        .replace('MM', myToString(myDate.getMonth() + 1,2))
        .replace('dd', myToString(myDate.getDate(),2))
        .replace('hh', myToString(myDate.getHours(),2))
        .replace('mm', myToString(myDate.getMinutes(),2))
        .replace('ss', myToString(myDate.getSeconds(),2))
    return result
}

export function myToString(n:number, length:number){
    let leadNumber = 1;
    for(let i = 0 ; i < length; i ++)
    {
        leadNumber *= 10;
    }
    return (leadNumber + n).toString().substr(1)
}