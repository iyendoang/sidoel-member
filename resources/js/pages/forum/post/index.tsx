import React, {useState} from 'react';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {Header} from '@/components/header';
import {Button} from '@/components/ui/button';
import {
    Edit2,
    Edit2Icon,
    Edit3Icon,
    EditIcon, LucideEdit3,
    SendIcon,
    StarIcon,
    ThumbsDownIcon,
    ThumbsUpIcon, Trash2Icon,
    UserRoundCheck
} from 'lucide-react';
import AddEditPostDialog from '@/pages/forum/form/add-edit-post';
import {PageProps} from '@/types';
import {Post, Topic} from "@/types/forum";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {
    HeartIcon,
    MessageCircleIcon,
    MoreHorizontalIcon,
    ShareIcon,
} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {formatTanggalIndo} from "@/utils/date";
import {TruncatedTextWithLink} from "@/components/custom/truncated-text-with-link";
import {truncateWords} from "@/utils/text";
import {badgeVariants} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {ModalDelete} from "@/components/modal-delete";
import {TokenApp} from "@/types/token-apps";
import {ModalAlertDelete} from "@/components/modal-alert-delete";

interface IndexProps extends PageProps {
    posts: {
        data: Post[];
        links: any;
        meta: any;
    };
    selectedTopic: Topic | null;
    topics: Topic[];
    query: string;
}

interface LikeButtonProps {
    post: Post
}

export default function Index() {
    const {posts, selectedTopic, topics, query} = usePage<IndexProps>().props;

    const [keyword, setKeyword] = useState(query || '');
    const [modalData, setModalData] = useState<{
        open: boolean;
        post: Post | null;
        isUpdate: boolean;
    }>({
        open: false,
        post: null,
        isUpdate: false,
    });

    const handleAdd = () => {
        setModalData({open: true, post: null, isUpdate: false});
    };

    const handleEdit = (post: Post) => {
        setModalData({open: true, post, isUpdate: true});
    };
    const handleLike = (post: Post) => {
        router.post(route('forum.likes.store', ['post', post.id]), {}, {
            preserveScroll: true
        })
    }

    const handleDislike = (post: Post) => {
        router.delete(route('forum.likes.destroy', ['post', post.id]), {
            preserveScroll: true
        })
    }
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

    const handleModalDelete = (post: Post) => {
        setSelectedPost(post);
        setDeleteModal(true);
    };

    return (
        <>
            <Head title="Forum Aplikasi"/>

            <Header
                title="Forum Aplikasi"
                subtitle="Halaman ini digunakan untuk sharing terkait aplikasi."
            >
                <Button onClick={handleAdd} variant="secondary">
                    Tambah Post
                </Button>
            </Header>

            <Card className="m-4">
                <CardContent>
                    <CardHeader className="flex justify-center px-4 py-2">
                        <NavigationMenu>
                            <NavigationMenuList className="flex flex-wrap justify-center gap-2">
                                {/* Tombol "Semua" */}
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            route().current('forum.posts.index') && !route().params?.topic &&
                                            "bg-primary text-white dark:bg-primary hover:bg-secondary"
                                        )}
                                    >
                                        <Link
                                            href={route('forum.posts.index')}
                                            className="flex items-center px-4 py-2 rounded-md transition-colors"
                                        >
                                            <UserRoundCheck className="h-4 w-4 mr-2"/>
                                            <span className="text-sm">Semua</span>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* Daftar topik */}
                                {topics.map((topic) => {
                                    const isActive =
                                        route().current('forum.posts.index') && route().params?.topic === topic.slug;

                                    return (
                                        <NavigationMenuItem key={topic.slug}>
                                            <NavigationMenuLink
                                                asChild
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    isActive &&
                                                    "bg-primary text-white dark:bg-primary hover:bg-secondary"
                                                )}
                                            >
                                                <Link
                                                    href={route('forum.posts.index', topic.slug)}
                                                    className="flex items-center px-4 py-2 rounded-md transition-colors"
                                                >
                                                    <UserRoundCheck className="h-4 w-4 mr-2"/>
                                                    <span className="text-sm">{topic.name}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </CardHeader>

                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {posts.data.map((post) => (
                                <Card
                                    key={post.id}
                                    className="w-full max-w-full shadow-md hover:shadow-lg transition-shadow border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl min-h-[220px] flex flex-col justify-between"
                                >
                                    <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={post.user.avatar ?? undefined} alt={post.user.name}/>
                                                <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <h6 className="text-sm font-medium">{post.user.name}</h6>
                                                <span
                                                    className="text-xs text-muted-foreground">@{post.user.username ?? "unknown"}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex divide-x overflow-hidden rounded-md shadow-sm">
                                                {post.can.update && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="rounded-none focus:outline-none focus:ring-0"
                                                        onClick={() => handleEdit(post)}
                                                    >
                                                        <LucideEdit3 className="w-4 h-4"/>
                                                    </Button>
                                                )}

                                                {post.can.delete && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="rounded-none focus:outline-none focus:ring-0 text-red-500 hover:bg-red-50"
                                                        onClick={() => handleModalDelete(post)}
                                                    >
                                                        <Trash2Icon className="w-4 h-4"/>
                                                    </Button>
                                                )}

                                                <Link href={post.route.show}>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="rounded-none focus:outline-none focus:ring-0"
                                                    >
                                                        <SendIcon className="w-4 h-4"/>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                    </CardHeader>

                                    <CardContent className="flex-1 p-4 pt-0">
                                        <p className="mt-1 mb-2">
                                            <strong className="text-sm text-muted-foreground">
                                                {truncateWords(post.title, 5)}
                                            </strong>
                                        </p>

                                        <TruncatedTextWithLink
                                            text={post.html}
                                            className="text-sm text-zinc-700 dark:text-zinc-200"
                                            wordLimit={25}
                                            linkHref={post.route.show}
                                        />
                                    </CardContent>

                                    <div className="px-4 pb-3 flex items-center justify-between mt-auto">
                                        {/* Kiri: Tanggal */}
                                        <p className="text-xs text-muted-foreground">
                                            {formatTanggalIndo(post.created_at)}
                                        </p>

                                        {/* Kanan: Tombol Like & Edit */}
                                        <div className="flex items-center gap-2 ml-auto">
                                            <Button
                                                className="rounded-full"
                                                size="sm"
                                                variant={post.has_liked ? "default" : "ghost"}
                                                onClick={() =>
                                                    post.has_liked ? handleDislike(post) : handleLike(post)
                                                }
                                            >
                                                {post.has_liked ? (
                                                    <ThumbsUpIcon className="mr-1 w-4 h-4"/>
                                                ) : (
                                                    <ThumbsDownIcon className="mr-1 w-4 h-4"/>
                                                )}
                                                {post.likes_count}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* Modal Tambah/Edit Post */}
            <AddEditPostDialog
                open={modalData.open}
                post={modalData.post}
                isUpdate={modalData.isUpdate}
                onClose={() => setModalData({...modalData, open: false})}
                topics={topics}
            />
            {selectedPost && (
                <ModalAlertDelete
                    open={deleteModal}
                    onOpenChange={setDeleteModal}
                    url={route('forum.posts.destroy', selectedPost.id)}
                />
            )}
        </>
    )
        ;
}

// Bungkus dengan layout utama
Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
