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
    // maximumSignificantDigits: 7
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