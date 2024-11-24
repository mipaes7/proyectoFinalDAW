export const getLibraryByUserId = async (id = "") => {
    try {
        const response = await fetch(`http://localhost:3000/api/libraries/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};