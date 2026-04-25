/**
 * Chart Painter - Visualizes error data over time.
 */

class ChartPainter {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.dataBuffer = [];
            this.maxPoints = 100;
        }
    }

    addData(value) {
        this.dataBuffer.push(value);
        if (this.dataBuffer.length > this.maxPoints) {
            this.dataBuffer.shift();
        }
        this.draw();
    }

    draw() {
        if (!this.ctx) return;

        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);

        // Draw center line
        this.ctx.strokeStyle = '#444';
        this.ctx.beginPath();
        this.ctx.moveTo(0, height / 2);
        this.ctx.lineTo(width, height / 2);
        this.ctx.stroke();

        // Draw data
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        for (let i = 0; i < this.dataBuffer.length; i++) {
            const x = (i / this.maxPoints) * width;
            // Map [-1, 1] to [height, 0]
            const y = height / 2 - (this.dataBuffer[i] * (height / 2));
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
    }
}

export default ChartPainter;
