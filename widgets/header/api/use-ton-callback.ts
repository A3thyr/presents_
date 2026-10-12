"use client";

import { UserService } from "@/entities/user";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { parseAddress } from "@/shared/utils/parse-ton-address";

export function useTonCallback() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  useEffect(() => {
    const handleConnectionChange = async () => {
      if (wallet) {
        try {
          await UserService.postUserWalletConnect({
            wallet: parseAddress(wallet.account.address),
          });
          console.log(
            "Wallet connected successfully:",
            parseAddress(wallet.account.address)
          );
        } catch (error) {
          console.error("Failed to send a wallet address:", error);
          tonConnectUI.disconnect();
        }
      }
    };
    handleConnectionChange();
  }, [wallet, tonConnectUI]);

  return { wallet };
}
