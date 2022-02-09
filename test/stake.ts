// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Stake } from "../typechain";
// import { Stake__factory } from "../typechain";
// import { expandTo18Decimals, mineBlocks } from "./utilities/utilities";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { sign, Signer } from "crypto";
// import { Mytoken} from "../typechain";
// import { Mytoken__factory} from "../typechain"
// import { ContractTransaction } from "@ethersproject/contracts";
// import {Token} from "../typechain";
// import { Token__factory} from "../typechain"

// describe.only('stake', async ()=> {
//     let stake: Stake;
//     let signers: SignerWithAddress[];
//     let mytoken: Mytoken;
//     let owner: SignerWithAddress;
//     let rewardtoken: Token;
//     beforeEach(async ()=> {
//         signers = await ethers.getSigners();
//         owner = signers[0];
//         mytoken = await new Mytoken__factory(owner).deploy();
//         rewardtoken = await new Token__factory(owner).deploy();
//         stake = await new Stake__factory(owner).deploy(mytoken.address, rewardtoken.address);
//     });
//     it ("deposit", async () => {
        
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         await mytoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));

//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(100));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(100));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await stake.connect(signers[1]).deposit(expandTo18Decimals(50));
//         await stake.connect(signers[2]).deposit(expandTo18Decimals(60));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
        
//     });
//     it.only ("Withdraw", async () => {

//         console.log("Current Balance of signers[1] ", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         await mytoken.connect(owner).mint(signers[1].address, expandTo18Decimals(150));
//         // console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(150));
//         console.log("current Balance of signers[1]", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         // await stake.connect(signers[1]).deposit(expandTo18Decimals(100));
//         // console.log("current Balance", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));


//         console.log("Current Balance of Signers[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(100));
//         // console.log("Current Balance", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(100));
//         console.log("Current Balance of signers[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         await stake.connect(signers[1]).deposit(expandTo18Decimals(100));
//         await stake.connect(signers[2]).deposit(expandTo18Decimals(70));
//         console.log("Current Balance of signers[1]", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         console.log("Current Balance of signers[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));



//         console.log("Current Balances of stake", Number(await rewardtoken.balanceOf(stake.address)));
//         await rewardtoken.connect(owner).mint(signers[1].address, expandTo18Decimals(150));
//         await rewardtoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(150));
//         // console.log("current Balances", Number(await rewardtoken.balanceOf(stake.address)));

//         await stake.connect(signers[1]).distibuter(expandTo18Decimals(150));
//         console.log("Current Balances of stake", Number(await rewardtoken.balanceOf(stake.address)));

//         await mineBlocks(ethers.provider, 100);
//         await stake.connect(signers[1]).withdraw();
//         await stake.connect(signers[2]).withdraw();
        

//         console.log("current balances of stake after withdraw", Number(await rewardtoken.balanceOf(stake.address)));
//         console.log("Current Balance of signer[1]", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         console.log("Current Balance of signer[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
//         console.log("current balance of Signer[2[ rewardtoken", Number(await rewardtoken.balanceOf(signers[2].address)));
//         // console.log(Number(await rewardtoken.balanceOf(signers[1].address)));



//         //console.log("current Balance of signers[1]", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
//         //console.log("current Balance of signers[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));

//         // let x:  =  Const y:  * 3/100;
//         // await mytoken.connect(owner).(stake.address, expandTo18Decimals(300));    
//         // await mytoken.connect(owner).approve(stake.address, expandTo18Decimals(300));
   
//         // await stake.connect(owner).deposit(expandTo18Decimals(3));
//         // await mytoken.connect(owner).approve(signers[1].address, expandTo18Decimals(60))
//         //await stake.connect(signers[1]).distibuter(expandTo18Decimals(100))
//         //await mytoken.connect(owner).transfer(signers[1].address, expandTo18Decimals());
        
//         // console.log("Balance of stake", Number(mytoken.connect(stake.address).balance));
//         // console.log("Balance of contract", Number(mytoken.connect(owner).balanceOf(stake.address)));
//     });
//     it ("distibuter", async () => {
//         console.log("Balance of stake", Number(await rewardtoken.balanceOf(stake.address)));
//         console.log("Current Balance", Number(await rewardtoken.connect(owner).balanceOf(signers[1].address)));
//         await rewardtoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
//         console.log("Balance of stake", Number(await rewardtoken.balanceOf(owner.address)));
//         // console.log("Current Balance", Number(await rewardtoken.connect(signers[1]).balanceOf(stake.address)));
//         await rewardtoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
//         console.log("Current Balance after approve", Number(await rewardtoken.balanceOf(stake.address)));
//         await stake.connect(signers[1]).distibuter(expandTo18Decimals(60));
//         console.log("Current Balance", Number(await rewardtoken.balanceOf(stake.address)));
        
//         // console.log("Current Balance", Number(await rewardtoken.connect(owner).balanceOf(signers[1].address)));
//         // await rewardtoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
//         // console.log("Current Balance", Number(await rewardtoken.connect(owner).balanceOf(signers[1].address)));
//         // await rewardtoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
//         // console.log("",Number(await rewardtoken.balanceOf(stake.address)));
//         // await stake.connect(signers[1]).deposit(expandTo18Decimals(50));
//         // // await rewardtoken.connect(owner).transferFrom(signers[1].address, stake.address, expandTo18Decimals(5));
//         // console.log("",Number(await rewardtoken.balanceOf(stake.address)));
//         // console.log("Current Balance", Number(await rewardtoken.connect(owner).balanceOf(signers[1].address)));
//         // await stake.connect(signers[1]).distibuter(expandTo18Decimals(50));
//         // console.log("Current Balance", Number(await rewardtoken.connect(owner).balanceOf(signers[1].address)));
//     });
    

// });


