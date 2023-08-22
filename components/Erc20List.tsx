import { useErc20List } from "@/hooks/useErc20List";
import { ABI_TYPE } from "@/types/crypto";
import { FC } from "react";
import { Loader } from ".";

interface ERC20ListProps {
  name: string;
  address: `0x${string}`;
  token: `0x${string}`;
  abi: ABI_TYPE;
}

export const Erc20List: FC<ERC20ListProps> = (props) => {
  const { token, name } = props;

  const { isLoading, updatedToken, tokenData, handleClick } =
    useErc20List(props); // custom hook to handle the load of the token

  return (
    <div
      className={`relative max-w-sm rounded overflow-hidden shadow-lg p-6 m-4outline outline-offset-2 text-white transform transition-transform hover:scale-105 shadow-lg shadow-zinc-500/50 blue-glassmorphism outline-zinc-50 ${
        isLoading && "card-border-animation"
      } ${
        updatedToken?.token === token &&
        "border-4 border-indigo-500 scale-110 bg-indigo-100/10"
      }`}
    >
      {isLoading && <Loader key={String(isLoading)} />}
      <h3 className="text-xl mb-4 text-gradient">{`Token name : ${name}`}</h3>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gradient">Balance:</div>
        <div className="font-bold text-xl mb-2">{tokenData?.formatted}</div>
        <p className="text-gray-400 text-base text-gradient">
          Symbol: {tokenData?.symbol}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <button
          disabled={isLoading}
          type="button"
          onClick={handleClick}
          className="inline-block bg-indigo-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 hover:bg-indigo-600"
        >
          Click to Select Token
        </button>
      </div>
    </div>
  );
};
