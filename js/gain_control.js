/**
 * Gain Control - Handles proportional control and saturation.
 * 
 * Task 2: Implement dynamic compensation mapping and saturation.
 */

class GainControl {
    constructor(kp = 1.0, maxOutput = 100) {
        this.kp = kp;
        this.maxOutput = maxOutput;
    }

    setKp(value) {
        this.kp = parseFloat(value);
    }

    /**
     * Calculates the control output based on the error and gain.
     * @param {number} error - The normalized error [-1.0, 1.0].
     * @returns {number} The control output (e.g., steering angle).
     */
    calculateOutput(error) {
        // TODO: Implement P-control logic: output = error * kp
        let output = error * this.kp;

        // TODO: Implement Saturation (Clamp output between -maxOutput and maxOutput)
        
        return output;
    }
}

export default GainControl;
