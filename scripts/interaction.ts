import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x9b39Fb4c93d80dF3E91a0369c5B6599Cf80873A4";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0xA4Dc2B96Eef1D5189260eb4a7e53C482C439d1b4";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    // console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);

    // Withdrawal Interaction
    const withdrawalAmount = ethers.parseUnits("50", 18); // Example amount to withdraw
    const withdrawTx = await saveERC20.withdraw(withdrawalAmount);
    console.log(withdrawTx);

    await withdrawTx.wait();

    const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance after withdrawal:",contractBalanceAfterWithdrawal);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
