"use client";
import { motion } from "framer-motion";

export function UpcomingTripCard() {
    return (
        <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-zinc-100 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black text-zinc-950">Upcoming Trip</h3>
                    <p className="text-sm text-zinc-400 mt-1">Remember your upcoming trips!</p>
                </div>
                <button className="text-orange-500 font-bold text-sm bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">Details</button>
            </div>

            <div className="flex gap-6 mt-8">
                {/* Trip Card Mini */}
                <div className="flex-1 bg-white rounded-[2.5rem] border border-zinc-50 shadow-lg overflow-hidden flex flex-col">
                    <div className="h-32 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1596422846543-b5c651480411?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Kuala Lumpur" />
                        <div className="absolute top-3 right-3 flex gap-2">
                            <div className="bg-orange-500 text-white px-2 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[32px] shadow-lg">
                                <span className="text-[10px] font-bold">12</span>
                                <span className="text-[8px] uppercase">Dec</span>
                            </div>
                            <div className="bg-rose-500 text-white px-2 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[32px] shadow-lg">
                                <span className="text-[10px] font-bold">4</span>
                                <span className="text-[8px] uppercase">Days</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-black text-zinc-900 text-lg">Kuala Lumpur - Ipoh</h4>
                        <p className="text-sm text-zinc-400">Malaysia</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-400 uppercase font-black">Budget</span>
                                <span className="text-md font-black text-zinc-900">$1,200</span>
                            </div>
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nita" alt="" />
                                </div>
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cecil" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Mini Card */}
                <div className="flex-1 bg-white rounded-[2.5rem] border border-zinc-50 shadow-lg overflow-hidden flex flex-col opacity-60 hover:opacity-100 transition-opacity">
                    <div className="h-32 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Sapa Vietnam" />
                        <div className="absolute top-3 right-3 flex gap-2">
                            <div className="bg-zinc-800 text-white px-2 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[32px]">
                                <span className="text-[10px] font-bold">24</span>
                                <span className="text-[8px] uppercase">Nov</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-black text-zinc-900 text-lg">Sapa - Ninh Binh</h4>
                        <p className="text-sm text-zinc-400">Vietnam</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-400 uppercase font-black">Budget</span>
                                <span className="text-md font-black text-zinc-900">$890</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
