export function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}

export function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomFloat (min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.random() * (max - min) + min;
}

export function handleErrorMessage(error, defaultMessage) {
    if(error && error.hasOwnProperty('message')){
        defaultMessage = error.message;
        if(error .hasOwnProperty('code')){
            if(error.code === 'timeout'){
                defaultMessage = defaultMessage + '\nTente novamente.';
            } else if (error.code === 'noConnection'){
                defaultMessage = defaultMessage + '\nTente novamente.';
            } else {
                defaultMessage = defaultMessage + '\nTente novamente mais tarde.';
            }
        }
    }

    return defaultMessage;
}