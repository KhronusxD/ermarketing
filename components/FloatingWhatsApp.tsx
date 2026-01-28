import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleClick = () => {
        window.open('https://wa.me/5592985146299?text=Ol%C3%A1%2C%20estou%20no%20site%20e%20tenho%20d%C3%BAvidas.', '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
                >
                    {/* Tooltip / Message */}
                    <div className="bg-white text-black text-sm font-medium py-2 px-4 rounded-xl shadow-lg mb-2 relative animate-bounce hidden md:block">
                        Precisando de tirar dúvidas?
                        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white rotate-45"></div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all hover:scale-110 flex items-center justify-center"
                        aria-label="Falar no WhatsApp"
                    >
                        <MessageCircle size={32} fill="white" className="text-white" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
