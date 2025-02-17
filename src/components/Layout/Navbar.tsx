import { auth } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  // 사이드 바 열렸는지 여부
  const [isSideOpen, setIsSideOpen] = useState(false);

  // 유저정보를 전달하는 기능
  const [user, setUser] = useState<User | null>(null); // auth.currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-mainBlue fixed w-full h-16">
      <TopNavbar
        isSideOpen={isSideOpen}
        setIsSideOpen={setIsSideOpen}
        user={user}
      />
      <SideNavbar
        isSideOpen={isSideOpen}
        setIsSideOpen={setIsSideOpen}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
