export const getChatResponse = async (question) => {
    try {
        const response = await fetch('https://furia-chatbot-jdph.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: question })
        });

        const data = await response.json();

        return data.response;
    } catch (error) {
        console.log('Requisition error: ', error);
        throw error;
    }
}