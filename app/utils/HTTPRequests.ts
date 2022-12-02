// The URL for the server
const URL = 'http://www.kitchenbuddy.somee.com';

/**
 * Function to help fetch data and set state
 * @param endpoint The URL endpoint
 * @param setLoading State function to set loading
 * @param setData State function to set data
 */
export function GET<T>(
    endpoint: string, 
    setLoading: (loading: boolean) => void, 
    setData: (data: T) => void) 
{
    console.log("GET: " + endpoint);
    setLoading(true);
    fetch(URL + endpoint)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });
}

/**
 * Function to help POST data and return the result
 * @param endpoint The URL endpoint
 * @param data The data being submitted
 * @param callback Callback for the response
 */
export function POST(
    endpoint: string,
    data: any,
    callback: (res: any) => void)
{
    console.log("POST: " + endpoint);
    fetch(URL + endpoint, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
}