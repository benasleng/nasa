import { render, screen } from "@testing-library/react"
import Button from "../Components/Button/Button"

test('renders button', async () =>  {
  render(<Button onClick={() => alert('testing button')}>Test button</Button>)

  expect(await screen.findByRole('button', { name: /test button/i })).toBeInTheDocument()
})

export {}