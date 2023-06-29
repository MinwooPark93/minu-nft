import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import MinuNFT from "./MinuNFT.json";

const MinuNFTAddress = process.env.REACT_APP_ETHERSCAN_NFT_ADDRESS;

const MainMint = ({ props }) => {
  const { accounts, setAccounts } = props;
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(MinuNFTAddress, MinuNFT.abi, signer);
      try {
        // 비동기로 signer의 계정 주소와
        const address = await signer.getAddress();

        // 잔여 ETH를 가져온다.
        const myBalance = await contract.balanceOf(address);

        console.log(myBalance._hex);
        console.log(myBalance._hex !== "0x00");
        console.log(parseInt(myBalance._hex, 16) !== 0); // 현재 잔액이 0보다 크다면

        const tx = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.002 * mintAmount).toString()),
        });
        console.log("tx: ", tx);

        const receipt = await tx.wait();
        console.log("receipt : ", receipt);

        if (receipt.status === 0) alert("민팅에 실패하였습니다.");
        if (receipt.status === 1) alert("민팅에 성공하였습니다.");
      } catch (error) {
        console.log("err: ", error);
        if (error?.code === "ACTION_REJECTED") {
          alert("민팅을 거부하셨습니다.");
          return;
        } else if (
          // 또는, 이체 금액이 잔액을 초과하는 경우에는
          error.error?.message ===
          "execution reverted: ERC20: transfer amount exceeds balance"
        ) {
          alert("ETH 잔액이 부족합니다.");
          return; // 종료
        }
        if (
          error?.error.message === "execution reverted: minting not enabled"
        ) {
          alert("현재 민팅이 불가능합니다.");
          return;
        }
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <h1>MinuNFT</h1>
      <p>테스트 민팅 페이지입니다.</p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>지금 바로 민팅 하세요.</p>
      )}
    </div>
  );
};

export default MainMint;
