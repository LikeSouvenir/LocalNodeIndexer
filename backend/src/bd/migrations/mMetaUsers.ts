import { Pool } from 'pg';

export class UsersInfoMigration {
  constructor(
    private pool: Pool,
  ) {}

  async up() {
    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');

      await this.createTable(client);
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
      CREATE TABLE IF NOT EXISTS users_meta (
        address SERIAL PRIMARY KEY,
        balance BIGINT default(0),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_address 
      ON users_meta(address);
    `);
  }
}
