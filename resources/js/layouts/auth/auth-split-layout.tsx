import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col justify-between p-10 text-white lg:flex dark:border-r">
                <div className="grid-background absolute inset-0 bg-black" />
                <Link href={route('dashboard')} className="relative z-20 flex items-center gap-2 text-lg font-medium">
                    <img src="logo.png" className="bg size-8 rounded-md fill-current object-cover text-[var(--foreground)] dark:text-white" />
                    Dashboard
                </Link>
                <div className="transform-flat">
                    <img
                        src="auth-icon.png"
                        className="-translate-z- absolute top-1/2 left-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
                    />
                </div>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('dashboard')} className="relative z-20 flex items-center justify-center lg:hidden"></Link>
                    <div className="flex flex-col items-start gap-2 text-center sm:items-center">
                        <img
                            src="logo.png"
                            className="bg mx-auto size-14 rounded-md fill-current object-cover text-[var(--foreground)] md:size-14 dark:text-white"
                        />
                        <h1 className="mx-auto text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-pretty">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
