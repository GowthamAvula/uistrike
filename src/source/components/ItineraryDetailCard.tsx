"use client";

export function ItineraryDetailCard() {
    return (
        <div className="bg-white rounded-[3rem] p-6 shadow-2xl space-y-6 sticky top-8">
            <h3 className="text-xl font-black text-zinc-950">One Week Itinerary - Malacca...</h3>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black text-zinc-400 uppercase">Traveller:</span>
                <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded-full">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mortis" className="w-4 h-4 rounded-full" alt="" />
                    <span className="text-[10px] font-bold text-zinc-700">Mortis A.</span>
                </div>
            </div>

            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-inner border border-zinc-100">
                <img src="https://images.unsplash.com/photo-1596422846543-b5c651480411?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Destination View" />
            </div>

            <div className="space-y-4">
                <h4 className="font-black text-zinc-900 uppercase text-xs tracking-widest px-2">Details:</h4>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-zinc-50 p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-[9px] font-black text-zinc-400 uppercase">Budget</span>
                        <span className="text-sm font-black text-zinc-900 mt-1">$1,200</span>
                    </div>
                    <div className="bg-zinc-50 p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-[9px] font-black text-zinc-400 uppercase">Person</span>
                        <span className="text-sm font-black text-zinc-900 mt-1">2</span>
                    </div>
                    <div className="bg-zinc-50 p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-[9px] font-black text-zinc-400 uppercase">Duration</span>
                        <span className="text-sm font-black text-zinc-900 mt-1">7d, 6n</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 rounded-3xl bg-zinc-950 text-white font-black text-sm hover:bg-zinc-800 transition-colors shadow-lg">View Full Itinerary</button>
        </div>
    );
}
