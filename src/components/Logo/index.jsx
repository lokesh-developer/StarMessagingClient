import Lottie from "react-lottie";
import { logo } from "../../lottie";

export const Logo = ({ width, height }) => {
  const logoAni = {
    loop: true,
    autoplay: true,
    animationData: logo,
  };
  return (
    <>
      <Lottie
        width={width}
        height={height}
        style={{ cursor: "default", margin: "0" }}
        options={logoAni}
      />
    </>
  );
};
