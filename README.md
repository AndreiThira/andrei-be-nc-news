# Northcoders News API

// Setting up the environment packages
In order to connect to the relavant database, you need to define the environmental variable PGDATABASE. In order to do so, please follow the provided instructions:

1. Install the dotenv package using "npm i dotenv" in the terminal. This is a zero-dependency module that loads environment variables from a .env file.
2. Create a file called ".env.REPLACENAMEHERE" in the root folder for every seperate database connection you wish to have - in this case we will use .env.development and .dev.test
3. Inside each file, write "PGDATABASE=name_of_your_database", replacing the filler text with the respective name of the database you wish to connect to.


