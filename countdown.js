window.onload = function() {

    function countdown() {

        //Set Static Variables
        var time_now = new Date();

        if(time_now.getDay() == 5 || time_now.getDay() == 6){return;} //End it there, it's the weekend!

        var ms_per_day = 24*60*60*1000,
            text = "",
            next_year = new Date().getFullYear() + 1;

        // User defined variables

        //Elements
        var appender = document.getElementById("appender"), //Where text will append to,
            countdown = document.createElement("span"), // Where countdown will update,
            countdown_id = "countdown",
            countdown_classname = "";

        //Messages
        var holiday_message = "We'll be back on", // no need to leave a space at the end!
            normal_message_before = "Order within", //before message -- don't leave a space
            normal_message_after = "<br>for next working day delivery.", //after message -- don't leave a space
            finished_message = "";

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

            count_to = new Date(days[time_now.getDay()-1] + " " + months[time_now.getMonth()] + " " + time_now.getDate() + ", " + time_now.getFullYear() + " " + time_to_end); //The full day and time in a variable

        //Create the countdown span
        appender.parentNode.insertBefore(countdown, appender.nextSibling);
        setTimeout(function(){
            countdown.id = countdown_id;
            countdown.className = countdown_classname;
        }, 1000);

        var timer = setInterval(function() {
            //Variables need to be calculated each second
            time_now = new Date();
            var current_time = new Date(days[time_now.getDay()-1] + " " + months[time_now.getMonth()] + " " + time_now.getDate() + ", " + time_now.getFullYear() + " " + time_now.getHours()+":"+time_now.getMinutes() + ":" +time_now.getSeconds()),
                time_left = count_to.getTime() - new Date().getTime(),
                days_left = time_left / ms_per_day,
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
                ? holiday_message + holiday_end_date
                : normal_message_before + " " + hours_text + mins_text + m_seconds_left + "s" + " " + normal_message_after;

            //If it's reached the time, hide it and stop the timer
            (current_time >= count_to) ? countdown_finish(countdown, finished_message) : update_text(countdown, text);

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