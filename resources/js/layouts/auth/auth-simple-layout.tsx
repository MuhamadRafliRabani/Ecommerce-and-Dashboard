interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimplleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <p className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-fit w-fit items-center justify-center rounded-md">
                                <img
                                    src="logo.png"
                                    className="bg size-14 rounded-md fill-current object-cover text-[var(--foreground)] md:h-16 md:w-24 dark:text-white"
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </p>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
