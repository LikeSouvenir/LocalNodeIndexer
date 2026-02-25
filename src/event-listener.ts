import { createPublicClient, webSocket} from "viem";
import { mainnet } from "viem/chains";
import { tetherUSDTAbi } from "./core/abi.js";
const TETHER_USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7' as const;

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

const logEvents = await client.getContractEvents({
  abi: tetherUSDTAbi,
  address: TETHER_USDT,
  eventName: "Transfer"
});


const blockNumber = await client.getBlockNumber();

console.log(logEvents);
console.log(blockNumber);
