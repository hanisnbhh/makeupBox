// FETCH BRANDS IN THE DROPDOWN
function fetchBrands() {
    // Fetch data from API to get makeup products
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
        .then(response => response.json())
        .then(data => {

            const brands = data.map(item => item.brand).filter((value, index, self) => self.indexOf(value) === index);

            const brandDropdown = document.getElementById('brandDropdown');
            brandDropdown.innerHTML = '<option value="">Choose Brand</option>';
  
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.text = brand;
                brandDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching brands:", error);
        });
  }
  
  // FETCH AND DISPLAY PRODUCTS BY SELECTED BRAND
  function getProductsByBrand() {
    const selectedBrand = document.getElementById('brandDropdown').value;
  
    // Fetch products based on the selected brand
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}`)
        .then(response => response.json())
        .then(data => {
            populateProductTypes(data);
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            document.getElementById("productList").innerHTML = "Error fetching products.";
        });
  }
  
  // POPULATE PRODUCT TYPES DROPDOWN
  function populateProductTypes(data) {
    const productTypeDropdown = document.getElementById('productTypeDropdown');
    productTypeDropdown.innerHTML = '<option value="">All</option>';
  
    const productTypes = data.map(item => item.product_type).filter((value, index, self) => self.indexOf(value) === index);
  
    productTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.text = type;
        productTypeDropdown.appendChild(option);
    });
  }
  
  // FETCH AND DISPLAY PRODUCTS BY SELECTED TYPE
  function getProductsByType() {
    const selectedBrand = document.getElementById('brandDropdown').value;
    const selectedType = document.getElementById('productTypeDropdown').value;
  
    let url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}`;
    if (selectedType) {
        url += `&product_type=${selectedType}`;
    }
  
    // Fetch products based on the selected brand and type
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            document.getElementById("productList").innerHTML = "Error fetching products.";
        });
  }
  
  // DISPLAY PRODUCTS IN THE LIST
  function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = '';
  
    products.forEach(product => {
        const li = document.createElement('li');
        const detailsDiv = document.createElement('div');
  
        li.addEventListener('click', function () {
            displayProductDetails(product);
        });
  
        if (product.image_link) {
            const img = document.createElement('img');
            img.src = product.image_link;
            img.dataset.productType = product.product_type || '';
            img.dataset.description = product.description || '';
            img.dataset.productLink = product.product_link || '';
            img.style.maxWidth = '200px';
            img.classList.add('productImage');
            detailsDiv.appendChild(img);
        }
  
        if (product.name) {
            detailsDiv.innerHTML += `<b>${product.name}</b> <br><br>`;
        } else {
            detailsDiv.innerHTML += `<b>Product Name:</b> Product Name not available <br><br>`;
        }
  
        if (product.price) {
            detailsDiv.innerHTML += `<b>$${product.price}</b> <br><br>`;
        } else {
            detailsDiv.innerHTML += `<b>Price:</b> Price not available <br><br>`;
        }
  
        li.appendChild(detailsDiv);
        productList.appendChild(li);
    });
  }
  
  // DISPLAY PRODUCT DETAILS
  function displayProductDetails(product) {
    const name = product.name || 'Product name not available';
    const productType = product.product_type || 'Product type not available';
    const description = product.description || 'Description not available';
    const price = `$${product.price}` || 'Price not available';
    const productLink = product.product_link || 'Product link not available';
  
    displayModal(name, productType, description, price, productLink);
  }
  
  // DISPLAY MODAL WITH PRODUCT DETAILS
  function displayModal(name, productType, description, price, productLink) {
    const modal = document.getElementById('makeupModal');
    const productNameSpan = document.getElementById('productNameSpan');
    const productTypeSpan = document.getElementById('productTypeSpan');
    const descriptionSpan = document.getElementById('descriptionSpan');
    const priceSpan = document.getElementById('priceSpan');
    const productLinkSpan = document.getElementById('productLinkSpan');
  
    productNameSpan.textContent = name;
    productTypeSpan.textContent = productType;
    descriptionSpan.textContent = description;
    priceSpan.textContent = price;
    productLinkSpan.innerHTML = productLink !== 'Product link not available' ?
      `<a href="${productLink}" target="_blank">Order Now!</a>` : 'Product link not available';
  
    modal.style.display = 'block';
  }
  
  // CLOSE THE MODAL
  function closeModal() {
    document.getElementById('makeupModal').style.display = 'none';
  }
  
  // FETCH BRANDS WHEN THE PAGE LOADS
  fetchBrands();
  