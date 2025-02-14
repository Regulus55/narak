import { FooterData1, FooterData2 } from "../../data/layout/footerData";
import { Link, useNavigate } from "react-router-dom";

// react-icons
import { RiKakaoTalkLine } from "react-icons/ri";
import { IoLogoGoogle } from "react-icons/io";
import { SiNaver } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { SlSocialFacebook } from "react-icons/sl";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-200 pt-20 pb-8">
      <div className="flex flex-row w-1/2 mx-auto">
        <div className="w-2/3">
          <div className="flex items-center justify-between w-1/2">
            <IoLogoInstagram className="h-6 w-6 hover:cursor-pointer" />
            <FiYoutube className="h-6 w-6 hover:cursor-pointer" />
            <SlSocialFacebook className="h-6 w-6 hover:cursor-pointer" />
            <IoLogoGithub className="h-6 w-6 hover:cursor-pointer" />
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
