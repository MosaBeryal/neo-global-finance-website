import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let connectionError: Error | null = null;

// Initialize pool with error handling
const initPool = () => {
  if (pool) return pool;

  try {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'neo_finance',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
    });
    return pool;
  } catch (error) {
    connectionError = error as Error;
    return null;
  }
};

export function isDatabaseAvailable(): boolean {
  if (connectionError) return false;
  try {
    initPool();
    return pool !== null;
  } catch {
    return false;
  }
}

export function getDatabaseError(): string {
  if (!connectionError && pool) return '';
  const error = connectionError?.message || 'MySQL connection failed';
  return `Database Error: ${error}. Please ensure MySQL is running and environment variables are configured correctly.`;
}

export async function getConnection() {
  const currentPool = initPool();
  if (!currentPool) {
    throw new Error(
      'Database connection unavailable. MySQL server is not running or credentials are incorrect. ' +
      'Please check your .env file and ensure MySQL is accessible.'
    );
  }
  const connection = await currentPool.getConnection();
  return connection;
}

export async function query(sql: string, values?: any[]) {
  try {
    const connection = await getConnection();
    try {
      const [results] = await connection.execute(sql, values);
      return results;
    } finally {
      connection.release();
    }
  } catch (error) {
    // Silently handle connection errors in preview environment
    if (process.env.NODE_ENV === 'development' && (error as any)?.code === 'ECONNREFUSED') {
      return [];
    }
    throw error;
  }
}

export async function queryOne(sql: string, values?: any[]) {
  const results: any = await query(sql, values);
  return results?.[0] || null;
}
