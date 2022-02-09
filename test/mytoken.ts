import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import { Mytoken } from "../typechain";
import { Mytoken__factory } from "../typechain";
import { expandTo18Decimals, mineBlocks } from "./utilities/utilities";
import { SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';


describe ('Mytoken', async () => {
    let MyToken: Mytoken;
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];

    beforeEach (async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        MyToken = await new Mytoken__factory(owner).deploy();
    });
    it('test admin', async () => {
        expect ( await MyToken.admin()).to.be.eq(owner.address);  
    });
    it('symbol', async () => {
        const symbol = await MyToken.symbol();
        expect('MTN').to.be.eq(symbol);
    });
    it('name', async () => {
        const name = await MyToken.name();
        expect('Mytoken').to.be.eq(name);
    });
    it('mint', async () => {
        const x = await MyToken.connect(owner).balanceOf(signers[2].address);
        await MyToken.connect(owner).mint(signers[2].address, expandTo18Decimals(100));
        expect(await MyToken.balanceOf(signers[2].address));
    });
    it('burn', async () => {
        const x = await MyToken.connect(owner).balanceOf(signers[1].address);
        await MyToken.connect(owner).mint(signers[1].address, expandTo18Decimals(100));
        //await MyToken.connect(owner).approve(signers[1].address, expandTo18Decimals(50));
        await MyToken.connect(signers[1]).burn(expandTo18Decimals(50));
        console.log('balance aftr burning',Number(MyToken.balanceOf(signers[1].address)));
    });
    it('transfrom', async () => {
        await MyToken.connect(owner).transfer(signers[1].address, expandTo18Decimals(100));
        await MyToken.connect(owner).approve(signers[1].address, expandTo18Decimals(100));
        await MyToken.connect(signers[1]).transferFrom(owner.address,signers[2].address, expandTo18Decimals(50));
    });
    it('allowance', async () => {
        await MyToken.connect(owner).transfer(signers[1].address, expandTo18Decimals(100));
        await MyToken.connect(owner).approve(signers[1].address, expandTo18Decimals(100));
        await MyToken.connect(signers[1]).allowance(owner.address, signers[1].address);
        expect( await MyToken.allowance(owner.address, signers[1].address)).to.be.eq(expandTo18Decimals(100));
    })
});

