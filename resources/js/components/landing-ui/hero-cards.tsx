import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button, buttonVariants} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {Check, Linkedin} from "lucide-react";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {LightBulbIcon} from "@/components/landing-ui/icons";
import {Link} from "@inertiajs/react";
import {ShineBorder} from "@/components/magicui/shine-border";

export const HeroCards = () => {
    return (
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            {/* Testimonial */}
            <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar>
                        <AvatarImage
                            alt=""
                            src="/assets/shadcn.png"
                        />
                        <AvatarFallback>SH</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <CardTitle className="text-lg">John Doe React</CardTitle>
                        <CardDescription>@john_doe</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    Sangat membantu dalam mengelola ujian online secara efisien dan terstruktur!
                </CardContent>
            </Card>

            {/* Team */}
            <Card
                className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5"]} />
                <CardHeader className="mt-8 flex justify-center items-center pb-2">
                    <img
                        src="/assets/shadcn.png"
                        alt="user avatar"
                        className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                    />
                    <CardTitle className="text-center">Achmad Fathoni</CardTitle>
                    <CardDescription className="font-normal text-primary">
                        Pengembang Frontend
                    </CardDescription>
                    <CardContent className="text-center pb-2">
                        <p>
                            Saya menikmati proses membangun sistem untuk ujian online secara digital.
                        </p>
                    </CardContent>
                </CardHeader>

                <CardFooter>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/leoMirandaa"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">Github icon</span>
                            <GitHubLogoIcon className="w-5 h-5"/>
                        </a>
                        <a
                            rel="noreferrer noopener"
                            href="https://twitter.com/leo_mirand4"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">X icon</span>
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-foreground w-5 h-5"
                            >
                                <title>X</title>
                                <path
                                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                            </svg>
                        </a>

                        <a
                            rel="noreferrer noopener"
                            href="https://www.linkedin.com/in/leopoldo-miranda/"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">Linkedin icon</span>
                            <Linkedin size="20"/>
                        </a>
                    </div>
                </CardFooter>
            </Card>

            {/* Pricing */}
            <Card className="absolute top-[150px] left-[40px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5"]} />
                <CardHeader>
                    <CardTitle className="flex item-center justify-between">
                        Gratis
                        <Badge variant="secondary" className="text-sm text-primary">
                            Trial aplikasi
                        </Badge>
                    </CardTitle>
                    <div>
                        <span className="text-3xl font-bold">Rp0</span>
                        <span className="text-muted-foreground"> /event</span>
                    </div>
                    <CardDescription>
                        Gunakan fitur utama Sidoel tanpa biaya untuk sekali event sebagai trial pada pelaksanaan ujian online Anda.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <a
                        href="https://wa.me/6285692030505"
                        rel="noreferrer noopener"
                        target="_blank"
                        className={`w-full ${buttonVariants({ variant: "default" })}`}
                    >
                        Mulai Uji Coba Gratis
                    </a>
                </CardContent>

                <hr className="w-4/5 m-auto mb-4"/>

                <CardFooter className="flex">
                    <div className="space-y-4">
                        {["4 Anggota tim", "4 GB Penyimpanan", "Hingga 6 halaman"].map(
                            (benefit: string) => (
                                <span key={benefit} className="flex">
                                    <Check className="text-green-500"/>{" "}
                                    <h3 className="ml-2">{benefit}</h3>
                                    </span>
                            )
                        )}
                    </div>
                </CardFooter>
            </Card>
            {/* Service */}
            <Card
                className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        <LightBulbIcon/>
                    </div>
                    <div>
                        <CardTitle>Light & dark mode</CardTitle>
                        <CardDescription className="text-md mt-2">
                            Sidoel yang nyaman dengan mode terang dan gelap sesuai preferensi Anda.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};