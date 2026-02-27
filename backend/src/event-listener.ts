import type { BlockNumber} from "viem";
import {client} from "./client.js";
import {tetherUSDTAbi } from  "./core/abi.js";
// import { getContract } from "viem";

const TETHER_USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7' as const;
const numToHash = new Map<bigint, string>();

const watchEvent = client.watchContractEvent({
  address: TETHER_USDT,
  abi: tetherUSDTAbi,
  onLogs: logs => {

    if (logs[0]) checkAndPushBlock(logs[0].blockNumber, logs[0].blockHash);

  logs.forEach(log => {
      console.log(log)
    })
  },
  onError: error => console.error(error)
})

async function checkAndPushBlock(blockNumber:bigint, blockHash: string) {
  let hash = numToHash.get(blockNumber)

  if (!hash) 
    numToHash.set(blockNumber, blockHash);

  else if (blockHash !== hash) {
    let found = false;
    let currentBlock = blockNumber;

    while (found) {
        currentBlock--;

        try {
          const block = await client.getBlock({blockNumber: currentBlock as BlockNumber})
          const oldHash = numToHash.get(currentBlock);

          if (block.hash === oldHash) {
            found = true;
            
            await reprocessEventsFromBlock(++currentBlock, blockNumber)
          }
      } catch(e) {
        console.error('Error fetch block data ${e}')
        break;
      }
    }
  }
}
async function reprocessEventsFromBlock(fromBlock: bigint, toBlock: bigint) {
  try {
    const logs = await client.getContractEvents({
      address: TETHER_USDT,
      abi: tetherUSDTAbi,
      fromBlock: fromBlock as BlockNumber,
      toBlock: toBlock as BlockNumber,
    });
    
    for (const log of logs) {
      numToHash.set(log.blockNumber, log.blockHash);
      console.log(`Updated block ${log.blockNumber} with correct hash: ${log.blockHash}`);
    }
    
    console.log(`Reprocessed ${logs.length} events`);
  } catch (error) {
    console.error('Error reprocessing :', error);
  }
}

export {watchEvent}
function name() {
var ss = "";
console.log("hi")
console.log(ss)
}
name
