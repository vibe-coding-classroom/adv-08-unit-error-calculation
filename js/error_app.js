/**
 * Error Engine - Core logic for error calculation and filtering.
 * 
 * Task 1: Implement coordinate normalization.
 * Task 3: Implement moving average filtering.
 */

class ErrorEngine {
    constructor(windowSize = 5) {
        this.windowSize = windowSize;
        this.errorHistory = [];
    }

    /**
     * Normalizes the raw coordinate to a range of [-1.0, 1.0].
     * @param {number} targetX - The raw X coordinate of the target.
     * @param {number} canvasWidth - The width of the input frame.
     * @returns {number} Normalized error.
     */
    normalizeError(targetX, canvasWidth) {
        // TODO: Implement normalization formula
        // (targetX - center) / halfWidth
        return 0.0; 
    }

    /**
     * Adds a new error value to the history and returns the smoothed average.
     * @param {number} newError - The latest normalized error.
     * @returns {number} Smoothed error.
     */
    getSmoothedError(newError) {
        // TODO: Implement moving average logic
        // 1. Push newError to errorHistory
        // 2. If history exceeds windowSize, shift oldest
        // 3. Return average of history
        return newError;
    }

    /**
     * Process a raw coordinate into a filtered control signal.
     */
    process(targetX, canvasWidth) {
        const rawError = this.normalizeError(targetX, canvasWidth);
        return this.getSmoothedError(rawError);
    }
}

export default ErrorEngine;
