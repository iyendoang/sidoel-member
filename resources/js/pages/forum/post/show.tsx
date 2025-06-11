import React, {useState} from "react";
import {Head, Link, router, usePage} from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {Header} from "@/components/header";
import {
    ArrowLeftCircle,
    LucideEdit3,
    Pencil,
    SendIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    Trash2Icon,
    UserRoundCheck
} from "lucide-react";
import AddEditPostDialog from "@/pages/forum/form/add-edit-post";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import AddEditCommentDialog from "@/pages/forum/form/add-edit-comment";
import {ModalAlertDelete} from "@/components/modal-alert-delete";
import {PaginatedComments, Post, Topic, Comment} from "@/types/forum";
import {PageProps} from "@/types";
import {formatTanggalIndo, waktuRelatif} from "@/utils/date";
import {truncateWords} from "@/utils/text";


interface ShowProps extends PageProps {
    post: Post;
    comments: PaginatedComments;
    topics: Topic[];
}

export default function Show() {
    const {post, comments, topics} = usePage<ShowProps>().props;
    const [modalData, setModalData] = useState({
        open: false,
        post: post,
        isUpdate: false,
    });

    const handleEdit = (post: Post) => {
        setModalData({open: true, post, isUpdate: true});
    };

    // comment
    const [showDialog, setShowDialog] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

    const handleAddComment = () => {
        setSelectedComment(null);
        setShowDialog(true);
    };

    const handleEditComment = (comment: Comment) => {
        setSelectedComment(comment);
        setShowDialog(true);
    };

    const handleCommentLike = (comment: Comment) => {
        router.post(route('forum.likes.store', ['comment', comment.id]), {}, {
            preserveScroll: true
        })
    }

    const handleCommentDislike = (comment: Comment) => {
        router.delete(route('forum.likes.destroy', ['comment', comment.id]), {
            preserveScroll: true
        })
    }
    const handlePostLike = (post: Post) => {
        router.post(route('forum.likes.store', ['post', post.id]), {}, {
            preserveScroll: true
        })
    }

    const handlePostDislike = (post: Post) => {
        router.delete(route('forum.likes.destroy', ['post', post.id]), {
            preserveScroll: true
        })
    }
    const [deleteCommentModal, setDeleteCommentModal] = React.useState(false);

    const handleModalCommentDelete = (comment: Comment) => {
        setSelectedComment(comment);
        setDeleteCommentModal(true);
    };

    return (
        <>
            <Head title={post.title}/>

            <Header
                title={post.title}
                subtitle={`Topik: ${post.topic.name} — Oleh ${post.user.name}`}
            >
                {post.can.update && (
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(post)}>
                        <Pencil className="w-4 h-4 mr-1"/>
                        Edit Post
                    </Button>
                )}
            </Header>

            <div className="p-4 max-w-3xl mx-auto">
                <Card className="shadow-xl border border-muted rounded-2xl">
                    <CardHeader>
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                            {/* Tombol Kembali */}
                            <div>
                                <Button asChild variant="outline" size="icon">
                                    <Link href={route("forum.posts.index", { topic: post.topic.slug })} className="flex items-center gap-1">
                                        <ArrowLeftCircle className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Informasi Post */}
                            <div className="flex flex-col items-end text-right space-y-1 max-w-[calc(100%-3rem)] md:max-w-[75%]">
                                <CardTitle className="text-2xl font-semibold truncate" title={post.title}>
                                    {truncateWords(post.title, 8)}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <Badge variant="secondary">Topik: {post.topic.name}</Badge>
                                        <Badge variant="outline">Oleh: {post.user.name}</Badge>
                                    </div>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>


                    <Separator/>

                    <CardContent>
                        <div
                            className="prose max-w-none prose-slate dark:prose-invert mt-4"
                            dangerouslySetInnerHTML={{__html: post.html}}
                        />
                        <div className="flex flex-wrap gap-3 justify-between mt-4">
                            <p className="text-xs text-muted-foreground italic">
                                Dibuat pada: {formatTanggalIndo(post.created_at)}
                            </p>
                            <Button
                                className={`rounded-full h-7 px-2 text-xs ${post.has_liked ? "text-primary" : "text-muted-foreground"}`}
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                    post.has_liked ? handlePostDislike(post) : handlePostLike(post)
                                }
                            >
                                {post.has_liked ? (
                                    <ThumbsUpIcon className="mr-1 w-3 h-3"/>
                                ) : (
                                    <ThumbsDownIcon className="mr-1 w-3 h-3"/>
                                )}
                                {post.likes_count}
                            </Button>
                        </div>

                        <Separator className="my-6"/>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">Komentar:</h3>
                                <Button size="sm" onClick={handleAddComment}>
                                    Tambah Komentar
                                </Button>
                            </div>

                            <ScrollArea className="max-h-[28rem] overflow-y-auto pr-2 border border-dashed">
                                <ul className="space-y-3">
                                    {comments.data.length > 0 ? (
                                        comments.data.map((comment) => (
                                            <li
                                                key={comment.id}
                                                className={`relative bg-muted border border-border p-4 rounded-2xl shadow-sm transition hover:shadow-md`}
                                            >
                                                {/* Like - Top Right */}
                                                <div className="absolute top-2 right-2">
                                                    <Button
                                                        className="rounded-full h-7 px-3 text-xs"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            comment.has_liked
                                                                ? handleCommentDislike(comment)
                                                                : handleCommentLike(comment)
                                                        }
                                                    >
                                                        {comment.has_liked ? (
                                                            <ThumbsUpIcon className="mr-1 w-3 h-3 text-primary"/>
                                                        ) : (
                                                            <ThumbsDownIcon
                                                                className="mr-1 w-3 h-3 text-muted-foreground"/>
                                                        )}
                                                        {comment.likes_count}
                                                    </Button>
                                                </div>

                                                {/* Content */}
                                                <div className="pr-24">
                                                    <div className="font-semibold text-sm">
                                                        {comment.user?.name}
                                                    </div>
                                                    <div
                                                        className="text-sm mt-1 prose dark:prose-invert max-w-none"
                                                        dangerouslySetInnerHTML={{__html: comment.html}}
                                                    />
                                                    <div className="text-xs text-muted-foreground mt-2 italic">
                                                        {waktuRelatif(comment.created_at)}
                                                    </div>
                                                </div>

                                                {/* Edit/Delete - Bottom Right */}
                                                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                                    {comment.can.update && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="w-6 h-6"
                                                            onClick={() => handleEditComment(comment)}
                                                        >
                                                            <LucideEdit3 className="w-4 h-4"/>
                                                        </Button>
                                                    )}
                                                    {comment.can.delete && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="w-6 h-6 text-destructive hover:bg-red-100 dark:hover:bg-red-900"
                                                            onClick={() => handleModalCommentDelete(comment)}
                                                        >
                                                            <Trash2Icon className="w-4 h-4"/>
                                                        </Button>
                                                    )}
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-sm">Belum ada komentar.</p>
                                    )}
                                </ul>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 flex justify-center">
                    <Button asChild variant="link" className="text-sm">
                        <Link
                            href={route("forum.posts.index", {topic: post.topic.slug})}
                            className="inline-flex items-center gap-1"
                        >
                            <UserRoundCheck className="w-4 h-4"/>
                            Kembali ke Topik: {post.topic.name}
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Dialogs */}
            <AddEditPostDialog
                open={modalData.open}
                post={modalData.post}
                isUpdate={modalData.isUpdate}
                onClose={() => setModalData({...modalData, open: false})}
                topics={topics}
            />
            <AddEditCommentDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                comment={selectedComment}
                isUpdate={!!selectedComment}
                post={post}
            />
            {selectedComment && (
                <ModalAlertDelete
                    open={deleteCommentModal}
                    onOpenChange={setDeleteCommentModal}
                    url={route("forum.comments.destroy", selectedComment.id)}
                />
            )}
        </>
    );
}

Show.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;