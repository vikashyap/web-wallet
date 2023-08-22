import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { EUNNA_COIN_ABI } from "./EUNNA_COIN_ABI";
import { VIK_ABI } from "./VIK_ABI";

export const ERC20_TOKENS: ERC20_TOKENS_TYPE[] = [
  {
    name: "Vik Coin",
    address: "0x80C0010f7eeFb5dC8f89BA166c64e697a874C362",
    token: "0xF0A920FF433751497b26ca4b528fD9472cA133D0",
    abi: VIK_ABI,
  },
  {
    name: "Eunna Coin",
    address: "0x80C0010f7eeFb5dC8f89BA166c64e697a874C362",
    token: "0x6EC23DbA39F0531B64611F984a73FCa080932BB7",
    abi: EUNNA_COIN_ABI,
  },
];
