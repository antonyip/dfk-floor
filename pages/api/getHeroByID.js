// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
    let returnValue = "";
    let returnStatus = 200;
    
    await axios.post("https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
    {"limit":1,"params":[{"field":"id","operator":"=","value":req.query.id.toString()}],"offset":0}
    ).then(reply => {
        returnValue = reply.data;
    }).catch(err => {
        returnValue = { error: err }
        returnStatus = 400;
    })

    res.status(returnStatus).json(returnValue)
  }
