export function validateTitle(title: string, maxLength: number = 100): boolean {
    if (title.length === 0) {
        return false;
    };
    if (title.length > maxLength) {
        return false;
    };
    return true;
}

export function validateContent(content: string, maxLength: number = 100): boolean {
    if (content.length === 0) {
        return false;
    };
    if (content.length > maxLength) {
        return false;
    };
    return true;
}

export function validateRating(rating: number): boolean {
    return true;
}