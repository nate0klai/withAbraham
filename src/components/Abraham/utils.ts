export const numWithLavels = (num: any):string => {
    return num.toString()
        .replace(/[^\d]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}