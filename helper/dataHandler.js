const { query } = require("./pg");

async function dataTest(req, res) {
    try {
        const queryData = `SELECT iadata1
                           FROM data 
                           ORDER BY id DESC 
                           LIMIT 12`
        const results = await query(queryData);

        return res.status(200).json({data : results.rows})
    } catch (err) {
        console.log("Get Data " + err)
        return res.status(500).json({error : "Internal Server Error"})
    }
}

const realTime = (ws, data, emit) => {
    try {
        ws.emit(emit, data);
        console.log("Success to send Data of emit: " + emit)
    } catch(err) {
        console.log("Failed to send Data of emit: " + emit)
    }
}


module.exports = {
    dataTest,
    realTime
}



