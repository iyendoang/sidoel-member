import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {HowItWorksItem} from "@/types/landing";
import DynamicIconComponent from "@/components/custom/dynamic-icon";
import {CustomIcons} from "@/components/custom/icon";

interface HowItWorksProps extends PageProps {
    data: {
        how_it_works: HowItWorksItem[];
    };
}

export const HowItWorks = () => {
    const {data: {how_it_works},} = usePage<HowItWorksProps>().props;

    return (
        <section id="howItWorks" className="container text-center py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                How It{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
                Step-by-Step Guide
            </h2>
            {/*<p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">*/}
            {/*    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor*/}
            {/*    pariatur sit!*/}
            {/*</p>*/}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {how_it_works.map(({icon, title, description}) => (
                    <Card key={title} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid gap-4 place-items-center">
                                <DynamicIconComponent dynamicIconName={icon as keyof typeof CustomIcons}
                                                      className="w-10 h-10 text-primary"/>
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
