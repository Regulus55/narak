import {
  FooterData1,
  FooterData2,
  socialIcons,
} from "../../data/layout/footerData";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { RiKakaoTalkLine } from "react-icons/ri";
// import { IoLogoGoogle } from "react-icons/io";
// import { SiNaver } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return location.pathname.includes("login") ||
    location.pathname.includes("register") ? null : (
    <footer className="bg-gray-400 pt-20 pb-32 md:pb-16 z-50 relative">
      <div className="flex flex-row max-w-6xl min-w-[300px] mx-auto px-16">
        <div className="w-2/3">
          <div className="flex items-center justify-between w-1/2">
            {socialIcons.map(({ Icon, alt }, index) => (
              <Icon
                key={index}
                className="h-6 w-6 hover:cursor-pointer"
                aria-label={alt}
              />
            ))}
            {/* <IoLogoGoogle className="h-6 w-6 hover:cursor-pointer" />
            <RiKakaoTalkLine className="h-6 w-6 hover:cursor-pointer" />
            <SiNaver className="h-4 w-4 hover:cursor-pointer" /> */}
          </div>
          <div className="flex flex-col justify-evenly h-28">
            <div className="flex justify-between text-sm">
              {FooterData1.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {FooterData2.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
          </div>

          <div className="text-sm mt-2">
            Made by{" "}
            <Link
              to="https://github.com/Regulus55"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Regulus55
            </Link>
            . All rights reserved.
          </div>
        </div>

        <div className="flex justify-end w-1/3">
          <img
            src={"/images/narakicon.png"}
            alt=""
            onClick={() => navigate("/")}
            className="w-32 h-32 rounded-full mr-1"
            role="button"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
