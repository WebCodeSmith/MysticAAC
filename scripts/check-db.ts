import { PrismaClient } from '@prisma/client'

const checkDatabase = async () => {
  const prisma = new PrismaClient()
  
  try {
    // Extrair o nome do banco do DATABASE_URL
    const dbName = process.env.DATABASE_URL?.split('/').pop()
    
    if (!dbName) {
      throw new Error('DATABASE_URL não está configurada corretamente no .env')
    }

    await prisma.$connect()
    console.log('\n=== Database Check ===')
    console.log('✅ Connected to MySQL')
    
    const database = await prisma.$queryRaw`
      SELECT SCHEMA_NAME 
      FROM INFORMATION_SCHEMA.SCHEMATA 
      WHERE SCHEMA_NAME = ${dbName}
    `
    
    if (!Array.isArray(database) || database.length === 0) {
      console.log(`❌ Database "${dbName}" not found`)
      process.exit(1)
    }
    
    console.log(`✅ Database "${dbName}" exists`)
    console.log('===================\n')
    
  } catch (error) {
    console.error('\n=== Database Check ===')
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : String(error))
    console.error('===================\n')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()