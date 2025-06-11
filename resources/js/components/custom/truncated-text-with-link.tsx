import React from 'react'
import {Link} from '@inertiajs/react'

interface Props {
    text: string | null
    wordLimit?: number
    linkHref?: string
    linkLabel?: string
    className?: string
}

export const TruncatedTextWithLink: React.FC<Props> = ({
                                                           text,
                                                           wordLimit = 30,
                                                           linkHref,
                                                           linkLabel = '...',
                                                           className = ''
                                                       }) => {
    if (!text) return null
    const plainText = text.replace(/<[^>]+>/g, '').trim();
    const words = plainText.trim().split(/\s+/)
    const isTruncated = words.length > wordLimit
    const displayedText = isTruncated ? words.slice(0, wordLimit).join(' ') : text

    return (
        <span className={className}>
      {displayedText}
            {isTruncated && linkHref ? (
                <>
                    {' '}
                    <Link href={linkHref} className="text-zinc-900 dark:text-zinc-50 font-bold hover:underline">
                        {linkLabel}
                    </Link>
                </>
            ) : isTruncated ? (
                '.....'
            ) : null}
    </span>
    )
}
