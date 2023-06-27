export function isEmptyObject(object: any): boolean {
    for (const property in object) {
        return false;
    }
    return true;
}
// push to other link target_blank 
export const navigateToPublicUrl = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
};
