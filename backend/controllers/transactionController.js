const {
    sequelize,
    Transaction
} = require('../models')
const sha1 = require("sha1")
const fetch = require("node-fetch");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

async function createTransaction(req, res) {
    try {
        if (req == null) {
            return;
        }
        await Transaction.sync({
            force: false
        });
        const {
            orderId,
            number,
            hash
        } = req.body
        const transaction = await Transaction.create({
            orderId,
            number,
            hash

        })
        return res.json(transaction)
    } catch (error) {
        console.log(error)
        return res.status
    }
}

const merchantId = 2537283597

//IMPORTANT MESSAGE: WE REMOVED THE MERCHANT KEY WHEN WE DELIVERED THIS PROJECT, DUE TO SENSITIVITY OF THIS CRUCIAL DATA
const merchantKey = null
let tempPurchaseId = 1234
//TODO add een andere returnUrl
let returnurl = "https%3A%2F%2Fsisow.nl"
let tempDescription = "testbetaling"


//This method retrieves all the issuers(banks) from the sisow API.
async function issuerDirectories() {
    let resultHTML;
    const response = await fetch("https://www.sisow.nl/Sisow/iDeal/RestHandler.ashx/DirectoryRequest")

        .then(res => res.text())
        .then(html => resultHTML = html)
        .catch(err => console.error(err));

    /**
     *The returned content is returned in xml. By converting it to json we can retrieve it.
     *Probably better to do this via Regex. If the returned layout is changed even slightly, 
     *this method won't be able to find it anymore.
     */
    let content;
    parser.parseString(resultHTML, function (err, result) {
        content = (result);
    });
    let issuers = JSON.stringify(content.directoryresponse.directory[0].issuer)
    return issuers
}


//This method handles the request, but basically only calls the getTransactionUrl method.
async function transactionHandler(req, res) {
    try {
        if (req == null) {
            return;
        }
        const {
            amount,
            issuerId,
        } = req.body

        return await getTransactionUrl(amount, issuerId)
    } catch (error) {
        console.log(error)
        return res.status = 500
    }
}

//Creates a transactionUrl
async function getTransactionUrl(amount, issuerId) {

    try {
        /** 
         * First a transactionrequest url is generated using the hash function.
         *This url is a request  to the sisow API to generate an actual transactionUrl.
         * This url needs to be php decoded.
         */
        let url = hash(tempPurchaseId, amount, issuerId)
        let resultHTML;
        const response = await fetch(url, {
                method: 'POST',
            })

            .then(res => res.text())
            .then(html => resultHTML = html)
            .catch(err => console.error(err));
        let content;
        parser.parseString(resultHTML, function (err, result) {
            content = (result.transactionrequest.transaction[0].issuerurl[0]);
        });

        const decodedRequest = decodeURIComponent(content);
        console.log(decodedRequest)

        return decodedRequest
    } catch (error) {
        console.log(error)
    }
}



function hash(purchaseid, amount, issuerId) {
    let test = (purchaseid + "" + purchaseid + "" + amount + "" + merchantId + "" + merchantKey);
    let transactionHash = sha1(test)


    let requestUrl = "https://www.sisow.nl/Sisow/iDeal/RestHandler.ashx/TransactionRequest?" + "merchantid=" + merchantId +
        "&purchaseid=" + purchaseid + "&amount=" + amount + "&description=" + tempDescription + "&returnurl=" + returnurl +
        "&cancelurl=" + returnurl + "&notifyurl=" + returnurl + "&callbackurl=" + returnurl + "&issuerid=" + issuerId +
        "&testmode=true" + "&sha1=" + transactionHash
    // console.log("transaction request url: " + requestUrl)
    console.log(requestUrl)
    return requestUrl;

}

//Returns statusUrl, however not in use now as the application didn't reach that point in development.
function statusUrl(trxid) {
    let transactionHash = sha1(trxid + "" + merchantId + "" + merchantKey)
    let statusUrl = "https://www.sisow.nl/Sisow/iDeal/RestHandler.ashx/StatusRequest?" + "merchantid=" + merchantId + "&trxid=" + trxid +
        "&sha1=" + transactionHash
    console.log("status url for current trxid: " + statusUrl)
    return statusUrl;

}

// statusUrl(1030000375565139,merchantId)
// getTransactionUrl(testAmount, testIssuerId)
module.exports = {
    createTransaction,
    getTransactionUrl,
    issuerDirectories,
    transactionHandler
};