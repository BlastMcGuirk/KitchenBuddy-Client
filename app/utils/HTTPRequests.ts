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
    setLoading(true);
    fetch(URL + endpoint)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });
}