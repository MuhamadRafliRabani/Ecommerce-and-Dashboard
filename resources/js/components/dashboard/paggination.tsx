import { PaginationLinkProsp } from '@/types';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';

interface PaginationProps {
    links: PaginationLinkProsp[];
}

const Pagginations = ({ links }: PaginationProps) => {
    if (!links || links.length === 0) return null;

    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            className={`my-2 w-fit p-4 ${link.active ? 'border' : ''}`}
                            href={link.url ?? '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
};

export default Pagginations;
