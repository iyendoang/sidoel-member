import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/layouts/auth-layout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {

    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
    });

    const handleLogin = (e : React.FormEvent)  => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                toast({
                    'variant': 'success',
                    'title': 'Selamat Datang',
                    'description': 'Anda berhasil login!',
                })
            }
        });
    };

    return (
        <>
            <Head title="Login"/>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                       silahkan masukan email / username dan password untuk memulai sesi anda.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="login">Username / Email</Label>
                        <Input
                            id="login"
                            type="text"
                            placeholder="Masukan email / username anda"
                            autoComplete="off"
                            value={data.login}
                            onChange={(e) => setData('login', e.target.value)}
                        />
                        {errors.login && (
                            <span className='text-xs text-rose-500'>{errors.login}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder='Masukan kata sandi anda'
                            autoComplete='off'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <span className='text-xs text-rose-500'>{errors.password}</span>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}

Login.layout = (page: React.ReactNode) => <AuthLayout children={page}/>
