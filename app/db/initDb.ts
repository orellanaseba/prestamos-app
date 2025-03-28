import pool from './db';

const createTables = async (): Promise<void> => {
  try {
    const client = await pool.connect();

    const sql = `
      -- Crear la tabla de clientes
      CREATE TABLE IF NOT EXISTS clients (
          id_cliente UUID PRIMARY KEY,
          nombre VARCHAR(30) NOT NULL,
          dni VARCHAR(8) UNIQUE NOT NULL,
          email VARCHAR(60) UNIQUE NOT NULL,
          numero_telefono VARCHAR(10) NOT NULL
      );

      -- Crear la tabla de préstamos
      CREATE TABLE IF NOT EXISTS loans (
          id_loan VARCHAR(50) PRIMARY KEY,
          id_cliente UUID REFERENCES clients(id_cliente) ON DELETE CASCADE,
          nombre_cliente VARCHAR(30) NOT NULL,
          monto_prestamo INTEGER NOT NULL,
          cantidad_cuotas INTEGER NOT NULL,
          periodo_pago VARCHAR(50) NOT NULL,
          monto_cuotas INTEGER NOT NULL,
          interes INTEGER NOT NULL,
          dni_cliente VARCHAR(8) NOT NULL,
          fecha_emision DATE NOT NULL,
          fecha_pago DATE NOT NULL,
          pagado BOOLEAN DEFAULT FALSE,
          cuotas_pagadas INT[] DEFAULT '{}'
      );
    `;

    await client.query(sql);
    console.log('✅ Tablas creadas correctamente');
    client.release();
  } catch (err) {
    console.error('❌ Error al crear las tablas', err)
  }
  finally {
    await pool.end();
  }
};

const createTable = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const sql = `
    CREATE TABLE stock (
      id SERIAL PRIMARY KEY,
      stock INTEGER NOT NULL
    );

    INSERT INTO stock (stock) VALUES (100000);
`
  await client.query(sql);
  client.release();

  }
  catch(err) {
    console.log("Error al crear la tabla", err);
  }
  finally {
    await pool.end();
  }
}

// createTables();
createTable();