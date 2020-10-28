export type Team = typeof Teams[keyof typeof Teams];
export const Teams = {
    INSTINCT: {
        name: 'instinct',
        color: 'f8bc11',
        icon: 'https://cdn.discordapp.com/emojis/367041971321044992.png'
    },
    MYSTIC: {
        name: 'mystic',
        color: '3d90de',
        icon: 'https://cdn.discordapp.com/emojis/367041973342699530.png'
    },
    VALOR: {
        name: 'valor',
        color: 'e24848',
        icon: 'https://cdn.discordapp.com/emojis/367041971321307136.png'
    }
}
// export interface Team {
//     name: string,
//     color: string,
//     icon: string,
// }

// export class Teams {
//     static readonly INSTINCT = new Teams(
//         'instinct',
//         'f8bc11',
//         'https://cdn.discordapp.com/emojis/367041971321044992.png'
//     )
//     static readonly MYSTIC = new Teams(
//         'mystic',
//         '3d90de',
//         'https://cdn.discordapp.com/emojis/367041973342699530.png'
//     )
//     static readonly VALOR = new Teams(
//         'valor',
//         'e24848',
//         'https://cdn.discordapp.com/emojis/367041971321307136.png'
//     )

//     // private to disallow creating other instances of this type
//     private constructor(public readonly key: string, public readonly color: string, public readonly icon: string) {
//     }

//     toString() {
//         return this.key;
//     }
// }

// export class Teams {
//     static readonly INSTINCT: Team = {
//         name: 'instinct',
//         color: 'f8bc11',
//         icon: 'https://cdn.discordapp.com/emojis/367041971321044992.png'
//     }
//     static readonly MYSTIC: Team = {
//         name: 'mystic',
//         color: '3d90de',
//         icon: 'https://cdn.discordapp.com/emojis/367041973342699530.png'
//     }
//     static readonly VALOR: Team = {
//         name: 'valor',
//         color: 'e24848',
//         icon: 'https://cdn.discordapp.com/emojis/367041971321307136.png'
//     }

//     // private to disallow creating other instances of this type
//     private constructor(private readonly team: Team) {
//     }

//     toString() {
//         return this.team.name;
//     }
// }


// export const Teams: { INSTINCT: Team, MYSTIC: Team, VALOR: Team } = {
//     INSTINCT: {
//         name: 'instinct',
//         color: 'f8bc11',
//         icon: 'https://cdn.discordapp.com/emojis/367041971321044992.png'
//     },
//     MYSTIC: {
//         name: 'mystic',
//         color: '3d90de',
//         icon: 'https://cdn.discordapp.com/emojis/367041973342699530.png'
//     },
//     VALOR: {
//         name: 'valor',
//         color: 'e24848',
//         icon: 'https://cdn.discordapp.com/emojis/367041971321307136.png'
//     }
// } as const;

// export type Teams = keyof typeof Teams;