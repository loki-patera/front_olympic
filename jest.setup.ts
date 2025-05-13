import '@testing-library/jest-dom'
import ResizeObserver from 'resize-observer-polyfill'
import 'whatwg-fetch'
import { mockAnimationsApi } from 'jsdom-testing-mocks'

mockAnimationsApi()

// Ajout d'un polyfill pour ResizeObserver afin de simuler son comportement dans l'environnement de test
global.ResizeObserver = ResizeObserver

// Mock global de `next/navigation` pour simuler le hook `useRouter`
jest.mock("next/navigation", () => {
  const pushMock = jest.fn()
  const useRouter = jest.fn(() => ({
    push: pushMock,
    pathname: "/",
    query: {},
    asPath: "/"
  }))

  return { useRouter }
})