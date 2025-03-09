import { Link } from "react-router-dom";


interface CardHomeProps {
    href: string;
    icon: string;
    title: string;
    description: string;
}

export default function CardHome({ href, icon, title, description }: CardHomeProps) {
    return (
        <Link to={href}>
        <div className="relative bg-green1/30 backdrop-blur-xl rounded-lg hover:bg-green1/40 hover:backdrop-blur-2xl hover:shadow-xl transition-all duration-300 p-4 border border-white/40 border-opacity-30 shadow-inner">
          <div className="flex items-center space-x-4"> 
            <img src={icon} alt={title} className="w-30 h-30 object-contain" />
            <div className="text-left pr-4"> 
              <h3 className="mt-2 text-xl font-semibold text-gray-700  hover:text-endo">{title}</h3>
              <p className="mt-1 text-lg text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </Link>
      
    );
}