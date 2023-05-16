
let list = document.getElementById('popUp-panel-list')
let table = document.getElementById('popUp-panel-list-table')
let baner = document.getElementById('popUp-panel')
let html = document.getElementById('html')
let level = document.getElementById('popUp-panel-level')
let beadroom = document.getElementById('popUp-panel-beadroom')

let mas = [
  {number: 'SA001', level: 0, call: '1', s: 111.2, dop: ['Т', 'Г', 'П' ], state: 'Свободна'},
  {number: 'SA205', level: 0, call: '4', s: 111.2, dop: ['Т', 'М', 'Г', 'П' ], state: 'Забронирована'},
  {number: 'SA001', level: 2, call: '1', s: 73.2, dop: ['Т', 'М', 'Г' ], state: 'Свободна'},
  {number: 'A401', level: 0, call: '2', s: 51.2, dop: ['Т', 'М', 'Г', 'П' ], state: 'Свободна'},
  {number: 'SA001', level: 1, call: '1', s: 111.2, dop: ['Т', 'М', 'П' ], state: 'Забронирована'},
  {number: 'SA001', level: 0, call: '3', s: 91.2, dop: ['Т', 'М', 'Г', 'П' ], state: 'Занята'},
  {number: 'A603', level: 4, call: '1', s: 131.2, dop: ['Г'], state: 'Свободна'},
  {number: 'SA001', level: 0, call: '1', s: 191.2, dop: ['Т', 'М', 'Г', 'П' ], state: 'Забронирована'},
  {number: 'A703', level: 6, call: '1', s: 121.2, dop: ['Т', 'М' ], state: 'Занята'},
]
 

let settings = {
  kall: [],
  level: [],
  dop: [],
}

