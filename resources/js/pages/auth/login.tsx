import {useToast} from '@/hooks/use-toast';
import AuthLayout from '@/layouts/auth-layout';
import {Head, useForm} from '@inertiajs/react';
import React from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import TextLink from "@/components/ui/text-link";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {ShineBorder} from "@/components/magicui/shine-border";

export default function Login() {
    const {toast} = useToast();

    const {data, setData, post, processing, errors} = useForm({
        login: '',
        password: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Selamat Datang',
                    description: 'Anda berhasil login!',
                });
            }
        });
    };

    return (
        <>
            <Head title="Login"/>
            <Card className="relative overflow-hidden max-w-full w-full bg-slate-50 dark:bg-slate-950">
                <ShineBorder duration={6} borderWidth={2} shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                        Masuk ke Akun Anda
                    </CardTitle>
                    <CardDescription>
                        Masukkan email/username dan kata sandi untuk memulai sesi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="login">Email / Username</Label>
                            <Input
                                id="login"
                                type="text"
                                placeholder="contoh: admin atau admin@email.com"
                                autoComplete="off"
                                value={data.login}
                                onChange={(e) => setData('login', e.target.value)}
                            />
                            {errors.login && (
                                <p className="text-xs text-rose-500 mt-1">{errors.login}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Kata Sandi</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                autoComplete="off"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-xs text-rose-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <TextLink href="/forgot-password" className="text-muted-foreground">
                                Lupa password?
                            </TextLink>
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={processing}>
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Belum punya akun?{' '}
                        <TextLink href="/register">
                            Daftar sekarang
                        </TextLink>
                    </div>

                    <div className="mt-4 text-center">
                        <TextLink href="/" className="text-xs">
                            ← Kembali ke Beranda
                        </TextLink>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

Login.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
