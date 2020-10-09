export function toFarsiDigits (num) {
	const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
	return num.toString().replace(/[0-9]/g, (d) => digits[d])
}