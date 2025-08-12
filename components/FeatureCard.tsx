import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    bgColor: string;
    borderColor: string;
    titleColor: string;
    descriptionColor: string;
    className?: string;
}

export default function FeatureCard({
    icon,
    title,
    description,
    bgColor,
    borderColor,
    titleColor,
    descriptionColor,
    className = ""
}: FeatureCardProps) {
    return (
        <div className={`${bgColor} border ${borderColor} rounded p-6 ${className} hover:cursor-pointer`}>
            <div className="text-center">
                <div className=" flex items-center justify-center mx-auto mb-4">
                    {icon}
                </div>
                <h3 className={`text-xl font-bold font-poppins ${titleColor} mb-3`}>{title}</h3>
                <p className={`${descriptionColor} leading-relaxed`}>{description}</p>
            </div>
        </div>
    );
}
