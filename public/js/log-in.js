const form = document.querySelector('#log-in-form');
const p = document.querySelector('#error-success-para');

const changeDOM = (res) => {
  if(res.err){
    p.style.setProperty('color', 'red');
    p.innerHTML = res.msg;
  }
  else if(typeof res.err === 'undefined'){
    p.style.setProperty('color', 'black');
    p.innerHTML = '';
  }
  else {
    p.style.setProperty('color', 'green');
    p.innerHTML = res.msg;
  }
}

const sendData = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const jsonData = {};
  data.forEach((value, key) => {
    jsonData[key] = value;
  });
  try{
      const res = await fetch(
          '/log-in',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
          },
        );
      const resData = await res.json();
      if(typeof resData.username === 'undefined') window.location.href=`/`;
      if(resData) {
        changeDOM(resData);
        form.reset();
        window.location.href=`/chat`;
      }
  } catch(err){
      console.log(err);
  }
}

form.addEventListener('submit', sendData);