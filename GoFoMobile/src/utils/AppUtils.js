import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

export function moneyFormat(number) {
    let formatString = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(number)//.replace('₫','')
    return formatString
}

export function isUserNameError(str){
    if (str !== undefined) {
        let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return regex.test(str);
    } else {
        return true
    }
}

export function isFullNameError(str){
    if (str !== undefined) {
        let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return regex.test(str);
    } else {
        return true
    }

}


export function isShopPathError(str){
    if (str !== undefined) {
        let regex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g;
        return regex.test(str);
    } else {
        return true
    }

}

export function isPhoneNumberError(str) {
    if (str !== undefined) {
        let regExp = new RegExp("^\\d+$");
        let isValid = regExp.test(str);

        if (isValid === true) {
            if (str.length < 8 || str.length > 13) {
                return true // true mean error
            }
        }

        return !isValid;
    } else {
        return true
    }

}
