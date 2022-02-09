import { ethers } from "hardhat";
import { expect } from "chai";
import { Stake } from "../typechain";
import { Stake__factory } from "../typechain";
import { expandTo18Decimals, mineBlocks } from "./utilities/utilities";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { sign, Signer } from "crypto";
import { Mytoken} from "../typechain";
import { Mytoken__factory} from "../typechain"
import { ContractTransaction } from "@ethersproject/contracts";
import {Token} from "../typechain";
import { Token__factory} from "../typechain"

describe.only('stake', async ()=> {
    let stake: Stake;
    let signers: SignerWithAddress[];
    let mytoken: Mytoken;
    let owner: SignerWithAddress;
    let rewardtoken: Token;
    beforeEach(async ()=> {
        signers = await ethers.getSigners();
        owner = signers[0];
        mytoken = await new Mytoken__factory(owner).deploy();
        rewardtoken = await new Token__factory(owner).deploy();
        stake = await new Stake__factory(owner).deploy(mytoken.address, rewardtoken.address);
    });
    it.only ("deposit", async () => {

        await mytoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
        await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[1].address, expandTo18Decimals(100)))

        await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(100));
        await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[2].address, expandTo18Decimals(100)));

        await stake.connect(signers[1]).deposit(expandTo18Decimals(50));
        await stake.connect(signers[2]).deposit(expandTo18Decimals(60));
        console.log("current balance of Signer[1] of mytoken", Number(await mytoken.balanceOf(signers[1].address)));
        console.log("Current balance of signer[2] of mytoken", Number(await mytoken.balanceOf(signers[2].address)));



    });
    it ("Withdraw", async () => {

        await mytoken.connect(owner).mint(signers[1].address, expandTo18Decimals(100));
        await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[1].address, expandTo18Decimals(100)));

        await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(200));
        await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(200));
        expect( await mytoken.approve(signers[2].address, expandTo18Decimals(200)));

        await mytoken.connect(owner).mint(signers[3].address, expandTo18Decimals(300));
        await mytoken.connect(signers[3]).approve(stake.address, expandTo18Decimals(300));
        expect (await mytoken.approve(signers[3].address, expandTo18Decimals(300)));
        

        await stake.connect(signers[1]).deposit(expandTo18Decimals(100));
        await stake.connect(signers[2]).deposit(expandTo18Decimals(200));
        await stake.connect(signers[3]).deposit(expandTo18Decimals(300));
        console.log("current balance of Signer[1] of mytoken", Number(await mytoken.balanceOf(signers[1].address)));
        console.log("Current balance of signer[2] of mytoken", Number(await mytoken.balanceOf(signers[2].address)));
        console.log("Current balance of signer[3] of mytoken", Number(await mytoken.balanceOf(signers[3].address)));


        await rewardtoken.connect(owner).mint(signers[3].address,expandTo18Decimals(50));
        await rewardtoken.connect(signers[3]).approve(stake.address, expandTo18Decimals(50));
        await stake.connect(signers[3]).distibuter(expandTo18Decimals(50));
        console.log("Current balance of signer[3] rewardtoken", Number(await rewardtoken.balanceOf(signers[3].address)));

        await mineBlocks(ethers.provider, 100);
        await stake.connect(signers[1]).withdraw();
        await stake.connect(signers[2]).withdraw();
        await stake.connect(signers[3]).withdraw();
        console.log("current balance of Signer[1] of mytoken", Number(await mytoken.balanceOf(signers[1].address)));
        console.log("Current balance of signer[2] of mytoken", Number(await mytoken.balanceOf(signers[2].address)));
        console.log("Current balance of signer[3] of mytoken", Number(await mytoken.balanceOf(signers[3].address)));

        console.log("current balance of Signer[1] rewardtoken", Number(await rewardtoken.balanceOf(signers[1].address)));
        console.log("Current balance of signer[2] rewardtoken", Number(await rewardtoken.balanceOf(signers[2].address)));
        console.log("Current balance of signer[3] rewardtoken", Number(await rewardtoken.balanceOf(signers[3].address)));
        
       


        
    });
    it.only ("distibuter", async () => {
        await mytoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
        await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[1].address, expandTo18Decimals(100)))

        await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(100));
        await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[2].address, expandTo18Decimals(100)));

        await stake.connect(signers[1]).deposit(expandTo18Decimals(50));
        await stake.connect(signers[2]).deposit(expandTo18Decimals(60));
        console.log("current balance of Signer[1] of mytoken", Number(await mytoken.balanceOf(signers[1].address)));
        console.log("Current balance of signer[2] of mytoken", Number(await mytoken.balanceOf(signers[2].address)));


        await rewardtoken.connect(owner).mint(signers[1].address,expandTo18Decimals(100));
        await rewardtoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
        expect( await rewardtoken.approve(signers[1].address, expandTo18Decimals(100)));

        await stake.connect(signers[1]).distibuter(expandTo18Decimals(50));
        console.log("current balance of Signer[1] of mytoken", Number(await rewardtoken.balanceOf(signers[1].address)));

    });
    it ( "user deposit multiple times", async () => {
        await mytoken.connect(owner).mint(signers[1].address, expandTo18Decimals(100));
        await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(100));
        expect( await mytoken.approve(signers[1].address, expandTo18Decimals(100)));

        await mytoken.connect(owner).mint(signers[2].address,expandTo18Decimals(200));
        await mytoken.connect(signers[2]).approve(stake.address, expandTo18Decimals(200));
        expect( await mytoken.approve(signers[2].address, expandTo18Decimals(200)));

        await mytoken.connect(owner).mint(signers[3].address, expandTo18Decimals(300));
        await mytoken.connect(signers[3]).approve(stake.address, expandTo18Decimals(300));
        expect( await mytoken.approve(signers[3].address, expandTo18Decimals(300)));

        await stake.connect(signers[1]).deposit(expandTo18Decimals(100));
        await stake.connect(signers[2]).deposit(expandTo18Decimals(200));
        await stake.connect(signers[3]).deposit(expandTo18Decimals(300));

        await rewardtoken.connect(owner).mint(owner.address,expandTo18Decimals(600));
        await rewardtoken.connect(owner).approve(stake.address, expandTo18Decimals(600));
        expect ( await rewardtoken.approve(owner.address, expandTo18Decimals(600)));

        await stake.connect(owner).distibuter(expandTo18Decimals(600));
        console.log("Current Balance of stake After distributer", Number(await rewardtoken.balanceOf(stake.address)));

        await mytoken.connect(owner).mint(signers[1].address, expandTo18Decimals(400));
        await mytoken.connect(signers[1]).approve(stake.address, expandTo18Decimals(400));
        expect ( await mytoken.approve(signers[1].address, expandTo18Decimals(400)));
        await stake.connect(signers[1]).deposit(expandTo18Decimals(400))
        
    
        await rewardtoken.connect(owner).mint(owner.address,expandTo18Decimals(2000));
        await rewardtoken.connect(owner).approve(stake.address, expandTo18Decimals(2000));
        expect (await rewardtoken.approve(owner.address, expandTo18Decimals(2000)));
        await stake.connect(owner).distibuter(expandTo18Decimals(2000));
        console.log("Current Balance of stake After second distributer", Number(await rewardtoken.balanceOf(stake.address)));


        await mineBlocks(ethers.provider, 100);
        await stake.connect(signers[1]).withdraw();
        await stake.connect(signers[2]).withdraw();
        await stake.connect(signers[3]).withdraw();
                
        console.log("Current Balance of signer[1]", Number(await mytoken.connect(owner).balanceOf(signers[1].address)));
        console.log("Current Balance of signer[2]", Number(await mytoken.connect(owner).balanceOf(signers[2].address)));
        console.log("current balance of Signer[3] ", Number(await mytoken.balanceOf(signers[3].address)));

        console.log("current balance of Signer[2[ second rewardtoken", Number(await rewardtoken.balanceOf(signers[2].address)));
        console.log("Current balances of signer[1] second rewardtoken", Number(await rewardtoken.balanceOf(signers[1].address)));
        console.log("current balance of Signer[3] second rewardtoken", Number(await rewardtoken.balanceOf(signers[3].address)));

    });
    

});


