import { describe, it, expect } from 'vitest';
import ErrorEngine from '../js/error_app.js';
import GainControl from '../js/gain_control.js';

describe('Error Calculation Math', () => {
    const engine = new ErrorEngine();
    const width = 320;

    it('should normalize coordinates correctly', () => {
        // Center should be 0
        expect(engine.normalizeError(160, width)).toBe(0);
        // Left edge should be -1
        expect(engine.normalizeError(0, width)).toBe(-1);
        // Right edge should be 1
        expect(engine.normalizeError(320, width)).toBe(1);
    });

    it('should calculate proportional output correctly', () => {
        const controller = new GainControl(10.0, 100);
        // Error 0.5 * Gain 10 = 5.0
        expect(controller.calculateOutput(0.5)).toBe(5.0);
        // Error -0.2 * Gain 10 = -2.0
        expect(controller.calculateOutput(-0.2)).toBe(-2.0);
    });

    it('should handle saturation (clamping)', () => {
        const controller = new GainControl(500.0, 100);
        // Error 1.0 * Gain 500 = 500 -> should be clamped to 100
        expect(controller.calculateOutput(1.0)).toBeLessThanOrEqual(100);
        // Error -1.0 * Gain 500 = -500 -> should be clamped to -100
        expect(controller.calculateOutput(-1.0)).toBeGreaterThanOrEqual(-100);
    });
});

describe('Signal Filtering', () => {
    it('should smooth noisy signals using moving average', () => {
        const engine = new ErrorEngine(5);
        const inputs = [10, 10, 10, 10, 10];
        let lastResult = 0;
        
        inputs.forEach(val => {
            lastResult = engine.getSmoothedError(val);
        });
        
        expect(lastResult).toBe(10);
        
        // Add a spike
        const spikeResult = engine.getSmoothedError(20);
        // Average should be (10+10+10+10+20)/5 = 12
        expect(spikeResult).toBe(12);
    });
});
