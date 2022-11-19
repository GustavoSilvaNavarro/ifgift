import { describe, expect, test } from '@jest/globals';
import { checkValidEmail } from '../src/helpers/helper-functions';

const emailMocks = { email1: 'test@test.com', email2: 'mike_smith@codeworks.com', email3: 'hello' };

describe('Testing helper Functions', () => {
  test('Receive valid email', () => {
    expect(checkValidEmail(emailMocks.email1)).toBe(true);
    expect(checkValidEmail(emailMocks.email2)).toBe(true);
    expect(checkValidEmail(emailMocks.email3)).toBe(false);
  });
});
