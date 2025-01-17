import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_SUCCESS, USER_FAIL, USER_LOADING, USER_LOGIN_SUCCESS } from '../Redux/actionTypes'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [userdata,setUserData] = useState([]);
  const toast = useToast()
  const location = useLocation();
  const [show,setShow] = useState(false);

  const openeye = <FontAwesomeIcon size='sm' icon={faEye} />
  const closeye = <FontAwesomeIcon size='sm' icon={faEyeSlash} />

  useEffect(() => {
    document.body.style.backgroundImage = "url(https://cdn.wallpapersafari.com/21/61/zkNgu4.jpg)"
  }, [])

  useEffect(()=>{
    if(userdata.length>0){
      checkEmail()
    }
  },[userdata])

  const isAuth = useSelector((store:any)=> store.authReducer.isAuth);
  const isAdmin = useSelector((store:any)=> store.authReducer.isAdmin);
  const isError = useSelector((store:any)=> store.authReducer.isError)
  const isLoading = useSelector((store:any)=> store.authReducer.isLoading)
  const user = useSelector((store:any)=> store.authReducer.user);

  const dispatch:any = useDispatch();

  const navigate = useNavigate();

  const handleSubmit= (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    dispatch({type:USER_LOADING});
    axios.get("https://upstyle-fq0x.onrender.com/user")
    .then((res)=>{
      setUserData(res.data)

    }).catch((error)=>{

    })
  }

  function checkEmail(){
    if(email==="admin@admin.com" && password==="admin"){
      dispatch({type:ADMIN_SUCCESS,payload:{username:"A D",email:"admin@admin.com",password:"admin"}})
      toast({
        title: "Admin Login Successfull",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 2000
      })
      return navigate("/admin", {replace:true})
    }

    let data = userdata.find((item:any)=> item.email===email && item.password===password);
    if(data){
      dispatch({type:USER_LOGIN_SUCCESS,payload:data})
      setEmail("");
      setPassword("");
      toast({
        title: "Login Successfull",
        status: "success",
        position: "bottom-right",
        isClosable: true,
        duration: 2000
      })
      setTimeout(() => {
        if(location.state===null){
          navigate("/" , {replace: true})
        }else{
          navigate(location.state, {replace: true})
        }
      }, 2000);
    }else{
      dispatch({type:USER_FAIL})
      toast({
        title: "Username or Password is wrong",
        status: "error",
        position: "bottom-left",
        isClosable: true,
      })
    }
  }

  if(JSON.parse(isAuth) || JSON.parse(isAdmin)){
    return <Navigate to='/' />
  }


  return (
    <Flex mt="80px">

      <Helmet>
        <title>Login | UPSTYLE</title>
      </Helmet>

      <form onSubmit={handleSubmit} style={{width:"350px",margin:"auto", padding:"30px",borderRadius:"30px"}}>
        <Text boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" borderRadius="5px" bg="black" p="5px" color="white" fontSize="20px" fontWeight="bold" textAlign="center">Login User/Admin</Text><br/>
      <FormControl isRequired>
        <FormLabel fontWeight="bold">Enter Your Email</FormLabel>
        <InputGroup>
          <InputLeftElement>✉️</InputLeftElement>
          <Input value={email} onChange={(e)=> setEmail(e.target.value)} _hover={{background:"#f0f0f0"}} border={isError? "1px solid red":"1px solid black"} background="white" type='email' placeholder='user@user.com' required/>
        </InputGroup><br/>


        <FormLabel fontWeight="bold">Enter Your Password</FormLabel>
        <InputGroup>
          <InputLeftElement>👁️</InputLeftElement>
          <InputRightElement cursor="pointer" onClick={()=> setShow(!show)}>{show? openeye : closeye}</InputRightElement>
          <Input value={password} onChange={(e)=> setPassword(e.target.value)} _hover={{background:"#f0f0f0"}} border={isError? "1px solid red":"1px solid black"} background="white" type={show? "text" :"password"} placeholder='Enter Password' required/>
        </InputGroup>
      </FormControl>

      <Flex w="100%" justifyContent="space-between" mt="5px">
        <Text fontWeight="bold"><input style={{accentColor:"#ff4800"}} type='checkbox' /> Remember Me</Text>
        <Text fontWeight="semibold" color="blue">Forgot Password</Text>
      </Flex><br/>

      {isLoading ?<Button w="100%" disabled background="#ff4800" isLoading _hover={{background:"#ff4800"}} ></Button>  : <Button fontWeight="bold" color="white" background="#F56B33" _hover={{background:"#ff4800"}} w="100%" type='submit'>LOGIN</Button>}
      <Text textAlign="center" color="black" mt="20px">New User? <span onClick={()=> navigate("/signup")} style={{fontWeight:"bold",color:"#ff4800",cursor:"pointer"}}>Create Account</span></Text>
      </form>

    </Flex>
  )
}

export default Login