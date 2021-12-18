const search = function () {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    const renderGoods = (goods) => {

        const goodContainer = document.querySelector('.long-goods-list')

        goodContainer.innerHTML = ''

        goods.forEach(good => {
            const goodBlock = document.createElement('div')

            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')

            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                    <img src="/wildberrisIntensive/db/${good.img}" alt="${good.name}" class="goods-image">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                        <span class="button-price">$${good.price}</span>
                    </button>
                </div>
            `
            goodContainer.append(goodBlock)

        })
    }

    const getData = (value) => {
        fetch('db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter(good => good.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

                localStorage.setItem('goods', JSON.stringify(array))

                if (window.location.pathname !== "/wildberrisIntensive/goods.html") {
                    window.location.href = "/wildberrisIntensive/goods.html"
                } else {
                    renderGoods(array)
                }
            })
    }

    searchBtn.addEventListener('click', () => {
        console.log()
        getData(input.value)
    })
}

search()