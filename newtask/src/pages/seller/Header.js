import { useContext } from "react";
import { AppContext } from "./RouteSeller";

const Header = () => {
    const {shop } = useContext(AppContext);
    return (
        <div className="mb-1 bg-blue-500 text-white shadow-md shadow-lightgray-500/30">
            <header class="flex items-center justify-between  border-b border-gray-300 p-4">
                <div class="text-blue-800 font-bold text-xl">MODEL WORLD</div>

                <div class="flex items-center space-x-4">
                    <div class="relative inline-block">
                      
                    </div>

                    <div class="flex items-center">
                        <img
                            src={shop!=null&&shop.hinhAnh}
                            alt="User Avatar"
                            class="w-8 h-8 rounded-full"
                        />
                        <span class="ml-2 text-gray-700">{shop!=null&&shop.shopName}</span>
                    </div>
                </div>
            </header>
        </div>
    );
};
export default Header;
