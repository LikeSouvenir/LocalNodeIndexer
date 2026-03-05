import type { Address } from "viem";

export interface MetaInfo {
  name: string;
  symbol: string;
  address: Address;
  totalSupply: bigint;
  initialBlock: number;
  isPaused: boolean;
  decimals: number;
  owner: Address;
  createdAt?: Date;
}

export interface UserBalance {
  address: Address;
  balance: bigint;
  lastUpdated: Date;
  lastUpdatedBlock: bigint;
}

export interface TransferEvent {
  id?: bigint;
  from: Address;
  to: Address;
  value: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface ApprovalEvent {
  id?: bigint;
  owner: Address;
  spender: Address;
  value: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface PauseEvent {
  id?: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface UnpauseEvent {
  id?: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface DestroyedBlackFundsEvent {
  id?: bigint;
  blackListedUser: Address;
  balance: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface AddedBlackListEvent {
  id?: bigint;
  user: Address;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface RemovedBlackListEvent {
  id?: bigint;
  user: Address;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface IssueEvent {
  id?: bigint;
  amount: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface RedeemEvent {
  id?: bigint;
  amount: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface DeprecateEvent {
  id?: bigint;
  newAddress: Address;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface ParamsEvent {
  id?: bigint;
  feeBasisPoints: bigint;
  maxFee: bigint;
  transactionHash: Address;
  blockNumber: bigint;
  logIndex: number;
  timestamp?: Date;
  createdAt?: Date;
}

export interface ProcessedBlock {
  lastProcessedBlock: bigint;
  updatedAt: Date;
}

export interface BlackList {
  user: Address;
  addedAt: Date;
  addedInBlock: bigint;
  isActive: boolean;
  removedAt?: Date;
  removedInBlock?: bigint;
}
