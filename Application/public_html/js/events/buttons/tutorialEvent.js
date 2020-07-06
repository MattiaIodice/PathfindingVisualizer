function openTutorial() {
    // When the user clicks on the button, open the modal
    document.getElementById("myModal").style.display = "block";
}

function closeTutorial() {
    // When the user clicks on <span> (x), close the modal
    document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    modal = document.getElementById("myModal");
    if (event.target === modal)
        document.getElementById("myModal").style.display = "none";
};