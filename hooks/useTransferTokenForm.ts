import { ERC20_TOKENS } from "@/consts/ERC20_TOKENS";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  addressTo: `0x${string}` | string;
  amount: number;
}

interface UseTransferTokenFormProps {
  token: ERC20_TOKENS_TYPE | null;
}

export const useTransferTokenForm = (props: UseTransferTokenFormProps) => {
  const { token: tokenData } = props;

  const [tokenNameState, setTokenNameState] = useState(tokenData?.name);
  const [rotateDegree, setRotateDegree] = useState(0);

  const {
    control,
    getValues,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    if (tokenData?.name !== tokenNameState) {
      setRotateDegree((prevDegree) => (prevDegree === 0 ? 360 : 0));
      setTokenNameState(tokenData?.name);
    }
  }, [tokenData, tokenNameState]);

  const selectedToken = useMemo(() => {
    return ERC20_TOKENS.find((data) => data?.token === tokenData?.token);
  }, [tokenData]);

  return {
    control,
    errors,
    getValues,
    isValid,
    rotateDegree,
    selectedToken,
  };
};
