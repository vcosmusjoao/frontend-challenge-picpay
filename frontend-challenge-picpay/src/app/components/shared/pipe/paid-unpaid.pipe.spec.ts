import { PaidUnpaidPipe } from './paid-unpaid.pipe';

describe('PaidUnpaidPipe', () => {
  it('create an instance', () => {
    const pipe = new PaidUnpaidPipe();
    expect(pipe).toBeTruthy();
  });
});
