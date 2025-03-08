export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="logo.png" className="size-8 rounded-md fill-current object-cover shadow" />
            </div>
            <div className="text-primary grid flex-1 text-left text-xl">
                <span className="mb-0.5 truncate leading-none font-bold">Dashboard</span>
            </div>
        </>
    );
}
