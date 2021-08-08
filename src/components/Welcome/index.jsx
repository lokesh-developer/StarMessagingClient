import { SlideFade, Heading, Flex } from "@chakra-ui/react";
import { Lottie } from "@crello/react-lottie";
import { logo } from "../../lib/lottie";

export const Welcome = () => {
  const logoAni = {
    loop: true,
    autoplay: true,
    animationData: logo,
  };
  return (
    <>
      <SlideFade
        style={{ transitionDuration: "2s" }}
        in={true}
        initialScale={0.9}
        offsetY={40}
      >
        <Heading color="#bd10e0" fontSize={["3xl", "4xl", "5xl"]}>
          WELCOME
        </Heading>
      </SlideFade>
      <Flex alignItems="center" justifyContent="center" p={5} w="full">
        <SlideFade
          style={{ transitionDuration: "2s", transitionDelay: "2s" }}
          in={true}
          initialScale={0.9}
          offsetY={40}
        >
          <Heading color="#bd10e0" fontSize={["3xl", "4xl", "5xl"]}>
            TO
          </Heading>
        </SlideFade>
        <SlideFade
          style={{ transitionDuration: "2s", transitionDelay: "4s" }}
          in={true}
          initialScale={0.9}
          offsetY={40}
        >
          <Lottie
            config={logoAni}
            height="100px"
            width="100px"
            style={{ cursor: "default", margin: "0" }}
          />
        </SlideFade>
        <SlideFade
          style={{ transitionDuration: "2s", transitionDelay: "6s" }}
          in={true}
          initialScale={0.9}
        >
          <Heading color="#bd10e0" fontSize={["3xl", "4xl", "5xl"]}>
            MESSAGING
          </Heading>
        </SlideFade>
      </Flex>
    </>
  );
};
