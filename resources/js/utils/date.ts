// date.ts
export function waktuRelatif(dateStr: string): string {
    const now = new Date()
    const target = new Date(dateStr)

    if (isNaN(target.getTime())) return 'Tanggal tidak valid'

    const diff = (target.getTime() - now.getTime()) / 1000 // detik
    const units = [
        {name: 'tahun', seconds: 31536000},
        {name: 'bulan', seconds: 2592000},
        {name: 'hari', seconds: 86400},
        {name: 'jam', seconds: 3600},
        {name: 'menit', seconds: 60},
        {name: 'detik', seconds: 1},
    ]

    for (const unit of units) {
        const delta = Math.floor(Math.abs(diff) / unit.seconds)
        if (delta >= 1) {
            return diff > 0
                ? `dalam ${delta} ${unit.name}`
                : `${delta} ${unit.name} yang lalu`
        }
    }

    return 'baru saja'
}

export function formatTanggalIndo(dateStr: string): string {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'Tanggal tidak valid'

    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function formatWaktuIndo(dateStr: string): string {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'Waktu tidak valid'

    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function tanggalSekarang(): string {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

export function isTanggalValid(dateStr: string): boolean {
    const date = new Date(dateStr)
    return !isNaN(date.getTime())
}

export function selisihHari(dateStr1: string, dateStr2: string): number | null {
    const d1 = new Date(dateStr1)
    const d2 = new Date(dateStr2)
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export function addHari(dateStr: string, days: number): string | null {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null
    date.setDate(date.getDate() + days)
    return date.toISOString()
}
