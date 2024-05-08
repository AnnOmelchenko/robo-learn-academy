import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Logo } from './Logo'

describe('Logo component', () => {
    it('should render the logo component correctly', () => {
        render(<Logo />)

        const logo = screen.getByTestId('logo')
        expect(logo).toBeInTheDocument()

        const roboText = screen.getByText('ROBO')
        expect(roboText).toBeInTheDocument()

        const learnText = screen.getByText('Learn')
        expect(learnText).toBeInTheDocument()

        expect(roboText).toHaveClass('robo')
        expect(learnText).toHaveClass('learn')
    })
})