const openList = () =>{
  table.style.display = 'block'
  list.innerHTML = ''
  let beadroomList = filterMas(mas)
  setTimeout(() => {
    document.getElementById('popUp-panel-list-table').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, 200);
  beadroomList.map((item, index) => {
    list.innerHTML = list.innerHTML + `<div class="popUp-panel-list-top-element">
    <div class="popUp-panel-list-top-element-name list-num">${item.number}</div>
    <div class="popUp-panel-list-top-element-name list-call">${item.call}</div>
    <div class="popUp-panel-list-top-element-name list-lev">${item.level}</div>
    <div class="popUp-panel-list-top-element-name list-s">${item.s}</div>
    <div class="popUp-panel-list-top-element-name list-state">${item.state}</div>
    </div>`
  })
}

const filterMas = (masiv) => {
  let mas = []
  if (settings.kall.length !== 0){
    for (let index = 0; index < masiv.length; index++) {
      settings.kall.map(item => {
        if (item === 'Студия') {
          if (item === masiv[index].call) {
            mas.push(masiv[index])
          }
          if (mas.length === 0) {
            return mas
          }
        } else {
          if (item === '3+') {
            if (3 <= Number(masiv[index].call)) {
              mas.push(masiv[index])
            }
          } else {
            if (item === masiv[index].call) {
              mas.push(masiv[index])
            }
          }
        }
      })
    }
  }
  if (settings.level.length !== 0){
    if (mas.length === 0) {
      for (let index = 0; index < masiv.length; index++) {
        settings.level.map(item => {
          if (item === '7-8') {
            if (7 <= Number(masiv[index].level)) {
              mas.push(masiv[index])
            }
          } else {
            if (Number(item) === masiv[index].level) {
              mas.push(masiv[index])
            }
          }
        })
      }
    } else {
      let mas2 = mas
      mas = []
      for (let index = 0; index < mas2.length; index++) {
        settings.level.map(item => {
          if (item === '7-8') {
            if (7 <= Number(mas2[index].level)) {
              mas.push(mas2[index])
            }
          } else {
            if (Number(item) === mas2[index].level) {
              mas.push(mas2[index])
            }
          }
        })
      }
    }
  }
  if (settings.dop.length !== 0){
    if (mas.length === 0) {
      let mas3 = masiv
      settings.dop.map(item => {
        let mas4 = mas3
        mas3 = []
        mas4.map(items => {
          items.dop.map(items2 => {
            if (items2 === item) {
              mas3.push(items)
            }
          })
        })
        console.log(mas3)
      })
      mas = mas3
    } else {
      let mas3 = mas
      mas = []
      settings.dop.map(item => {
        let mas4 = mas3
        mas3 = []
        mas4.map(items => {
          items.dop.map(items2 => {
            if (items2 === item) {
              mas3.push(items)
            }
          })
        })
        console.log(mas3)
      })
      mas = mas3
    }
  }
  if (mas.length !== 0) {
    let mas2 = mas
    mas = []
    mas = mas2.filter(item => document.getElementById('popUp-input1').value <= Math.floor(Number(item.s)) &&  Math.floor(Number(item.s)) <= document.getElementById('popUp-input2').value)
  }
  return mas
}

const editDop = (e) => {
  if (e.innerText === 'Пентхаус') {
    if (settings.dop.filter(item => item === 'П').length === 0) {
      e.classList.add('active-btn')
      settings.dop.push('П')
    } else {
      e.classList.remove('active-btn')
      let dop = settings.dop
      settings.dop = []
      dop.map(item => {
        if (item !== 'П') {
          settings.dop.push(item)
        }
      })
    }
  } else if (e.innerText === 'Терраса') {
    if (settings.dop.filter(item => item === 'Т').length === 0) {
      e.classList.add('active-btn')
      settings.dop.push('Т')
    } else {
      e.classList.remove('active-btn')
      let dop = settings.dop
      settings.dop = []
      dop.map(item => {
        if (item !== 'Т') {
          settings.dop.push(item)
        }
      })
    }
  } else if (e.innerText === 'Вид на море') {
    if (settings.dop.filter(item => item === 'М').length === 0) {
      e.classList.add('active-btn')
      settings.dop.push('М')
    } else {
      e.classList.remove('active-btn')
      let dop = settings.dop
      settings.dop = []
      dop.map(item => {
        if (item !== 'М') {
          settings.dop.push(item)
        }
      })
    }
  } else if (e.innerText === 'Вид на горы') {
    if (settings.dop.filter(item => item === 'Г').length === 0) {
      e.classList.add('active-btn')
      settings.dop.push('Г')
    } else {
      e.classList.remove('active-btn')
      let dop = settings.dop
      settings.dop = []
      dop.map(item => {
        if (item !== 'Г') {
          settings.dop.push(item)
        }
      })
    }
  }
}

const editCall = (e) => {
  if (e.innerText === 'Студия') {
    if (settings.kall.filter(item => item === e.innerText).length === 0) {
      e.classList.add('active-btn')
      settings.kall.push(e.innerText)
    } else {
      e.classList.remove('active-btn')
      let dop = settings.kall
      settings.kall = []
      dop.map(item => {
        if (item !== e.innerText) {
          settings.kall.push(item)
        }
      })
    }
  } else {
    if (settings.kall.filter(item => item === e.innerText).length === 0) {
      e.classList.add('active-btn')
      settings.kall.push(e.innerText)
    } else {
      e.classList.remove('active-btn')
      let dop = settings.kall
      settings.kall = []
      dop.map(item => {
        if (item !== e.innerText) {
          settings.kall.push(item)
        }
      })
    }
  }
}

const editLevel = (e) => {
  if (e.innerText === '7-8') {
    if (settings.level.filter(item => item === e.innerText).length === 0) {
      e.classList.add('active-btn')
      settings.level.push(e.innerText)
    } else {
      e.classList.remove('active-btn')
      let dop = settings.level
      settings.level = []
      dop.map(item => {
        if (item !== e.innerText) {
          settings.level.push(item)
        }
      })
    }
  } else {
    if (settings.level.filter(item => item === e.innerText).length === 0) {
      e.classList.add('active-btn')
      settings.level.push(e.innerText)
    } else {
      e.classList.remove('active-btn')
      let dop = settings.level
      settings.level = []
      dop.map(item => {
        if (item !== e.innerText) {
          settings.level.push(item)
        }
      })
    }
  }
}
const clousedBaner = () => {
  baner.style.left = '-100%'
  html.classList.remove('overflow')
  level.classList.remove('active-level')
  beadroom.style.left = '-100%'
}
const clousedToBaner = () => {
  level.classList.remove('active-level')
  beadroom.style.left = '-100%'
} 
const openBaner = () => {
  baner.style.left = '0px'
  html.classList.add('overflow')
}
const clouseLevel = () => {
  level.classList.remove('active-level')
}
const clouseBeadroom = () => {
  beadroom.style.left = '-100%'
}

$('.svg_button > path').click(function() {
  level.classList.add('active-level')
  swiper2.slideTo(Number(event.target.getAttribute('name')))
})
$('.svg_button2 ').click(function() {
  beadroom.style.left = '0px'
})


window.addEventListener('scroll', function() {
  if (window.scrollY > 136) {
    document.getElementById('header').classList.add('header-active')
    document.getElementById('lang').classList.add('lang-active')
  } else{
    document.getElementById('header').classList.remove('header-active')
    document.getElementById('lang').classList.remove('lang-active')
  }
});
document.addEventListener('DOMContentLoaded', () => {

  const followCursor = () => { // объявляем функцию followCursor
    const el = document.querySelector('.follow-cursor') // ищем элемент, который будет следовать за курсором

    window.addEventListener('mousemove', e => { // при движении курсора
      const target = e.target // определяем, где находится курсор
      if (!target) return

      if (target.closest('.svg_button2')) { // если курсор наведён на ссылку
        el.classList.add('follow-cursor_active') // элементу добавляем активный класс
      } else { // иначе
        el.classList.remove('follow-cursor_active') // удаляем активный класс
      }

      el.style.left = e.pageX + 'px' // задаём элементу позиционирование слева
      el.style.top = e.pageY + 'px' // задаём элементу позиционирование сверху
    })
  }

  followCursor() // вызываем функцию followCursor

})