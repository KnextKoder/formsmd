export interface ParsedDataBlocks {
	template: string;
	data: Record<string, any>;
}

/**
 * Given a template string, parse the data-blocks and separate them from the
 * rest of the template. The data-blocks must be provided as valid JSON inside
 * fenced code blocks with "data" as the language.
 */
export function parseDataBlocks(template: string): ParsedDataBlocks {
	const data: Record<string, any>[] = [];
	let dataBlockCount = 1;

	function parseDataBlock(_match: string, content: string): string {
		content = content.trim();
		try {
			data.push(JSON.parse(content));
		} catch {
			console.warn(
				`[DATA] Data-block #${dataBlockCount.toString()} ignored because of invalid JSON`,
			);
		}
		dataBlockCount += 1;
		return "";
	}
	template = template.replace(/```\s*data\s*(.*?)\s*```/gis, parseDataBlock);
	template = template.replace(/~~~\s*data\s*(.*?)\s*~~~/gis, parseDataBlock);

	return {
		template,
		data: data.reduce((acc, obj) => Object.assign(acc, obj), {}), // Combine
	};
}
