export interface DestinationAsset {
    name: string;
    image3d: string;
    packages: {
        type: "Basic" | "Standard" | "Premium";
        price: string;
        features: string[];
    }[];
}

export const DESTINATION_ASSETS: Record<string, DestinationAsset> = {
    MEL: {
        name: "Melbourne, Australia",
        image3d: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=800", // Placeholder for 3D Melbourne
        packages: [
            { type: "Basic", price: "$850", features: ["Flight only", "Standard Seat"] },
            { type: "Standard", price: "$1,200", features: ["Flight + Hotel", "Meal included"] },
            { type: "Premium", price: "$2,500", features: ["First Class", "Luxury Suite", "Private Tour"] }
        ]
    },
    LHR: {
        name: "London, United Kingdom",
        image3d: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800", // Placeholder for 3D London
        packages: [
            { type: "Basic", price: "$900", features: ["Flight only", "Eco Seat"] },
            { type: "Standard", price: "$1,500", features: ["Flight + City Pass", "Breakfast"] },
            { type: "Premium", price: "$3,200", features: ["Upper Class", "High-tea experience", "Chauffeur"] }
        ]
    }
};
