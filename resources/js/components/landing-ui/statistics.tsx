import {PageProps} from "@/types";
import {StatType} from "@/types/landing";
import {usePage} from "@inertiajs/react";

interface StatisticProps extends PageProps {
    data: {
        stats: StatType[];
    };
}
export const Statistics = () => {
    const {data: {stats},} = usePage<StatisticProps>().props;

    return (
        <section id="statistics">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map(({ quantity, description }: StatType) => (
                    <div
                        key={description}
                        className="space-y-2 text-center"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
                        <p className="text-xl text-muted-foreground">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};