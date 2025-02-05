const productsContainer=document.querySelector(".products-container");
const productsCart=document.querySelector(".cart-container");
const total=document.querySelector(".total");
const categoriesContainer=document.querySelector(".categories");
const categoriesList=document.querySelectorAll(".category");
const showMoreBtn=document.querySelector(".btn-load");
const shopBtn=document.querySelector(".btn-shop");
const cartBubble=document.querySelector(".cart-bubble");
const cartBtn=document.querySelector(".cart-label");
const menuBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


//Logica de productos

//  @param {object} 
//  @returns  {string}  

const createProductTemplate = (product) => {
  const { id, name, price, img } = product;
  return ` 
  <div class="product">
                    <img src=${img} alt=${name} />
                    <div class="product-info">
                        <div class="product-top">
                            <h3>${name}</h3>
                        </div>
                        <div class="product-mid">
                            <p>${price} ARS</p>
                        </div>
                        <div class="product-bot">
                            <button class="btn-shop"
                            data-id='${id}'
                            data-name='${name}'
                            data-price='${price}'
                            data-img='${img}'
                            >SHOP</button>
                        </div>
                    </div>
                </div>`;
};

// @param {object[]} productsList 

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
      .map(createProductTemplate)
      .join("");
  };



  //Logica de ver más

// @returns {boolean}
 
const lastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
  };


  const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (lastIndexOf()) {
      showMoreBtn.classList.add("hidden");
    }
  };
  
 
  const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
      showMoreBtn.classList.remove("hidden");
      return;
    }
    showMoreBtn.classList.add("hidden");
  };


  //Logica de filtros

// @param {string} selectedCategory
 
 const changeBtnActiveState = (selectedCategory) => {
   const categories = [...categoriesList];
   categories.forEach((categoryBtn) => {
     if (categoryBtn.dataset.category !== selectedCategory) {
       categoryBtn.classList.remove("active");
       return;
     }
     categoryBtn.classList.add("active");
   });
 };

 // @param {object} btn 

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

// @param {event} event 

const applyFilter = ({ target }) => {
  if (!isInactiveFilterBtn(target)) return;
  changeFilterState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

//@param {object} 
// @returns {boolean} 

const isInactiveFilterBtn = (element) => {
 return (
   element.classList.contains("category") &&
   !element.classList.contains("active")
 );
};


const renderFilteredProducts = () => {
 const filteredProducts = productsData.filter(
   (product) => product.category === appState.activeFilter
 );
 renderProducts(filteredProducts);
};

 // Menu

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return; 
  }
  overlay.classList.toggle("show-overlay");
};


const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return; 
  }
  overlay.classList.toggle("show-overlay");
};


const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) return;
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};


const closeOnScroll = () => {
  if (
    barsMenu.classList.contains("open-menu") ||
    cartMenu.classList.contains("open-cart")
  ) {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  }
};


const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

 // Logica de agregar al carrito

const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `    
    <div class="cart-item">
      <img src=${img} alt="Foto del carrito" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <span class="item-price">${price} ARS</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};


const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};

const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} ARS`;
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc,cur) => acc+cur.quantity,0);
};

const disableBtn = (btn) => {
  if (!cart.length){
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
}

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(shopBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-shop")) return;
  const product= createProductData(e.target.dataset);
  if(isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else{
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado con exito");
  }
  updateCartState();
};

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct)=>
    cartProduct.id===product.id 
    ? {...cartProduct,quantity: cartProduct.quantity+1}
    : cartProduct
  );
  
};

const createCartProduct = (product) => {
  cart=[...cart,{...product,quantity:1}]
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id===product.id) 
}

const createProductData= (product) => {
  const {id,name,price,img} = product;
  return {id,name,price,img};
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent=msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal")
  },1500) 
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct= cart.find((item) => item.id==id);
  addUnitToProduct(existingCartProduct);
};

const handleMinusBtnEvent= (id) => {
  const existingCartProduct=cart.find((item) => item.id==id)

  if(existingCartProduct.quantity===1){
    if(window.confirm("¿Desea Eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};


const substractProductUnit= (existingProduct) => {
  cart=cart.map((product) => {
    return product.id===existingProduct.id
    ? {...product,quantity: Number(product.quantity)-1}
    : product;
  });
};


const removeProductFromCart =(existingProduct) => {
  cart=cart.filter((product) => product.id!==existingProduct.id);
  updateCartState();
};

const handleQuantity= (e) => {
  if(e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")){
    handlePlusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

const resetCartItems = () => {
  cart =[];
  updateCartState();
};

const completeCartAction = (confirmMsg,successMsg) => {
  if(!cart.length) return;
  if(window.confirm(confirmMsg)){
    resetCartItems();
    alert(successMsg);
  }
};

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?","Gracias por su compra");
};

const deleteCart = () => {
  completeCartAction("¿Desea vaciar el carrito?","No hay mas productos en el carrito")
}

const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  shopBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(shopBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
};

init();

