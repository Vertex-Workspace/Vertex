import { PropertyListKind } from "../class/property";

export interface PipeParams {
    name: string,
    type: string,
    content ?: string,
    kind ?: PropertyListKind
}
