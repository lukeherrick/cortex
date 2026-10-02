import { describe, expect, it } from 'vitest';
import { appName } from '@/App';

describe('scaffold', () => {
  it('exposes the app name', () => {
    expect(appName).toBe('Cortex');
  });
});
