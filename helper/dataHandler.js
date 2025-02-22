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


module.exports = {
    dataTest
}



