pragma solidity^0.4.22;

contract Lottery {
  address public manager;
  address[] public players;

  constructor() public {
    manager = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == manager, "Sender must be the manager");
    _;
  }

  function enter() public payable {
    require(msg.value > .01 ether, "Insufficient value");
    players.push(msg.sender);
  }

  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
  }

  function pickWinner() public restricted {
    uint index = random() % players.length;
    players[index].transfer(address(this).balance);
    players = new address[](0);
  }

  function getPlayers() public view returns (address[] memory) {
    return players;
  }
}