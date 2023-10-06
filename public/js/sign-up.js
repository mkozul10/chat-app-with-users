const form = document.querySelector('#sign-up-form');
form.addEventListener('submit', sendData);

const sendData = async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const jsonData = {};
    data.forEach((value, key) => {
      jsonData[key] = value;
    });
    try{
        const res = await fetch(
            '/sign-up',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonData)
            },
          );
        const resData = await res.json();
        console.log(resData);
    } catch(err){
        console.log(err.message);
    }
    
}