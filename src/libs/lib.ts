/**
 * Capitalize first letter of given string.
 *
 * @param str string
 * @returns string
 */
export function makeFirstUppercase(str: string): string {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

/**
 * Get max available width / height of browser window.
 * @returns string
 */
export function getMaxWindowSize(): number[] {
    const {
        screen, innerHeight, innerWidth, outerHeight, outerWidth,
    } = window;
    return [
        screen.availWidth - (outerWidth - innerWidth),
        screen.availHeight - (outerHeight - innerHeight),
    ];
}

/**
 * Check if window has max width / height.
 * @returns boolean
 */
export function isMaxWindowSize(): boolean {
    const {
        innerHeight, innerWidth,
    } = window;
    const maxWindowSize = getMaxWindowSize();
    return (maxWindowSize[0] === innerWidth) && (maxWindowSize[1] === innerHeight);
}

/**
 * Make to fit canvas pixels in drawingBuffer and on display the same.
 * @param canvas
 * @returns
 */
export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
    // Look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width; /* eslint-disable-line */
        canvas.height = height; /* eslint-disable-line */
        return true;
    }

    return false;
}

/**
 * Set constant drawingBuffer / display canvas resolution.
 * @param canvas
 * @returns
 */
export function resizeCanvasToDisplaySizeConstCanvas(
    canvas: HTMLCanvasElement,
    sizeRatio: number[],
): void {
    const maxWindowSize = getMaxWindowSize();
    const width = Math.round((maxWindowSize[0] - 15) * sizeRatio[0]);
    const height = Math.round(maxWindowSize[1] * sizeRatio[0]);

    // Set drawingBuffer resolution
    canvas.width = width; /* eslint-disable-line */
    canvas.height = height; /* eslint-disable-line */

    // Set display resolution
    canvas.setAttribute('style', `width: ${width}px; height: ${height}px`);
}
