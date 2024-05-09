import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sumupp',
});

async function getAllCitations(){
  const [citations, fields] = await db.query(`
    SELECT * FROM citations;
  `);

  return citations;
}

async function postCitation(req, res){
  console.log(req.body);

  await db.query(`
    INSERT INTO citations
    VALUES (
      DEFAULT, 
      '${req.body.type}',
      '${req.body.title}',
      ${req.body.subtitle ? "'" + req.body.subtitle + "'" : "NULL"},
      '${req.body.publication_name}',
      ${req.body.url ? "'" + req.body.url + "'" : "NULL"},
      ${req.body.publication_year},
      ${req.body.accessed_year}
    );
  `)

  const [newCitation] = await db.query(`
    SELECT *
    FROM citations
    WHERE citation_id = LAST_INSERT_ID();
  `)

  console.log(newCitation);

  return {message: "gotcha!", citation: newCitation}
}

async function deleteCitation(req, res){
  await db.query(`
    DELETE FROM citations
    WHERE citation_id = ${req.params.id};
  `)

  return {message: "deleted!"}
}

export {getAllCitations, postCitation, deleteCitation};