import axios from 'axios';

export var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export var formatterMarketCap = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

export var formatterCoin = Intl.NumberFormat('en-US', {
    style: 'decimal',
    // minimumSignificantDigits: 3,
    maximumSignificantDigits: 3
});

// const formatPrice = price => parseFloat(Number(price).toFixed(4));

export function SortArrayOfObjects(array) {

    function compare(a, b){
        if (a.rank < b.rank){
            return -1;
        };
        if (a.rank > b.rank){
            return 1;
        };
        return 0;
    };
    return array.sort(compare);
}

export function findObject (array, key, findValue) {
    return array.find(object => object[key] === findValue)
}

export function findObjectIndex (array, key, findValue) {
    return array.findIndex(object => object[key] === findValue)
}

export async function fetchTickerInfo (count, startCount, tickersUrl){
    const response = await axios.get(tickersUrl);
    const sortedResponse = SortArrayOfObjects(response.data);
    console.log("fetchTickerInfo")
    return sortedResponse.slice(startCount, startCount + count);
}

export async function fetchGlobalInfo (globalUrl){
    const response = await axios.get(globalUrl);
    console.log("fetchGlobalInfo")
    return response.data
}