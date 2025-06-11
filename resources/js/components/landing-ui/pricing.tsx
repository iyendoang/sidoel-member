import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Check} from "lucide-react";
import {HowItWorksItem, PopularPlanType, PricingProps} from "@/types/landing";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

interface PricingsProps extends PageProps {
    data: {
        pricing: PricingProps[];
    };
}

export const Pricing = () => {
    const {data: {pricing},} = usePage<PricingsProps>().props;

    return (
        <section
            id="pricing"
            className="container py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Get {" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Access
                </span>
            </h2>
            <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
               Ayo segera daftarkan sekolah anda kepada kami.
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricing.map((pricing: PricingProps) => (
                    <Card
                        key={pricing.title}
                        className={
                            pricing.popular === PopularPlanType.YES
                                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                                : ""
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex item-center justify-between">
                                {pricing.title}
                                {pricing.popular === PopularPlanType.YES ? (
                                    <Badge
                                        variant="secondary"
                                        className="text-sm text-primary"
                                    >
                                        Most popular
                                    </Badge>
                                ) : null}
                            </CardTitle>
                            <div>
                                <span className="text-3xl font-bold">${pricing.price}</span>
                                <span className="text-muted-foreground"> /month</span>
                            </div>

                            <CardDescription>{pricing.description}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Button className="w-full">{pricing.buttonText}</Button>
                        </CardContent>

                        <hr className="w-4/5 m-auto mb-4"/>

                        <CardFooter className="flex">
                            <div className="space-y-4">
                                {pricing.benefitList.map((benefit: string) => (
                                    <span
                                        key={benefit}
                                        className="flex"
                                    >
                    <Check className="text-green-500"/>{" "}
                                        <h3 className="ml-2">{benefit}</h3>
                  </span>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};