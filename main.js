var power = 0;
var act = false;
var StoryCount = 0;you
var StoryText = ["You're in a dark room. You cant see. Using your arms to locate yourself around the room is the only option here", "You start searching around the walls until your feel your cold-sweaty palms touching a what feels like a metal box. You feel your fingers slowly creaking into the box. The box has been opened. Inside, there is a little light and 4 different colored wires.", "You connect red to red. green to green. blue to blue. and lastly, yellow to yellow...", "The light in the room starts to flicker rapidly.", "The light has sablized, u can see now!", "After looking around for a while u find a shelf standing in the far corner of the room, it is dimly lit...", "You find some useless scrap and spare parts, you decide to go look somewhere else...", "Just before you leave you spot a battery on the top self...", "You pick up the battery, it looks a lot bigger now that you've gotten a better look at it...","The room has a heavy metal door, you hope it will lead you home...","The door doesn't budge however u see cables running to what looks like mag locks...","You follow the cable to find a power box, you could probably hook up the battery...","You need to power the battery first, you might be able to connect it to one of those wires..."];
var wire = {cap: 0, amnt: 0};
var Battery = {total:0,charging:0, object:[]};
function BatteryObject(){
    this.capacity = 10;
    this.power = 0;
    this.charge = false;
}

function Story() {
    document.getElementById("StoryBtn").onclick = function () {
        if (!act) {
            act = true;    
            if (StoryCount == 5) StoryCount++;
                ProgressBar(2000);
                setTimeout(function () {
                    StoryCount++;
                    act = false;
                    if (StoryCount == 8) {
                        Battery.object[0] = new BatteryObject();
                        Battery.total++;
                    }
                }, 2000)
        } 
    }
    if (StoryCount == 1) wire.cap = 4;
    if (StoryCount == 2 && power >= 5) StoryCount++;
    if (StoryCount == 3 && power >= 10) StoryCount++;
    if (StoryCount == 4 || StoryCount == 8) document.getElementById("StoryText").innerHTML = "Look Around";
    if (StoryCount == 5) document.getElementById("StoryText").innerHTML = "Search the Shelf";
    if (StoryCount == 7) document.getElementById("StoryText").innerHTML = "Grab the Battery";
    if (StoryCount == 9) document.getElementById("StoryText").innerHTML = "Investigate Door";
    if (StoryCount == 10) document.getElementById("StoryText").innerHTML = "Follow Cables";
    document.getElementById("StoryLog").innerHTML = StoryText[StoryCount];
}

function UpdateWires() {
    document.getElementById("ConnectBtn").onclick = function () {
        if (wire.amnt < wire.cap && !act) {
            act = true;
            ProgressBar(3000);
            setTimeout(function () {
                wire.amnt++;
                act = false;
                if (wire.amnt == 1 && StoryCount == 1) StoryCount++;
            }, 3000);
        }
    }
    document.getElementById("wireCount").innerHTML = wire.amnt + "/" + wire.cap;
}
function UpdateBattery(){
    document.getElementById("BatteryBtn").onclick = function () {
        var chosen = 0;
        for (i = 0; i < Battery.object.length; i++)
        {
            if (Battery.object[i].charge == false) {
                 chosen = Battery.object[i];
                break;
            }
        }
        if (wire.amnt > Battery.charging && chosen!=0) {
            chosen.charge = true;
        }
    }
    Battery.charging = 0;
    for (i = 0; i < Battery.object.length; i++) {
        if (Battery.object[i].charge==true)Battery.charging++;
    }
    document.getElementById("batteryCount").innerHTML = Battery.total;
}
function UpdatePower() {
    if (power < 25) {
        power += (wire.amnt-Battery.charging) / 20;
    }
    if (power > 0) {
        power -= 0.01;
    }
}

window.setInterval(function () {
       if (StoryCount === 0) {
           document.getElementById("wireDisplay").style.display = "none";
           document.getElementById("batteryDisplay").style.display = "none";
        document.getElementById("ConnectBtn").style.display = "none";
        document.getElementById("BatteryBtn").style.display = "none";
    } else {
           if (StoryCount > 10) {
               document.getElementById("BatteryBtn").style.display = "inline";
               document.getElementById("batteryDisplay").style.display = "block";
           }
           else document.getElementById("BatteryBtn").style.display = "none";
        document.getElementById("wireDisplay").style.display = "block";
        document.getElementById("ConnectBtn").style.display = "inline";
        if (StoryCount < 4) document.getElementById("StoryBtn").style.display = "none";
        else document.getElementById("StoryBtn").style.display = "inline";
        if (StoryCount == 11) document.getElementById("StoryBtn").style.display = "none";
    }
    
    Story();
    UpdatePower();
    UpdateWires();
    UpdateBattery();
}, 50)

function ProgressBar(time) {
    var width = 0;
    var increase = 100/(time/10);
    var clock = setInterval(Move, 10);
    function Move() {
        if (width < 100) {
            width += increase;
            document.getElementById("Act").style.width = width + "%";
        }
        else {
            clearInterval(clock);
        }
    }
}
