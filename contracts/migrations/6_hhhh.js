var Simple = artifacts.require("Simple");

module.exports = function(deployer) {
  deployer.deploy(Simple).then(() => console.log(Simple.address));
};
