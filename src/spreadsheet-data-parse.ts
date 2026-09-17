import { isNumeric } from "./helpers";

export interface ParsedSpreadsheetData {
	dataSpreadsheet: Record<string, string | number | boolean>;
	dataNormalized: Record<string, string | number | boolean>[];
}

/**
 * Given a row string, split it by the given delimiter (unless the delimiter
 * is inside double quotes).
 */
export function splitRow(row: string, delimiter: string): string[] {
	const result: string[] = [];
	let currentChunk = "";
	let insideQuotes = false;

	for (let i = 0; i < row.length; i++) {
		const char = row[i];
		if (char === '"') {
			insideQuotes = !insideQuotes;
		} else if (char === delimiter && !insideQuotes) {
			result.push(currentChunk.trim());
			currentChunk = "";
		} else {
			currentChunk += char;
		}
	}

	result.push(currentChunk.trim());

	return result;
}

/**
 * Given a number, convert it to the equivalent spreadsheet column reference.
 * For example, 0 would return "A", 7 would return "H", 26 would return "AA",
 * etc.
 */
export function getSpreadsheetColRef(num: number): string {
	const quotient = Math.floor(num / 26);
	const remainder = num % 26;
	const letter = String.fromCharCode(65 + remainder);
	if (quotient > 0) {
		return getSpreadsheetColRef(quotient - 1) + letter;
	} else {
		return letter;
	}
}

/**
 * Parse data fetched from a spreadsheet.
 */
export function parseSpreadsheetData(
	data: string,
	delimiter: string,
): ParsedSpreadsheetData {
	const dataSpreadsheet: Record<string, string | number | boolean> = {};
	const dataNormalized: Record<string, string | number | boolean>[] = [];
	const rows = data.split("\n");
	const columnNames = splitRow(rows[0], delimiter);

	// Go through each row
	for (let i = 0; i < rows.length; i++) {
		const rowNormalized: Record<string, string | number | boolean> = {};
		const cells = splitRow(rows[i], delimiter);

		// Go through each cell
		for (let j = 0; j < cells.length; j++) {
			let cell: string | number | boolean = cells[j].trim();

			// Convert cell value to number or boolean where possible
			if (isNumeric(cell)) {
				cell = Number(cell);
			} else if (typeof cell === "string" && cell.toLowerCase() === "true") {
				cell = true;
			} else if (typeof cell === "string" && cell.toLowerCase() === "false") {
				cell = false;
			}

			// Add cell data
			const spreadsheetCellRef = getSpreadsheetColRef(j) + String(i + 1);
			dataSpreadsheet[spreadsheetCellRef] = cell;
			rowNormalized[columnNames[j]] = cell;
		}

		// Push normalized row (ignore first row as those are column names here)
		if (i > 0) {
			dataNormalized.push(rowNormalized);
		}
	}

	return {
		dataSpreadsheet,
		dataNormalized,
	};
}
