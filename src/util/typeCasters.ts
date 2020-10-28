import { ArgumentTypeCaster } from "discord-akairo";

export const nameTypeCaster: ArgumentTypeCaster = (_msg, phrase): string | null => {
    if (!phrase)
        return null;
    // Must be between 3-15 chars in length
    if (phrase.length < 3 || phrase.length > 15)
        return null;
    // Alphanumerics only
    if (phrase.match(/[^A-Za-z0-9]/g))
        return null;
    // If it looks like a valid code, it's probably not supposed to be a name
    if (codeTypeCaster(_msg, phrase))
        return null;
    return phrase;
};

export const codeTypeCaster: ArgumentTypeCaster = (_msg, phrase): string | null => {
    if (!phrase)
        return null;
    // Match 12 digits (with or without spaces in between)
    const matches = phrase.match(/^((?:\d ?){12})$/g);
    if (!matches)
        return null;
    // Remove all non-digit characters
    const num = matches[0].replace(/\D/g, '');
    if (num.length != 12)
        return null;
    return num;
};
