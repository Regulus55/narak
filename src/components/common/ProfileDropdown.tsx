import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";


interface DropdownProps {
    username: string | null;
    className?: string | null;
}

const ProfileDropdown = ({ username }: DropdownProps) => {
    const navigate = useNavigate();

    // 로그아웃 기능
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Failed to logout:", err);
        }
    };


    // 프로파일 드롭다운 열렸는지 여부
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="flex items-center hover:cursor-pointer" onClick={toggleDropdown}>
            <div className="mr-2">
                <img
                    src={"/images/nouser.png"}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
            </div>

            <div className="relative inline-block text-left">
                <button className="inline-flex justify-center w-full rounded-md  text-sm font-medium text-white hover:text-gray-200">
                    {username}
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm"
                                onClick={() => navigate("/profile")}
                            >
                                프로필
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileDropdown;
