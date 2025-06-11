import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import PostEditor from "@/components/post-editor";
import React, {useEffect} from "react";
import {useForm} from "@inertiajs/react";
import {Comment, Post, Topic} from "@/types/forum";

export default function AddEditCommentDialog({
                                                 open,
                                                 onClose,
                                                 comment,
                                                 isUpdate,
                                                 post, // DITERIMA sebagai prop agar bisa mengakses post.id
                                             }: {
    open: boolean;
    onClose: () => void;
    comment: Comment | null;
    isUpdate: boolean;
    post: Post;
}) {
    const {data, setData, post: submit, put, processing, errors, reset} = useForm({
        body: comment?.body ?? '',
    });

    // Sinkronisasi data ketika modal terbuka
    useEffect(() => {
        if (open) {
            if (isUpdate && comment) {
                setData({
                    body: comment.body,
                });
            } else {
                reset();
            }
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isUpdate && comment) {
            put(route('forum.comments.update', {comment: comment.id}), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            submit(route('forum.posts.comments.store', post.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isUpdate ? 'Edit Komentar' : 'Tambah Komentar'}</DialogTitle>
                    <DialogDescription>
                        {isUpdate
                            ? 'Ubah isi komentar yang sudah ada.'
                            : 'Tambahkan komentar baru ke dalam post.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Isi Komentar</Label>
                        <PostEditor model={data.body} onChange={(value) => setData("body", value)} />
                        {errors.body && (
                            <p className="text-red-500 text-xs">{errors.body}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {isUpdate ? "Update" : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
