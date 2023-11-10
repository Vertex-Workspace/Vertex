import { Task } from "src/app/models/task";

export const categories: any[] = [
    {
      name: 'TO-DO',
      color: '#FFE7E94D',
      borderColor: '#FF9D9Df3'
    },
    {
      name: 'DOING',
      color: '#FFF6C54D',
      borderColor: '#FFD600f3'
    },
    {
      name: 'DONE',
      color: '#d7ffc94D',
      borderColor: '#d7ffc9de'
    },
    {
      name: 'OUTRA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#d7ffc9de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#d7ffc9de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#d7ffc9de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#d7ffc9de'
    }
  ];

  //ADICIONAR "80" NO FINAL DO HEXADECIMAL DA COLOR -> 50% OPACIDADE
  //ADICIONAR "DE" NO FINAL DO HEXADECIMAL DA BORDA -> 80%+-

 export const taskList: Task[] = [
    {
      name: 'Tarefa 1',
      category: categories[0]
    },
    {
      name: 'Tarefa 2',
      category: categories[0]
    },
    {
      name: 'Tarefa 3',
      category: categories[0]
    },
    {
      name: 'Tarefa 4',
      category: categories[1]
    },
    {
      name: 'Tarefa 5',
      category: categories[1]
    },
    {
      name: 'Tarefa 6',
      category: categories[1]
    },
    {
      name: 'Tarefa 7',
      category: categories[2]
    }
  ];

  export const cols = [
    {
      label: "Nome",
      icon: "pi pi-pencil" 
    },
    {
      label: "Status",
      icon: "pi pi-tag"
    },
    {
      label: "Responsável",
      icon: "pi pi-user"
    },
    {
      label: "Prazo",
      icon: "pi pi-clock"
    }
  ];