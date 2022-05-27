let montserrat;
let alphabet = [];
let bot = [];
let alphabetArray1;
// let alphabetArray2;

function preload() {
  montserrat = loadFont('montserratBold.otf');
}

function setup() {
  var canvas = createCanvas(1000, 800);

  // Move the canvas so it’s inside <div id="sketch-holder">.

  canvas.parent('sketch-holder');
  //   createCanvas(1000, 800);

  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  // noStroke();
  angleMode(DEGREES); // Change the mode to DEGREES

  textFont(montserrat);

  alphabetArray1 = montserrat.textToPoints(
    'NO' + ' WAЯ',
    width / 2 - 475,
    height / 2 + 100,
    205
  );

  for (let i = 0; i < alphabetArray1.length; i++) {
    alphabet[i] = new Alphabet1(alphabetArray1[i].x, alphabetArray1[i].y);
  }

  for (let i = 0; i < 100; i++) {
    bot[i] = new Bot();
  }
  print(alphabetArray1.length, bot.length);
}

function draw() {
  background(200);
  linearGradient(
    width,
    width - 1000,
    width,
    width - 100,
    color(211, 99, 72, 100),
    color(51, 100, 100, 100)
  );
  rect(width / 2, height / 2, 1000, 800, 0);

  for (let i = 0; i < bot.length; i++) {
    fill(0);
    strokeWeight(1);
    bot[i].show();
    bot[i].move();
    bot[i].collisionDetection();
  }

  for (let i = 0; i < alphabet.length; i++) {
    fill(255);
    strokeWeight(1);
    alphabet[i].show();
  }
}

// background:
function linearGradient(sX, sY, eX, eY, colorS, colorE) {
  let gradient = drawingContext.createLinearGradient(sX, sY, eX, eY);

  // change the values to change start and end point of a gradient’s colour

  gradient.addColorStop(0.45, colorS);
  gradient.addColorStop(0.55, colorE);

  // drawingContext.strokeStyle = gradient;

  drawingContext.fillStyle = gradient;
}

class Alphabet1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    rect(this.x, this.y, 10, 10);
  }
}

class Alphabet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // show() {
  //   rect(this.x, this.y, 10, 10);
  // }
}

class Bot {
  constructor() {
    this.x = random(360, 500);
    this.y = random(300, 520);
    this.s = random(5, 15);
    this.direction = random(-1, 1);
    this.direction1 = random(-1, 1);
    this.d;
  }

  show() {
    ellipse(this.x, this.y, this.s, this.s);

    line(this.x, this.y, this.x + 30, this.y + 30);
    line(this.x, this.y, this.x - 20, this.y - 20);
    line(this.x, this.y, this.x - 25, this.y);
    line(this.x, this.y, this.x, this.y - 35);
    line(this.x, this.y, this.x, this.y + 15);
    line(this.x, this.y, this.x + 15, this.y);
  }

  move() {
    this.x = this.x + this.direction;
    this.y = this.y + this.direction1;

    if (this.x > width || this.x < 0) {
      this.direction = -this.direction;
    }

    if (this.y > width || this.y < 0) {
      this.direction1 = -this.direction1;
    }
  }
  //dist takes 4 parameters: x1, y1, x2, y2
  collisionDetection() {
    for (let i = 0; i < alphabet.length; i++) {
      this.d = dist(alphabet[i].x, alphabet[i].y, this.x, this.y);

      if (this.d < 5) {
        this.direction = -this.direction;

        this.direction1 = -this.direction1;

        alphabet.splice(i, 1);
      }
    }
  }
}
