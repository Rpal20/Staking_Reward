// import { Lottery } from './../typechain/Lottery.d';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
// import { ethers } from 'hardhat';
// import { Lottery__factory } from './../typechain/factories/Lottery__factory';
// import { expect } from 'chai';
// import { expandTo18Decimals } from './utilities/utilities';
// import { int } from 'hardhat/internal/core/params/argumentTypes';
// import { FixedNumber } from '@ethersproject/bignumber';

// describe('Lottery', async () => {
//     let lottery: Lottery;
//     let signers: SignerWithAddress[];
//     let owner: SignerWithAddress;
//     beforeEach(async () => {
//         signers = await ethers.getSigners();
//         //console.log(signers);
//         owner = signers[0];
//         lottery = await new Lottery__factory(owner).deploy();
//     });
//     it('Test enter function', async () => {
//         expect(await lottery.manager()).to.be.eq(owner.address);
//     });
//     it('allow users', async() => {
//         await lottery.connect(signers[1]).enter({value:expandTo18Decimals(1)});
//         //expect(await lottery.players(0)).to.be.eq(await signers[1].address);
//         expect(await signers[1].address).to.be.eq(await lottery.players(0));
//     }); 
//     it('allow multiple user to enter', async ()=> {
//         await lottery.connect(signers[2]).enter({value:expandTo18Decimals(1)});
//             expect (await signers[2].address).to.be.eq(await lottery.players(0));
//         await lottery.connect(signers[3]).enter({value:(expandTo18Decimals(1))});
//             expect (await signers[3].address).to.be.eq(await lottery.players(1));
//         await lottery.connect(signers[4]).enter({value:expandTo18Decimals(1)});
//             expect (await signers[4].address).to.be.eq(await lottery.players(2));
//             console.log(await lottery.manager());
//             console.log(await owner.address);
//       });
//       it('only manager can call pick winner',async () =>{
//         await lottery.connect(owner).enter({value:expandTo18Decimals(1)});
//         console.log(await lottery.manager());
//         await lottery.connect(owner).pickWinner();
//       });
//       it(" send money to the winner and make surerest the array player", async () => {
//             await lottery.connect(signers[0]).enter({value:expandTo18Decimals(2)});
//             const intialBalance: any = ethers.getSigners();
//             await lottery.connect(signers[0])['pickWinner()'];
//             const finalBalance: any = ethers.getSigners();
//             await lottery.connect(signers[0])['pickWinner()'];
//             const difference: any = finalBalance - intialBalance;
//             console.log(difference);
//             expect(difference < (await ethers.getSigners()).entries()
//         });
// });
