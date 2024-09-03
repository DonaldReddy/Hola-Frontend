export function getFallBack(name: string): string {
	const nameArr = name.split("");
	if (nameArr.length > 1) {
		const s1 = nameArr[0];
		const s2 = nameArr[nameArr.length - 1];
		return s1.charAt(0) + s2.charAt(0);
	}
	return name.charAt(0) + name.charAt(0);
}
