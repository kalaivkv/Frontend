import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

test('successful login calls onLogin', async () => {
  const mockUser = { name: 'Test User' };
  const mockLogin = jest.fn();

  axios.post.mockResolvedValueOnce({
    data: { token: 'fake-token', user: mockUser },
  });

  render(<Login onLogin={mockLogin} />);

  fireEvent.change(screen.getByLabelText(/Email or Student ID/i), {
    target: { value: 'admin' },
  });

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: '12345' },
  });

  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith(mockUser);
  });
});
