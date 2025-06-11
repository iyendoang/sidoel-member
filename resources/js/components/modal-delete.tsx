import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useForm} from "@inertiajs/react";
import {Trash, X} from "lucide-react";

interface ModalDeleteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    url: string;
}

export function ModalDelete({open, onOpenChange, url}: ModalDeleteProps) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onKeyDown={handleKeyDown}>
                <DialogHeader>
                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    <DialogDescription>
                        Apakah anda yakin ingin menghapus data ini?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end items-center gap-2 mt-4">
                    <DialogClose asChild>
                        <Button variant="destructive">
                            <X className="mr-2 h-4 w-4" />
                            Batal
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="default" onClick={deleteData}>
                        <Trash className="mr-2 h-4 w-4" />
                        Hapus
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    );
}
