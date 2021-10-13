const clothesContainer = document.getElementById('clothes')

function getClothes() {
  fetch('https://bc-clothes.web.app/products')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      clothesContainer.innerHTML = data.map(item => {
        return `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.style} ${item.type}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.brand}</h6>
          <p class="card-text">$${item.price}</p>
        </div>
      </div>`
      }).join('')
    })
    .catch(err => {
      console.error(err)
      clothesContainer.innerHTML = '<div class="alert alert-danger" role="alert">'
        + err.message + '</div>'
    })
}

getClothes()

function clearForm() {
  document.getElementById('brand').value = ''
  document.getElementById('color').value = ''
  document.getElementById('style').value = ''
  document.getElementById('type').value = ''
  document.getElementById('price').value = ''
  document.getElementById('sku').value = ''
}

function addClothes(event) {
  event.preventDefault()
  // get our form values
  const data = {
    brand: document.getElementById('brand').value,
    color: document.getElementById('color').value,
    style: document.getElementById('style').value,
    type: document.getElementById('type').value,
    price: document.getElementById('price').value,
    sku: document.getElementById('sku').value,
  }
  fetch('https://bc-clothes.web.app/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      clearForm()
      getClothes()
    })
    .catch(err => alert(err.message))
}