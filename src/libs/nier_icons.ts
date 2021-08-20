const charIcons = {
    "2B": "/ui/actor/ch001001_01_actor_icon.png",
    "2P": "/ui/actor/ch001003_01_actor_icon.png",
    "9S": "/ui/actor/ch002001_01_actor_icon.png",
    "A2": "/ui/actor/ch003001_01_actor_icon.png",
    "Levania (Human)": "/ui/actor/ch004001_01_actor_icon.png",
    "Levania (Monster)": "/ui/actor/ch005001_01_actor_icon.png",
    "Argo": "/ui/actor/ch006001_01_actor_icon.png",
    "7?": "/ui/actor/ch007001_01_actor_icon.png",
    "8?": "/ui/actor/ch008001_01_actor_icon.png",
    "9?": "/ui/actor/ch009001_01_actor_icon.png",
    "10?": "/ui/actor/ch010001_01_actor_icon.png",
    "11?": "/ui/actor/ch011001_01_actor_icon.png",
    "12?": "/ui/actor/ch012001_01_actor_icon.png",
    "13?": "/ui/actor/ch013001_01_actor_icon.png",
    "14?": "/ui/actor/ch014001_01_actor_icon.png",
    "15?": "/ui/actor/ch015001_01_actor_icon.png",
    "16?": "/ui/actor/ch016001_01_actor_icon.png",
    "Emil": "/ui/actor/ch017001_01_actor_icon.png",
    "18?": "/ui/actor/ch018001_01_actor_icon.png",
    "Fio": "/ui/actor/ch019001_01_actor_icon.png",
    "31?": "/ui/actor/ch031001_01_actor_icon.png",
}

export function allCharacters(): string[] {
    return Object.keys(charIcons)
}

export function costumeIDToIconURL(characterId: number): string {
    // id = 19005
    const id = Math.floor(characterId/1000)*1000 + 1

    const v = `/ui/actor/ch${id.toString().padStart(6, '0')}_01_actor_icon.png`
    // maybe add default value here
    return v;
}

export function characterToIconURL(character: string): string {
    const v = charIcons[character]
    // maybe add default value here
    return v;
}