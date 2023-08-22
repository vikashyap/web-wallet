import { useCryptoStore } from "@/store/CryptoStore";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { FC, useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type ResetFunction = () => void;

type FormData = {
  addressTo: string;
  amount: string;
};

interface SendTokenProps {
  selectedToken: ERC20_TOKENS_TYPE | undefined;
  isValid: boolean;
  formData: FormData;
}

export const SendToken: FC<SendTokenProps> = (props) => {
  const { selectedToken, isValid, formData } = props;
  const { addressTo, amount } = formData;
  // Zustand store actions

  const setTransactionHash = useCryptoStore(
    (state) => state.setTransactionHash
  );
  const removeTransactionHash = useCryptoStore(
    (state) => state.removeTransactionHash
  );

  const [lastProcessedHash, setLastProcessedHash] = useState<string | null>(
    null
  );
  const [transactionQueue, setTransactionQueue] = useState<string[]>([]); // List of transaction hashes
  const [currentTransactionIndex, setCurrentTransactionIndex] =
    useState<number>(0);
  const currentTransactionHash = transactionQueue[
    currentTransactionIndex
  ] as `0x${string}`;

  const { address: userAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: selectedToken?.token,
    abi: selectedToken?.abi,
    functionName: "transferFrom",
    args: [userAddress, addressTo, parseEther(amount)],
  });

  const { data: SendTokenData, write: writeTokenData } =
    useContractWrite(config);

  const { isLoading: isLoadingTransaction, isFetching } = useWaitForTransaction(
    {
      confirmations: 1,
      hash: currentTransactionHash,
      onSettled(data, error) {
        removeTransactionHash(currentTransactionHash);
        setCurrentTransactionIndex((prevIndex) => prevIndex + 1);
      },
    }
  );

  useEffect(() => {
    if (
      SendTokenData?.hash &&
      SendTokenData?.hash !== lastProcessedHash &&
      selectedToken?.token
    ) {
      setTransactionHash({
        token: selectedToken?.token,
        hash: SendTokenData?.hash,
      });
      // Update the last processed hash
      setLastProcessedHash(SendTokenData?.hash);
      setTransactionQueue((prevQueue) => [...prevQueue, SendTokenData?.hash]);
    }
  }, [
    isLoadingTransaction,
    SendTokenData?.hash,
    removeTransactionHash,
    setTransactionHash,
    selectedToken?.token,
    lastProcessedHash,
  ]);

  return (
    <button
      type="button"
      disabled={!selectedToken?.token || !isValid}
      onClick={() => {
        writeTokenData?.();
      }}
      className={`${
        (!selectedToken?.token || !isValid) && "disabled:cursor-not-allowed"
      } text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer`}
    >
      Send now
    </button>
  );
};
