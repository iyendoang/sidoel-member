import * as React from "react";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";

interface InputSwitchProps extends React.ComponentPropsWithoutRef<typeof Switch> {
    label?: string;
    error?: string;
}

const InputSwitch = React.forwardRef<
    React.ElementRef<typeof Switch>,
    InputSwitchProps
>(({ className, label, error, checked, onCheckedChange, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center space-x-3">
                {label && (
                    <label
                        htmlFor={props.id}
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                    >
                        {label}
                    </label>
                )}
                <Switch
                    id={props.id}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    ref={ref}
                    className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-muted-foreground bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        "hover:border-primary hover:bg-primary/20", // efek hover
                        checked && "bg-primary border-primary",
                        className
                    )}
                    {...props}
                >
          <span
              className={cn(
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow ring-0",
                  "transform will-change-transform transition-transform duration-300 ease-in-out", // animasi smooth
                  checked ? "translate-x-5" : "translate-x-0"
              )}
          />
                </Switch>
            </div>
            {error && <p className="text-red-500 text-xs mt-1 ml-[3.25rem]">{error}</p>}
        </div>
    );
});
InputSwitch.displayName = "InputSwitch";

export default InputSwitch;
