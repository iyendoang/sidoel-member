import React from 'react'
import { Badge } from '@/components/ui/badge'
import { MessageCircleMore } from 'lucide-react'
import {formatPhoneNumber} from "@/lib/text";

interface WhatsAppBadgeProps {
    phone: string | null
}

export const WhatsAppBadge: React.FC<WhatsAppBadgeProps> = ({ phone }) => {
    if (!phone) return null

    const formattedPhone = formatPhoneNumber(phone)
    const waLink = `https://wa.me/${formattedPhone}`

    return (
        <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Badge className="gap-1 px-3 hover:underline">
                <MessageCircleMore className="w-4 h-4" />
                {formattedPhone}
            </Badge>
        </a>
    )
}
