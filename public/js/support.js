window.onload = function () {
    let ddItems = supportChooseBlock.querySelectorAll('.dropdown-item');
    for (var i = 0; i < ddItems.length; i++) {
        ddItems[i].onclick = function () {
            chooseSupportBtn.textContent = this.textContent;
        }
    }

    let mobileDDItems = mobileSupportChooseBlock.querySelectorAll('.dropdown-item');
    for (var i = 0; i < mobileDDItems.length; i++) {
        mobileDDItems[i].onclick = function () {
            mobileChooseSupportBtn.textContent = this.textContent;
        }
    }
}