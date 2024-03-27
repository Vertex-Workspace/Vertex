export class SearchItem {
    id: number;
    name: string;
    description ?: string;
    image ?: string;
    projectId ?: number; //se for uma tarefa
    kindAsString: string;
    kind !: SearchItemKind;

    constructor(item: SearchItem) {   
        this.id = item.id!;

        this.name = item.name;
        this.description = item.description ? item.description : "Sem descrição";
        this.image = item.image && item.image; 
        this.kindAsString = item.kindAsString;

        this.projectId = item.projectId && item.projectId;
        
        this.kind = this.getKind(item);
        
    }

    getKind(item: SearchItem): SearchItemKind {
        if (item.kindAsString === 'Projeto') {
            return SearchItemKind.PROJECT;
        }

        if (item.kindAsString === 'Tarefa') {
            return SearchItemKind.TASK;
        }

        if (item.kindAsString === 'Equipe') {
            return SearchItemKind.TEAM;
        }
        
        return SearchItemKind.USER;
    }
}

export enum SearchItemKind {
    TASK = "Tarefa",
    PROJECT = "Projeto",
    TEAM = "Equipe",
    USER = "Usuário"
}
