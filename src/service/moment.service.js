const connection = require("../app/database");

/* const sqlFragment = `
SELECT
m.id id,
m.content content,
m.createAt createTime,
m.updateAt updateTime, JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author
FROM
moment m
LEFT JOIN user u ON m.user_id = u.id `; */
class dynamicAction {
  async createMoment(userid, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES(?,?)`;
    const result = await connection.execute(statement, [userid, content]);
    return result;
  }
  async getMomentInfoById(momentid) {
    const statement = `
    SELECT
    m.id id,
    m.content content,
    m.createAt createTime,
    m.updateAt updateTime, 
    JSON_OBJECT( 'id', u.id, 'name', u.NAME,'avatarUrl',u.avatar_url) author,
		IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),JSON_ARRAY()) label,
		(SELECT IF(COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,
    'users',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url))),NULL) FROM comment c LEFT JOIN user cu ON c.user_id=cu.id WHERE m.id=c.moment_id) comment,
		(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/momment/images/',f.filename))FROM files f WHERE m.id=f.moment_id) images
    FROM
    moment m
    LEFT JOIN user u ON m.user_id = u.id
		LEFT JOIN moment_label ml ON m.id=ml.moment_id
		LEFT JOIN label l ON ml.label_id=l.id
    WHERE
    m.id =?
		GROUP BY m.id
		`;
    const result = await connection.execute(statement, [momentid]);
    return result[0];
  }
  async getMomentList(offest, size) {
    const statement = `
    SELECT
    m.id id,
    m.content content,
    m.createAt createTime,
    m.updateAt updateTime, 
		JSON_OBJECT( 'id', u.id, 'name', u.name ,'avatarUrl',u.avatar_url) author,
		(SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) CommentCount,
    (SELECT COUNT(*) FROM moment_label ml where ml.moment_id=m.id) LabelCount
    FROM
    moment m
    LEFT JOIN user u ON m.user_id = u.id
    LIMIT ?,?;
    `;
    const result = await connection.execute(statement, [offest, size]);
    return result[0];
  }
  async deleteMomentById(momentId) {
    const statement = `DELETE FROM moment WHERE id=?`;
    await connection.execute(statement, [momentId]);
    return "OK";
  }
  async UpdateMomentById(id, content) {
    const statement = `UPDATE moment SET content=? WHERE id=?`;
    const result = await connection.execute(statement, [content, id]);
    return result;
  }
  //查看是否有权限的函数
  async getResourceAbout(tableName, Id) {
    const statement = `
    SELECT
    u.id
    FROM ${tableName} T LEFT JOIN user u ON T.user_id= u.id 
    WHERE T.id=?`;
    const result = await connection.execute(statement, [Id]);
    return result[0];
  }
  async haveLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label  WHERE moment_id=? AND label_id=? `;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result.length > 0;
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?)`;
    return await connection.execute(statement, [momentId, labelId]);
  }
}
module.exports = new dynamicAction();
