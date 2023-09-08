import { networkInterfaces } from "node:os";

export function getNetworkIP() {
  const nets = networkInterfaces();
  for (let network in nets) {
    for (let info of nets[network]!) {
      if (info.family === "IPv4" && info.address.startsWith("192")) {
        return info.address;
      }
    }
  }
  throw new Error("No network IP address found.");
}
