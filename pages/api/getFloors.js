// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
    let returnValue = "";
    let returnStatus = 200;
    await axios.get('https://dfkreport.antonyip.com/degen-heroes?q=dynamic&p=c2VsZWN0Cmhlcm9faW5mb19jbGFzcywKaGVyb19pbmZvX3Jhcml0eSwKUFJPRkVTU0lPTl9NQUlOOjpzdHJpbmcgYXMgUFJPRkVTU0lPTl9NQUlOLApzdW1tb25zX2xlZnQsCmhlcm9faW5mb19nZW5lcmF0aW9uLAptaW4odG90YWxfamV3ZWxzKSBhcyBtaW5famV3ZWwsCm1heCh0b3RhbF9qZXdlbHMpIGFzIG1heF9qZXdlbCwKYXZnKHRvdGFsX2pld2VscykgYXMgYXZnX2pld2VsLAptZWRpYW4odG90YWxfamV3ZWxzKSBhcyBtZWRpYW5famV3ZWwsCm1vZGUodG90YWxfamV3ZWxzKSBhcyBtb2RlX2pld2VsLApzdW0odG90YWxfamV3ZWxzICogKDIwMCsoYmxvY2tfdGltZXN0YW1wOjpkYXRlIC0gY3VycmVudF9kYXRlKSkpIC8gc3VtKDIwMCsoYmxvY2tfdGltZXN0YW1wOjpkYXRlIC0gY3VycmVudF9kYXRlKSkgYXMgdHdfYXZlcmFnZSwKbWF4X2pld2VsLW1pbl9qZXdlbCBhcyByYW5nZSwKY291bnQodG90YWxfamV3ZWxzKSBhcyBzYW1wbGVfc2l6ZQpmcm9tIGhhcm1vbnkuZGV2LmRma19sYXN0XzMwX2RheXMKd2hlcmUgaGVyb19pbmZvX2NsYXNzIGlzIG5vdCBudWxsCmFuZCBoZXJvX2luZm9fZ2VuZXJhdGlvbiAhPSAwCmFuZCAzMDx0b3RhbF9qZXdlbHMKZ3JvdXAgYnkgMSwyLDMsNCw1CmhhdmluZyBzYW1wbGVfc2l6ZT41Cm9yZGVyIGJ5IHR3X2F2ZXJhZ2UgZGVzYw')
    .then(reply => {
        returnValue = reply.data;
        
    }).catch(err => {
        returnValue = { error: err }
        returnStatus = 400;
    })

    res.status(returnStatus).json(returnValue)
  }
