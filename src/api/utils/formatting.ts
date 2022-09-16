export function escapeSlashes(value: string): string {
    let newString: string = '';
    for (const character of value) {
        if (character === '/') {
            newString += '\\/';
        };
        if (character !== '/') {
            newString += character;
        };
    }
    return newString;
}

export function convertToRegex(value: string, complete: boolean = true): string {
    value = value.replace(':id', '[0-9]+');
    value = escapeSlashes(value);
    if (complete) {
        value = '^' + value + '$'
    };
    return value;
}

export function insertIdIntoUrl(url: string, name: string, id: string | number): string {
    url = url.replace(`${name}/:id`, `${name}/${id}`);
    return url;
}