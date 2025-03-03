import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="text-primary ml-1 grid flex-1 text-left text-xl">
                <span className="mb-0.5 truncate leading-none font-bold">Dashboard</span>
            </div>
        </>
    );
}
