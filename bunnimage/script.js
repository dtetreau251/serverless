
async function getImage(event) {
    event.preventDefault()
    const myform = document.getElementById("myform");
    const nameInput = document.getElementById("name");
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    const payload = new FormData(myform);
    console.log(payload);
    payload.append("file", file);

    if (document.getElementById('name').value != '') {

        try {
            const url = process.env.BUNNIMAGE_ENDPOINT;
            console.log("Image was uploaded, making POST request to Azure function")

            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value
                },
                body: payload
            })
            $('#output').text("Your image has been stored successfully!")
        } catch(err) {
            $('#output').text(err)
        }

    } else {
        alert("No name error.")
    }
}