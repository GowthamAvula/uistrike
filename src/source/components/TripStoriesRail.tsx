"use client";
import { motion } from "framer-motion";

const STORIES = [
    { id: 1, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
    { id: 2, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 3, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha" },
    { id: 4, image: "https://images.unsplash.com/photo-1540664860154-d9bc21e66c9c?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" },
    { id: 5, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" },
    { id: 6, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=300&q=80", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
];

export function TripStoriesRail() {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
            {STORIES.map((story) => (
                <motion.div
                    key={story.id}
                    whileHover={{ y: -5 }}
                    className="relative flex-shrink-0 w-28 h-40 rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-white/10"
                >
                    <img src={story.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                    {/* Avatar Badge */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-lg bg-white/20 backdrop-blur-sm">
                        <img src={story.avatar} className="w-full h-full object-cover" alt="" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
