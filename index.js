(function () {
  /**
   * 笨蛋看源码
   */
  const box = document.querySelector('.box')

  const createDiv = cName => {
    const divEle = document.createElement('div')

    divEle.setAttribute('class', cName)

    return divEle
  }

  const createSpan = (cName, content) => {
    const spanEle = document.createElement('span')

    spanEle.setAttribute('class', cName)
    spanEle.innerHTML = content

    return spanEle
  }

  const getWeekDay = () => {
    const nowDate = new Date()
    const nowDay = nowDate.getDay()
    
    const nextWeekDay = 1000 * 60 * 60 * 24 - (nowDate - new Date(new Date().setHours(0, 0, 0)))

    return {
      day: 5 - nowDay,
      hour: Math.floor(nextWeekDay / (1000 * 60 * 60)),
      minute: Math.ceil((nextWeekDay % (1000 * 60 * 60)) / (1000 * 60))
    }
  }

  const genearateItem = () => {
    box.innerHTML = ''

    const title = createDiv('title')
    title.innerHTML = 'HAPPY HOLYDAYS'

    box.appendChild(title)

    const list = [
      {
        title: '周末',
        time: getWeekDay()
      }
    ]

    for (let i = 0; i < list.length; i++) {
      const item = createDiv('item')
      const type = createDiv('type')
      const time = createDiv('time')
      const timeDiv = createDiv('')
  
      // 处理type模块
      type.innerHTML = list[i].title
  
      // 处理time模块
      timeDiv.appendChild(createSpan('day', list[i].time.day))
      timeDiv.appendChild(createSpan('day-unit', '天'))
      timeDiv.appendChild(createSpan('hour', list[i].time.hour))
      timeDiv.appendChild(createSpan('hour-unit', '小时'))
      timeDiv.appendChild(createSpan('minute', list[i].time.minute))
      timeDiv.appendChild(createSpan('minute-unit', '分钟'))

      time.appendChild(timeDiv)

      item.appendChild(type)
      item.appendChild(time)

      box.appendChild(item)
    }
  }

  genearateItem()

  let timer = window.setInterval(() => {
    genearateItem()
  }, 2000)

  window.onunload = () => {
    timer = null
  }

  /**
   * 笨蛋看源码
   */
})()