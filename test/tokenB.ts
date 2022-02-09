import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import { expandTo18Decimals, mineBlocks } from "./utilities/utilities";
import { SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import { Token} from '../typechain';
import { Token__factory} from '../typechain';


describe ('Mytoken', async () => {
    let token: Token;
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];

    beforeEach (async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        token = await new Token__factory(owner).deploy();
    });
    it('test admin', async () => {
        expect ( await token.admin()).to.be.eq(owner.address);  
    });
    it('symbol', async () => {
        const symbol = await token.symbol();
        expect('MTN').to.be.eq(symbol);
    });
    it('name', async () => {
        const name = await token.name();
        expect('Mytoken').to.be.eq(name);
    });
    it('mint', async () => {
        const x = await token.connect(owner).balanceOf(signers[2].address);
        await token.connect(owner).mint(signers[2].address, expandTo18Decimals(100));
        expect(await token.balanceOf(signers[2].address));
    });
    it('burn', async () => {
        const x = await token.connect(owner).balanceOf(signers[1].address);
        await token.connect(owner).mint(signers[1].address, expandTo18Decimals(100));
        //await MyToken.connect(owner).approve(signers[1].address, expandTo18Decimals(50));
        await token.connect(signers[1]).burn(expandTo18Decimals(50));
        console.log('balance aftr burning',Number(token.balanceOf(signers[1].address)));
    });
    it('transfrom', async () => {
        await token.connect(owner).transfer(signers[1].address, expandTo18Decimals(100));
        await token.connect(owner).approve(signers[1].address, expandTo18Decimals(100));
        await token.connect(signers[1]).transferFrom(owner.address,signers[2].address, expandTo18Decimals(50));
    });
    it('allowance', async () => {
        await token.connect(owner).transfer(signers[1].address, expandTo18Decimals(100));
        await token.connect(owner).approve(signers[1].address, expandTo18Decimals(100));
        await token.connect(signers[1]).allowance(owner.address, signers[1].address);
        expect( await token.allowance(owner.address, signers[1].address)).to.be.eq(expandTo18Decimals(100));
    });
});

