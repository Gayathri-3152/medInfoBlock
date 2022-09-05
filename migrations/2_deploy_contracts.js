const MedInfo = artifacts.require("MedInfo");

module.exports = function (deployer) {
  deployer.deploy(MedInfo);
};
