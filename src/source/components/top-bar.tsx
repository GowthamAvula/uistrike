type ViewType = 'landing' | 'dashboard' | 'marketplace' | 'deals';

interface TopBarProps {
    currentView: ViewType;
    setView: (view: ViewType) => void;
}

export function TopBar({ currentView, setView }: TopBarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Background Orbs (Visual depth) */}
            <div className="absolute inset-x-0 top-0 h-[500px] overflow-hidden pointer-events-none opacity-20 dark:opacity-40" aria-hidden="true">
                <span className="absolute -top-[100px] -left-[10%] w-[500px] h-[500px] bg-indigo-500/30 blur-[120px] rounded-full" />
                <span className="absolute -top-[150px] -right-[5%] w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
                {/* Brand */}
                <button
                    onClick={() => setView('landing')}
                    className="flex items-center gap-2.5 group"
                >
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_8px_25px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform">
                        <span className="text-lg">✈</span>
                    </div>
                    <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">AeroBook</span>
                </button>

                {/* Nav Pill (Centered) */}
                <nav className="hidden md:flex items-center gap-1 p-1.5 bg-zinc-900/5 dark:bg-zinc-100/10 backdrop-blur-3xl border border-zinc-200 dark:border-white/10 rounded-full shadow-lg">
                    {[
                        { id: 'landing', label: 'Flights' },
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'marketplace', label: 'Marketplace' },
                        { id: 'deals', label: 'Deals' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id as ViewType)}
                            className={`px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 ${currentView === item.id
                                ? 'bg-gradient-to-br from-indigo-500/90 to-cyan-500/70 text-white shadow-md shadow-indigo-500/10 border border-white/10'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="hidden sm:block px-5 py-2.5 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        Sign in
                    </button>
                    <button className="px-6 py-2.5 text-sm font-black bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all border border-white/10">
                        Create account
                    </button>

                    <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-white/10 ml-1">
                        <div className="w-10 h-10 flex items-center justify-center font-black text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full cursor-pointer hover:border-indigo-500/50 transition-colors">
                            A
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
