const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.parseEther('1');
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);
    arbiterAddress = (await arbiter).getAddress();
    beneficiaryAddress = (await beneficiary).getAddress();
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      arbiterAddress,
      beneficiaryAddress,
      {
        value: deposit,
      }
    );
    await contract.waitForDeployment();
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.target);
    expect(balance).to.equal(deposit);
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      let beneficiaryConnect = await contract.connect(beneficiary); 
      expect(beneficiaryConnect.approve()).to.be.reverted;
    });
  });

  describe('after approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance(beneficiaryAddress);
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();
      const after = await ethers.provider.getBalance(beneficiaryAddress);
      console.log('after:', deposit);
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
