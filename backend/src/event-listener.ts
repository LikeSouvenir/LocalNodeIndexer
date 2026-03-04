import type { Address, BlockNumber } from "viem";
import fs from 'node:fs'
import {client} from "./client.js";
import dotenv from 'dotenv'

dotenv.config()

const abi = JSON.parse(fs.readFileSync(`${process.env.CONTRACT_ABI_PATH}`, 'utf8'))
const contractAddress = process.env.CONTRACT_ADDRESS as Address
const numToHash = new Map<bigint, string>();

const watchEvent = client.watchContractEvent({
  address: contractAddress,
  abi: abi,
  onLogs: logs => {
    try {
      if (logs[0]) checkAndPushBlock(logs[0].blockNumber as bigint, logs[0].blockHash as string);
      logs.forEach(console.log)
    } catch (error) {
      console.error(error)
    }
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
      address: contractAddress,
      abi: abi,
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
name()
