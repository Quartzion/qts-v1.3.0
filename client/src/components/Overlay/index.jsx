import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Overlay({ children, onClose, className = "" }) {
    const overlayRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {

        // scrol to top 
requestAnimationFrame(() => {
    const scrollableCard = overlayRef.current?.querySelector(".blog-card.overlay");
    scrollableCard?.scrollTo({ top: 0, behavior: "auto" });
});

        // blur background
        const focusableElements = overlayRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e) => {
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }

                }

                else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }

            // Escape key closes modal
            if (e.key === "Escape") {
                onClose();
                navigate('/');
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className={className}
            role="dialog"
            aria-modal="true"
            ref={overlayRef}
        >
            {children}
        </div>
    );
};
