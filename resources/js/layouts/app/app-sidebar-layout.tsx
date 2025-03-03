import { AppContent } from '@/components/dashboard/app-content';
import { AppShell } from '@/components/dashboard/app-shell';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { AppSidebarHeader } from '@/components/dashboard/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent className="overflow-hidden" variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
