/**
 * Create the CSS styles using the settings.
 *
 * @param {Object} settings
 * @returns {string} the contents of the stylesheet
 */
export function createStyles(settings: Object): string;
export const madeInLoaderTemplate: '\n<div class="fmd-backdrop"></div>\n\n<div class="fmd-main">\n\t<div class="fmd-main-container">\n\t\t<div class="fmd-loader-container">\n\t\t\t<div class="fmd-text-center fmd-mb-3">\n\t\t\t\t<div class="fmd-specific-fs-20 fmd-text-emphasis fmd-fw-bold">{{ translations.loading }}...</div>\n\t\t\t</div>\n\t\t\t<div class="fmd-loader-progress" role="status" aria-label="{{ translations.loading }}"></div>\n\t\t</div>\n\t</div>\n</div>\n';
/**
 * Create the body template.
 *
 * @param {Object} settings
 * @returns {{template: string, settings: Object}} the template and the
 * updated settings
 */
export function createBodyTemplate(settings: Object): {
	template: string;
	settings: Object;
};
/**
 * Create the content template.
 *
 * @param {string} template
 * @param {Object} settings
 * @param {Object} data
 * @param {boolean} windowAndSanitize
 * @returns {{template: string, bindDivTemplates: Object}} template and bind
 * <div> templates
 */
export function createContentTemplate(
	template: string,
	settings: Object,
	data: Object,
	windowAndSanitize: boolean,
): {
	template: string;
	bindDivTemplates: Object;
};
