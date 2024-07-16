generateActivityTOC();

function generateActivityTOC() {
    newTOC = "";
    mySections = document.getElementsByClassName("level3");
    //console.log(mySections);

    for (i = 0; i < mySections.length; ++i) {
        //console.log(mySections[i]);
        txtID = mySections[i].id;
        if (txtID.substring(0, 9) == "activity-") {
            txtHeader = mySections[i].querySelector(".anchored").innerText;
            txtHeader = txtHeader.substring(txtHeader.indexOf("Activity: ") + 10, txtHeader.length)
            newTOC = newTOC + "<li><strong><a href='#" + mySections[i].id + "'>" + txtHeader + "</a>:</strong> " + mySections[i].querySelector(".course-activity-header").innerText + "</li>";
        }
    }
    if (newTOC != "") {
        newTOC = "<ol>" + newTOC + "</ol>";
    }
    if (typeof document.getElementById("newActivityTOC") != "undefined") { document.getElementById("newActivityTOC").innerHTML = newTOC; }

}
