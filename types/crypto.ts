import { EUNNA_ABI } from "@/consts/EUNNA_ABI";
import { VIK_ABI } from "@/consts/VIK_ABI";

export type ERC20_TOKENS_TYPE = {
  name: string;
  address: `0x${string}`;
  token: `0x${string}`;
  abi: ABI_TYPE;
};

export type ABI_TYPE = typeof EUNNA_ABI | typeof VIK_ABI;
