// components/AddEditPostDialog.tsx
import {
    Dialog,
    DialogTrigger,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import React, {useEffect} from "react";
import {useForm} from "@inertiajs/react";
import {Post, Topic} from "@/types/forum";
import PostEditor from "@/components/post-editor";

export default function AddEditPostDialog({
                                              open,
                                              onClose,
                                              post,
                                              isUpdate,
                                              topics,
                                          }: {
    open: boolean;
    onClose: () => void;
    post: Post | null;
    isUpdate: boolean;
    topics: Topic[];
}) {
    const {data, setData, post: submitPost, processing, errors, reset, transform} = useForm({
        id: '',
        title: '',
        topic_id: '',
        body: '',
    });

    transform((data) => ({
        ...data,
        _method: isUpdate ? 'put' : 'post',
    }));

    // Sync state setiap kali modal terbuka
    useEffect(() => {
        if (open) {
            if (isUpdate && post) {
                setData({
                    id: post.id.toString(),
                    title: post.title,
                    topic_id: post.topic.id.toString(),
                    body: post.body,
                });
            } else {
                reset(); // bersihkan form untuk tambah
            }
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isUpdate ? route('forum.posts.update', data.id) : route('forum.posts.store');
        submitPost(routeName, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isUpdate ? 'Edit Post' : 'Tambah Post'}</DialogTitle>
                    <DialogDescription>
                        {isUpdate
                            ? 'Ubah data post yang sudah ada.'
                            : 'Masukkan data post baru ke dalam forum.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Topik */}
                    <div>
                        <Label htmlFor="topic_id">Topik</Label>
                        <Select
                            value={data.topic_id || ''}
                            onValueChange={(value) => setData("topic_id", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="-- Pilih Topik --"/>
                            </SelectTrigger>
                            <SelectContent>
                                {topics.map((topic) => (
                                    <SelectItem key={topic.id} value={topic.id.toString()}>
                                        {topic.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-red-500 text-xs">{errors.topic_id}</p>
                    </div>

                    {/* Judul */}
                    <div>
                        <Label>Judul</Label>
                        <Input value={data.title} onChange={(e) => setData('title', e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.title}</p>
                    </div>

                    {/* Isi Post */}
                    <div>
                        <Label>Isi Post</Label>
                        <PostEditor model={data.body} onChange={(value) => setData("body", value)}/>
                        <p className="text-red-500 text-xs">{errors.body}</p>
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
