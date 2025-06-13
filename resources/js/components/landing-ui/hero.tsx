import {Button} from "@/components/ui/button";
import {buttonVariants} from "@/components/ui/button";
import {GitHubLogoIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {HeroCards} from "@/components/landing-ui/hero-cards";
import {usePage} from "@inertiajs/react";
import {HeroType} from "@/types/landing";
import {PageProps} from "@/types";
import {ArrowBigRightDash} from "lucide-react";
import {AuroraText} from "@/components/magicui/aurora-text";
import {Meteors} from "@/components/magicui/meteors";
import {DotPattern} from "@/components/magicui/dot-pattern";

interface HeroProps extends PageProps {
    data: {
        hero: HeroType;
    }
}

export const Hero = () => {
    const {data: {hero}} = usePage<HeroProps>().props;
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <DotPattern glow className="opacity-40" />
                    <h1 className="inline">
                        <span
                            className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                          <AuroraText
                              speed={1.5}
                              className="font-extrabold"
                          >
                        {hero.title1}
                        </AuroraText>
                        </span>
                        {" "}{hero.title2}
                    </h1>
                    untuk{" "}
                    <h2 className="inline">
                        <AuroraText>{hero.title3}</AuroraText>
                        {hero.title4}
                    </h2>
                </main>

                <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{__html: hero.subtitle}}
                />

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    {hero.get_started.map((link, index) => (
                        <a
                            key={index}
                            rel="noreferrer noopener"
                            href={link.url}
                            target="_blank"
                            className={`w-full md:w-1/3 ${buttonVariants({
                                variant: link.color ?? "default"
                            })}`}
                        >
                            {link.title}
                            <ArrowBigRightDash className="ml-2 w-5 h-5"/>
                        </a>
                    ))}
                </div>
            </div>

            {/* Hero cards sections */}
            <div className="z-10">
                <HeroCards/>
            </div>

            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};