const footerIcons = ["헬프센터", "홈", "어바웃어스", "개인약관"];

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="border-t-2 border-gray-200 py-4">
        <div className="flex justify-center w-5/6 mx-auto">
          <div className="flex flex-row">
            {footerIcons.map((item) => (
              <div className="mx-1">{item}</div>
            ))}
          </div>
          <div>Narak</div>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 py-4">
        <div className="flex justify-between w-2/3 mx-auto">
          <div>깃허브, 이런거 아이콘</div>
          <div>terms of use</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
