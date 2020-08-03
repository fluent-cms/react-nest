export interface BatchParamerter {
    action: 'delete' | 'update'
    ids: number[]
}