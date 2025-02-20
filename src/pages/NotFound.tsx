import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundNumber = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 7.5rem;
  font-weight: bold;
  color: #edf2f7;
  text-shadow: 0 0 24px rgba(0, 0, 0, 1);

  @media (max-width: 1024px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  @media (max-width: 640px) {
    font-size: 4rem;
  }
`;

const NotFoundText = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #edf2f7;
  text-shadow: 0 0 24px rgba(0, 0, 0, 1), 0 0 24px rgba(0, 0, 0, 1);
  margin-top: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 -top-20 flex flex-col items-center justify-center bg-gray-100">
      <div className="relative flex flex-col items-center justify-center">
        <img
          src="/images/r7.png"
          alt="Page not found"
          className="w-52 h-52 sm:w-72 sm:h-72 lg:w-[23rem] lg:h-[23rem]"
        />
        <NotFoundNumber>404</NotFoundNumber>
      </div>
      <NotFoundText>PAGE NOT FOUND</NotFoundText>
      <div
        className={`
          text-gray-100 font-bold bg-mainBlue rounded-full hover:cursor-pointer
          text-2xl px-12 py-2 mt-12
          sm:text-3xl sm:px-16 sm:py-3 sm:mt-16 
          md:text-3xl md:px-20 md:py-4 md:mt-20 
          lg:text-4xl lg:py-4 lg:px-24
          `}
        onClick={() => navigate(-1)}
      >
        Go Back
      </div>
    </div>
  );
};

export default NotFound;
