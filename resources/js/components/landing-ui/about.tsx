import {Statistics} from "@/components/landing-ui/statistics";
import {PageProps} from "@/types";
import {AboutType} from "@/types/landing";
import {usePage} from "@inertiajs/react";
interface AbouteProps extends PageProps {
    data: {
        about: AboutType;
    };
}
export const About = () => {
    const {data: {about}} = usePage<AbouteProps>().props;

    return (
        <section
            id="about"
            className="container py-24 sm:py-32"
        >
            <div className="bg-muted/50 border rounded-lg py-12">
                <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
                    <img
                        src={about.image}
                        alt=""
                        className="w-[300px] object-contain rounded-lg"
                    />
                    <div className="bg-green-0 flex flex-col justify-between">
                        <div className="pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                                  About{" "}
                                </span>
                                Company
                            </h2>
                            <p className="text-xl text-muted-foreground mt-4">
                                {about.description}
                            </p>
                        </div>

                        <Statistics/>
                    </div>
                </div>
            </div>
        </section>
    );
};