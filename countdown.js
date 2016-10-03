window.onload = function() {

    function countdown() {

        //Set Static Variables
        var timeNow = new Date();

        if(timeNow.getDay() == 5 || timeNow.getDay() == 6){return;} //End it there, it's the weekend!

        var msPerDay = 24*60*60*1000,
            text = "",
            nextYear = new Date().getFullYear() + 1;

        // User defined variables

        //Elements
        var appender = document.getElementById("appender"), //Where text will append to,
            countdown = document.createElement("span"), // Where countdown will update,
            countdownId = "countdown",
            countdownClassName = "";

        //Messages
        var holidayMessage = "We'll be back on", // no need to leave a space at the end!
            normalMessageBefore = "Order within", //before message -- don't leave a space
            normalMessageAfter = "<br>for next working day delivery.", //after message -- don't leave a space
            finishedMessage = "";

        //Hours time
        var timezone = "GMT+0000", //What timezone
            time_to_start = "08:30:00", //When do you want to start the timer?
            time_to_end = "16:00:00 " + timezone; //Time in day you want to count down to -- USES 24 HOUR!

        //Holiday Variable
        var holiday_start_date = new Date("12 22 2015"), //mm dd yyyy
            holiday_end_date   = new Date("1 05 2016");  //m dd yyyy

        /***************************************
        *****DONT TOUCH ANYTHING UNDER HERE*****
        ***************************************/
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

            count_to = new Date(days[timeNow.getDay()-1] + " " + months[timeNow.getMonth()] + " " + timeNow.getDate() + ", " + timeNow.getFullYear() + " " + time_to_end); //The full day and time in a variable

        //Create the countdown span
        appender.parentNode.insertBefore(countdown, appender.nextSibling);
        setTimeout(function(){
            countdown.id = countdownId;
            countdown.className = countdownClassName;
        }, 1000);

        var timer = setInterval(function() {
            //Variables need to be calculated each second
            timeNow = new Date();
            var current_time = new Date(days[timeNow.getDay()-1] + " " + months[timeNow.getMonth()] + " " + timeNow.getDate() + ", " + timeNow.getFullYear() + " " + timeNow.getHours()+":"+timeNow.getMinutes() + ":" +timeNow.getSeconds()),
                time_left = count_to.getTime() - new Date().getTime(),
                days_left = time_left / msPerDay,
                m_days_left = Math.floor(days_left),
                hours_left = (days_left - m_days_left)*24,
                m_hours_left = Math.floor(hours_left),
                mins_left = (hours_left - m_hours_left)*60,
                m_mins_left = Math.floor(mins_left),
                seconds_left = (mins_left - m_mins_left)*60,
                m_seconds_left = Math.floor(seconds_left);

                var hours_text = (m_hours_left != 0) ? m_hours_left + "h : " : "";
                var mins_text  = (m_mins_left != 0) ? m_mins_left + "m : " : "the next ";

                text = (current_time >= holiday_start_date && current_time <= holiday_end_date)
                ? holidayMessage + holiday_end_date
                : normalMessageBefore + " " + hours_text + mins_text + m_seconds_left + "s" + " " + normalMessageAfter;

            //If it's reached the time, hide it and stop the timer
            (current_time >= count_to) ? countdown_finish(countdown, finishedMessage) : update_text(countdown, text);

        }, 1000);
    };

    function countdown_finish(c, m) {
        (m == "") ? c.style.display="none" : c.innerHTML = m;
        clearInterval(timer);
    }

    function update_text(c, t) {
        c.innerHTML = t;
    }

    countdown(); //Run the function
}