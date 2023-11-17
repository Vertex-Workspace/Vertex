export interface Task {
    name: string,
    category: any, //propriedade
    creator ?: string,
    properties ?: any[],
    isDragging ?: boolean,
    isSelected ?: boolean,
    status ?: string
}
