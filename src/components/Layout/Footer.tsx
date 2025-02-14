import { FooterData1, FooterData2 } from "../../data/layout/footerData";

// react-icons
import { RiKakaoTalkLine } from "react-icons/ri";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import { SiNaver } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 border-t-2 border-gray-200 py-4">
      <div className="w-1/2 mx-auto">
        <div className="flex items-center space-x-4">
          <RiKakaoTalkLine className="h-6 w-6" />
          <IoLogoGoogle className="h-6 w-6" />
          <SiNaver className="h-5 w-5" />
          <IoLogoGithub className="h-6 w-6" />
        </div>
        <div className="flex justify-center mx-auto h-32">
          <div className="flex flex-col justify-evenly w-2/3">
            <div className="flex justify-between">
              {FooterData1.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
            <div className="flex justify-between">
              {FooterData2.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
          </div>

          <div className="flex justify-center w-1/3">
            <img
              src={"/images/narakicon.png"}
              alt=""
              onClick={() => navigate("/")}
              className="w-32 h-32 rounded-full mr-1"
              role="button"
            />
          </div>
        </div>
        <div>
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
    </footer>
  );
};

export default Footer;
