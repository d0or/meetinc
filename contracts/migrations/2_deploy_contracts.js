var Meeting = artifacts.require("Meeting");

module.exports = function(deployer) {
  deployer.deploy(Meeting);
};
