
//Make a push to back-end
async function sendGmail() {
   const response = await fetch('/api/mail', {
        method: 'POST'
    })
    const resp = response.json()
    return resp
}

export { sendGmail }
