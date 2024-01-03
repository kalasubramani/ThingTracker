const pg = require("pg");
//connect to db
const client = new pg.Client("postgres://localhost/antiques_tracker");

const seed = async () => {
   //seed db
  const SQL =`
            DROP TABLE IF EXISTS owners CASCADE;
            CREATE TABLE IF NOT EXISTS owners(
              id SERIAL PRIMARY KEY,
              name VARCHAR(100) UNIQUE
            );
            DROP TABLE IF EXISTS antiques CASCADE;
            CREATE TABLE IF NOT EXISTS antiques(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE
  );`
  await client.query(SQL);

  const SQLOwners = `INSERT INTO owners (name)
                VALUES ('eee'); 
                INSERT INTO owners (name)
                VALUES ('aaa'); 
                INSERT INTO owners (name)
                VALUES ('bbb'); 
                INSERT INTO antiques (name,owner_id)
                VALUES (
                  'antique - eee',
                  (SELECT id FROM owners
                    WHERE name = 'eee')
                    );
                    INSERT INTO antiques (name,owner_id)
                VALUES (
                  'antique - aaa',
                  (SELECT id FROM owners
                    WHERE name = 'aaa')
                    );
                    INSERT INTO antiques (name,owner_id)
                VALUES (
                  'antique - bbb',
                  (SELECT id FROM owners
                    WHERE name = 'bbb')
                    );`;
  await client.query(SQLOwners);
  console.log("data seeded..");
};

module.exports={seed,client}

