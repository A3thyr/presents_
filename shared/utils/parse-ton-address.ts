import { Address } from "@ton/core";

export function parseAddress(address: string) {
  const userFriendlyAddress = Address.parse(address).toString();
  return userFriendlyAddress;
}
