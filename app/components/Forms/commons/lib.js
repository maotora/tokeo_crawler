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


const maxLength = (max, msg) => value =>
    value && value.length > max ? `${msg} must be at most ${max} or less characters.` : undefined

const minLength = (min, msg) => value =>
    value && value.length < min ? `${msg} must be at least ${min} or more characters.` : undefined

const phoneLength = (min, msg) => value =>
    value && numbFormat(value).length < min ? `${msg} must be at least ${min} numbers.` : undefined

export const phoneNumber = phoneLength(12, 'Phone numbers')

export const maxLength15 = maxLength(15, 'Names')
export const minLength3 = minLength(3, 'Names')
export const required = value => (value ? undefined : 'Required')
export const isNumber = value => 
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const isEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address' : undefined
export const isAlphaNumeric = value =>
    value && /[^a-zA-Z0-9~']/i.test(value)
    ? 'Only alphanumeric characters allowed'
    : undefined
