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

export const updateLibraryEntryStatus = async (email, title, status) => {
    const response = await fetch('http://localhost:3000/api/libraries', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, title, status }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update library entry: ${errorMessage}`);
    }

    return response.json();
};

export const createLibraryEntry = async (email, title, status) => {
    try {
        const response = await fetch('http://localhost:3000/api/libraries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, title, status }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to create library entry: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating library entry:', error);
        throw error;
    }
};
