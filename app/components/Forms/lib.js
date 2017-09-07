const numbFormat = value => value.replace(/[^\d]/g, '')

export function normalizePhone(value) {
	if (!value) {
		return value
	}

	const onlyNums = numbFormat(value)

	if(onlyNums.length <= 3) {
		return onlyNums
	}
	if(onlyNums.length <= 7) {
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
	}

    if(onlyNums.length <= 10) {
        return`${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6,10)}` 
    }

    return`${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6,10)}-${onlyNums.slice(10,12)}` 
}

//- Imported from: http://www.mredkj.com/javascript/numberFormat.html
export function normalizePrice(value) {
	if (!value) {
		return value
	}

	let nStr = numbFormat(value)

    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}
