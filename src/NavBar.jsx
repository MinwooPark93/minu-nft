import React from "react";

const NavBar = ({ props }) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts[0]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <div>
      <div>About</div>
      <div>Mint</div>
      <div>Team</div>

      {/* Connect */}
      {isConnected ? (
        <p>Connected</p>
      ) : (
        <button onClick={connectAccount}>Connect</button>
      )}
    </div>
  );
};

export default NavBar;
