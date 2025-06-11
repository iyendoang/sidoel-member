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
import {Textarea} from "@/components/ui/textarea";
import {Application, ApplicationLink} from "@/types/application";
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface IndexProps extends PageProps {
    applications: {
        data: Application[],
        links: ApplicationLink[],
        current_page: number,
        per_page: number,
    }
    perPage: number,
    currentPage: number
}

export default function Index() {
    const {toast} = useToast();

    const {applications, currentPage, perPage} = usePage<IndexProps>().props

    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        name: '',
        slug: '',
        description: '',
        open: false as boolean,
        isUpdate: false as boolean,
    });


    const [deleteModal, setDeleteModal] = React.useState(false);

    transform((data) => ({
        ...data,
        _method: data.isUpdate ? 'put' : 'post',
    }))


    const handleModalUpdate = (application: Application) => {
        setData(prevData => ({
            ...prevData,
            id: application.id ?? '',
            name: application.name ?? '',
            slug: application.slug ?? '',
            description: application.description ?? '',
            open: true,
            isUpdate: true
        }));
    };


    const handleModalDelete = (application: Application) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: application.id,
        }))
    }

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.isUpdate)
            post(route('apps.applications.update', data.id), {
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
            post(route('apps.applications.store'), {
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
            <Head title='Data Application'/>
            <Header title='Data Application' subtitle='Halaman ini digunakan untuk mengelola data application pengguna'>
                <Dialog
                    open={data.open}
                    onOpenChange={(open) => setData({
                        ...data, open: open, name: '', id: '', isUpdate: false
                    })}
                >
                    {hasAnyPermission(['applications-create']) &&
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/> <span className="hidden sm:inline-flex">Tambah Data Application</span>
                        </DialogTrigger>
                    }
                    <DialogContent className='p-0'>
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Data Application</DialogTitle>
                            <DialogDescription className="text-sm">
                                Form ini digunakan
                                untuk {data.isUpdate ? 'mengubah data application' : 'menambahkan data application'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={storeData}>
                            <div className="p-4 space-y-4">
                                {/* Nama */}
                                <div>
                                    <Label>Nama Application</Label>
                                    <Input type="text" name="name" value={data.name}
                                           onChange={(e) => setData('name', e.target.value)}
                                           placeholder="Masukkan nama application"/>
                                    <p className="text-red-500 text-xs">{errors.name}</p>
                                </div>

                                {/* Slug */}
                                <div>
                                    <Label>Slug</Label>
                                    <Input type="text" name="slug" value={data.slug}
                                           onChange={(e) => setData('slug', e.target.value)}
                                           placeholder="Masukkan Slug"/>
                                    <p className="text-red-500 text-xs">{errors.slug}</p>
                                </div>

                                {/* Deskripsi */}
                                <div>
                                    <Label>Deskripsi</Label>
                                    <Textarea name="description" value={data.description}
                                              onChange={(e) => setData('description', e.target.value)}/>
                                    <p className="text-red-500 text-xs">{errors.description}</p>
                                </div>

                                {/* Tombol */}
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
                        url={route('apps.applications.index')}
                        placeholder="Cari data application berdasarkan nama application"
                    />
                </div>
                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px] text-center'>No</TableHead>
                                <TableHead>Nama Data Application</TableHead>
                                <TableHead className='w-[10px] text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.data.length === 0 ? (
                                <TableEmpty colSpan={3} message='data application'/>
                            ) : (
                                applications.data.map((application, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (applications.current_page - 1) * applications.per_page}
                                        </TableCell>
                                        <TableCell>{application.name}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center justify-center'>
                                                {(hasAnyPermission(['applications-update']) || hasAnyPermission(['applications-delete'])) &&
                                                    <ActionButton
                                                        permissionPrefix='applications'
                                                        isModal={true}
                                                        actionEdit={() => handleModalUpdate(application)}
                                                        actionDelete={() => handleModalDelete(application)}
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
                             url={route('apps.applications.destroy', data.id)}/>
                <PagePagination data={applications}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
