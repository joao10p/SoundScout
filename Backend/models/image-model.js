var db=require('../config/connect.js');
module.exports={ 
  displayImage:function(callback){
   // check unique email address
   var sql='SELECT image_name FROM images';
   db.query(sql,function (err, data, fields) {
   if(err) throw err
   return callback(data);
  })
  }
}