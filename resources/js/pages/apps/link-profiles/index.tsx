import AppLayout from '@/layouts/app-layout'
import React from 'react'
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
import {PageProps} from '@/types'
import {ModalDelete} from '@/components/modal-delete'
import {Head, useForm, usePage} from '@inertiajs/react'
import {PlusCircle} from 'lucide-react'
import hasAnyPermission from '@/utils/has-permissions'
import {ActionButton} from '@/components/action-button'
import PagePagination from '@/components/page-pagination'
import {Lembaga, LembagaOption} from "@/types/lembaga";
import {waktuRelatif, formatTanggalIndo, formatWaktuIndo, tanggalSekarang, selisihHari, addHari} from "@/utils/date";
import {LinkProfiles, LinkProfileLink} from "@/types/link-profile";
import LinkProfileForm from "@/pages/apps/link-profiles/link-profile-form";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface IndexProps extends PageProps {
    linkProfiles: {
        data: LinkProfiles[],
        meta: LinkProfileLink[],
        current_page: number,
        per_page: number,
    }
    lembagas: Lembaga[],
    perPage: number,
    currentPage: number
}


export default function Index() {

    const {linkProfiles, lembagas, currentPage, perPage} = usePage<IndexProps>().props

    const [deleteModal, setDeleteModal] = React.useState(false);


    const handleModalDelete = (linkProfiles: LinkProfiles) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: linkProfiles.id,
        }))
    }
    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        link_profile_npsn: '',
        display_name: '',
        bio: '',
        avatar: null as File | string | null, // null default
        theme: '',
        open: false as boolean,
        isUpdate: false as boolean,
    });

    const handleModalUpdate = (linkProfiles: LinkProfiles) => {
        setData(prevData => ({
            ...prevData,
            id: linkProfiles.id ?? '',
            link_profile_npsn: linkProfiles.link_profile_npsn ?? '',
            display_name: linkProfiles.display_name ?? '',
            bio: linkProfiles.bio ?? '',
            avatar: linkProfiles.avatar ?? '',
            theme: linkProfiles.theme ?? '',
            open: true,
            isUpdate: true,
        }));
    };
    // transform((data) => ({
    //     ...data,
    //     _method: data.isUpdate ? 'put' : 'post',
    // }))
    transform((formData) => ({
        ...formData,
        _method: formData.isUpdate ? 'PUT' : 'POST',
    }));

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kirim ke route sesuai update / create
        const url = data.isUpdate
            ? route('apps.link-profiles.update', data.id)
            : route('apps.link-profiles.store');

        post(url, {
            forceFormData: true, // otomatis konversi data ke FormData
            onSuccess: () => {
                reset();
                setData(prev => ({
                    ...prev,
                    open: false,
                    avatar: null,
                    isUpdate: false,
                }));
            },
        });
    };


    return (
        <>
            <Head title='Data LinkProfile'/>
            <Header title='Data LinkProfile'
                    subtitle='Halaman ini digunakan untuk mengelola data linkProfiles pengguna'>
                <Dialog
                    open={data.open}
                    onOpenChange={(open) => setData({
                        ...data,
                        open: open,
                        id: '',
                        link_profile_npsn: '',
                        display_name: '',
                        bio: '',
                        avatar: null,
                        theme: '',
                        isUpdate: false
                    })}
                >
                    {hasAnyPermission(['link-profiles-create']) &&
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/> <span
                            className="hidden sm:inline-flex">Tambah Data LinkProfile</span>
                        </DialogTrigger>
                    }
                    <DialogContent className='p-0'>
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Data LinkProfile</DialogTitle>
                            <DialogDescription className="text-sm">
                                Form ini digunakan
                                untuk {data.isUpdate ? 'mengubah data linkProfiles' : 'menambahkan data linkProfiles'}
                            </DialogDescription>
                        </DialogHeader>
                        <LinkProfileForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            setData={setData}
                            storeData={storeData}
                            reset={reset}
                            lembagasData={lembagas}/>
                    </DialogContent>
                </Dialog>
            </Header>
            <div className='p-6'>
                <div className="mb-5">
                    <TableFilter
                        withFilterPage={true}
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.link-profiles.index')}
                        placeholder="Cari data linkProfiles berdasarkan nama linkProfiles"
                    />
                </div>
                <TableCard>
                    <Table aria-label="Daftar Link Profiles">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10px] text-center">No</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Display Name</TableHead>
                                <TableHead>Bio</TableHead>
                                <TableHead>Token</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead className="w-[10px] text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {linkProfiles.data.length === 0 ? (
                                <TableEmpty colSpan={8} message="data linkProfiles"/>
                            ) : (
                                linkProfiles.data.map((linkProfile, index) => (
                                    <TableRow key={linkProfile.id}>
                                        <TableCell className="text-center">
                                            {index + 1 + (currentPage - 1) * perPage}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={linkProfile.avatar || 'logo.svg'}/>
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                  <span className="font-semibold">
                                                    {linkProfile.lembaga?.name || '-'}
                                                  </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>{linkProfile.display_name || '-'}</TableCell>
                                        <TableCell>{linkProfile.bio || '-'}</TableCell>
                                        <TableCell>{linkProfile.link_profile_npsn}</TableCell>
                                        <TableCell>{waktuRelatif(linkProfile.created_at)}</TableCell>
                                        <TableCell className="text-center">
                                            {(hasAnyPermission(['link-profiles-update']) || hasAnyPermission(['link-profiles-delete'])) && (
                                                <ActionButton
                                                    permissionPrefix="link-profiles"
                                                    isModal={true}
                                                    withDetail={true}
                                                    actionDetailHref={route('apps.links.show-by-id', { id: linkProfile.id })}
                                                    actionEdit={() => handleModalUpdate(linkProfile)}
                                                    actionDelete={() => handleModalDelete(linkProfile)}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableCard>
                <ModalDelete open={deleteModal} onOpenChange={setDeleteModal}
                             url={route('apps.link-profiles.destroy', data.id)}/>
                <PagePagination data={linkProfiles.meta}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
