export function truncateWords(text: string | null, wordLimit: number = 30): string {
    if (!text) return ''
    const words = text.trim().split(/\s+/)
    return words.length > wordLimit
        ? words.slice(0, wordLimit).join(' ') + '...'
        : text
}
export function formatPhoneNumber(phone: string | null): string {
    if (!phone) return ''
    phone = phone.trim().replace(/\D/g, '') // hapus karakter non-digit
    return phone.startsWith('0') ? '62' + phone.slice(1) : phone
}
// Ubah semua huruf jadi uppercase
export function toUpperCase(text: string | null): string {
    if (!text) return ''
    return text.toUpperCase()
}

// Ubah huruf pertama setiap kata jadi kapital, sisanya lowercase
export function capitalize(text: string | null): string {
    if (!text) return ''
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
