import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Icon,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { color } from "../style/colors";
import { FaEthereum } from "react-icons/fa";
import { FiHome, FiArrowRight } from "react-icons/fi";
import ConfirmBuy from "./ConfirmBuy";
import React from "react";
import ListToMarket from "./ListToMarket";
import { useNft } from "../hooks/nft-hook";

export default function Card({ nft, confirm, preview, path, minted }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { buyNft, loading } = useNft();

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${nft.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image rounded={"lg"} height={260} width={282} objectFit={"cover"} src={nft.image} />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={color} fontSize={"sm"} textTransform={"uppercase"}>
            {nft.name}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {!confirm
              ? nft.description.length >= 30
                ? nft.description.substring(0, 30) + "..."
                : nft.description
              : nft.description}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {nft.price}
            </Text>
            <Icon color={color} mr="4" fontSize="20" as={FaEthereum} />
          </Stack>
          {confirm && (
            <Stack direction={"column"} align={"center"}>
              <Text fontWeight={800} fontSize={"md"}>
                Owner:
                <Text fontWeight={400} fontSize={"sm"}>
                  {nft.owner}
                </Text>
              </Text>
              <Text fontWeight={800} fontSize={"md"}>
                Seller:
                <Text fontWeight={400} fontSize={"sm"}>
                  {nft.seller}
                </Text>
              </Text>
            </Stack>
          )}
          {preview && (
            <Button rightIcon={<FiHome />} colorScheme={"teal"} variant="outline">
              BUY
            </Button>
          )}
          {path === "home" && (
            <Button
              rightIcon={<FiArrowRight />}
              colorScheme={"teal"}
              variant="outline"
              onClick={onOpen}
            >
              SEE MORE
            </Button>
          )}
          {path === "profile" && !minted && (
            <Button rightIcon={<FiHome />} colorScheme={"teal"} variant="outline" onClick={onOpen}>
              SELL ME
            </Button>
          )}

          {confirm && !path && (
            <Button
              rightIcon={<FiHome />}
              colorScheme={"teal"}
              variant="outline"
              onClick={() => {
                buyNft(nft.tokenId, nft.price);
              }}
            >
              {loading ? <Spinner size="lg" /> : "TAKE ME HOME"}
            </Button>
          )}
        </Stack>
      </Box>
      <ConfirmBuy isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        {path === "home" && (
          <Card style={{ display: "flex", flexWrap: "wrap" }} confirm nft={nft} />
        )}
        {path === "profile" && !minted && <ListToMarket id={nft.tokenId} owner={nft.owner} />}
      </ConfirmBuy>
    </Center>
  );
}
