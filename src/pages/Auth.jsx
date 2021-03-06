import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Welcome } from "../components";
import GoogleLogin from "react-google-login";
import axios from "axios";

function Auth() {
  // Here's the signature
  const value = useColorModeValue("dark", "light");
  const signinSuccess = async (res) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/users/googlelogin`,
      data: { tokenId: res.tokenId, profile: res.profileObj },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("profile", JSON.stringify(response.data.user));
      window.location.href = "/chats";
    });
  };
  const signinFailure = (res) => {
    console.log(res);
  };
  return (
    <>
      <Flex
        h="100vh"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Welcome />
        <GoogleLogin
          isSignedIn={true}
          theme={value}
          buttonText="Login"
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={signinSuccess}
          onFailure={signinFailure}
          cookiePolicy={"single_host_origin"}
        />
      </Flex>
    </>
  );
}

export default Auth;
