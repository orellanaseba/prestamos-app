import pool from './db';

const createTables = async (): Promise<void> => {
  try {
    const client = await pool.connect();

    const sql = `
      -- Crear la tabla de clientes
      CREATE TABLE IF NOT EXISTS clients (
          dni VARCHAR(8) PRIMARY KEY,
          nombre VARCHAR(30) NOT NULL,
          email VARCHAR(60) UNIQUE NOT NULL,
          numero_telefono VARCHAR(10) NOT NULL
      );

      -- Crear la tabla de préstamos
      CREATE TABLE IF NOT EXISTS loans (
          id_loan VARCHAR(50) PRIMARY KEY,
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
          cuotas_pagadas INT[] DEFAULT '{}',
          FOREIGN KEY (dni_cliente) REFERENCES clients(dni)
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

createTables();