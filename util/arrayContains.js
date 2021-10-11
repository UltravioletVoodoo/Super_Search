export default function arrayContains(inputArray, value) {
    if (inputArray == null) return false;
    for (let input of inputArray) {
        if (input === value) return true;
    }
    return false;
}