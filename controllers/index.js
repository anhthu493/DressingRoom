let dataNavPane;
let idOptione;

// Fetch data từ file JSON
fetch("../Data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.tabPanes);
    dataNavPane = data.tabPanes;
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// Hàm renderContentByType
const renderContentByType = (type) => {
  const filteredItems = dataNavPane.filter((item) => item.type === type);

  // Tạo một thẻ div cho lớp grid container
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("row");

  filteredItems.forEach((item) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("col-md-4");
    gridItem.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <img src="${item.imgSrc_png}" width="100" height="100">
          <!-- Thêm style display: block vào button -->
          <button class="btn-dark btn" data-id="${item.id}" onclick="showItem('${item.id}')" style="display: block;">Show</button>
        </div>
      </div>
    `;
    gridContainer.appendChild(gridItem);
  });

  // Xóa nội dung cũ của .tab-content trước khi thêm nội dung mới
  const tabContent = document.querySelector(".tab-content");
  tabContent.innerHTML = "";
  tabContent.appendChild(gridContainer);
};

// Lắng nghe sự kiện click trên các nút .nav-pills button
document.querySelectorAll(".nav-pills button").forEach((button) => {
  button.addEventListener("click", function () {
    const type = this.id;
    console.log(type);
    renderContentByType(type);
  });
});

// Hàm tìm kiếm phần tử theo id
const findItemById = (array, idToFind) => {
  return array.find((item) => item.id === idToFind) || null;
};

// Hàm hiển thị thông tin của item khi được chọn
const showItem = (id) => {
  console.log(id, "//////show id");
  const result = findItemById(dataNavPane, id);
  console.log(result);
  console.log(result.name);

  switch (result.type) {
    case "topclothes":
      idOptione = "bikinitop";
      break;
    case "botclothes":
      idOptione = "bikinibottom";
      break;
    case "shoes":
      idOptione = "feet";
      break;
    case "handbags":
      idOptione = "handbag";
      break;
    case "necklaces":
      idOptione = "necklace";
      break;
    case "hairstyle":
      idOptione = "hairstyle";
      break;
    case "background":
      idOptione = "background";
      break;
    default:
      break;
  }
  console.log(idOptione, "idOptione");

  // Kiểm tra nếu idOptione là "bikinitop" hoặc "bikinibottom"
  if (idOptione === "bikinitop" || idOptione === "bikinibottom") {
    // Lấy phần tử có class tương ứng
    let element = document.querySelector(`.${idOptione}`);
    // Tạo hoặc lấy thẻ <img> có sẵn
    let imgElement =
      element.querySelector("img") || document.createElement("img");
    // Đặt thuộc tính src cho thẻ <img>
    imgElement.src = `${result.imgSrc_png}`;
    // Thiết lập các thuộc tính CSS
    imgElement.style.width = "250px";
    imgElement.style.height = "500px";
    imgElement.style.position = "absolute";
    imgElement.style.zIndex = "1";
    // Thêm hoặc thay thế thẻ <img> vào phần tử
    element.appendChild(imgElement);
  } else {
    // Lấy phần tử có class tương ứng
    let element = document.querySelector(`.${idOptione}`);
    // Thiết lập hình nền cho phần tử
    element.style.backgroundImage = `url(${result.imgSrc_png})`;
  }
};

// Lấy đối tượng div có class "contain"
const containDiv = document.querySelector(".contain");
// Lấy tất cả các phần tử con của div "contain"
const containChildren = containDiv.children;
// Khởi tạo biến để lưu trữ danh sách các lớp
const classList = [];

// Lặp qua từng phần tử con và thêm danh sách lớp của mỗi phần tử vào biến classList
for (let i = 0; i < containChildren.length; i++) {
  // Lấy danh sách lớp của phần tử con hiện tại và thêm vào biến classList
  classList.push(containChildren[i].classList);
}

// Hiển thị danh sách các lớp trong biến classList trong console
console.log(classList);
