export interface LocationItem {
    url: string,
    name: string,
    previous ?: string,
    extra ?: any
}

export const locations: LocationItem[] = [
    {
        url: '/home',
        name: 'Home',
    },
    {
        url: '/perfil/usuario',
        name: 'Perfil de ',
        previous: '/home'
    }, 
    {
        url: '/perfil',
        name: 'Seu perfil',
        previous: '/home'
    },
    {
        url: '/configuracoes',
        name: 'Configurações e Preferências',
        previous: '/home'
    },
]