import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Service } from "@/types/landing";
import { CustomIcons } from "@/components/custom/icon";
import DynamicIconComponent from "@/components/custom/dynamic-icon";

interface ServicesProps extends PageProps {
    data: {
        services: Service[];
    };
}

export const Services = () => {
    const {
        data: { services },
    } = usePage<ServicesProps>().props;

    return (
        <section className="container py-24 sm:py-32">
            <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Layanan Unggulan{" "}
            </span>
                        Sidoel
                    </h2>

                    <p className="text-muted-foreground text-xl mt-4 mb-8">
                        Berbagai fitur dan layanan dirancang khusus untuk mempermudah
                        pendataan siswa dan pelaksanaan ujian online.
                    </p>

                    <div className="flex flex-col gap-8">
                        {services.map(({ icon, title, description }) => (
                            <Card key={title}>
                                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                                    <div className="mt-1 bg-primary/20 p-2 rounded-2xl">
                                        <DynamicIconComponent
                                            dynamicIconName={icon as keyof typeof CustomIcons}
                                            className="w-10 h-10 text-primary"
                                        />
                                    </div>
                                    <div>
                                        <CardTitle>{title}</CardTitle>
                                        <CardDescription className="text-md mt-2">
                                            {description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>

                <img
                    src="/assets/cube-leg.png"
                    className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
                    alt="Ilustrasi layanan"
                />
            </div>
        </section>
    );
};
