import AppLayout from '@/layouts/app-layout'
import React from 'react'
import { Header } from '@/components/header'
import { TableFilter, TableCard, Table, TableHead, TableHeader, TableRow, TableBody, TableCell, TableEmpty } from '@/components/ui/table'
import { PageProps, User, UserLink } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ModalDelete } from '@/components/modal-delete'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react'
import hasAnyPermission from '@/utils/has-permissions'
import { ActionButton } from '@/components/action-button'
import PagePagination from '@/components/page-pagination'

interface IndexProps extends PageProps {
    users : {
        data: User[],
        links: UserLink[],
        current_page: number,
        per_page: number,
    }
    perPage: number,
    currentPage: number
}

export default function Index() {

    const { users, currentPage, perPage } = usePage<IndexProps>().props;

    const [deleteModal, setDeleteModal] = React.useState(false);

    const { data, setData } = useForm({
        id: '',
    })

    const handleModalDelete = (user: User) => {
        setDeleteModal(true);
        setData(prevData => ({
            ...prevData,
            id: user.id,
        }))
    }

    return (
        <>
            <Head title='Pengguna'/>
            <Header title='Pengguna' subtitle='Halaman ini digunakan untuk mengelola data pengguna'>
               {hasAnyPermission(['users-create']) &&
                    <Button asChild variant='outline'>
                        <Link href={route('apps.users.create')}>
                            <PlusCircle className="size-4"/> <span className="hidden sm:inline-flex">Tambah Pengguna</span>
                        </Link>
                    </Button>
                }
            </Header>
            <div className='p-6'>
                <div className="mb-5">
                    <TableFilter 
                        withFilterPage={true} 
                        currentPage={currentPage}
                        perPage={perPage}
                        url={route('apps.users.index')} 
                        placeholder="Cari data pengguna berdasarkan nama, email, atau username"
                    />
                </div>
                <TableCard>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px] text-center'>No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Akses Group</TableHead>
                                <TableHead className='w-[10px] text-center'>Status</TableHead>
                                <TableHead className='w-[10px] text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length === 0 ? (
                                <TableEmpty colSpan={4} message='data akses group'/>
                            ) : (
                                users.data.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {++index + (users.current_page - 1) * users.per_page}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className='flex flex-wrap gap-2'>
                                                {user.roles.slice(0, 3).map((role, i) => (
                                                    <Badge variant="destructive" key={i}>
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                                {user.roles.length > 4 && (
                                                    <Badge variant="destructive">
                                                        + {user.roles.length - 4} lainnya
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-center'>
                                           {user.is_active ? 
                                                <Badge variant={'default'}>Aktif</Badge> 
                                                : 
                                                <Badge variant={'secondary'}>Nonaktif</Badge>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center justify-center'>
                                                {(hasAnyPermission(['users-update']) || hasAnyPermission(['users-delete']) || hasAnyPermission(['users-show'])) &&
                                                    <ActionButton
                                                        permissionPrefix='users'
                                                        withDetail={true}
                                                        actionDetailHref={route('apps.users.show', user.id)}
                                                        actionEditHref={route('apps.users.edit', user.id)}
                                                        actionDelete={() => handleModalDelete(user)}
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
                <ModalDelete open={deleteModal} onOpenChange={setDeleteModal} url={route('apps.users.destroy', data.id)}/>
                <PagePagination data={users}/>
            </div>
        </>
    )
}

Index.layout = (page : React.ReactNode) => <AppLayout children={page}/>
