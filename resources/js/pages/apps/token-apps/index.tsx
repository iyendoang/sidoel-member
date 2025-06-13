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
import {TokenApp, TokenAppLink} from "@/types/token-apps";
import {Application} from "@/types/application";
import TokenAppForm from "@/pages/apps/token-apps/token-apps-form";
import {Lembaga} from "@/types/lembaga";
import {BadgeStatus} from "@/components/custom/badge-status";
import {formatTanggalIndo} from "@/utils/date";

interface IndexProps extends PageProps {
    tokenApps: {
        data: TokenApp[],
        meta: TokenAppLink,
        current_page: number,
        per_page: number,
    }
    applications: Application[],
    lembagas: Lembaga[],
    perPage: number,
    currentPage: number
}

interface FormData {
    id: string | number;
    token: string;
    application_id: string | number;
    token_npsn: string;
    expired_at: string;
    status: 'active' | 'in_active' | 'suspended' | '';
    description: string;
    open: boolean;
    isUpdate: boolean;
}

export default function Index() {

    const {tokenApps, lembagas, applications, currentPage, perPage} = usePage<IndexProps>().props
    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        token: '',
        application_id: '',
        token_npsn: '',
        expired_at: '',
        status: '',
        description: '',
        open: false as boolean,
        isUpdate: false as boolean,
    });

    const [deleteModal, setDeleteModal] = React.useState(false);

    transform((data) => ({
        ...data,
        _method: data.isUpdate ? 'put' : 'post',
    }))


    const handleModalUpdate = (tokenApps: TokenApp) => {
        // @ts-ignore
        setData(prevData => ({
            ...prevData,
            id: tokenApps.id ?? '',
            token: tokenApps.token ?? '',
            application_id: tokenApps.application_id ?? '',
            token_npsn: tokenApps.token_npsn ?? '',
            expired_at: tokenApps.expired_at ?? '',
            status: tokenApps.status ?? '',
            description: tokenApps.description ?? '',
            open: true,
            isUpdate: true,
        }));
    };


    const handleModalDelete = (tokenApps: TokenApp) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: tokenApps.id,
        }))
    }

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.isUpdate)
            post(route('apps.token-apps.update', data.id), {
                onSuccess: () => {
                    reset();
                    setData(prev => ({
                        ...prev,
                        open: false,
                        isUpdate: false,
                    }));
                },
            });
        else
            post(route('apps.token-apps.store'), {
                onSuccess: () => {
                    reset();
                    setData(prev => ({
                        ...prev,
                        open: false,
                        isUpdate: false,
                    }));
                },
            });
    }

    return (
        <>
            <Head title='Data TokenApp'/>
            <Header title='Data TokenApp' subtitle='Halaman ini digunakan untuk mengelola data tokenApps pengguna'>
                <Dialog
                    open={data.open}
                    onOpenChange={(open) => setData({
                        ...data,
                        open: open,
                        id: '',
                        token: '',
                        application_id: '',
                        token_npsn: '',
                        expired_at: '',
                        status: '',
                        description: '',
                        isUpdate: false
                    })}
                >
                    {hasAnyPermission(['token-apps-create']) &&
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/> <span
                            className="hidden sm:inline-flex">Tambah Data TokenApp</span>
                        </DialogTrigger>
                    }
                    <DialogContent className='p-0'>
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Data TokenApp</DialogTitle>
                            <DialogDescription className="text-sm">
                                Form ini digunakan
                                untuk {data.isUpdate ? 'mengubah data tokenApps' : 'menambahkan data tokenApps'}
                            </DialogDescription>
                        </DialogHeader>
                        <TokenAppForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            setData={setData}
                            storeData={storeData}
                            reset={reset}
                            applications={applications}
                            lembagasData={lembagas} lembagas={[]}/>
                    </DialogContent>
                </Dialog>
            </Header>
            <div className='p-6'>
                <div className="mb-5">
                    <TableFilter
                        withFilterPage={true}
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.token-apps.index')}
                        placeholder="Cari data tokenApps berdasarkan nama tokenApps"
                    />
                </div>
                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px] text-center'>No</TableHead>
                                <TableHead className="w-10 text-center">Aplication</TableHead>
                                <TableHead>Lembaga</TableHead>
                                <TableHead className="w-10 text-center">NPSN</TableHead>
                                <TableHead className="w-10 text-center">Token</TableHead>
                                <TableHead className="w-20">Expired</TableHead>
                                <TableHead className="w-10 text-center">Activity</TableHead>
                                <TableHead className="w-10 text-center">Status</TableHead>
                                <TableHead className='w-[10px] text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tokenApps.data.length === 0 ? (
                                <TableEmpty colSpan={3} message='data tokenApps'/>
                            ) : (
                                tokenApps.data.map((tokenApps, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (currentPage - 1) * perPage}
                                        </TableCell>
                                        <TableCell className="w-10 text-center">{tokenApps.application.name}</TableCell>
                                        <TableCell>{tokenApps.lembaga.name}</TableCell>
                                        <TableCell>{tokenApps.lembaga.npsn}</TableCell>
                                        <TableCell className="w-10 text-center">{tokenApps.token}</TableCell>
                                        <TableCell>{tokenApps.expired_human}</TableCell>
                                        <TableCell>{tokenApps.used_human}</TableCell>
                                        <TableCell className="text-center">
                                            <BadgeStatus
                                                status={tokenApps.status as "active" | "in_active" | "suspended"}/>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center justify-center'>
                                                {(hasAnyPermission(['token-apps-update']) || hasAnyPermission(['token-apps-delete'])) &&
                                                    <ActionButton
                                                        permissionPrefix='token-apps'
                                                        isModal={true}
                                                        actionEdit={() => handleModalUpdate(tokenApps)}
                                                        actionDelete={() => handleModalDelete(tokenApps)}
                                                    />
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableCard>
                <ModalDelete open={deleteModal} onOpenChange={setDeleteModal}
                             url={route('apps.token-apps.destroy', data.id)}/>
                <PagePagination data={tokenApps.meta}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
