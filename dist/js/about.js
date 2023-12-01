function setDate() {
    const currentDate = new Date();
    const day = currentDate.toLocaleString('en-us', { weekday: 'short' }); // Get the first three letters of the day
    const dayDigit = currentDate.getDay();
    const month = currentDate.toLocaleString('en-us', { month: 'short' }); // Get the first three letters of the month
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${dayDigit} ${month}`;
    const dateContainer = document.getElementById('date');
    dateContainer.innerHTML = formattedDate;
}

function setTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    document.getElementById('time').textContent = hours + ":" + minutes;  
}

window.onload = setDate;
setInterval(setTime, 1000);
setTime();