export function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}