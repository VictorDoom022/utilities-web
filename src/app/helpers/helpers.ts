export class Helpers {

    static toLocalizedString(input: string, replacementString: string = '-'): string {
        return input
            .toLowerCase()
            .normalize('NFD')                    // split accented letters
            .replace(/[\u0300-\u036f]/g, '')     // remove accents
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')        // remove special chars
            .replace(/\s+/g, replacementString)  // spaces → hyphen
            .replace(/-+/g, replacementString);  // collapse multiple hyphens
    }

    static toCamelCase(input: string): string {
        return input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s]/g, '') // remove punctuation
            .replace(/\s+(.)/g, (_, char) => char.toUpperCase());
    }
}