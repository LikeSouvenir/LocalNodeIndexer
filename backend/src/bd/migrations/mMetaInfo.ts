import { Pool } from 'pg';
import type { Address } from 'viem';
import { client } from '../../client.js';
import abi from '../../core/abi.json' with { type: 'json' };

export class MetaInfoMigration {
  constructor(
    private pool: Pool,
    private contractAddress: Address
  ) {}

  async up() {
    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');
      
      await this.createTable(client);
      
      const metaInfo = await this.fetchMetaInfo();
      
      await this.saveMetaInfo(client, metaInfo);
      
      await client.query('COMMIT');
      console.log('Migration completed');
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Migration failed:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  private async createTable(client: any) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contract_meta (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        symbol VARCHAR(20) NOT NULL,
        address VARCHAR(42) UNIQUE NOT NULL,
        total_supply NUMERIC(78, 0),
        is_paused BOOLEAN DEFAULT false,
        decimals SMALLINT DEFAULT 18,
        owner VARCHAR(42) NOT NULL,
        initial_block BIGINT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_contract_address 
      ON contract_meta(address);
    `);
  }

  private async fetchMetaInfo() {
    const [name, symbol, owner, totalSupply, decimals, paused] = await Promise.all([
      this.readContract('name'),
      this.readContract('symbol'),
      this.readContract('owner'),
      this.readContract('totalSupply'),
      this.readContract('decimals'),
      this.readContract('paused')
    ]);
    
    return { name, symbol, owner, totalSupply, decimals, paused };
  }

  private async readContract(functionName: string) {
    return await client.readContract({
      address: this.contractAddress,
      abi: abi,
      functionName: functionName
    });
  }

  private async saveMetaInfo(client: any, meta: any) {
    await client.query(`
      INSERT INTO contract_meta (
        name, symbol, address, total_supply, is_paused, decimals, owner, initial_block
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (address) DO UPDATE SET
        total_supply = EXCLUDED.total_supply,
        is_paused = EXCLUDED.is_paused,
        owner = EXCLUDED.owner,
        updated_at = CURRENT_TIMESTAMP;
    `, [
      meta.name,
      meta.symbol,
      this.contractAddress,
      meta.totalSupply.toString(),
      meta.paused,
      meta.decimals,
      meta.owner,
      0
    ]);
  }
}
