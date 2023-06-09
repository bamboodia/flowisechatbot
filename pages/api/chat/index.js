async function query(data) {
    const response = await fetch(
        "https://flowisechatbot.onrender.com/api/v1/prediction/7fd4ef79-01aa-4a55-ac1c-e422e680f361",
        {
            method: "POST",
            body: data
        }
    );
    const result = await response.json();
    return result;
}

const question = {"message": "Hey, how are you?"}

query(question).then((response) => {
    console.log("index" + response);
});