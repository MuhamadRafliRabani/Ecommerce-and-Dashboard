import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Index() {
    const { auth } = usePage<SharedData>().props;
    const { updateAppearance } = useAppearance();

    useEffect(() => {
        updateAppearance('dark');
        if (!auth || auth?.user?.role === 'user') {
            toast.info("User can't log in to the dashboard");
        }
    }, [updateAppearance, auth]);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="grid-background flex h-screen min-h-screen w-full flex-col items-center overflow-hidden bg-black p-6 text-white lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mt-36 mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    method="post"
                                    href={route('logout')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] duration-150 hover:border-[#1915014a] hover:bg-red-500 dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                >
                                    Log out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex min-h-screen items-center justify-center px-3 lg:px-12">
                    <main className="flex w-full max-w-6xl flex-col items-center justify-center md:-mt-32 md:max-w-7xl lg:flex-row">
                        <div className="-mt-16 space-y-4 lg:w-1/2">
                            <Button variant="link" className="-mb-2 ps-0 text-white/80 underline">
                                <Link href={route('dashboard')}>Dashboard</Link>
                            </Button>
                            <h1 className="w-full text-5xl font-bold tracking-tight md:text-7xl">Welcome to My Website.</h1>
                            <p className="text-lg text-gray-300">A dashboard that provides detailed insights. 🚀</p>
                        </div>
                        <div className="mt-2 flex justify-center lg:mt-0 lg:w-1/3">
                            <img src="auth-icon.png" alt="Dashboard Preview" className="w-96 rounded-lg shadow-lg" />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
