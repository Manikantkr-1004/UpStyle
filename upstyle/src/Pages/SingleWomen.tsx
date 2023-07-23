import { Heading, Skeleton, SkeletonCircle } from "@chakra-ui/react";

import axios from "axios";
import { Box, Image, Badge, Text, Button, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../constants";
import { useToast } from "@chakra-ui/react";

const SingleWomen = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  let skel= new Array(8).fill(0)

  // console.log(id)

  const fetchdata = () => {
    axios
      .get(`https://upstyle-fq0x.onrender.com/women/${id}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  //  ====================================================================>

  const toast = useToast();
  const handleAddToCart = (product: ProductType) => {
    const existingCartItems = localStorage.getItem("cart");
    let cart = [];
    if (existingCartItems) {
      cart = JSON.parse(existingCartItems);
    }

    // Check if the product is already in the cart
    const isProductInCart = cart.some(
      (item: any) => item.Title === product.Title
    );

    if (isProductInCart) {
      toast({
        title: "Product already in the cart",
        status: "warning",
        duration: 3000, // 3 seconds
        isClosable: true,
        position: "top",
      });
    } else {
      // Add the product to the cart
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast({
        title: "Product added to cart",
        status: "success",
        duration: 3000, // 3 seconds
        isClosable: true,
        position: "top",
      });
    }
  };

  //====================================================================================>

  const handleImageClick = (imageUrl: any) => {
    setSelectedImage(imageUrl);
  };

  console.log(data);

  return (
    

  <div style={{ display: "flex", justifyContent: "center",padding:"20px" }}>
  {loading ? skel.map((el)=>{
          return <Skeleton  height="200px" mb="20px" />;
        }):
  <Flex
    className="product-details"
    w="100%"
    maxW={{ base: "100%", md: "800px" }}
    flexDirection={{ base: "column", md: "row" }}
    justifyContent="center"
    alignItems="flex-start" // Align items to the top
  >
    {/* Big Image */}
    <Box flex="1" textAlign="center" mb={{ base: "20px", md: "0" }}>
      <Image
        src={ data.image}
        alt={data?.Title}
        objectFit="contain"
        maxW={{ base: "100%", md: "400px" }} // Decrease the height of the big image
        height="auto"
        marginBottom="20px"
      />
    </Box>

    {/* Product Details and Imgbag Images */}
    <Flex flex="1" flexDirection="column" justifyContent="space-between" alignItems="center">
      {/* Imgbag Images */}
      <Box mb="20px">
        <Grid
          className="grid"
          templateColumns="repeat(3, 1fr)"
          gap={2}
          justifyItems="center"
          maxW="300px"
          mx="auto"
        >
          {data.imgbag?.map((imageUrl: string, index: number) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Product view ${index + 1}`}
              objectFit="contain"
              cursor="pointer"
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </Grid>
      </Box>

      {/* Product Details */}
      <Box textAlign="left" p={{ base: "0", md: "4" }}>
        <Text mt="2" fontSize="2xl" fontWeight="bold">
          {data?.Title}
        </Text>
        <Text mt="1" fontSize="lg" color="blue.500">
          Brand: {data?.Brand}
        </Text>
        <Text mt="1" fontSize="md" color="gray.600">
          Category: {data?.Category}
        </Text>
        <Flex mt="1" alignItems="center">
          <Badge colorScheme="green">{data?.Rating}</Badge>
          <Text ml="1" fontSize="sm" color="gray.600">
            (1000 ratings)
          </Text>
        </Flex>
        <Text mt="1" fontSize="md" fontWeight="bold">
          Price: ${data?.Price}
        </Text>
        <Flex w="50%" justifyContent="flex-start" gap={2}>
          {data?.Size?.map((el: any, ind: any) => (
            <Text key={ind} backgroundColor={"gray.300"} borderRadius={"50%"} p={2}>
              {el}
            </Text>
          ))}
        </Flex>

        <Button
          mt="2"
          colorScheme="blue"
          onClick={() => handleAddToCart(data)}
          w="100%"
          maxWidth="300px"
          alignSelf="center"
        >
          Add to Cart
        </Button>
      </Box>
    </Flex>
  </Flex>
  }
</div>
  );
};

export default SingleWomen;