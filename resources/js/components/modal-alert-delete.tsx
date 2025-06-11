import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button, buttonVariants} from "@/components/ui/button";
import {OctagonAlert, Trash} from "lucide-react";
import {useForm} from "@inertiajs/react";

interface ModalAlertDeleteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    url: string;
}

export function ModalAlertDelete({open, onOpenChange, url}: ModalAlertDeleteProps) {
    const {delete: destroy} = useForm();

    const deleteData = () => {
        destroy(url, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            deleteData();
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {/* Kita gak pakai AlertDialogTrigger karena ini controlled dari luar */}

            <AlertDialogContent onKeyDown={handleKeyDown}>
                <AlertDialogHeader className="items-center text-center">
                    <AlertDialogTitle>
                        <div
                            className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <OctagonAlert className="h-7 w-7 text-destructive"/>
                        </div>
                        Konfirmasi Hapus
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[15px]">
                        Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat
                        dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4 sm:justify-center gap-2">
                    <AlertDialogCancel asChild>
                        <Button variant="outline" className="flex items-center gap-1">
                            Batal
                        </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction
                        asChild
                        className={buttonVariants({variant: "destructive"})}
                        onClick={deleteData}
                    >
                        <Button className="flex items-center gap-1">
                            <Trash className="h-4 w-4"/>
                            Hapus
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
