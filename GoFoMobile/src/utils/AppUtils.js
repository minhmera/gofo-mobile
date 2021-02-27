




export function numberWithCommas(number) {
    //console.log('numberWithCommas ==> ',new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
    console.log('numberWithCommas ==> ',number);
    let formatString = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(number).replace('₫','')
    return formatString
}
