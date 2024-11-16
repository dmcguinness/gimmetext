jest.mock('../src/helpers/getCopy', () => ({
  gimmeSomeCopy: jest.fn(),
  gimmeAList: jest.fn(),
}))
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import React from 'react';

// import renderer from 'react-test-renderer';
import { gimmeSomeCopy, gimmeAList } from '../src/helpers/getCopy'

const mockCopy = response => {
  (gimmeSomeCopy as jest.Mock).mockReturnValue(response)
}
const mockList = response => {
  (gimmeAList as jest.Mock).mockReturnValue(response)
}

async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

import {
  GimmeSpan,
  GimmeP,
  GimmeH1,
  GimmeH2,
  GimmeH3,
  GimmeH4,
  GimmeH5,
  GimmeH6,
  GimmeStrong,
  GimmeEm,
  GimmeQ,
  GimmeBlockQuote,
  GimmeOL,
  GimmeUL,
} from '../src/index'

describe('components', () => {
  [
    GimmeSpan,
    GimmeP,
    GimmeH1,
    GimmeH2,
    GimmeH3,
    GimmeH4,
    GimmeH5,
    GimmeH6,
    GimmeStrong,
    GimmeEm,
    GimmeQ,
    GimmeBlockQuote,
    GimmeOL, 
    GimmeUL
  ].forEach(Component => {
    describe(Component.name, () => {
      test('renders when valid response', async () => {
        const COPY_DISPLAYED = 'This is some text that will be displayed'
        mockCopy({
          error: null,
          text: COPY_DISPLAYED
        })
    
        mockList({
          error: null,
          results: [COPY_DISPLAYED, COPY_DISPLAYED]
        })

        const ResolvedComponent = await resolvedComponent(Component, {
          prompts: 'This is a prompt'
        })
    
        render(<ResolvedComponent />);
    
        const elements = screen.queryAllByText(COPY_DISPLAYED);
        expect(elements[0]).toBeInTheDocument();
      })
    })
  })
})
