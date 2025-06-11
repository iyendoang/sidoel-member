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
import {Head, Link, useForm, usePage} from '@inertiajs/react'
import {PlusCircle, LoaderCircle, Save, X, ArrowLeft, UserRoundX, UserCheck} from 'lucide-react'
import hasAnyPermission from '@/utils/has-permissions'
import {ActionButton} from '@/components/action-button'
import PagePagination from '@/components/page-pagination'
import {Lembaga, LembagaLink, LembagaOption} from "@/types/lembaga";
import {Textarea} from "@/components/ui/textarea";
import hasAnyRole from "@/utils/has-role";
import LembagaForm from "@/pages/apps/lembagas/lembaga-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import LembagaFormExiting from "@/pages/apps/lembagas/lembaga-form-exiting";

interface IndexProps extends PageProps {
    lembagas: {
        data: Lembaga[],
        links: LembagaLink[],
        current_page: number,
        per_page: number,
    }
    lembaga_options: LembagaOption[]
    perPage: number,
    currentPage: number
}

export default function Index() {
    const {toast} = useToast();

    const {lembagas, lembaga_options, currentPage, perPage} = usePage<IndexProps>().props

    const {data, setData, post, processing, errors, reset, transform} = useForm({
        id: '',
        name: '',
        npsn: '',
        level: '',
        logo: '',
        description: '',
        province: '',
        city: '',
        district: '',
        sub_district: '',
        address: '',
        phone: '',
        fax: '',
        email: '',
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        open: false as boolean,
        isUpdate: false as boolean,
    });


    const [deleteModal, setDeleteModal] = React.useState(false);

    transform((data) => ({
        ...data,
        _method: data.isUpdate ? 'put' : 'post',
    }))


    const handleModalUpdate = (lembaga: Lembaga) => {
        setData(prevData => ({
            ...prevData,
            id: lembaga.id ?? '',
            name: lembaga.name ?? '',
            npsn: lembaga.npsn ?? '',
            level: lembaga.level ?? '',
            logo: lembaga.logo ?? '',
            description: lembaga.description ?? '',
            province: lembaga.province ?? '',
            city: lembaga.city ?? '',
            district: lembaga.district ?? '',
            sub_district: lembaga.sub_district ?? '',
            address: lembaga.address ?? '',
            phone: lembaga.phone ?? '',
            fax: lembaga.fax ?? '',
            email: lembaga.email ?? '',
            website: lembaga.website ?? '',
            facebook: lembaga.facebook ?? '',
            twitter: lembaga.twitter ?? '',
            instagram: lembaga.instagram ?? '',
            linkedin: lembaga.linkedin ?? '',
            youtube: lembaga.youtube ?? '',
            open: true,
            isUpdate: true,
        }));
    };


    const handleModalDelete = (lembaga: Lembaga) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: lembaga.id,
        }))
    }

    const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.isUpdate)
            post(route('apps.lembagas.update', data.id), {
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
            post(route('apps.lembagas.store'), {
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
    const storeDataExiting = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.isUpdate)
            post(route('apps.lembagas.force-update-npsn', data.id), {
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
            post(route('apps.lembagas.force-add-npsn'), {
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
            <Head title='Data Lembaga'/>
            <Header title='Data Lembaga' subtitle='Halaman ini digunakan untuk mengelola data lembaga pengguna'>
                <Dialog
                    open={data.open}
                    onOpenChange={(open) => setData({
                        ...data,
                        open: open,
                        id: '',
                        name: '',
                        npsn: '',
                        level: '',
                        logo: '',
                        description: '',
                        province: '',
                        city: '',
                        district: '',
                        sub_district: '',
                        address: '',
                        phone: '',
                        fax: '',
                        email: '',
                        website: '',
                        facebook: '',
                        twitter: '',
                        instagram: '',
                        linkedin: '',
                        youtube: '',
                        isUpdate: false
                    })}
                >
                    {hasAnyPermission(['lembagas-create']) &&
                        <DialogTrigger
                            className="px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-700 border hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 dark:border-gray-800 focus:outline-none">
                            <PlusCircle className="size-4"/> <span
                            className="hidden sm:inline-flex">Tambah Data Lembaga</span>
                        </DialogTrigger>
                    }
                    <DialogContent className='p-0'>
                        <Tabs defaultValue="add-lembaga">
                            {hasAnyRole(["member"]) && (
                                <div className="flex items-center justify-between p-2">
                                    <TabsList>
                                        <TabsTrigger value="add-lembaga">Lembaga Baru</TabsTrigger>
                                        <TabsTrigger value="add-existing-lembaga">Lembaga Terdaftar</TabsTrigger>
                                    </TabsList>
                                </div>
                            )}
                            <TabsContent value="add-lembaga">
                                <DialogHeader className="p-4 border-b">
                                    <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Data Lembaga</DialogTitle>
                                    <DialogDescription className="text-sm">
                                        Form ini digunakan
                                        untuk {data.isUpdate ? 'mengubah data lembaga' : 'menambahkan data lembaga'}
                                    </DialogDescription>
                                </DialogHeader>
                                <LembagaForm
                                    data={data}
                                    errors={errors}
                                    processing={processing}
                                    setData={setData}
                                    storeData={storeData}
                                    reset={reset}
                                />
                            </TabsContent>
                            <TabsContent value="add-existing-lembaga" className="w-full">
                                <DialogHeader className="p-4 border-b">
                                    <DialogTitle>{data.isUpdate ? 'Ubah' : 'Tambah'} Data NPSN</DialogTitle>
                                    <DialogDescription className="text-sm">
                                        Form ini digunakan
                                        untuk {data.isUpdate ? 'mengubah data lembaga' : 'menambahkan data lembaga yang telah terdaftar'}
                                    </DialogDescription>
                                </DialogHeader>
                                <LembagaFormExiting
                                    data={data}
                                    errors={errors}
                                    processing={processing}
                                    setData={setData}
                                    lembaga_options={{lembaga_options}}
                                    storeData={storeDataExiting}
                                    reset={reset}
                                />
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </Header>
            <div className='p-6'>
                <div className="mb-5">
                    <TableFilter
                        withFilterPage={true}
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.lembagas.index')}
                        placeholder="Cari data lembaga berdasarkan nama lembaga"
                    />
                </div>
                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px] text-center'>No</TableHead>
                                <TableHead>Nama Data Lembaga</TableHead>
                                <TableHead className='w-[10px] text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lembagas.data.length === 0 ? (
                                <TableEmpty colSpan={3} message='data lembaga'/>
                            ) : (
                                lembagas.data.map((lembaga, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (lembagas.current_page - 1) * lembagas.per_page}
                                        </TableCell>
                                        <TableCell>{lembaga.name}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center justify-center'>
                                                {(hasAnyPermission(['lembagas-update']) || hasAnyPermission(['lembagas-delete'])) &&
                                                    <ActionButton
                                                        permissionPrefix='lembagas'
                                                        isModal={true}
                                                        actionEdit={() => handleModalUpdate(lembaga)}
                                                        actionDelete={() => handleModalDelete(lembaga)}
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
                             url={route('apps.lembagas.destroy', data.id)}/>
                <PagePagination data={lembagas}/>
            </div>
        </>
    )
}

Index.layout = (page: React.ReactNode) => <AppLayout children={page}/>
