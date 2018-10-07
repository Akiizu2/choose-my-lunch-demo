var MyLunch = artifacts.require("./MyLunch.sol");

module.exports = function (deployer) {
  deployer.deploy(MyLunch, ['Noodle', 'Somtam', 'PadThai']);
};
