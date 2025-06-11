import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from "lucide-react";
import clsx from "classnames";

interface PostEditorProps {
    model: string;
    onChange: (content: string) => void;
}

export default function PostEditor({ model, onChange }: PostEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link],
        content: model,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && model !== editor.getHTML()) {
            editor.commands.setContent(model || "");
        }
    }, [model, editor]);

    const ToolbarButton = ({
                               isActive,
                               onClick,
                               icon: Icon,
                               label,
                           }: {
        isActive: boolean;
        onClick: () => void;
        icon: React.ElementType;
        label: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                isActive ? "bg-gray-300 dark:bg-gray-600" : ""
            )}
            title={label}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className="border rounded-md bg-white dark:bg-gray-900 dark:text-white">
            {editor && (
                <div className="flex gap-1 border-b p-2 bg-gray-50 dark:bg-gray-800">
                    <ToolbarButton
                        icon={Bold}
                        label="Bold"
                        isActive={editor.isActive("bold")}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    />
                    <ToolbarButton
                        icon={Italic}
                        label="Italic"
                        isActive={editor.isActive("italic")}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    />
                    <ToolbarButton
                        icon={UnderlineIcon}
                        label="Underline"
                        isActive={editor.isActive("underline")}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    />
                    <ToolbarButton
                        icon={List}
                        label="Bullet List"
                        isActive={editor.isActive("bulletList")}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />
                    <ToolbarButton
                        icon={ListOrdered}
                        label="Numbered List"
                        isActive={editor.isActive("orderedList")}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    />
                </div>
            )}
            <div className="p-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
