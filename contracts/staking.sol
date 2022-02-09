//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import 'hardhat/console.sol';

contract stake {
    IERC20 public mytoken;
    IERC20 public token;
    uint public Total_amount;
    uint public Reward;
    uint public s;
    mapping(address => uint) Ss;
    mapping(address => uint256) pandy;
    uint public deposit_reward;
    
    
    struct STAKE {
        uint value;
        uint deposittime;
    }
    mapping(address => STAKE)Since;

    constructor (address _mytoken, address _token) {
        mytoken = IERC20(_mytoken);
        token = IERC20(_token);
    }
    function deposit( uint amount) public  {
        if(Since[msg.sender].value != 0 ){
            Reward = pandy[msg.sender] + Since[msg.sender].value *  (s - Ss[msg.sender]);
            pandy[msg.sender] = pandy[msg.sender] + Reward  ;
        }
        Ss[msg.sender] = s;
        Since[msg.sender].value += amount;
        Since[msg.sender].deposittime= block.timestamp;
        Total_amount += amount;  
        console.log(Total_amount);
        mytoken.transferFrom(msg.sender, address(this) , amount);
    }
    function withdraw() public {
        require( block.timestamp >= Since[msg.sender].deposittime + 100 seconds);
        require(Since[msg.sender].value != 0);
        Reward = (pandy[msg.sender] + (Since[msg.sender].value *  (s - Ss[msg.sender]))) / 1000;       
        mytoken.transfer(msg.sender , Since[msg.sender].value);
        token.transfer(msg.sender, Reward);
        Total_amount = Total_amount - Since[msg.sender].value;
        
    }
    function distibuter(uint amount) public  {
        require( amount > 0);
        deposit_reward = amount; 
        console.log(Total_amount);
        s = (s + ((deposit_reward * 1000 ) /  Total_amount)); 
        token.transferFrom(msg.sender, address(this), amount); 
    }
}
