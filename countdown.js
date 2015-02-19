var countdown = function() {

    //Set Static Variables
    var time_now = new Date();
    var ms_per_day = 24*60*60*1000;
    var text = "";
    var next_year = new Date().getFullYear() + 1;

    // User defined variables

    //Elements
    var appender = document.getElementById("appender"); //Where text will append to
    var countdown = document.createElement("span"); // Where countdown will update

    //Messages
    var holiday_message = "We'll be back on"; // no need to leave a space at the end!
    var normal_message_before = "You have"; //before message -- don't leave a space
    var normal_message_after = " left."; //after message -- don't leave a Times

    //space
    var timezone = "GMT+0000"; //What timezone
    var time_to_end = "17:00:00 " + timezone; //Time in day you want to count down to
    var count_to = new Date(time_now.getMonth() + " " + time_now.getDate() + ", " + time_now.getFullYear() + " " + time_to_end); //The full day and time in a variable

    //Holiday Variable
    holiday_start_date = new Date("12 22 2015"); //mm dd yyyy
    holiday_end_date   = new Date("1 05 2016");  //m dd yyyy

    /***************************************
    *****DONT TOUCH ANYTHING UNDER HERE*****
    ***************************************/
    //Create the countdown span
    appender.parentNode.insertBefore(countdown, appender.nextSibling);
    countdown.id = "countdown";
    countdown.className += "ribbon block";

    if( time_now.getDay() == 5 || time_now.getDay() == 6) {
        return; //End it there, it's the weekend!
    }

    window.setInterval(function() {
        //Variables need to be calculated each second
        var time_left = count_to.getTime() - new Date().getTime(),
            days_left = time_left / ms_per_day,
            m_days_left = Math.floor(days_left),
            hours_left = (days_left - m_days_left)*24,
            m_hours_left = Math.floor(hours_left),
            mins_left = (hours_left - m_hours_left)*60,
            m_mins_left = Math.floor(mins_left),
            seconds_left = (mins_left - m_mins_left)*60,
            m_seconds_left = Math.floor(seconds_left);

            text = (time_now >= holiday_start_date && time_now <= holiday_end_date) ? holiday_message + holiday_end_date : normal_message_before + " " + m_hours_left + "h : " + m_mins_left + "m : " + m_seconds_left + "s" + " " + normal_message_after;

        //If it's reached the time hide it
        (m_days_left == "-1") ? countdown.style.display = "none" : countdown.innerHTML = text;

    }, 1000);
};

window.onload = function() {
    countdown();
}