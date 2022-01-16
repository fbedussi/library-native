export const generateUID = (): string =>
	Date.now().toString() + Math.random().toString();
