import React, { useEffect, useState } from "react";
import NftList from "../components/NftList";
import { Tabs, TabList, TabPanels, TabPanel, Tab, Spinner, Center } from "@chakra-ui/react";
import { useNft } from "../hooks/nft-hook";
import { color } from "../style/colors";

const Profile = () => {
  const [listed, setListed] = useState(null);
  const [bought, setBought] = useState(null);
  const { fetchProfileNfts, fetchMintedNfts, error, loading } = useNft();

  useEffect(async () => {
    try {
      let nfts = await fetchProfileNfts();
      if (nfts === undefined || nfts.length == 0) return;
      setBought(nfts);
    } catch (err) {}
  }, [fetchProfileNfts]);

  useEffect(async () => {
    try {
      let nfts = await fetchMintedNfts();
      if (nfts === undefined || nfts.length == 0) return;
      setListed(nfts);
    } catch (err) {}
  }, [fetchMintedNfts]);

  const CenterSpinner = () => {
    return (
      <Center>
        <Spinner color={color} size="lg" />
      </Center>
    );
  };

  return (
    <Tabs w="100%" variant="soft-rounded" colorScheme="green" isFitted ml="5">
      <TabList mb="1em">
        <Tab>Collection</Tab>
        <Tab>Minted NFTs</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {loading ? <CenterSpinner /> : <NftList path={"profile"} nftList={bought} />}
        </TabPanel>
        <TabPanel>
          {loading ? <CenterSpinner /> : <NftList minted path={"profile"} nftList={listed} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Profile;
