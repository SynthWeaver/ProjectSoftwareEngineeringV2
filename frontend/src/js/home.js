
//Make a push to back-end
async function getData() {
    const response = await fetch('/api/regions', {
         method: 'GET'
     })
     const resp = response.json()
     return resp
 }
 
 export { getData }
 