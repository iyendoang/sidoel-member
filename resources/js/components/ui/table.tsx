import * as React from "react";
import { useCallback } from "react";
import { useForm, router } from "@inertiajs/react";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { cn } from "@/lib/utils";

const TableCard = ({ children, className } : { children: React.ReactNode, className?: string }) => {
    return(
        <div className={cn("w-full bg-white dark:border-gray-900 border rounded-md overflow-x-auto scrollbar-hide dark:bg-gray-950", className)}>
            {children}
        </div>
    )
}

TableCard.displayName = "TableCard";

interface TableFilterProps {
    url: string,
    placeholder: string,
    withFilterPage?: boolean,
    currentPage?: number,
    perPage?: number,
}

const TableFilter = ({ url, placeholder, withFilterPage = false, currentPage, perPage} : TableFilterProps) => {
    const { data, setData } = useForm({
        search: '',
        page: currentPage,
        perPage: perPage,
    });

    const handlePage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = parseInt(e.target.value);
        setData('page', newPage);

        const params = {
            page: newPage,
            per_page: data.perPage,
            search: data.search,
        };

        router.get(url, params, {preserveState: true, replace: true});
    }, [data.perPage]);

    const handlePerPage = useCallback((value: string) => {
        const newPerPage = parseInt(value);
        setData('perPage', newPerPage);

        const params : {
            per_page: number,
            page: number,
            search?: string,
        } = {
            per_page: newPerPage,
            page: 1,
            search: data.search,
        };

        router.get(url, params, {
            replace: true,
            preserveState: true,
        });
    }, [data.perPage, data.search]);

    const handleFilterSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setData('search', value)

        const params : {
            per_page?: number,
            page?: number,
            search?: string,
        } = {
            per_page: data.perPage,
            page: data.page,
            search: value,
        }

        router.get(url, params, {preserveState: true, replace: true})

    }, [data.perPage]);

    return(
        <>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                    {withFilterPage &&
                        <Select onValueChange={handlePerPage}>
                            <SelectTrigger className="w-[70px] focus:ring-0">
                                <SelectValue placeholder={perPage}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                    <Input className="w-full" type="text" value={data.search} onChange={handleFilterSearch} name="search" placeholder={placeholder}/>
                </div>
            </div>
        </>
    )
}


TableFilter.displayName = "TableFilter";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, icon, title, subtitle, ...props }, ref) => (
    <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
    />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b bg-white dark:border-gray-900 dark:bg-gray-950", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted divide-x",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "p-3 whitespace-nowrap text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-gray-700 dark:text-gray-400",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-2 text-gray-700 dark:text-gray-400 whitespace-nowrap align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";

const TableEmpty = ({colSpan, message} : {colSpan: number, message: string}) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} align="center">{message} tidak ditemukan.</TableCell>
        </TableRow>
    )
}
TableEmpty.displayName = "TableEmpty";

export {
    TableCard,
    TableFilter,
    TableEmpty,
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
