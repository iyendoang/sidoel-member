import AppLayout from '@/layouts/app-layout'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Table, TableCard, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react'
import { PageProps } from '@/types'
import { Permission } from '@/types/permission'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

interface CreateProps extends PageProps {
    permissions : Permission[]
}

export default function Create() {

    const { toast } = useToast();

    const { permissions } = usePage<CreateProps>().props;

    const {data, setData, errors, processing, post, reset} = useForm({
        name: '',
        selectedPermissions: [] as string[]
    });


    const selectedPermission = (e: React.ChangeEvent<HTMLInputElement>) => {
        let permissionIds = data.selectedPermissions;

        if(permissionIds.some((name) => name === e.target.value))
           permissionIds = permissionIds.filter((name) => name !== e.target.value);
        else
            permissionIds.push(e.target.value);

        setData('selectedPermissions', permissionIds);
    };

    const selectAllPermission = (e: React.ChangeEvent<HTMLInputElement>) => {
        const permissionsIds = permissions.map(permission => permission.name);

        setData('selectedPermissions', e.target.checked ? permissionsIds : []);
    }

    const storeData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('apps.roles.store'), {
            onSuccess: () => {
                reset()
            },
        });
    }

    return (
        <>
            <Head title='Tambah Akses Group'/>
            <Header title='Tambah Akses Group' subtitle='Halaman ini digunakan untuk menambahkan data akses group'/>
            <div className='p-6'>
               <Card>
                    <CardHeader>
                        <CardTitle>Tambah Akses Group</CardTitle>
                        <CardDescription>Form ini digunakan untuk menambahkan data akses group</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={storeData}>
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>Nama Akses Group</Label>
                                <Input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}  placeholder="Masukkan nama akses group"/>
                                <p className="text-red-500 text-xs">{errors.name}</p>
                            </div>
                            <div className='mb-4 flex flex-col gap-2'>
                                <Label>Hak Akses</Label>
                                <TableCard>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px] text-center">
                                                    <Checkbox onChange={(e) => selectAllPermission(e)} checked={data.selectedPermissions.length === permissions.length}/>
                                                </TableHead>
                                                <TableHead>Nama Hak Akses</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {permissions.map((permission, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="w-[50px] text-center">
                                                        <Checkbox checked={data.selectedPermissions.includes(permission.name)} onChange={selectedPermission} key={i} value={permission.name} id={`permission-${i}`}/>
                                                    </TableCell>
                                                    <TableCell>{permission.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCard>
                                <p className="text-red-500 text-xs">{errors.selectedPermissions}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="destructive" asChild>
                                    <Link href='/apps/roles'><ArrowLeft/> Kembali</Link>
                                </Button>
                                <Button variant="default" type="submit" disabled={processing}>
                                    {processing ? <LoaderCircle className="animate-spin" /> : <Save /> } Simpan Data
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

Create.layout = (page : React.ReactNode) => <AppLayout children={page}/>