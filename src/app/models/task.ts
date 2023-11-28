export interface Task {
    name: string,
    category: any, //propriedade
    description ?: string,
    creator ?: string,
    properties ?: any[],
    isDragging ?: boolean,
    isSelected ?: boolean,
    status ?: string,
    width ?: string,
    height ?: string,
    top ?: string,
    left ?: string
}
