// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
    let returnValue = "";
    let returnStatus = 200;
    await axios.get('https://dfkreport.antonyip.com/degen-heroes?q=dynamic&p=d2l0aApyYXdzIGFzICgKICBzZWxlY3QKaGVyb19pbmZvX2NsYXNzLApoZXJvX2luZm9fcmFyaXR5LApQUk9GRVNTSU9OX01BSU46OnN0cmluZyBhcyBQUk9GRVNTSU9OX01BSU4sCnN1bW1vbnNfbGVmdCwKbWluKHRvdGFsX2pld2VscykgYXMgbWluX2pld2VsLAptYXgodG90YWxfamV3ZWxzKSBhcyBtYXhfamV3ZWwsCmF2Zyh0b3RhbF9qZXdlbHMpIGFzIGF2Z19qZXdlbCwKbWVkaWFuKHRvdGFsX2pld2VscykgYXMgbWVkaWFuX2pld2VsLAptb2RlKHRvdGFsX2pld2VscykgYXMgbW9kZV9qZXdlbCwKc3VtKHRvdGFsX2pld2VscyAqIChibG9ja190aW1lc3RhbXA6OmRhdGUgLSBjdXJyZW50X2RhdGUpKSAvIHN1bSgoYmxvY2tfdGltZXN0YW1wOjpkYXRlIC0gY3VycmVudF9kYXRlKSkgYXMgdHdfYXZlcmFnZSwKbWF4X2pld2VsLW1pbl9qZXdlbCBhcyByYW5nZSwKY291bnQodG90YWxfamV3ZWxzKSBhcyBzYW1wbGVfc2l6ZQpmcm9tIGhhcm1vbnkuZGV2LmRma19sYXN0XzMwX2RheXMKd2hlcmUgMT0xCmFuZCBoZXJvX2luZm9fY2xhc3MgaXMgbm90IG51bGwKYW5kIGhlcm9faW5mb19nZW5lcmF0aW9uICE9IDAKYW5kIHRvdGFsX2pld2Vscz4zMApncm91cCBieSAxLDIsMyw0CmhhdmluZyBzYW1wbGVfc2l6ZT41Cm9yZGVyIGJ5IHR3X2F2ZXJhZ2UgZGVzYwopCnNlbGVjdCAqIGZyb20gcmF3czsKLS0').then(reply => {
        returnValue = reply.data;
        
    }).catch(err => {
        returnValue = { error: err }
        returnStatus = 400;
    })

    res.status(returnStatus).json(returnValue)
  }
