import { ERC20_TOKENS_TYPE } from "@/types/crypto";
import { create } from "zustand";

interface TransactionRecord {
  token: string;
  hash: string;
}

interface CryptoStoreState {
  tokenData: ERC20_TOKENS_TYPE | null;
  setTokenData: (data: ERC20_TOKENS_TYPE | null) => void;
  transactions: TransactionRecord[];
  setTransactionHash: (record: TransactionRecord) => void; // Renamed to match the interface
  removeTransactionHash: (hash: string) => void; // Renamed to match the interface
}

export const useCryptoStore = create<CryptoStoreState>((set) => ({
  tokenData: null,
  transactions: [],

  // Set token data
  setTokenData: (data: ERC20_TOKENS_TYPE | null) => set({ tokenData: data }),

  // Add transaction to the transactions array
  setTransactionHash: (record: TransactionRecord) =>
    set((state) => ({
      transactions: [...state.transactions, record],
    })),

  // Remove a transaction from the transactions array by its hash
  removeTransactionHash: (hash: string) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.hash !== hash
      ),
    })),
}));
