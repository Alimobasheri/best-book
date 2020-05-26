const toFarsiDigits = num => {
	const digits = ['Ù ', 'Ù¡', 'Ù¢', 'Ù£', 'Ù¤', 'Ù¥', 'Ù¦', 'Ù§', 'Ù¨', 'Ù©'];
	return num.toString().replace(/[0-9]/g, (d) => digits[d])
}
