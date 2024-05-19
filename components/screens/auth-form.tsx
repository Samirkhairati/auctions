'use client'

import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast";


type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {

            //TODO: convert to react-query
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false));

        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials');
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success('Logged in!');
                        router.push('/users');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials');
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (

        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link className="ml-auto inline-block text-sm underline" href="#">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" required type="password" />
                        </div>
                        <Button className="w-full" type="submit">
                            Login
                        </Button>
                        <Button className="w-full" variant="outline">
                            Login with Google
                        </Button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don &apos t have an account?
                    <Link className="underline" href="#">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}