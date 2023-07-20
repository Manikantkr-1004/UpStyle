import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Input,
    Button
  } from '@chakra-ui/react'
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import { faCreditCard, faHome, faInfoCircle, faShoppingBag, faShoppingCart, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import logo from "../Components/UPSTYLE_LOGO.png"

  interface props{
    isOpen: boolean;
    onClose: ()=> void;
  }

export function Menubar({ isOpen, onClose }:props) {

  const isAuth = useSelector((store:any)=> store.authReducer.isAuth);

  const home = <FontAwesomeIcon size='sm' icon={faHome} />
  const baskets = <FontAwesomeIcon size='sm' icon={faShoppingBag} />
  const payment = <FontAwesomeIcon size='sm' icon={faCreditCard} />
  const order = <FontAwesomeIcon size='sm' icon={faShoppingCart} />
  const signin = <FontAwesomeIcon size='sm' icon={faSignInAlt} />
  const signout = <FontAwesomeIcon size='sm' icon={faSignOutAlt} />
  const info = <FontAwesomeIcon size='sm' icon={faInfoCircle} />
    

    return (
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader><img width="45%" src={logo} alt='logo' /></DrawerHeader>

          <DrawerBody>
            <Button w="100%" mb="3px" variant="" justifyContent="flex-start" leftIcon={home}>My Account</Button><br/>
            <Button w="100%" mb="3px" variant="" justifyContent="flex-start" leftIcon={order}>My Cart</Button><br/>
            <Button w="100%" mb="3px" variant="" justifyContent="flex-start" leftIcon={baskets}>My Orders</Button><br/>
            <Button w="100%" mb="3px" variant="" justifyContent="flex-start" leftIcon={payment}>My Payment</Button><br/>
            <Accordion allowMultiple border="none">
              <AccordionItem border="none">
                <h2>
                  <AccordionButton border="none">
                    <Button w="100%" mb="3px" variant="" justifyContent="flex-start">
                      Help
                    </Button>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} border="none">
                <Button w="100%" mb="3px" variant="" borderRadius="0px" borderBottom="1px solid grey" justifyContent="flex-start" leftIcon={info}>FAQ</Button><br/>
                <Button w="100%" mb="3px" variant="" borderRadius="0px" borderBottom="1px solid grey" justifyContent="flex-start" leftIcon={info}>DOCS</Button>
                </AccordionPanel>
              </AccordionItem>
              </Accordion>
          </DrawerBody>

          <DrawerFooter>
          {isAuth ? <Button w="100%" variant="solid" colorScheme='red' justifyContent="flex-start" leftIcon={signout}>Logout</Button>: <Button w="100%" variant="solid" colorScheme='blue' justifyContent="flex-start" leftIcon={signin}>SignUp/Login</Button>}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}