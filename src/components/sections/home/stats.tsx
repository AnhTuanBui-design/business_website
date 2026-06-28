const stats = [
    { value: "0%", label: "Booking commission on direct stays" },
    { value: "15–20%", label: "Typical OTA fees you stop paying" },
    { value: "2–3 wks", label: "From kickoff to launch" },
    { value: "100%", label: "Ownership of your site & data" },
];

export const Stats = () => {
    return (
        <section className="bg-brand-900">
            <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-20">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-2 text-center">
                            <span className="text-display-md font-semibold tracking-tight text-white">{stat.value}</span>
                            <span className="text-md text-brand-200">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
