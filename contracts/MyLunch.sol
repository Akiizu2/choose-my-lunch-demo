pragma solidity ^0.4.23;

contract MyLunch {
  struct food {
    uint voteCount;
    bytes32 name;
  }

  struct votingFoodListStruct {
    address owner;
    food[] foodList;
  }

  votingFoodListStruct public votingFoodList;

  constructor(bytes32[] foodNameList) public {
    votingFoodList.owner = msg.sender;
    for (uint index = 0; index < foodNameList.length; index++) {
      votingFoodList.foodList.push(food({
        name: foodNameList[index],
        voteCount: 0
      }));
    }
  }

  function getFoodListCount() public view returns (uint) {
    return votingFoodList.foodList.length;
  }

  function getFoodDetailByIndex(uint index) public view returns (bytes32 foodName, uint voteCount) {
    bytes32 name = votingFoodList.foodList[index].name;
    uint count = votingFoodList.foodList[index].voteCount;
    return (name,count);
  }

  function voteFoodByName(bytes32 foodName,uint point) public {
    for (uint i = 0; i < getFoodListCount(); i++ ) {
      (bytes32 name,uint count) = getFoodDetailByIndex(i);
      if (foodName == name) {
        votingFoodList.foodList[i].voteCount = count + point;
      }
    }
  }

  function closeVoting() public {
    require(msg.sender == votingFoodList.owner,"You're not owner");
    selfdestruct(msg.sender);
  }

}