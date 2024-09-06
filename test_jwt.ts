import fetch from "node-fetch"
class ApiRequest {
    
}
console.log(Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64'))

async function getTickets(query: {size: number, page: number}){
    `/api/1.1/json/tickets/`
    let baseUrl = `https://flutterwave.happyfox.com/api/1.1/json/tickets/?size=${query.size}&page=${query.page}&category=${453}`
    try{
        let res = await fetch(baseUrl, {
            headers: {
                Authorization: `Basic ${Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64')}`,
                'Content-Type': 'application/json'
              },
            method: 'GET'
            
        })
        if(res.ok){
            console.log("Success")
            let resp =  await res.json()
            console.log("########################################")
            console.log("########################################")
            console.log(resp.data)
            console.log("########################################")
            console.log("########################################")

            return resp
        }
        console.log("Error")
        return await res.json();
    }
    catch(ex){
        console.log(ex)
    }
}
interface IHappyFox {

}

interface HappyFoxForm{
    name: string;
    email: string;
    phone : string;
    subject : string;
    text: string;
    category: string;
    "t-cf-409": string;
    "t-cf-407": string;
    "t-cf-406": Date;
    "t-cf-435": "Service Request" | "Incident";
    "t-cf-506": string;
    "t-cf-405": ("GHANA" | "NIGERIA")[];

    [key: string]: any
};
class HappyFox implements IHappyFox{

    public constructor(){

    }
    getTickets = async () => {
        let tickets = await getTickets({size: 10, page: 1});
        console.log({tickets})
    }
    createTicket = async (form: HappyFoxForm): Promise<void> => {
        let baseUrl = `https://flutterwave.happyfox.com/api/1.1/json/tickets`
        try{
            let res = await fetch(baseUrl, {
                headers: {
                    Authorization: `Basic ${Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(form)
                
            })
            if(res.ok){
                console.log("Success")
                let resp =  await res.json()
                console.log("########################################")
                console.log("########################################")
                console.log(resp.data)
                console.log("########################################")
                console.log("########################################")

                return resp
            }
            console.log("Error")
            let errResp = await res.json();
            for(let [key, val] of Object.entries(errResp.error)){
                console.log({key, val})
            }
            console.log({errResp: errResp.error})
            return await res.json();
        }
        catch(ex){
            console.log(ex)
        }
    }
}   

let happyFox = new HappyFox();
// happyFox.getTickets();
happyFox.createTicket({
    name: "Test create ticket in Incident Outage - 1",
    email: "samuel.atuma@flutterwavego.com",
    phone : "+23470000000",
    subject : "Test create ticket in Incident Outage - Subject",
    text: "Test create ticket in Incident Outage - Body",
    category: "453",
    "t-cf-409": "1M:00S",
    "t-cf-407": "Test Incident",
    "t-cf-406": new Date("2024-08-26"),
    "t-cf-435": "Incident",
    "t-cf-506": "Samuel",
    "t-cf-405": ["GHANA"],
})
