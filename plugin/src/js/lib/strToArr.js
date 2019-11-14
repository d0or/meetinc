export default function strToArr(str) {
    const data = [];
    for (var i = 0; i < str.length; i++) {
        data.push(str.charCodeAt(i));
    }
    return data
}
