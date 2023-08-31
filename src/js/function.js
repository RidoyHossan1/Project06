const DragArea = document.querySelector(".DropBody"),
  text = document.querySelector(".box-txt"),
  dragTxt = text.querySelector("h2"),
  DragButton = document.querySelector("#myButton"),
  boxButton = document.querySelector(".box-button"),
  inputFile = boxButton.querySelector("input");

let myFile;

DragButton.onclick = () => {
  inputFile.click();
};

inputFile.addEventListener("change", function () {
  myFile = this.files[0];
  showImage();
  DragArea.classList.add("active");
});

DragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  DragArea.classList.add("active");
  dragTxt.textContent = "Release to Upload File";
});

DragArea.addEventListener("dragleave", (event) => {
  event.preventDefault();
  DragArea.classList.remove("active");
  dragTxt.textContent = "Drag and Drop Files Here";
});

DragArea.addEventListener("drop", (event) => {
  event.preventDefault();
  myFile = event.dataTransfer.files[0];
  showImage();
});

function showImage() {
  let fileType = myFile.type;
  let validExtension = ["image/jpg", "image/jpeg", "image/png"];

  if (validExtension.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let imgURL = fileReader.result;
      let img = `<img src="${imgURL}" alt="">`;
      DragArea.innerHTML = img;
    };

    fileReader.readAsDataURL(myFile);
  } else {
    alert("Use Image File Only");
    DragArea.classList.remove("active");
    dragTxt.textContent = "Drag and Drop Files Here";
  }
}
