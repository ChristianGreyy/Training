npx sequelize-cli model:generate --name User --attributes user_name:string,pass_word:string,gender:enum:'{famale,male}',first_name:string,last_name:string,latest_rent_day:date
npx sequelize-cli model:generate --name Book --attributes name:string,price:double,category:enum:'{action,love,knowledge,detective}',description:string,outdated:date
npx sequelize-cli model:generate --name UserBook --attributes start_time:date,end_time:date
npx sequelize-cli model:generate --name Token --attributes token:string,type:enum:'{refresh,reset,verify}',expires:date,blacklisted:boolean

#migration

npx sequelize-cli db:migrate

npx sequelize-cli migration:create --name update-user

npx sequelize-cli migration:create --name remove-user

#seed

npx sequelize-cli seed:generate --name init-project

npx sequelize-cli db:seed:all








