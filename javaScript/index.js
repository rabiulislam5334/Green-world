// variable declear
const categoryContainer = document.getElementById("category-container");
const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
const modalContainer = document.getElementById("modal-container");
const modalClick = document.getElementById("my_modal_5");
let cartProducts = [];
// API Featch
/*Load Category*/
const loadCategory = async () => {
  try {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    const categories = data.categories;
    showCategory(categories);
  } catch (error) {}
};

/*Load product*/
const loadProduct = async (productId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/category/${productId}`;
    const res = await fetch(url);
    const data = await res.json();
    const products = data.plants;
    showProducts(products);
  } catch (error) {}
};
// load modal
const loadModal = async (Id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/plant/${Id}`;
    const res = await fetch(url);
    const data = await res.json();
    const modals = data.plants;
    // console.log(modals);
    showModal(modals);
  } catch (error) {}
};
// load all plants
const loadallPlants = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/plants`;
    const res = await fetch(url);
    const data = await res.json();
    const plants = data.plants;
    // console.log(modals);
    showCategory(plants);
  } catch (error) {}
};

// show API
const showCategory = (categoriesData) => {
  categoryContainer.innerHTML = "";
  categoriesData.forEach((category) => {
    categoryContainer.innerHTML += `  
      <li
                  id="${category.id}"
                  class=" flex whitespace-nowrap rounded-sm p-2 md:w-full hover:bg-green-700  gap-10 hover:text-white shadow-none "
                >
                  ${category.category_name}
                </li>
    
         `;
  });
};
// show all category
/*const ShowallCategory = (plants) => {
  categoryContainer.innerHTML = "";
  categoriesData.forEach((plant) => {
    categoryContainer.innerHTML += `
    
     <li
                  id="${category.id}"
                  class=" flex whitespace-nowrap rounded-sm p-2 md:w-full hover:bg-green-700  gap-10 hover:text-white shadow-none "
                >
                 All Plants ${plant.name}
                </li>
    
         `;
  });
};*/
/*showProduct*/
const showProducts = (products) => {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    productContainer.innerHTML += `
        <div id="${product.id}" class="product-item w-4/5 md:w-full bg-white p-4 rounded shadow mx-auto ">
                <img src="${product.image}" alt="" class="w-full h-40 object-cover rounded mb-2" />
                <div >
                  <h2 onclick="loadModal(${product.id})" class="title text-lg font-semibold my-2">${product.name}</h2>
                  <p onclick="loadModal(${product.id})" class="">
                    ${product.description}
                  </p>
                </div>
                <div class="flex justify-between items-center">
                  <button onclick="loadModal(${product.id})" class=" catagory-btn my-2 bg-sky-100 rounded-xl py-1 px-2">
                    ${product.category}
                  </button>
                  <h3 class="text-lg font-semibold">
                    <span class="font-extrabold">৳</span><span class="price">${product.price}</span>
                  </h3>
                </div>
                <div class="py-2">  
                <button
                  class="btn cart-btn w-full bg-green-700 hover:bg-green-500 text-white font-semibold rounded-full my-1"
                >
                  Add to Cart
                </button>
                </div>
                
              </div>`;
  });
};
// show modal
const showModal = (modal) => {
  modalContainer.innerHTML = "";
  modalContainer.innerHTML += `<div class="space-y-3">
            <h2 class="text-lg font-bold">${modal.name}</h2>
            <img src="${modal.image}" alt="" class="w-full h-64 object-cover rounded-lg mb-2" />
            <h2 class="font-semibold">Categoty : ${modal.category}</h2>
            <h2 class="font-semibold">Price : ${modal.price}</h2>
            <h2 class="font-semibold">Description : ${modal.description}</h2>
          </div>`;
  modalClick.showModal();
};

// add event
/*category click event*/
categoryContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const allli = document.querySelectorAll("li");
    allli.forEach((li) => {
      li.classList.remove("bg-green-700");
      li.classList.remove("text-white");
    });
    e.target.classList.add("bg-green-700");
    e.target.classList.add("text-white");
    // console.log(e.target.id);
    showLoading();
    loadProduct(e.target.id);
  }
});
productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-btn")) {
    const cartCard = e.target.closest(".product-item");
    const title = cartCard.querySelector(".title").innerText;
    const price = cartCard.querySelector(".price").innerText;
    const id = cartCard.id;
    alert(`${title} cart-এ যোগ করা হলো!`);
    cartProducts.push({
      title: title,
      price: price,
      id: id,
    });
    showCartCard(cartProducts);
  }
});
// show event
const showCartCard = (cartProducts) => {
  console.log(cartProducts);
  cartContainer.innerText = "";
  let total = 0;
  cartProducts.forEach((cartProduct) => {
    cartContainer.innerHTML += `
    <div class="bg-slate-100 flex justify-between items-center rounded-lg p-3 my-3" >
                <div>
                  <h2 class="text-lg font-semibold">${cartProduct.title}</h2>
                  <p class="text-lg"><span class=" font-extrabold">৳</span><span>${cartProduct.price}</span> x 1</p>
                </div>
                <button onclick="deleteCartbtn('${cartProduct.id}')" class="text-lg text-red-400">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>`;
    total += Number(cartProduct.price);
  });
  totalPrice.innerText = total;
};

const deleteCartbtn = (btnId) => {
  const filterId = cartProducts.filter(
    (cartProduct) => cartProduct.id !== btnId
  );
  cartProducts = filterId;
  showCartCard(cartProducts);
};

// show loading
const showLoading = () => {
  productContainer.innerHTML = `
  <div class=" flex items-center justify-center col-span-3 h-40 ">
  <span class="loading loading-bars loading-xl bg-red-500"></span>;
  </div>`;
};
// call function
loadCategory();
loadProduct(5);
