import React from 'react'
import AppLayout from '@/layouts/app-layout'
import {Head, useForm, usePage} from '@inertiajs/react'
import {PlusCircle} from 'lucide-react'

import {Header} from '@/components/header'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'
import {
    TableFilter,
    TableCard,
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    TableEmpty
} from '@/components/ui/table'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ModalDelete} from '@/components/modal-delete'
import {ActionButton} from '@/components/action-button'
import PagePagination from '@/components/page-pagination'

import hasAnyPermission from '@/utils/has-permissions'
import LinkForm from '@/pages/apps/links/link-form'

import {PageProps} from '@/types'
import {Link, LinkLink} from '@/types/link'
import {LinkProfiles} from '@/types/link-profile'
import {Lembaga} from '@/types/lembaga'

interface IndexProps extends PageProps {
    linkProfile: LinkProfiles
    links: {
        data: Link[]
        meta: LinkLink[]
        current_page: number
        per_page: number
    }
    lembagas: Lembaga[]
    perPage: number
    currentPage: number
}

export default function Index() {
    const {links, linkProfile, lembagas, currentPage, perPage} = usePage<IndexProps>().props

    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        link_npsn: linkProfile.link_profile_npsn,
        title: '',
        url: '',
        link_profile_id: linkProfile.id,
        icon: '',
        is_active: false,
        is_safemode: false,
        order: '',
        bg_color: '',
        open: false as boolean,
        isUpdate: false as boolean
    })

    const [deleteModal, setDeleteModal] = React.useState(false)

    transform((data) => ({
        ...data,
        _method: data.isUpdate ? 'put' : 'post'
    }))

    const handleModalUpdate = (link: Link) => {
        setData({
            ...data,
            // @ts-ignore
            id: link.id,
            link_profile_id: linkProfile.id,
            link_npsn: linkProfile.link_profile_npsn,
            title: link.title,
            url: link.url,
            icon: link.icon,
            is_active: link.is_active || false,
            is_safemode: link.is_safemode || false,
            order: link.order,
            bg_color: link.bg_color,
            open: true,
            isUpdate: true
        })
    }

    const handleModalDelete = (link: Link) => {
        setDeleteModal(true)
        setData({
            ...data,
            id: link.id,
            link_profile_id: linkProfile.id,
        })
    }

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const url = data.isUpdate
            ? route('apps.links.update', data.id)
            : route('apps.links.store')

        post(url, {
            onSuccess: () => {
                reset()
                setData({
                    ...data,
                    open: false,
                    isUpdate: false
                })
            }
        })
    }

    return (
        <>
            <Head title={`Link Akses ${linkProfile.lembaga.name}`}/>

            <Header
                title={`Link Akses ${linkProfile.lembaga.name}`}
                subtitle="Halaman ini digunakan untuk mengelola data link akses pengguna"
            >
                <Dialog
                    open={data.open}
                    onOpenChange={(open) =>
                        setData({
                            ...data,
                            open: open,
                            id: '',
                            link_npsn: linkProfile.link_profile_npsn,
                            title: '',
                            url: '',
                            link_profile_id:linkProfile.id,
                            icon: '',
                            is_active: false,
                            is_safemode: false,
                            order: '',
                            bg_color: '',
                            isUpdate: false
                        })
                    }
                >
                    {hasAnyPermission(['links-create']) && (
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/>
                            <span className="hidden sm:inline-flex">Tambah Link Akses</span>
                        </DialogTrigger>
                    )}
                    <DialogContent className="p-0">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Link Akses</DialogTitle>
                            <DialogDescription className="text-sm">
                                Form ini digunakan untuk {data.isUpdate ? 'mengubah' : 'menambahkan'} data link akses
                            </DialogDescription>
                        </DialogHeader>
                        <LinkForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            setData={setData}
                            storeData={storeData}
                            reset={reset}
                            link_profile_id={linkProfile.id}
                            lembagasData={lembagas}
                        />
                    </DialogContent>
                </Dialog>
            </Header>

            <div className="p-6">
                <div className="mb-5">
                    <TableFilter
                        withFilterPage={true}
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.links.show-by-id', {id: 1})}
                        placeholder="Cari data link akses berdasarkan nama link akses"
                    />
                </div>

                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10px] text-center">No</TableHead>
                                <TableHead>Nama Link Akses</TableHead>
                                <TableHead className="w-[10px] text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {links.data.length === 0 ? (
                                <TableEmpty colSpan={3} message="data link akses"/>
                            ) : (
                                links.data.map((link, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (currentPage - 1) * perPage}
                                        </TableCell>
                                        <TableCell>{link.title}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center">
                                                {(hasAnyPermission(['links-update']) ||
                                                    hasAnyPermission(['links-delete'])) && (
                                                    <ActionButton
                                                        permissionPrefix="links"
                                                        isModal={true}
                                                        actionEdit={() => handleModalUpdate(link)}
                                                        actionDelete={() => handleModalDelete(link)}
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableCard>

                <ModalDelete
                    open={deleteModal}
                    onOpenChange={setDeleteModal}
                    url={route('apps.links.destroy', data.id)}
                />

                <PagePagination data={links.meta}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
