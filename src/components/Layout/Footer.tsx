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
    location.pathname.includes("register") ||
    location.pathname.includes("stock") ? null : (
    <footer className="absolute bg-gray-400 w-full right-0 left-0 pt-20 pb-32 md:pb-16 z-30">
      <div className="grid  sm:grid-cols-3 max-w-6xl min-w-[300px] mx-auto px-6 sm:px-16 min-h-[250px]">
        <div className="col-span-3 w-full sm:col-span-2 flex flex-col items-between justify-evenly">
          <div className="flex items-center justify-between w-full mb-8 sm:mb-4 sm:w-1/2">
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
          <div className="flex flex-col justify-between h-28">
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

            <div className="text-sm mt-2 md:mx-0 mx-auto">
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
        </div>

        <div
          className={`
          flex items-center
          col-span-3 justify-center mt-10
          sm:col-span-1 sm:justify-end sm:-mt-8
          `}
        >
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
