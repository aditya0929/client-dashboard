import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function saveAsFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.replace(/\s+/g, "_"); // Sanitize filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Delay revocation to ensure download starts
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}
