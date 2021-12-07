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

  // 获取到本周末时间
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
  
  // 获取到元旦时间
  const getDay = target => {
    const nowDate = new Date()
    const oneOneDay = new Date(target)

    const nextOneOneDay = oneOneDay - nowDate

    return {
      day: Math.floor(nextOneOneDay / (1000 * 60 * 60 * 24)),
      hour: Math.floor((nextOneOneDay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minute: Math.ceil((nextOneOneDay % (1000 * 60 * 60 * 24) % (1000 * 60 * 60)) / (1000 * 60)),
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
      },
      {
        title: '元旦',
        time: getDay('2022/01/01 00:00')
      },
      {
        title: '春节',
        time: getDay('2022/02/01 00:00')
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

      type.touchend = () => {
        const canvas = getCanvasImage(list[i])

        const saveUrl = canvas.toDataURL('image/png')

        const a = document.createElement('a')

        a.href = saveUrl
        a.download = 'heihei'
        a.click()
      }

      box.appendChild(item)
    }
  }

  genearateItem()

  let timer = window.setInterval(() => {
    genearateItem()
  }, 30000)

  window.onunload = () => {
    timer = null
  }

  /**
   * 开始
   */
  const getCanvasImage = item => {
    const canvas = document.createElement('canvas')
    const width = 300
    const height = 200
    const radius = 8

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    ctx.strokeStyle = '#FFFFFF'

    ctx.beginPath()
    ctx.moveTo(radius, 0)
    ctx.lineTo(width - radius, 0)
    ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
    ctx.lineTo(width, height - radius)
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
    ctx.lineTo(radius, height)
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
    ctx.lineTo(0, radius)
    ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
    ctx.closePath()
    // ctx.stroke()
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()

    ctx.fillStyle = 'rgb(230, 230, 230)'
    ctx.fillRect(16, 16, width - 16 * 2, 40)

    ctx.fillStyle = 'rgb(167, 167, 167)'
    ctx.fillRect(28, 21, 10, 30)

    console.log(ctx.font)
    ctx.fillStyle = 'black'
    ctx.font = '18px blod sans-serif'
    ctx.fillText(item.title, 50, 41)

    ctx.font = '26px sans-serif'

    const time = item.time
    ctx.fillText(time.day, time.day > 9 ? 70 : 85, 120)
    ctx.fillText(time.hour, 120, 120)
    ctx.fillText(time.minute, time.hour > 9 ? 180 : 165, 120)

    ctx.font = '14px sans-serif'
    ctx.fillText('天', 100, 120)
    ctx.fillText('小时', time.hour > 9 ? 150 : 135, 120)
    ctx.fillText('分钟', 180 + (time.hour > 9 ? 15 : 0) + (time.minute > 9 ? 15 : 0), 120)

    return canvas

  }
  /**
   * 结束
   */

  /**
   * 笨蛋看源码
   */
})()