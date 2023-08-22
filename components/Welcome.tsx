import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsInfoCircle } from "react-icons/bs";
import { PiHandCoinsBold } from "react-icons/pi";

import { ERC20_TOKENS } from "@/consts/ERC20_TOKENS";
import { useTokenState } from "@/hooks/useTokenState";
import { useAccount, useBalance } from "wagmi";
import { Erc20List } from "./Erc20List";
import { TransferTokenForm } from "./TransferTokenForm";

export const Welcome = () => {
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address,
  });

  const updatedToken = useTokenState(); // Custom hook to get the token state

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 flex-grow">
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>

          {!isConnected && (
            <div className="my-5">
              <ConnectButton />
            </div>
          )}
          {isConnected && (
            <h3 className="text-3xl sm:text-5xl text-white text-gradient my-5">
              List of ERC20
            </h3>
          )}
          <div className="container mx-auto px-4 sm:grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {isConnected &&
              ERC20_TOKENS &&
              ERC20_TOKENS.map((eec20) => (
                <Erc20List key={eec20.name} {...eec20} />
              ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-96 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <PiHandCoinsBold fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mt-1">
                  Account Info
                </p>

                <p className="text-white font-light text-sm">
                  {address ?? "address"}
                </p>

                <p className="text-white font-semibold text-lg mt-1">
                  {data ? `${data?.symbol} - ${data?.formatted}` : "0.00"}
                </p>
              </div>
            </div>
          </div>

          <TransferTokenForm token={updatedToken} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
