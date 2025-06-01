import { Link } from 'react-router-dom';

interface LogoProps {
    size?: 'small' | 'large';
}

const Logo = ({ size = 'small' }: LogoProps) => {
    const imageSize = size === 'large' ? 'w-40 h-40' : 'w-32 h-32';
    const titleSize = size === 'large' ? 'text-7xl' : 'text-5xl';
    const subtitleSize = size === 'large' ? 'text-lg' : 'text-sm';
    const gapSize = size === 'large' ? 'gap-6' : 'gap-4';

    return (
        <Link to="/" className={`flex items-center ${gapSize} no-underline hover:no-underline`}>
            <img src="/logo.png" alt="OnlyUnited Logo" className={imageSize} />
            <div className="flex flex-col items-center leading-tight">
                <span className={`${titleSize} font-extrabold text-white`}>ONLY UNITED</span>
                <span className={`${subtitleSize} text-gray-300 ${size === 'large' ? 'mt-2' : ''}`}>GLORY LIVES HERE, FOR YOU</span>
            </div>
        </Link>
    );
};

export default Logo;
