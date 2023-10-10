const logOut = document.querySelector('#log-out');
logOut.addEventListener('click', async (e) => {
    try{
        const res = await fetch(
            '/log-out',
            {
              method: 'GET'
            },
          );
        const resData = await res.json();
        if(resData) {
          window.location.href=resData.redirect;
        }
    } catch(err){
        console.log(err);
    }
})


 const socket = io();
 socket.emit("hello", {user: 'Mario'});



