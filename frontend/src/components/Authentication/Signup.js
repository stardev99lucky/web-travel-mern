import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
// import { response } from "express";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [pic, setPic] = useState("/images/avatar.png");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {   
    setPicLoading(true);
    if (!name || !email || !firstname || !lastname || !password || !confirmpassword || !phone) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
//    console.log(name, email, password, pic, phone);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          firstname,
          lastname,
          email,
          password,
          phone,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/capture");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  
  const postDetails = async (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log("pics", pics);
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("image", pics);   
      
      const response = await axios({
            method: "post",
            url: "/api/upload",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          });
      setPic(response.data.image);
      setPicLoading(false);
      
      console.log("sucessPic", pic);
      
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="firstname" isRequired>
        <FormLabel>FirstName</FormLabel>
        <Input
          placeholder="Enter Your First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </FormControl>
      <FormControl id="lastname" isRequired>
        <FormLabel>LastName</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>PhoneNumber</FormLabel>
        <Input
          type="text"
          placeholder="Enter Your PhoneNumber"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
