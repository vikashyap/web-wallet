import { FC } from "react";

import { useSendToken } from "@/hooks/useSendToken";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";

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
  const { writeTokenData, selectedToken, isValid } = useSendToken(props); // Custom hook to handle transaction and send token

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
