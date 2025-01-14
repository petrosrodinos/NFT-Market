import React, { useState, useEffect } from "react";
import { SimpleGrid, Alert, Container } from "@chakra-ui/react";
import Card from "./Card";
import { FiAlertCircle } from "react-icons/fi";
import { color } from "../style/colors";

const NftList = ({ nftList, path, minted }) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    if (nftList) {
      setList(nftList);
    }
  }, [nftList]);

  return (
    <>
      {!list && (
        <Container style={{ padding: 20 }}>
          <Alert status="warning">
            <FiAlertCircle fontSize={25} color={color} />
            Seems there are no NFTs to show
          </Alert>
        </Container>
      )}
      {list && (
        <SimpleGrid columns={[2, null, 3]} spacing={1}>
          {list.map((item, index) => (
            <Card minted={minted} path={path} key={index} nft={item} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default NftList;
