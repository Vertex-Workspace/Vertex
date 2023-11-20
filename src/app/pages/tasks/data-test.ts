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
      category: categories[0],
      properties: [
        {
          name: 'status',
          value: 'to-do',  
          header: 'Status',
          bgColor: '#FF9D9D',
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        },
      ],
      // status: 'aaaaaa'
    },
    {
      name: 'Tarefa 2',
      category: categories[0],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 3',
      category: categories[0],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 4',
      category: categories[1],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 5',
      category: categories[1],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 6',
      category: categories[1],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D',
        },
        {
          name: 'creator',
          value: 'Marcos',
          header: 'Responsável'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D',
        },
        {
          name: 'term',
          value: 'asdasdasdas',
          header: 'Prazo'
        }
      ],
    },
    {
      name: 'Tarefa 7',
      category: categories[2],
      properties: [
        {
          name: 'status',
          value: 'to-do',
          header: 'Status',
          bgColor: '#FF9D9D'
        },
        {
          name: 'term',
          value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          header: 'Prazo'
        }
      ],
    },
 ];

  export const cols = [
    {
      field: "name",
      headerText: "Nome",
      width: '40%',
      icon: "pi pi-user",
    },
    {
      field: "status",
      headerText: "Status",
      width: '15%',
      icon: "pi pi-tag",
    },
    {
      field: "creator",
      headerText: "Responsável",
      width: '15%',
      icon: "pi pi-user",
    },
    {
      field: "term",
      headerText: "Prazo",
      width: '15%',
      icon: "pi pi-clock",
    },
    {
      field: "term",
      headerText: "Prazo",
      width: '15%',
      icon: "pi pi-clock",
    },
    {
      field: "term",
      headerText: "Prazo",
      width: '15%',
      icon: "pi pi-clock",
    },
  ];

  