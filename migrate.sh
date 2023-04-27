npx sequelize-cli model:generate --name Role --attributes name:string
npx sequelize-cli model:generate --name User --attributes user_name:string,pass_word:string,gender:enum:'{famale,male}',first_name:string,last_name:string,birthday:date
npx sequelize-cli model:generate --name Type --attributes name:string,color:string
npx sequelize-cli model:generate --name Status --attributes status:string,order:integer
npx sequelize-cli model:generate --name Priority --attributes name:string,order:integer
npx sequelize-cli model:generate --name Token --attributes token:string,type:enum:'{refresh,reset,verify}',expires:date,blacklisted:boolean

#migration

npx sequelize-cli db:migrate

npx sequelize-cli migration:create --name update-user

npx sequelize-cli migration:create --name remove-user

#seed

npx sequelize-cli seed:generate --name init-project

npx sequelize-cli db:seed:all








