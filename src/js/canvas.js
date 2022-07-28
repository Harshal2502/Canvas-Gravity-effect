// import utils from './utils'

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// function distance(x1, y1, x2, y2) {
//   const xDist = x2 - x1
//   const yDist = y2 - y1

//   return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
// }

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#FCF69C', '#55D8C1', '#FF6FB5', '#AB46D2']

var gravity = 1
var friction = 0.8

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', function(){
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = -dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {

    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
// let objects
var ball
var ballArray = []
function init() {
  ballArray = []
  // objects = []

  // for (let i = 0; i < 400; i++) {
  //   // objects.push()
  // }

  for (let i = 0; i < 150; i++) {
    var radius = randomIntFromRange(8,20)

    var x = randomIntFromRange(radius, canvas.width - radius)
    var y = randomIntFromRange(0, canvas.height - radius)
    var dx = randomIntFromRange(-2, 2)
    var dy = randomIntFromRange(-2, 2)
    var color = randomColor(colors)

    ballArray.push(new Ball(x, y, dx, dy, radius, color))
  }

}

// Animation Loop
function animate() {

  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update()
  }

  // c.fillText('Welcome, WolfHound!', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
