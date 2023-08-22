import { useTransferTokenForm } from "@/hooks/useTransferTokenForm";
import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import React from "react";
import { Controller } from "react-hook-form";
import { SendToken } from "./SendToken";

interface CardProps {
  token: ERC20_TOKENS_TYPE | null;
}

export const TransferTokenForm: React.FC<CardProps> = ({
  token: tokenData,
}) => {
  const { control, errors, getValues, isValid, rotateDegree, selectedToken } =
    useTransferTokenForm({ token: tokenData }); // Custom hook to handle the form

  return (
    <div
      style={{
        transform: `rotateY(${rotateDegree}deg)`,
        transition: "transform 1s",
      }}
      className="sm:w-96 w-full transform transition-transform duration-500"
    >
      <h3 className="text-3xl sm:text-5xl text-white text-gradient my-5">
        {(selectedToken?.name && `Send ${selectedToken?.name}`) ??
          "Select a token"}
      </h3>

      <div className="flex flex-col justify-start items-center blue-glassmorphism">
        <Controller
          name="addressTo"
          control={control}
          defaultValue=""
          rules={{
            required: "Address is required",
            pattern: {
              value: /^0x[a-fA-F0-9]{40}$/,
              message: "Invalid Ethereum address",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Address To"
              type="text"
              className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            />
          )}
        />
        {errors.addressTo && (
          <p className="text-red-900">{errors.addressTo.message}</p>
        )}

        <Controller
          name="amount"
          control={control}
          rules={{ min: 0.0001 }}
          defaultValue={0.0001}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Amount (ETH)"
              type="number"
              step="0.0001"
              className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            />
          )}
        />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {!(!!selectedToken && isValid) ? (
          <h5 className="text-white text-sm p-5 text-xl text-center">
            Please Select the token and enter Valid Data
          </h5>
        ) : (
          <SendToken
            formData={{
              addressTo: getValues("addressTo"),
              amount: String(getValues("amount")),
            }}
            isValid={isValid}
            selectedToken={selectedToken}
          />
        )}
      </div>
    </div>
  );
};
