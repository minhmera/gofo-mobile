

export function moneyFormat(number) {
    console.log('numberWithCommas ==> ',number);
    let formatString = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(number)//.replace('₫','')
    return formatString
}
