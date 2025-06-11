import React from 'react'
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

interface ButtonSubmitCardProps {
    backHref: string
    processing: boolean
    submitLabel?: string
    backLabel?: string
}

export const ButtonSubmitCard: React.FC<ButtonSubmitCardProps> = ({
                                                                      backHref,
                                                                      processing,
                                                                      submitLabel = 'Simpan',
                                                                      backLabel = 'Kembali'
                                                                  }) => {
    return (
        <div className="grid grid-cols-2 mt-6">
            <div className="justify-self-start">
                <Button variant="secondary" asChild>
                    <Link href={backHref}>
                        <ArrowLeft className="mr-2" /> {backLabel}
                    </Link>
                </Button>
            </div>
            <div className="justify-self-end">
                <Button variant="default" type="submit" disabled={processing}>
                    {processing ? (
                        <LoaderCircle className="animate-spin mr-2" />
                    ) : (
                        <Save className="mr-2" />
                    )}
                    {submitLabel}
                </Button>
            </div>
        </div>
    )
}
