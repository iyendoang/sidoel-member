import {Badge} from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {PageProps} from "@/types";
import {FeaturesData} from "@/types/landing";
import {usePage} from "@inertiajs/react";

const featureList: string[] = [
    "Dark/Light theme",
    "Reviews",
    "Features",
    "Pricing",
    "Contact form",
    "Our team",
    "Responsive design",
    "Newsletter",
    "Minimalist",
];

interface FeatureProps extends PageProps {
    data: {
        features: FeaturesData;
    };
}

export const Features = () => {
    const {
        data: {features},
    } = usePage<FeatureProps>().props;

    return (
        <section id="features" className="container py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                {features.title}{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{features.subtitle}</span>
            </h2>


            <div className="flex flex-wrap md:justify-center gap-4">
                {featureList.map((feature: string) => (
                    <div key={feature}>
                        <Badge variant="secondary" className="text-sm">
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.lists.map(({title, description, image}, index) => (
                    <Card key={`${title}-${index}`}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>

                        <CardContent>{description}</CardContent>

                        <CardFooter>
                            <img
                                src={image}
                                alt={`Feature ${title}`}
                                className="w-[200px] lg:w-[300px] mx-auto"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};
