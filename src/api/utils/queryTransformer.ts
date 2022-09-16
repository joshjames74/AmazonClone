export const idsToNumber = (ids: (string[] | string)): number[] => {
    if (typeof ids === 'string') {
        ids = [ids];
    };
    const allNumbers = ids.every((id) => {
        return !isNaN(Number(id));
    })
    if (!allNumbers) {
        throw new Error('Invalid query');
    };
    return ids.map((id) => {
        return parseInt(id);
    });
}

export const idToNumber = (id: string): number => {
    if (isNaN(Number(id))) {
        throw new Error('Invalid id');
    };
    return parseInt(id);
}