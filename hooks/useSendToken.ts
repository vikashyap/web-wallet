import { useCryptoStore } from "@/store/CryptoStore";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type FormData = {
  addressTo: string;
  amount: string;
};

interface UseSendTokenProps {
  selectedToken: ERC20_TOKENS_TYPE | undefined;
  isValid: boolean;
  formData: FormData;
}

export const useSendToken = (props: UseSendTokenProps) => {
  const { selectedToken, isValid, formData } = props;
  const { addressTo, amount } = formData;

  const setTransactionHash = useCryptoStore(
    (state) => state.setTransactionHash
  );
  const removeTransactionHash = useCryptoStore(
    (state) => state.removeTransactionHash
  );

  const [lastProcessedHash, setLastProcessedHash] = useState<string | null>(
    null
  );
  const [transactionQueue, setTransactionQueue] = useState<string[]>([]);
  const [currentTransactionIndex, setCurrentTransactionIndex] =
    useState<number>(0);

  const currentTransactionHash = transactionQueue[
    currentTransactionIndex
  ] as `0x${string}`;
  const { address: userAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: selectedToken?.token,
    abi: selectedToken?.abi,
    functionName: "transfer",
    args: [addressTo, parseEther(amount)],
  });

  const {
    data: SendTokenData,
    write: writeTokenData,
    error,
    reset: resetWriteTokenData,
  } = useContractWrite(config);

  if (error) {
    toast.error(error.message.substring(0, 50));
    resetWriteTokenData();
  }

  const { isLoading: isLoadingTransaction, error: transactionError } =
    useWaitForTransaction({
      confirmations: 1,
      hash: currentTransactionHash,
      onSettled(data, error) {
        removeTransactionHash(currentTransactionHash);
        setCurrentTransactionIndex((prevIndex) => prevIndex + 1);
        toast.success(
          `Transaction successful of ${currentTransactionHash.substring(0, 5)}`
        );
      },
    });

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

  return {
    writeTokenData,
    selectedToken,
    isValid,
  };
};
