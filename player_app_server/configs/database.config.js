const {connect} = require("mongoose");

const dbConnect = () => {
    connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(
        () => {
            console.log("Connect successfully to the database...")
        },
    (error) => {
        console.log(`Error connection to database: ${error.message}`);}
    );
};

module.exports = dbConnect;