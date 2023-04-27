export function isEmptyObject(object: any): boolean {
    for (const property in object) {
        return false;
    }
    return true;
}