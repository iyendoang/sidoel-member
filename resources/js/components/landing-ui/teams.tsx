import {buttonVariants} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Facebook, Instagram, Linkedin, MessageCircleMore} from "lucide-react"; // Tambahkan ini
import {PageProps} from "@/types";
import {HowItWorksItem, SociaNetworkslProps, TeamProps} from "@/types/landing";
import {usePage} from "@inertiajs/react";

interface TeamsMemberProps extends PageProps {
    data: {
        teamList: TeamProps[];
    };
}

export const Team = () => {
    const {data: {teamList},} = usePage<TeamsMemberProps>().props;
    const socialIcon = (iconName: string) => {
        switch (iconName) {
            case "Linkedin":
                return <Linkedin size="20" className="text-emerald-500"/>;
            case "Facebook":
                return <Facebook size="20" className="text-emerald-500"/>;
            case "Instagram":
                return <Instagram size="20" className="text-emerald-500"/>;
            case "WhatsApp":
                return <MessageCircleMore size="20" className="text-emerald-500"/>;
        }
    };

    return (
        <section
            id="team"
            className="container py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
                Crew
            </h2>

            <p className="mt-4 mb-10 text-xl text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
                dolor pariatur sit!
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
                {teamList.map(
                    ({imageUrl, name, description, position, socialNetworks}: TeamProps) => (
                        <Card
                            key={name}
                            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
                        >
                            <CardHeader className="mt-8 flex justify-center items-center pb-2">
                                <img
                                    src={imageUrl}
                                    alt={`${name} ${position}`}
                                    className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                                />
                                <CardTitle className="text-center">{name}</CardTitle>
                                <CardDescription className="text-primary">
                                    {position}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="text-center pb-2">
                                <p>{description}</p>
                            </CardContent>

                            <CardFooter>
                                {socialNetworks.map(({name, url}: SociaNetworkslProps) => (
                                    <div key={name}>
                                        <a
                                            rel="noreferrer noopener"
                                            href={url}
                                            target="_blank"
                                            className={buttonVariants({
                                                variant: "ghost",
                                                size: "sm",
                                            })}
                                        >
                                            <span className="sr-only">{name} icon</span>
                                            {socialIcon(name)}
                                        </a>
                                    </div>
                                ))}
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>
        </section>
    );
};