import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User } from "@/types";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { UserCheck, UserRoundX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShowProps extends PageProps {
    user: User;
}

export default function Show() {

    const { user } = usePage<ShowProps>().props;

    const { toast } = useToast();

    const {post, processing, reset} = useForm({
        _method: 'put'
    });

    const deactiveUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('apps.users.status', user.id), {
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
            <Head title="Detail Pengguna" />
            <div className="w-full">
                <Header title="Detail Pengguna" subtitle="Halaman ini digunakan untuk melihat detail data pengguna"/>
                <div className="p-6">
                    <Tabs defaultValue="information">
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="information">Informasi Pribadi</TabsTrigger>
                                <TabsTrigger value="access">Hak Akses Pengguna</TabsTrigger>
                            </TabsList>
                            <form onSubmit={deactiveUser}>
                                <Button variant={user.is_active ? 'destructive' : 'default'} type="submit" disabled={processing}>
                                   {user.is_active 
                                        ? <><UserRoundX/> Nonaktifkan Pengguna</>
                                        : <><UserCheck/> Aktifkan Pengguna</>
                                   } 
                                </Button>
                            </form>
                        </div>
                        <TabsContent value="information">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pribadi Pengguna</CardTitle>
                                    <CardDescription>
                                        Tabel ini digunakan untuk menampilkan informasi pribadi pengguna
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="px-6 w-10 font-bold dark:text-white">Nama</TableCell>
                                                <TableCell className="px-6">{user.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-6 font-bold dark:text-white">Username</TableCell>
                                                <TableCell className="px-6">{user.username}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-6 font-bold dark:text-white">Email</TableCell>
                                                <TableCell className="px-6">{user.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-6 font-bold dark:text-white">Status</TableCell>
                                                <TableCell className="px-6">
                                                    {user.is_active ? 
                                                        <Badge variant={'default'}>Aktif</Badge> 
                                                        : 
                                                        <Badge variant={'secondary'}>Nonaktif</Badge>
                                                    }  
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="access" className="w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hak Akses Pengguna</CardTitle>
                                    <CardDescription>
                                        Tabel ini digunakan untuk menampilkan informasi hak akses pengguna
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="px-6 font-bold dark:text-white">Nama Akses Group</TableHead>
                                                <TableHead className="px-6 font-bold dark:text-white">Hak Akses</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {user.roles.map((role, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="px-6">{role.name}</TableCell>
                                                    <TableCell className="px-6">
                                                        <div className="flex flex-wrap gap-2">
                                                            {role.name === 'super-admin' ?
                                                                <Badge variant='destructive'>Semua Hak Akses</Badge>
                                                                :
                                                                role.permissions.map((permission, index) => (
                                                                <Badge variant='destructive' key={index}>{permission.name}</Badge>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <AppLayout children={page} />;
