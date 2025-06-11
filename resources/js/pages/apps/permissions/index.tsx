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
import {Permission, PermissionLink} from '@/types/permission'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ModalDelete} from '@/components/modal-delete'
import {useToast} from '@/hooks/use-toast'
import {Head, useForm, usePage} from '@inertiajs/react'
import {PlusCircle, LoaderCircle, Save, X} from 'lucide-react'
import hasAnyPermission from '@/utils/has-permissions'
import {ActionButton} from '@/components/action-button'
import PagePagination from '@/components/page-pagination'
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface IndexProps extends PageProps {
    permissions: {
        data: Permission[],
        links: PermissionLink[],
        current_page: number,
        per_page: number,
    }
    perPage: number,
    currentPage: number
}

export default function Index() {

    const {permissions, currentPage, perPage} = usePage<IndexProps>().props
    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        name: '',
        open: false as boolean,
        isUpdate: false as boolean
    });

    const [deleteModal, setDeleteModal] = React.useState(false);

    transform((data) => ({
        ...data,
        _method: data.isUpdate ? 'put' : 'post',
    }))


    const handleModalUpdate = (permission: Permission) => {
        setData(prevData => ({
            ...prevData,
            id: permission.id,
            name: permission.name,
            open: true,
            isUpdate: true
        }))
    }

    const handleModalDelete = (permission: Permission) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: permission.id,
        }))
    }

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.isUpdate)
            post(route('apps.permissions.update', data.id), {
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
            post(route('apps.permissions.store'), {
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
            <Head title='Hak Akses'/>
            <Header title='Hak Akses' subtitle='Halaman ini digunakan untuk mengelola data hak akses pengguna'>
                <Dialog
                    open={data.open}
                    onOpenChange={(open) => setData({
                        ...data, open: open, name: '', id: '', isUpdate: false
                    })}
                >
                    {hasAnyPermission(['permissions-create']) &&
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/> <span
                            className="hidden sm:inline-flex">Tambah Hak Akses</span>
                        </DialogTrigger>
                    }
                    <DialogContent className='p-0'>
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Hak Akses</DialogTitle>
                            <DialogDescription className="text-sm">
                                Form ini digunakan
                                untuk {data.isUpdate ? 'mengubah data hak akses' : 'menambahkan data hak akses'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={storeData}>
                            <div className="p-4">
                                <div className="mb-4 flex flex-col gap-2">
                                    <Label>Nama Hak Akses</Label>
                                    <Input type="text" name="name" value={data.name}
                                           onChange={(e) => setData('name', e.target.value)}
                                           placeholder="Masukkan nama hak akses"/>
                                    <p className="text-red-500 text-xs">{errors.name}</p>
                                </div>
                                <ButtonSubmitEnd reset={reset} processing={processing} />
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Header>
            <div className='p-6'>
                <div className="mb-5">
                    <TableFilter
                        withFilterPage={true}
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.permissions.index')}
                        placeholder="Cari data hak akses berdasarkan nama hak akses"
                    />
                </div>
                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px] text-center'>No</TableHead>
                                <TableHead>Nama Hak Akses</TableHead>
                                <TableHead className='w-[10px] text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions.data.length === 0 ? (
                                <TableEmpty colSpan={3} message='data hak akses'/>
                            ) : (
                                permissions.data.map((permission, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (permissions.current_page - 1) * permissions.per_page}
                                        </TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center justify-center'>
                                                {(hasAnyPermission(['permissions-update']) || hasAnyPermission(['permissions-delete'])) &&
                                                    <ActionButton
                                                        permissionPrefix='permissions'
                                                        isModal={true}
                                                        actionEdit={() => handleModalUpdate(permission)}
                                                        actionDelete={() => handleModalDelete(permission)}
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
                             url={route('apps.permissions.destroy', data.id)}/>
                <PagePagination data={permissions}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
