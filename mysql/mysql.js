/** 
 * 数据库链接文件
*/

//引入数据库中间件
const mysql=require('mysql');

// 引入配置文件
const config=require('./../config');

//数据库配置
let pool=mysql.createPool({
    user:config.database.USER,
    password:config.database.PASSWORD,
    host:config.database.HOST,
    database:config.database.DATABASE
})

//解析sql
let query=(sql,values)=>{
    return new Promise((resolve,reject)=>{
        //连接数据库
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }else{
                pool.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows)
                    }
                    //释放连接
                    connection.release()
                })
            }
        })
    })
}
let createTable = function( sql ) {
    return query( sql, [] )
  }
  
  
  let findDataById = function( table,  id ) {
    let  _sql =  "SELECT * FROM ?? WHERE id = ? "
    return query( _sql, [ table, id, start, end ] )
  }
  
  
  let findDataByPage = function( table, keys, start, end ) {
    let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
    return query( _sql, [keys,  table,  start, end ] )
  }
  
  
  let insertData = function( table, values ) {
    let _sql = "INSERT INTO ?? SET ?"
    return query( _sql, [ table, values ] )
  }
  
  
  let updateData = function( table, values, id ) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query( _sql, [ table, values, id ] )
  }
  
  
  let deleteDataById = function( table, id ) {
    let _sql = "DELETE FROM ?? WHERE id = ?"
    return query( _sql, [ table, id ] )
  }
  
  
  let select = function( table, keys ) {
    let  _sql =  "SELECT ?? FROM ?? "
    return query( _sql, [ keys, table ] )
  }
  
  let count = function( table ) {
    let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
    return query( _sql, [ table ] )
  }
  
  module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select,
    count,
  }