export function truncateWords(text: string | null, wordLimit: number = 30): string {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    return words.length > wordLimit
        ? words.slice(0, wordLimit).join(' ') + '...'
        : text;
}

// Format nomor telepon ke format 62
export function formatPhoneNumber(phone: string | null | undefined): string {
    if (!phone) return '';
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.startsWith('0') ? '62' + digitsOnly.slice(1) : digitsOnly;
}

// Ubah semua huruf jadi kapital
export function toUpperCase(text: string | null): string {
    if (!text) return '';
    return text.toUpperCase();
}

// Kapitalisasi huruf pertama setiap kata
export function capitalize(text: string | null): string {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
