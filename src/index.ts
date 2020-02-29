// IsCalculable means is a string with numbers and alphanumeric characters
const isCalculable = (x: string): boolean =>
	new RegExp(/\d+(A-z)*.\d/, 'g').test(x);
const isNumber = (x: string): boolean => !isNaN(Number(x)) || isCalculable(x);
const addReducer = (acc: number, x: string): number => acc + Number(x);
const addStringReducer = (acc: string, x: string | string[]): string =>
	acc + String(x);
const removeAlphanumericCharacters = (x: string): string =>
	[...x].filter(isNumber).reduce(addStringReducer);

function addNumbersFrom(expression: string, separator = ','): number {
	return expression
		.split(separator)
		.filter(isNumber)
		.map(removeAlphanumericCharacters)
		.reduce(addReducer, 0);
}

function getExpressionSeparatorPositions(
	expression: string
): Record<string, number> {
	const positionOfSeparatorStart = 2;
	const positionOfConfigurationEnd = expression.indexOf(
		'/',
		positionOfSeparatorStart
	);
	const positionOfCalculableExpression = positionOfConfigurationEnd + 1;

	return {
		positionOfSeparatorStart,
		positionOfConfigurationEnd,
		positionOfCalculableExpression
	};
}

export function calculate(expression: string): number {
	if (expression.startsWith('//')) {
		const {
			positionOfSeparatorStart,
			positionOfConfigurationEnd,
			positionOfCalculableExpression
		} = getExpressionSeparatorPositions(expression);

		if (expression[positionOfConfigurationEnd] === '/') {
			const separator = expression.slice(
				positionOfSeparatorStart,
				positionOfConfigurationEnd
			);

			return addNumbersFrom(
				expression.slice(positionOfCalculableExpression),
				separator
			);
		}

		throw new Error('Non expected expression');
	} else {
		return addNumbersFrom(expression);
	}
}
