//Lib holds functions that can be used when called

function toggle(bool) {
    if (bool == true) {
        return false;
    }
    else if (bool == false) {
        return true;
    }
    else {
        return msg.channel.send("Error: . /function toggle(**bool**) -- bool isn't defined");
    }
}

console.log("Lib Loaded");