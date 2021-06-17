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
): Promise<T> {
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
): Promise<T> {
    const imageBlob = await canvasToBlob(canvas, spec);

    if (!imageBlob) {
        throw Error('Image to blob conversion is failed!!!');
    }

    const formData = new FormData();
    formData.append('canvasImage', imageBlob, 'blob-image-name.png');

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

/**
 * Resize image.
 * You can return canvas or image.
 */
export async function resizeImage(
    source: HTMLImageElement,
    spec: {
        width: number,
        height: number,
    },
    isImage: boolean = false,
    useBitmap: boolean = false,
): Promise<HTMLImageElement | HTMLCanvasElement> {
    const {
        width, height,
    } = spec;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (useBitmap) {
        const imageBitmap = await createImageBitmap(source);
        ctx!.drawImage(imageBitmap, 0, 0, width, width);
    } else ctx!.drawImage(source, 0, 0, width, width);

    if (isImage) {
        const image = document.createElement('img');
        image.src = canvas.toDataURL();
        return image;
    }

    return canvas;
}

/**
 * Universal function for closing of modal.
 */
export function uniOnClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    if (!target) return;
    const closest = target.closest('.modal.is-active');
    if (!closest) return;
    closest.classList.remove('is-active');
}

/**
 * Get form data.
 */
export function getFormData(
    form: HTMLFormElement,
): {
    [name:string]: string | number | boolean;
} {
    const { elements } = form;
    if (!elements) {}; /* eslint-disable-line */
    const entries = Object.entries(elements) as [string, HTMLFormElement][];
    const fields: {
        [name:string]: string | number | boolean;
    } = {};
    for (const entry of entries) {
        if (Number.isNaN(parseInt(entry[0], 10))) fields[entry[0]] = entry[1].value.trim();
    }
    return fields;
}
