const propertyTypes = ["Cabins", "Beach houses", "City apartments", "Villas", "Lodges", "Boutique hotels"];

export const TrustBar = () => {
    return (
        <section className="border-b border-secondary bg-primary">
            <div className="mx-auto max-w-container px-4 py-10 md:px-8">
                <p className="text-center text-sm font-medium text-tertiary">
                    Built for independent hosts and boutique property managers
                </p>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                    {propertyTypes.map((type) => (
                        <li key={type} className="text-md font-semibold text-quaternary">
                            {type}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
