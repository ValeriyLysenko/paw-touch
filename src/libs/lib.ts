/**
 * Capitalize first letter of given string.
 */
export function makeFirstUppercase(str: string): string {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

/**
 * Get max available width / height of browser window.
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
 * Standard transport.
 */
export async function http<T>(
    url: string,
    spec: RequestInit,
): Promise<HttpResponse<T>> {
    const response = await fetch(url, spec);
    let parsedBody = null;

    try {
        parsedBody = await response.json();
    } catch (ex) {
        throw new Error(ex);
    }
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parsedBody;
}

/**
 * Convert canvas image to blob
 */
export async function canvasToBlob(
    canvas: HTMLCanvasElement,
    spec: ToBlobSpec,
): Promise<Blob | null> {
    // return await new Promise<Blob | null>((resolve) => canvas.toBlob((blob) => resolve(blob), spec.imageType, spec.imageQuality));
    return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, spec.imageType, spec.imageQuality));
}

export async function sendBlobToServer<T>(
    canvas: HTMLCanvasElement,
    spec: ToBlobSpec,
): Promise<HttpResponse<T>> {
    const imageBlob = await canvasToBlob(canvas, spec);
    const formData = new FormData();
    // @ts-ignore
    formData.append('canvasImage', imageBlob, 'blob-image-name.png');
    console.log('formData', formData);

    // const response = await http<any>('http://localhost:8081/api/get-data', {
    // const response = await http<any>('http://localhost:8081/api/post-data', {
    const response = await http<T>('http://localhost:8081/api/image-data', {
        // headers: {
        //     'Content-type': 'application/json',
        // },
        method: 'POST',
        // body: JSON.stringify({ doom: { go: false } }),
        body: formData,
    });

    return response;
}
