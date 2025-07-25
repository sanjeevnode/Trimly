"use client"

import { Input } from '@/components/ui/input';
import { Link as LinkIcon, Eye, EyeOff, Loader2Icon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RegisterUserData } from '@/types/registerUserType';
import { registerUser } from '@/app/actions/userActions';
import { UserAuthType } from '@/types/user';


type Variant = "LOGIN" | "REGISTER";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("authenticated")
            router.push("/")
        }
    }, [session?.status, router])


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);


    const {
        register,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);
            if (variant === "REGISTER") {
                const userInfo: RegisterUserData = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    authType: UserAuthType.CREDENTIALS,
                };
                await registerUser(userInfo)
                router.push("/");
            } else {
                // Handle login
            }
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                            <LinkIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold gradient-text">
                        {
                            variant === "LOGIN" ? "Welcome back to Trimly" : "Welcome to Trimly"
                        }
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {
                            variant === "LOGIN" ?
                                "Log in to your account to continue"
                                :
                                "Create a new account to get started"
                        }
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {
                            variant === "REGISTER" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your name"
                                        disabled={isLoading}
                                        {...register("name", { required: true })}
                                    />
                                </div>
                            )
                        }
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <Input
                                {...register("email", { required: true })}
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                    {...register("password", { required: true, minLength: 6 })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div> */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center gap-2 w-full'>
                                    <Loader2Icon className="animate-spin" />
                                    <span>processing...</span>
                                </div>
                            ) :
                                variant === "LOGIN" ? "Login" : "Register"
                            }
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>


                        <button
                            onClick={() => {
                                signIn("google", {
                                    redirect: false,
                                })
                            }}
                            className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>

                    </div>

                    <div className="mt-6 text-center">
                        {
                            variant === "LOGIN" ? (
                                <p className="text-sm text-gray-600">
                                    Don&apos;t have an account?{" "}
                                    <button
                                        onClick={toggleVariant}
                                        className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                                    >
                                        Register
                                    </button>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <button
                                        onClick={toggleVariant}
                                        className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
