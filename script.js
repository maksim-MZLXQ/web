const productsContainer = document.getElementById("productsContainer");
const productTemplate = document.getElementById("productTemplate");
const addProductBtn = document.getElementById("addProduct");
const clearDemandBtn = document.getElementById("clearDemand");
const demandForm = document.getElementById("demandForm");
const productCountEl = document.getElementById("productCount");
const grandTotalEl = document.getElementById("grandTotal");
const adminModeCheckbox = document.getElementById("adminMode");
const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

let currentSlide = 0;

function formatCurrency(value) {
  return `¥${value.toFixed(2)}`;
}

function updateStatusBadge(productItem, statusText) {
  const badge = productItem.querySelector(".status-badge");
  badge.textContent = statusText;
  badge.classList.remove("status-new", "status-processing", "status-confirmed");

  if (statusText === "处理中") {
    badge.classList.add("status-processing");
    return;
  }
  if (statusText === "已确认") {
    badge.classList.add("status-confirmed");
    return;
  }
  badge.classList.add("status-new");
}

function recalcProduct(productItem) {
  const priceInput = productItem.querySelector(".unit-price");
  const quantityInput = productItem.querySelector(".quantity");
  const totalInput = productItem.querySelector(".total-price");
  const price = Number(priceInput.value) || 0;
  const quantity = Number(quantityInput.value) || 0;
  const total = price * quantity;
  totalInput.value = formatCurrency(total);
  recalcGrandTotal();
}

function recalcGrandTotal() {
  const productItems = Array.from(document.querySelectorAll(".product-item"));
  const grandTotal = productItems.reduce((sum, item) => {
    const price = Number(item.querySelector(".unit-price").value) || 0;
    const quantity = Number(item.querySelector(".quantity").value) || 0;
    return sum + price * quantity;
  }, 0);
  productCountEl.textContent = String(productItems.length);
  grandTotalEl.textContent = formatCurrency(grandTotal);
}

function handleImagePreview(fileInput) {
  const preview = fileInput.closest(".img-upload").querySelector(".preview");
  const uploadTip = fileInput.closest(".img-upload").querySelector(".upload-tip");
  const [file] = fileInput.files || [];
  if (!file) {
    preview.style.display = "none";
    uploadTip.style.display = "block";
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    preview.src = event.target.result;
    preview.style.display = "block";
    uploadTip.style.display = "none";
  };
  reader.readAsDataURL(file);
}

function bindProductEvents(productItem) {
  const priceInput = productItem.querySelector(".unit-price");
  const quantityInput = productItem.querySelector(".quantity");
  const removeBtn = productItem.querySelector(".remove-product");
  const imageInput = productItem.querySelector(".product-image");
  const statusSelect = productItem.querySelector(".admin-status");

  priceInput.addEventListener("input", () => recalcProduct(productItem));
  quantityInput.addEventListener("input", () => recalcProduct(productItem));

  removeBtn.addEventListener("click", () => {
    productItem.remove();
    recalcGrandTotal();
  });

  imageInput.addEventListener("change", () => handleImagePreview(imageInput));

  statusSelect.addEventListener("change", () => {
    updateStatusBadge(productItem, statusSelect.value);
  });
}

function addProduct(defaults = {}) {
  const fragment = productTemplate.content.cloneNode(true);
  const productItem = fragment.querySelector(".product-item");

  if (defaults.name) {
    productItem.querySelector(".product-name").value = defaults.name;
  }
  if (defaults.link) {
    productItem.querySelector(".product-link").value = defaults.link;
  }
  if (defaults.price != null) {
    productItem.querySelector(".unit-price").value = String(defaults.price);
  }
  if (defaults.quantity != null) {
    productItem.querySelector(".quantity").value = String(defaults.quantity);
  }
  if (defaults.remark) {
    productItem.querySelector(".remark-input").value = defaults.remark;
  }

  bindProductEvents(productItem);
  productsContainer.appendChild(fragment);
  recalcProduct(productsContainer.lastElementChild);
  setAdminMode(adminModeCheckbox.checked);
}

function setAdminMode(enabled) {
  document.querySelectorAll(".admin-status").forEach((select) => {
    select.style.display = enabled ? "block" : "none";
  });
}

function showSlide(index) {
  testimonials.forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  showSlide(currentSlide);
}

addProduct({
  name: "产品1",
  price: 0,
  quantity: 1,
  remark: "左侧可以上传图片，右侧填写品名、链接、单价、数量、总价、备注",
});

addProductBtn.addEventListener("click", () => addProduct());

clearDemandBtn.addEventListener("click", () => {
  productsContainer.innerHTML = "";
  addProduct({ name: "产品1", price: 0, quantity: 1 });
});

adminModeCheckbox.addEventListener("change", () => {
  setAdminMode(adminModeCheckbox.checked);
});

demandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("demandTitle").value;
  const priority = document.getElementById("priority").value;
  const date = document.getElementById("deliveryDate").value;
  const count = document.querySelectorAll(".product-item").length;
  window.alert(
    `需求已提交\n标题：${title}\n优先级：${priority}\n预计交付：${date}\n产品数：${count}\n当前总额：${grandTotalEl.textContent}`
  );
});

nextSlideBtn.addEventListener("click", nextSlide);
prevSlideBtn.addEventListener("click", prevSlide);

setAdminMode(false);
showSlide(0);
window.setInterval(nextSlide, 5000);
