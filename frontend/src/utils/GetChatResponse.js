export const getChatResponse = async (question) => {
    try {
        const response = await fetch('http://localhost:3000/chatbot-furia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        return data.response;
    } catch (error) {
        console.log('Requisition error: ', error);
        throw error;
    }
}