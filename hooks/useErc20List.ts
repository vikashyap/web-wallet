import { useCryptoStore } from "@/store/CryptoStore";
import { ABI_TYPE } from "@/types/crypto";
import { useCallback, useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { useTokenState } from "./useTokenState";

interface ERC20ListProps {
  name: string;
  address: `0x${string}`;
  token: `0x${string}`;
  abi: ABI_TYPE;
}

export const useErc20List = (props: ERC20ListProps) => {
  const { address, token } = props;

  const [isLoading, setIsLoading] = useState(false);
  const transactions = useCryptoStore((state) => state.transactions);
  const setTokenData = useCryptoStore((state) => state.setTokenData);
  const updatedToken = useTokenState();

  const handleClick = useCallback(() => {
    setTokenData(props);
  }, [props, setTokenData]);

  const isLoadingForToken = useCallback(
    (token: string) => {
      return transactions.some(
        (transaction) => transaction.token === token && !!transaction.hash
      );
    },
    [transactions]
  );

  const { data: tokenData } = useBalance({
    address,
    token,
    watch: true,
  });

  useEffect(() => {
    if (token) {
      setIsLoading(isLoadingForToken(token));
    }
  }, [isLoadingForToken, token, tokenData]);

  return {
    isLoading,
    updatedToken,
    tokenData,
    handleClick,
  };
};
