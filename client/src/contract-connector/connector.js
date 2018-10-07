import Web3 from 'web3'

import MyLunch from './contracts/MyLunch.json';

const contractHost = 'http://localhost:7545'

let web3
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(contractHost));
}

const getContract = () => {
  const { abi } = MyLunch
  const contractAddress = '0xb6c70b2937104b331ba628dcc27981397f579e21'
  const contract = new web3.eth.Contract(abi, contractAddress)
  return contract
}

export const getFoodListCount = async () => {
  const foodCount = await getContract().methods.getFoodListCount().call()
  let foodList = []
  for (let i = 0; i < foodCount; i++) {
    const foodDetail = await getContract().methods.getFoodDetailByIndex(i).call()
    const { foodName: foodNameByte32, voteCount } = foodDetail
    const foodName = web3.utils.hexToAscii(foodNameByte32)
    foodList = [
      ...foodList,
      {
        foodName,
        voteCount: +voteCount,
      }
    ]
  }
  return foodList
}