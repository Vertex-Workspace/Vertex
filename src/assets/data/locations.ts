export interface LocationItem {
    url: string,
    name: string,
    extra ?: any
}

export const locations: LocationItem[] = [
    {
        url: '/home',
        name: 'Home',
    },
    {
        url: '/projetos',
        name: 'Projetos de',
    },
    {
        url: '/tarefas',
        name: 'Tarefas de ',
    },
    {
        url: '/perfil/usuario',
        name: 'Perfil de ',
    }, 
    {
        url: '/perfil',
        name: 'Seu perfil'
    },
    {
        url: '/configuracoes',
        name: 'Configurações e Preferências'
    }
    
]