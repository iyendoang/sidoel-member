import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Table, TableCard, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react'
import { PageProps, User } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Role } from '@/types/role'
import { Badge } from '@/components/ui/badge'

interface EditProps extends PageProps {
    user : User
    roles : Role[]
}

export default function Edit() {

    const { toast } = useToast();

    const { user, roles } = usePage<EditProps>().props;

    const {data, setData, errors, processing, post, reset} = useForm({
        username: user.username,
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        selectedRoles: user.roles.map(role => role.name),
        _method: 'put'
    });


    const selectedRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        let permissionIds = data.selectedRoles;

        if(permissionIds.some((name) => name === e.target.value))
           permissionIds = permissionIds.filter((name) => name !== e.target.value);
        else
            permissionIds.push(e.target.value);

        setData('selectedRoles', permissionIds);
    };

    const selectAllRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roleIds = roles.map(role => role.name);

        setData('selectedRoles', e.target.checked ? roleIds : []);
    }

    const storeData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('apps.users.update', user.id), {
            onSuccess: () => {
                toast({
                    'variant': 'success',
                    'title': 'Success',
                    'description': 'Data berhasil disimpan',
                }),
                reset()
            },
        });
    }

    return (
        <>
            <Head title='Ubah Pengguna'/>
            <Header title='Ubah Pengguna' subtitle='Halaman ini digunakan untuk mengubah data pengguna'/>
            <div className='p-6'>
               <Card>
                    <CardHeader>
                        <CardTitle>Ubah Pengguna</CardTitle>
                        <CardDescription>Form ini digunakan untuk mengubah data pengguna</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={storeData}>
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>Nama Lengkap</Label>
                                <Input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}  placeholder="Masukkan nama lengkap pengguna"/>
                                <p className="text-red-500 text-xs">{errors.name}</p>
                            </div>
                             <div className="mb-4 flex flex-col gap-2">
                                <Label>Username</Label>
                                <Input type="text" name="username" value={data.username} onChange={(e) => setData('username', e.target.value)}  placeholder="Masukkan username pengguna"/>
                                <p className="text-red-500 text-xs">{errors.username}</p>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>Email</Label>
                                <Input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)}  placeholder="Masukkan email pengguna"/>
                                <p className="text-red-500 text-xs">{errors.email}</p>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>Kata Sandi</Label>
                                <Input type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)}  placeholder="Masukkan kata sandi pengguna"/>
                                <p className="text-red-500 text-xs">{errors.password}</p>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <Label>Konfirmasi Kata Sandi</Label>
                                <Input type="password" name="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}  placeholder="Masukkan konfirmasi kata sandi pengguna"/>
                                <p className="text-red-500 text-xs">{errors.password_confirmation}</p>
                            </div>
                            <div className='mb-4 flex flex-col gap-2'>
                                <Label>Akses Group</Label>
                                <TableCard>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px] text-center">
                                                    <Checkbox onChange={(e) => selectAllRole(e)} checked={data.selectedRoles.length === roles.length}/>
                                                </TableHead>
                                                <TableHead>Nama Akses Group</TableHead>
                                                <TableHead>Hak Akses</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {roles.map((role, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="w-[50px] text-center">
                                                        <Checkbox checked={data.selectedRoles.includes(role.name)} onChange={selectedRole} key={i} value={role.name} id={`role-${i}`}/>
                                                    </TableCell>
                                                    <TableCell>{role.name}</TableCell>
                                                    <TableCell>
                                                        <div className='flex flex-wrap gap-2'>
                                                            {role.permissions.map((permission, x) => (
                                                                <Badge key={x}>{permission.name}</Badge>   
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCard>
                                <p className="text-red-500 text-xs">{errors.selectedRoles}</p>
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

Edit.layout = (page : React.ReactNode) => <AppLayout children={page}/>