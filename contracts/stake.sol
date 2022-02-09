// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;
// import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
// import 'hardhat/console.sol';

// contract stake {
//     IERC20 public mytoken;
//     IERC20 public token;
//     uint public rewardOfMyToken;
//     uint public withdrawmoney;
//     uint public ratio;
//     uint public distibrution_amount;
//     uint public x;
//     struct STAKE {
//         uint value;
//         uint deposittime;
//     }

//     mapping(address => STAKE)Since;

//     // struct user {
//     //     address users;
//     //     uint tokenamount;
//     //     uint depositusertime;
//     // }

//     // mapping(address => user) public uger;
//         // mapping(address => uint) public deposittime;

//     uint public totalsupply;
//     // mapping(address => uint) balance;

//     constructor (address _mytoken, address _token) {
//         mytoken = IERC20(_mytoken);
//         token = IERC20(_token);
//     }
//     function deposit( uint amount) public {
//         // _totalsupply = _totalsupply.add(amount);
//         // balance[msg.sender] = balance[msg.sender].add(amount);
//         // x = amount;
//         // totalsupply = totalsupply + amount;
//         Since[msg.sender].value= amount;
//         Since[msg.sender].deposittime= block.timestamp;
//         mytoken.transferFrom(msg.sender, address(this) , amount);
//     }
//     function withdraw( ) public {
//         require( block.timestamp >= Since[msg.sender].deposittime + 100 seconds);
//         require(Since[msg.sender].value != 0);
//         ratio = Since[msg.sender].value / mytoken.balanceOf((address(this)));
//         rewardOfMyToken = mytoken.balanceOf(address(this))  * ratio;
//         mytoken.transfer(msg.sender , Since[msg.sender].value);
//         token.transfer(msg.sender, rewardOfMyToken);


//         // withdrawmoney = Since[msg.sender].value + rewardOfMyToken;
//         // reward = Since[msg.sender].value * 3/100 ;
//         // money = Since[msg.sender].value + reward;
//         // totalsupply = (totalsupply - Since[msg.sender].value);
//         // totalsupply = mytoken.balanceOf((address(this)));
//         // distibrution_amount = distibrution_amount - rewardOfMyToken;

//         //Since[msg.sender].value = 0;
//     }
//     function distibuter( uint amount) public  {
//         require( amount > 0);
//         token.transferFrom(msg.sender, address(this), amount);
//         // distibrution_amount = amount;
//         // Since[msg.sender].value + rewardOfMyToken = amount;

//         // z = x + y;
//         // rewardOfMyToken = Since[msg.sender].value * x/z;
//         // mytoken.transfer(msg.sender, Since[msg.sender].value + rewardOfMyToken);


        
//     }
// }

