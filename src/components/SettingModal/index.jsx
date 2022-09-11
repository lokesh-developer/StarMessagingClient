import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Avatar,
  Text,
  useClipboard,
  useColorMode,
  useDisclosure,
  Box
} from '@chakra-ui/react';
import { MdBrightnessHigh, MdShare, MdBrightness2 } from 'react-icons/md';
import { SideBarButton } from '../Sidebar/SideBarButton';
import { SettingLabel } from './SettingLabel';
import { ShareModal } from './ShareModal';
// import { IsUpdateAvailable } from '../../lib/hooks/IsUpdateAvailable';
import { FcDownload } from 'react-icons/fc';
import { useState } from 'react';
// import { , useState } from 'react';

export const SettingModal = ({ Open, Close }) => {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const user = JSON.parse(localStorage.getItem('profile'));
  const { hasCopied, onCopy } = useClipboard(user._id);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const updateAvailable = IsUpdateAvailable();
  const updateApp = () => {
    window.location.replace(window.location.href);
  };
  // var preDefferedPrompt;
  const [deferredPrompt, setDefferedPrompt] = useState(null);
  // useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // preDefferedPrompt = e;
      setDefferedPrompt(e);
      // e.prompt();
      // // Wait for the user to respond to the prompt
      // e.userChoice.then((choiceResult) => {
      //   if (choiceResult.outcome === 'accepted') {
      //     console.log('User accepted the install prompt');
      //   } else {
      //     console.log('User dismissed the install prompt');
      //   }
      // });
      // Update UI notify the user they can install the PWA
      // showInstallPromotion();
      console.log('beforeinstallprompt Event fired', deferredPrompt);
    });
  // }, []);

  const installApp = (e) => {
    //  hideMyInstallPromotion();
    // Show the install prompt
    console.log(deferredPrompt);
    if (deferredPrompt !== null) {
      deferredPrompt?.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    } else {
      // console.log('deferredPrompt is null');
      // window.dispatchEvent(new Event('beforeinstallprompt'));
      // const event = new Event('beforeinstallprompt', {
      //   bubbles: true
      // });
      // e.dispatchEvent(event);
      // window.addEventListener('beforeinstallprompt', (e) => {
      //   // Prevent the mini-infobar from appearing on mobile
      //   e.preventDefault();
      //   // Stash the event so it can be triggered later.
      //   // preDefferedPrompt = e;
      //   setDefferedPrompt(e);
      //   e.prompt();
      //   // Wait for the user to respond to the prompt
      //   e.userChoice.then((choiceResult) => {
      //     if (choiceResult.outcome === 'accepted') {
      //       console.log('User accepted the install prompt');
      //     } else {
      //       console.log('User dismissed the install prompt');
      //     }
      //   });
      //   // Update UI notify the user they can install the PWA
      //   // showInstallPromotion();
      //   console.log('beforeinstallprompt Event fired', e);
      // });
    }
  };
  // const installApp = (evt) => {
  //   evt.preventDefault();
  //   if (!promptInstall) {
  //     return;
  //   }
  //   promptInstall.prompt();
  // };
  // if (!supportsPWA) {
  //   return null;
  // }

  // const installApp = async () => {

  // };
  function isInstalled() {
    // For iOS
    if (window.navigator.standalone) return true;

    // For Android
    if (window.matchMedia('(display-mode: standalone)').matches) return true;

    // If neither is true, it's not installed
    return false;
  }
  // console.log(isInstalled());
  return (
    <Modal
      scrollBehavior="inside"
      size="xl"
      motionPreset="slideInBottom"
      isOpen={Open}
      onClose={Close}>
      <ModalOverlay />
      <ModalContent mt={['0', '5%']} rounded="none" minH={{ base: '100vh', sm: '96' }}>
        <ModalHeader bg={bg}>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          {user !== null ? (
            <>
              <Box bg={bg}>
                <SettingLabel label="Profile" />
                <Flex p={4}>
                  <Avatar src={user.profileUrl} />
                  <Box ml={3}>
                    <Text as="b">{user.name}</Text>
                    <Text>{user.email}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="Account" />

                <SideBarButton
                  onClick={onOpen}
                  label="Share your User Id"
                  icon={<MdShare fontSize="27px" />}
                />
                <InputGroup>
                  <Input m={3} placeholder={user?._id} isDisabled />
                  <InputRightElement m={3} width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={onCopy}>
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="Chats" />
                <SideBarButton
                  onClick={toggleColorMode}
                  label={colorMode === 'light' ? 'Light Theme' : 'Dark Theme'}
                  icon={
                    colorMode === 'light' ? (
                      <MdBrightnessHigh fontSize="27px" />
                    ) : (
                      <MdBrightness2 fontSize="27px" />
                    )
                  }
                />
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="App" />
                <SideBarButton
                  onClick={installApp}
                  isDisabled={isInstalled()}
                  label="Install App"
                  icon={<FcDownload color="#fff" fontSize="27px" />}
                />
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="App Info" />
                <Flex p={3} alignItems="center" justifyContent="center">
                  <Text as="b">Telechat web v1.0</Text>
                  {/* {updateAvailable === true ? ( */}
                    <Button size="md" m={3} onClick={updateApp}>
                      Update
                    </Button>
                  {/* ) : (
                  / <Button isDisabled={true} size="md" m={3} onClick={updateApp}>
                      No Updates
                    </Button>
                  )} */}
                </Flex>
              </Box>
            </>
          ) : (
            <></>
          )}
        </ModalBody>
      </ModalContent>
      {user !== null ? (
        <ShareModal
          onClose={onClose}
          isOpen={isOpen}
          content={`Send me request on https://star-messaging-client.vercel.app/chats/users/${user._id} to start a conversation.`}
        />
      ) : null}
    </Modal>
  );
};
