import ipads from '../data/ipads.js'//ipads는 자유롭게 이름을 정할 수 있음
import navigations from '../data/navigations.js'



// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) { // falase 또는 true
    // hide (show 가 있으면)
    hideBasket()// basketEl.classList.remove('show')
  } else {
    // show (show 가 없으면)
    showBasket()// basketEl.classList.add('show')
  }
})

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function () {
  hideBasket()// basketEl.classList.remove('show')
})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

// 검색
const headerEl = document.querySelector('header')
// const headerMenuEls = headerEl.querySelectorAll('ul.menu > li')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] // ...전개연산자를 통하여 해체(얕은 복사 shallow copy)
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const shadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
// const searchDelayEls = searchWrapEl.querySelectorAll('li')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

// searchStarterEl.addEventListener('click', function () {
//   showSearch()
// })
searchStarterEl.addEventListener('click', showSearch)
// searchCloserEl.addEventListener('click', function () {
//   hideSearch()
// })
searchCloserEl.addEventListener('click', hideSearch)
// shadowEl.addEventListener('click', function () {
//   hideSearch()
// })
shadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' // 여기서는 .4 /12 와 같다.
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' // 여기서는 .4 /12 와 같다.
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ''
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})

// 비디오 재생

const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 당신에게 맞는 iPad는? 랜더링! *가져오는 코드는 최상단에 작석해야함
const itemsEl = document.querySelector('section.compare .items')  // console.log(ipads)

ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')
  // itemEl.textContent = ipad.name
  // itemEl.textContent = '<div style = "color: red;">Hello</div>'
  // itemEl.innerHTML = '<div style = "color: red;">Hello</div>'

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style = "background-color: ${color};"></li>`
  })



  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt = "${ipad.name}" >
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p> 
    <p class="price">￦${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})


// footer navigations
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav) { /*강의에서는 (nav)인데 git에는 function이 없고 (nav => 이다. */
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {  /*강의에서는 (map)인데 git에는 function이 없고(map => 이다. */
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()