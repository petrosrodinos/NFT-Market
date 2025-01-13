var NFTMarketplace = artifacts.require("./NFTMarketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(NFTMarketplace);
};
