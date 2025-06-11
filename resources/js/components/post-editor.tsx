import React, {useEffect} from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

interface PostEditorProps {
    model: string;
    onChange: (value: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({model, onChange}) => {
    // Sync external changes
    useEffect(() => {
        if (model) {
            onChange(model); // optional, to initialize
        }
    }, [model]);

    return (
        <div className="border rounded overflow-hidden">
            <MdEditor
                value={model}
                style={{ height: "400px" }}
                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                onChange={({ text }) => onChange(text)}
                view={{ menu: true, md: true, html: false }} // ⬅️ Hanya editor, tanpa preview
            />
        </div>
    );
};

export default PostEditor;
