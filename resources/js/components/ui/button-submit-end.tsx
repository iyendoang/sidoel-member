import * as React from "react";
import { Button } from "@/components/ui/button";
import { X, Save, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonSubmitEndProps {
    reset: () => void;
    processing: boolean;
}

const ButtonSubmitEnd = React.forwardRef<HTMLDivElement, ButtonSubmitEndProps>(
    ({ reset, processing }, ref) => {
        return (
            <div ref={ref} className={cn("flex justify-end gap-2 pt-4")}>
                <Button
                    variant="destructive"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        reset();
                    }}
                    className="transition-colors duration-200 ease-in-out hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                >
                    <X className="mr-2" /> Batal
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                    className="transition-colors duration-200 ease-in-out hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? (
                        <LoaderCircle className="animate-spin mr-2" />
                    ) : (
                        <Save className="mr-2" />
                    )}
                    Simpan
                </Button>
            </div>
        );
    }
);

ButtonSubmitEnd.displayName = "ButtonSubmitEnd";

export default ButtonSubmitEnd;
