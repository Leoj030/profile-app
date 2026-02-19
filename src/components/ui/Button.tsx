'use client'

export function Button({ children, onClick, className }: { children?: React.ReactNode, onClick?: () => void, className?: string }) {
    return (
        <button className={`cursor-pointer ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}