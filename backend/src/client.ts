import { createPublicClient, webSocket} from "viem";
import { mainnet } from "viem/chains";
import { loadEnvFile } from "process";
loadEnvFile('/.env');

const client = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  transport: webSocket(process.env.ALCHEMY_WEB_SOCKET_PROVIDER, {
    key: "alchemy",
    name: "Alchemy WebSocket provider"
  }),
});

export {client};
