
import { Button } from '../ui/button'


interface GradientButtonProps {
    text: string,
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function GradientButton({ text, onClick, className, disabled }: GradientButtonProps) {
    return (
        <Button
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 hover:text-white cursor-pointer rounded ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}
