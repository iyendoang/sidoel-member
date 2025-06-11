import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {PageProps} from "@/types";
import {Testimonial} from "@/types/landing";
import {usePage} from "@inertiajs/react";

interface TestimonialData {
    title: string;
    subtitle: string;
    lists: Testimonial[];
}

interface TestimonialProps extends PageProps {
    data: {
        testimonials: TestimonialData;
    };
}

export const Testimonials = () => {
    const {
        data: {
            testimonials: {title, subtitle, lists},
        },
    } = usePage<TestimonialProps>().props;

    return (
        <section id="testimonials" className="container py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold">
                {title}{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {subtitle}
                </span>
            </h2>

            <p className="text-xl text-muted-foreground pt-4 pb-8">
                Find out what people are saying about our platform and how it's helping them
                achieve their goals.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {lists.map(({image, name, userName, comment}: Testimonial) => (
                    <Card key={userName} className="max-w-md">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Avatar>
                                <AvatarImage src={image || ""} alt={name}/>
                                <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <CardTitle className="text-lg">{name}</CardTitle>
                                <CardDescription>{userName}</CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent>{comment}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
