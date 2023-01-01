// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Modeling a ball in our program
class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x; // x coordinate
      this.y = y; // y coordinate
      this.velX = velX; // horizonal velocity -- move x coordinate by this much
      this.velY = velY; // vertical velocity -- move y coordinate by this much
      this.color = color; // ball color
      this.size = size; // ball radius/size

    }
      // Drawing the ball
      draw() {
          ctx.beginPath(); // state that we want to draw a shape on the paper
          ctx.fillStyle = this.color;
          // trace an arc shape on the paper
          // x,y - position; size - radius; 0, 2*Math.PI - start and end of the degrees (0-360)
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          // finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle
          ctx.fill();
        }
        
        // Updating the ball's data -- to move the ball
        // reverse the polarity of the relevant velocity to make the ball travel in the opposite direction
        // when the ball has reached the edge of the canvas.
        update() {
            if ((this.x + this.size) >= width) {
                this.velX = -(this.velX);
            }
            
            if ((this.x - this.size) <= 0) {
                this.velX = -(this.velX);
            }
            
            if ((this.y + this.size) >= height) {
                this.velY = -(this.velY);
            }
            
            if ((this.y - this.size) <= 0) {
                this.velY = -(this.velY);
            }
            
            // make the ball moving every time
            this.x += this.velX;
            this.y += this.velY;
        }
        
        // Adding collision detection
        collisionDetect() {
            // For each ball, we need to check every other ball to see if it has collided with the current ball (whose collisionDetect method is being invoked).
            for (const ball of balls) {
                // We don't want to check whether a ball has collided with itself!
                if (this !== ball) {
                    const dx = this.x - ball.x;
                    const dy = this.y - ball.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
            
                    if (distance < this.size + ball.size) {
                        ball.color = this.color = randomRGB();
                    }
                }
            }
        }
          
        
}

// Animating the ball
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// an animation loop -- update the information in the program & render the resulting view on each frame of the animation
function loop() {
    // sets the canvas fill color -- cover previous frame's drawing
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // semi-transparent allows previous few frames shine through, producing little trails of each ball as they move
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
    
    // Runs the function again using the requestAnimationFrame() method
    // it runs that function a set number of times per second to create a smooth animation
    requestAnimationFrame(loop);
}

loop();

  
