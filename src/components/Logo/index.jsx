import { Lottie } from "@crello/react-lottie";
import { logo } from "../../lib/lottie";

export const Logo = ({ width, height }) => {
  const logoAni = {
    loop: true,
    autoplay: true,
    animationData: logo,
  };

  return (
    <Lottie
      width={width}
      height={height}
      style={{ cursor: "default", margin: "0" }}
      config={logoAni}
    />
  );
};
