import { useCryptoStore } from "@/store/CryptoStore";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { useEffect, useMemo, useState } from "react";

export function useTokenState() {
  const [data, setData] = useState<ERC20_TOKENS_TYPE>(); // local state to store the data from the store

  // Subscribe to valid data changes in token, and update the token data
  useEffect(() => {
    const unsubscribe = useCryptoStore.subscribe((changedToken) => {
      setData(changedToken.tokenData ?? undefined);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, []);

  // Return the data when diffrent token is selected
  return useMemo(() => {
    if (!data) {
      return null;
    }
    return data;
  }, [data]);
}
