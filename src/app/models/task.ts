export interface Task {
    name: string,
    category: any, //propriedade
    description ?: string,
    creator ?: string,
    properties ?: any[],
    isDragging ?: boolean,
    isSelected ?: boolean,
    status ?: string
}
