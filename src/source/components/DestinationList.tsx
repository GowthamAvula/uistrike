"use client";
import { Heart, ExternalLink } from "lucide-react";

const PLACES = [
    {
        id: 1,
        title: "Batu Caves - Kuala Lumpur",
        desc: "A massive limestone hill with a series of caves and cave temples...",
        rating: 4.8,
        reviews: 120,
        tags: ["Culture", "Nature", "Photography"],
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=500&q=80",
        guide: "Nita",
        guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nita"
    },
    {
        id: 2,
        title: "Malacca Square - Melaka",
        desc: "The heart of historic Malacca with its iconic red buildings and...",
        rating: 4.7,
        reviews: 89,
        tags: ["History", "Architecture", "Food"],
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=500&q=80",
        guide: "El Primo",
        guideAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Primo"
    }
];

export function DestinationList() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
                    For your <span className="text-indigo-600 underline">Malaysia 🏙️</span> Trip
                </h3>
                <button className="text-orange-500 font-bold text-sm bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">Details</button>
            </div>
            <p className="text-sm text-zinc-400 -mt-4">These can't be missed places</p>

            <div className="space-y-4">
                {PLACES.map(place => (
                    <div key={place.id} className="bg-white rounded-[2.5rem] p-4 flex gap-6 shadow-lg border border-zinc-50 hover:shadow-xl transition-shadow group">
                        <div className="w-48 h-32 rounded-[2rem] overflow-hidden flex-shrink-0">
                            <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                        </div>
                        <div className="flex-1 py-1 pr-4 relative">
                            <div className="flex justify-between">
                                <h4 className="text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors">{place.title}</h4>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full border border-zinc-100 text-zinc-300 hover:text-rose-500 hover:border-rose-100 transition-all"><Heart size={16} /></button>
                                    <button className="p-2 rounded-full border border-zinc-100 text-zinc-300 hover:text-indigo-500 hover:border-indigo-100 transition-all"><ExternalLink size={16} /></button>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{place.desc}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-amber-400">★</span>
                                <span className="text-sm font-bold text-zinc-900">{place.rating}</span>
                                <span className="text-sm text-zinc-300">({place.reviews})</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-400 uppercase font-black">Guide by:</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-100">
                                            <img src={place.guideAvatar} alt="" />
                                        </div>
                                        <span className="text-xs font-bold text-zinc-700">{place.guide}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {place.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-500 text-[9px] font-black uppercase tracking-tighter">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
