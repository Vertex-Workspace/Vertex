export interface Task {
    name: string,
    category: any, //propriedade
    creator ?: string,
    properties ?: string[],
    isDragging ?: boolean,
    isSelected ?: boolean
}