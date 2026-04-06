import React from 'react';

export const RestaurantBFooter: React.FC = () => {
    return (
        <footer className="py-8 bg-[#F7F3EE] border-t border-[#EAE2D9] text-center text-[#8B7E74] text-xs md:text-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/red-logo.png"
                        alt="ER Performance Marketing"
                        className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                    <span className="font-bold text-[#B5ADA5] text-xs">&copy; {new Date().getFullYear()}</span>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-[#3D2B1F] transition-colors">Instagram</a>
                    <a href="#" className="hover:text-[#3D2B1F] transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-[#3D2B1F] transition-colors">Política de Privacidade</a>
                </div>
            </div>
        </footer>
    );
};
